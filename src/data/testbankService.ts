import { DyslexiaModule } from '../enum';

// Common interfaces for testbank questions
export interface TestbankQuestion {
  id: string | number;
  type: string;
  audio: string[];
  question: string;
  num_ans: number;
  ans1: string | null;
  ans2: string | null;
  ans3: string | null;
  ans4: string | null;
  ans_correct: string | number;
  module: string;
  orderIndex?: number;
  maxScore?: number;
  isTextInput?: boolean;
  imageFilePath?: string;
  images?: string[];
  targetLetter?: string;
}

export interface TestbankMetadata {
  testType: string;
  version: string;
  description: string;
  totalQuestions: string | number;
  timeLimit?: string;
  modules?: string[];
}

export interface DyslexiaTestbank {
  metadata: TestbankMetadata;
  questions: TestbankQuestion[];
}

export interface BasicTestbank {
  metadata: TestbankMetadata;
  questionPools: {
    [moduleName: string]: TestbankQuestion[];
  };
  testConfiguration: {
    questionsPerModule: number;
    randomSelection: boolean;
    description: string;
  };
}

// Legacy interfaces (kept for compatibility)
export interface DyslexiaQuestion {
  id: number;
  module: DyslexiaModule;
  orderIndex: number;
  questionText: string;
  audioFilePath?: string;
  imageFilePath?: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctAnswer: string;
  maxScore: number;
  isTextInput?: boolean;
}

export interface DyslexiaAnswer {
  questionId: number;
  userAnswer: string;
  isCorrect: boolean;
  score: number;
  responseTime: number;
  startTime: number;
  endTime: number;
}

export interface DyslexiaTestResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  riskLevel: string;
  recommendations: string;
  moduleScores: { [key: string]: ModuleScore };
  completionTime: number;
  answers: DyslexiaAnswer[];
}

export interface ModuleScore {
  score: number;
  maxScore: number;
  percentage: number;
  questionsCount: number;
}

export class TestbankService {
  /**
   * Convert testbank question to legacy DyslexiaQuestion format
   */
  static convertToDyslexiaQuestion(testbankQuestion: TestbankQuestion): DyslexiaQuestion {
    // Map module names to enum values
    const getModuleEnum = (moduleName: string): DyslexiaModule => {
      switch (moduleName) {
        case 'PHONOLOGICAL_AWARENESS':
          return DyslexiaModule.PHONOLOGICAL_AWARENESS;
        case 'DECODING':
          return DyslexiaModule.DECODING;
        case 'UNDERSTANDING_FLUENCY':
          return DyslexiaModule.UNDERSTANDING_FLUENCY;
        case 'SPELLING_WRITING':
          return DyslexiaModule.SPELLING_WRITING;
        case 'LANGUAGE_COMPREHENSION':
          return DyslexiaModule.LANGUAGE_COMPREHENSION;
        default:
          return DyslexiaModule.PHONOLOGICAL_AWARENESS; // Default fallback
      }
    };

    return {
      id: typeof testbankQuestion.id === 'string' ? parseInt(testbankQuestion.id) : testbankQuestion.id,
      module: getModuleEnum(testbankQuestion.module),
      orderIndex: testbankQuestion.orderIndex || 1,
      questionText: testbankQuestion.question,
      audioFilePath: testbankQuestion.audio.length > 0 ? testbankQuestion.audio[0] : undefined,
      imageFilePath: testbankQuestion.imageFilePath,
      optionA: testbankQuestion.ans1 || undefined,
      optionB: testbankQuestion.ans2 || undefined,
      optionC: testbankQuestion.ans3 || undefined,
      optionD: testbankQuestion.ans4 || undefined,
      correctAnswer: typeof testbankQuestion.ans_correct === 'number' 
        ? String.fromCharCode(64 + testbankQuestion.ans_correct) // Convert 1,2,3,4 to A,B,C,D
        : String(testbankQuestion.ans_correct),
      maxScore: testbankQuestion.maxScore || 2,
      isTextInput: testbankQuestion.isTextInput || false
    };
  }

  /**
   * Load dyslexia test questions from JSON testbank
   */
  static async loadDyslexiaQuestions(): Promise<DyslexiaQuestion[]> {
    try {
      // Try JSON first
      const response = await fetch('/src/data/testbank/dyslexiaQuestions.json');
      if (!response.ok) {
        throw new Error(`Failed to load dyslexia testbank: ${response.statusText}`);
      }
      
      const testbank: DyslexiaTestbank = await response.json();
      
      return testbank.questions.map(question => 
        this.convertToDyslexiaQuestion(question)
      );
    } catch (error) {
      console.error('Error loading dyslexia testbank from JSON, trying CSV:', error);
      
      try {
        // Fallback to CSV
        return await this.loadDyslexiaQuestionsFromCSV();
      } catch (csvError) {
        console.error('Error loading dyslexia testbank from CSV:', csvError);
        // Fallback to original hardcoded questions if both fail
        return this.getFallbackDyslexiaQuestions();
      }
    }
  }

  /**
   * Load dyslexia test questions from CSV testbank
   */
  static async loadDyslexiaQuestionsFromCSV(): Promise<DyslexiaQuestion[]> {
    const response = await fetch('/src/data/testbank/dyslexiaQuestions.csv');
    if (!response.ok) {
      throw new Error(`Failed to load dyslexia CSV testbank: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    const rows = csvText.split('\n').slice(1); // Skip header row
    
    const questions: DyslexiaQuestion[] = [];
    
    rows.forEach(row => {
      if (row.trim()) {
        const columns = this.parseCSVRow(row);
        if (columns.length >= 11) {
          const testbankQuestion: TestbankQuestion = {
            id: columns[0],
            type: columns[1],
            audio: columns[2] ? columns[2].split('|') : [],
            question: columns[3],
            num_ans: parseInt(columns[4]) || 0,
            ans1: columns[5] || null,
            ans2: columns[6] || null,
            ans3: columns[7] || null,
            ans4: columns[8] || null,
            ans_correct: columns[9],
            module: columns[10],
            orderIndex: parseInt(columns[11]) || 1,
            maxScore: parseInt(columns[12]) || 2,
            isTextInput: columns[13] === 'TRUE',
            imageFilePath: columns[14] || undefined
          };
          
          questions.push(this.convertToDyslexiaQuestion(testbankQuestion));
        }
      }
    });
    
    return questions;
  }

  /**
   * Load basic test question pools from JSON testbank
   */
  static async loadBasicTestQuestions(): Promise<BasicTestbank> {
    try {
      // Try JSON first
      const response = await fetch('/src/data/testbank/basicTestQuestions.json');
      if (!response.ok) {
        throw new Error(`Failed to load basic test testbank: ${response.statusText}`);
      }
      
      const testbank: BasicTestbank = await response.json();
      return testbank;
    } catch (error) {
      console.error('Error loading basic test testbank from JSON, trying CSV:', error);
      
      try {
        // Fallback to CSV
        return await this.loadBasicTestQuestionsFromCSV();
      } catch (csvError) {
        console.error('Error loading basic test testbank from CSV:', csvError);
        throw csvError; // Let the calling component handle the error
      }
    }
  }

  /**
   * Load basic test question pools from CSV testbank
   */
  static async loadBasicTestQuestionsFromCSV(): Promise<BasicTestbank> {
    const response = await fetch('/src/data/testbank/basicTestQuestions.csv');
    if (!response.ok) {
      throw new Error(`Failed to load basic test CSV testbank: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    const rows = csvText.split('\n').slice(1); // Skip header row
    
    const questionPools: { [moduleName: string]: TestbankQuestion[] } = {};
    
    rows.forEach(row => {
      if (row.trim()) {
        const columns = this.parseCSVRow(row);
        if (columns.length >= 12) {
          const poolName = columns[12]; // pool column
          
          if (!questionPools[poolName]) {
            questionPools[poolName] = [];
          }
          
          const testbankQuestion: TestbankQuestion = {
            id: columns[0],
            type: columns[1],
            audio: columns[2] ? columns[2].split('|') : [],
            question: columns[3],
            num_ans: parseInt(columns[4]) || 0,
            ans1: columns[5] || null,
            ans2: columns[6] || null,
            ans3: columns[7] || null,
            ans4: columns[8] || null,
            ans_correct: parseInt(columns[9]) || columns[9],
            module: columns[10],
            images: columns[13] ? columns[13].split('|') : undefined,
            targetLetter: columns[14] || undefined
          };
          
          questionPools[poolName].push(testbankQuestion);
        }
      }
    });
    
    return {
      metadata: {
        testType: "basic-test",
        version: "1.0",
        description: "Basic dyslexia screening test with randomized questions loaded from CSV",
        totalQuestions: "10 (2 per module)",
        modules: Object.keys(questionPools)
      },
      questionPools,
      testConfiguration: {
        questionsPerModule: 2,
        randomSelection: true,
        description: "Each test run will randomly select 2 questions from each module pool"
      }
    };
  }

  /**
   * Generate randomized questions for basic test from testbank
   */
  static generateRandomizedQuestionsFromTestbank(testbank: BasicTestbank): any[] {
    const questions: any[] = [];
    const config = testbank.testConfiguration;

    // For each module, randomly select the specified number of questions
    Object.entries(testbank.questionPools).forEach(([moduleName, questionPool]) => {
      if (questionPool.length === 0) return;

      // Shuffle and select questions
      const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, config.questionsPerModule);

      selected.forEach((testbankQuestion, index) => {
        // Convert testbank format to BasicTest format
        const question: any = {
          id: `${moduleName}-${index + 1}`,
          module: testbankQuestion.module,
          question: testbankQuestion.question,
          type: testbankQuestion.type
        };

        // Handle audio files
        if (testbankQuestion.audio.length > 0) {
          question.audio = testbankQuestion.audio[0];
          if (testbankQuestion.audio.length > 1) {
            question.secondAudio = testbankQuestion.audio[1];
          }
        }

        // Handle options
        if (testbankQuestion.num_ans > 0) {
          question.options = [];
          const answers = [testbankQuestion.ans1, testbankQuestion.ans2, testbankQuestion.ans3, testbankQuestion.ans4];
          
          for (let i = 0; i < testbankQuestion.num_ans; i++) {
            if (answers[i]) {
              const option: any = { text: answers[i] };
              
              // Add images if available
              if (testbankQuestion.images && testbankQuestion.images[i]) {
                option.image = testbankQuestion.images[i];
              }
              
              question.options.push(option);
            }
          }
        }

        // Handle correct answer
        if (typeof testbankQuestion.ans_correct === 'number') {
          question.correctAnswer = testbankQuestion.ans_correct - 1; // Convert 1-based to 0-based
        } else if (typeof testbankQuestion.ans_correct === 'string') {
          question.correctAnswer = testbankQuestion.ans_correct;
        }

        // Handle special fields
        if (testbankQuestion.targetLetter) {
          question.targetLetter = testbankQuestion.targetLetter;
        }

        questions.push(question);
      });
    });

    return questions;
  }

  /**
   * Parse CSV row handling quoted values
   */
  private static parseCSVRow(row: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  /**
   * Fallback dyslexia questions if JSON loading fails
   */
  private static getFallbackDyslexiaQuestions(): DyslexiaQuestion[] {
    return [
      {
        id: 1,
        module: DyslexiaModule.PHONOLOGICAL_AWARENESS,
        orderIndex: 1,
        questionText: "Nghe hai âm thanh sau. Chúng có giống nhau không?",
        audioFilePath: "/assets/auditoryTest/Frequency/1_A_freq_easy_1.mp3",
        optionA: "Giống nhau",
        optionB: "Khác nhau",
        correctAnswer: "B",
        maxScore: 2
      },
      {
        id: 2,
        module: DyslexiaModule.PHONOLOGICAL_AWARENESS,
        orderIndex: 2,
        questionText: "Nghe hai âm thanh sau. Chúng có giống nhau không?",
        audioFilePath: "/assets/auditoryTest/Frequency/1_B_freq_medium_1.mp3",
        optionA: "Giống nhau",
        optionB: "Khác nhau",
        correctAnswer: "A",
        maxScore: 2
      }
      // Add more fallback questions as needed...
    ];
  }
}

// Legacy export for backward compatibility
export const DYSLEXIA_QUESTIONS: DyslexiaQuestion[] = [];

// Initialize questions from testbank on module load
TestbankService.loadDyslexiaQuestions().then(questions => {
  DYSLEXIA_QUESTIONS.length = 0; // Clear array
  DYSLEXIA_QUESTIONS.push(...questions); // Add new questions
}).catch(error => {
  console.error('Failed to initialize dyslexia questions from testbank:', error);
});
