import { DyslexiaModule } from '../enum';

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
  isTextInput?: boolean; // Cho câu hỏi writing
}

export interface DyslexiaAnswer {
  questionId: number;
  userAnswer: string;
  isCorrect: boolean;
  score: number;
  responseTime: number; // seconds
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
  completionTime: number; // minutes
  answers: DyslexiaAnswer[];
}

export interface ModuleScore {
  score: number;
  maxScore: number;
  percentage: number;
  questionsCount: number;
}

// 10 câu hỏi mẫu cho test dyslexia trẻ 4-5 tuổi
export const DYSLEXIA_QUESTIONS: DyslexiaQuestion[] = [
  // Module 1: Nhận thức âm vị (2 câu)
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
    questionText: "Nghe hai âm sau. Chúng có giống nhau không?",
    audioFilePath: "/assets/auditoryTest/Frequency/1_B_freq_medium_1.mp3",
    optionA: "Giống nhau",
    optionB: "Khác nhau",
    correctAnswer: "B",
    maxScore: 2
  },

  // Module 2: Nhận diện chữ & giải mã (2 câu)
  {
    id: 3,
    module: DyslexiaModule.DECODING,
    orderIndex: 3,
    questionText: "Nghe âm thanh và chọn chữ cái đúng:",
    audioFilePath: "/assets/auditoryTest/Length/3_E_length_easy_1_350.mp3",
    optionA: "D",
    optionB: "Đ",
    correctAnswer: "A",
    maxScore: 2
  },
  {
    id: 4,
    module: DyslexiaModule.DECODING,
    orderIndex: 4,
    questionText: "Nghe từ và chọn cách viết đúng:",
    audioFilePath: "/assets/auditoryTest/Length/3_F_length_medium_1_350.mp3",
    optionA: "ca",
    optionB: "cá",
    optionC: "cà",
    optionD: "cả",
    correctAnswer: "B",
    maxScore: 2
  },

  // Module 3: Tốc độ hiểu (2 câu)
  {
    id: 5,
    module: DyslexiaModule.UNDERSTANDING_FLUENCY,
    orderIndex: 5,
    questionText: "Nghe câu và chọn hình đúng: 'Khỉ ăn chuối'",
    audioFilePath: "/assets/auditoryTest/Rhythm/intervalRise_1_f_f_n_100.mp3",
    imageFilePath: "/assets/image/visual/monkey_banana.png",
    optionA: "Hình A",
    optionB: "Hình B", 
    optionC: "Hình C",
    correctAnswer: "A",
    maxScore: 2
  },
  {
    id: 6,
    module: DyslexiaModule.UNDERSTANDING_FLUENCY,
    orderIndex: 6,
    questionText: "Nhìn hình và chọn câu đúng:",
    imageFilePath: "/assets/image/main.png",
    optionA: "Mèo uống nước",
    optionB: "Mèo ăn cá",
    optionC: "Mèo ngủ",
    correctAnswer: "B",
    maxScore: 2
  },

  // Module 4: Chính tả & viết (2 câu)
  {
    id: 7,
    module: DyslexiaModule.SPELLING_WRITING,
    orderIndex: 7,
    questionText: "Nghe chữ cái và viết lại:",
    audioFilePath: "/assets/auditoryTest/Length/3_E_length_easy_2_437.mp3",
    correctAnswer: "O",
    maxScore: 2,
    isTextInput: true
  },
  {
    id: 8,
    module: DyslexiaModule.SPELLING_WRITING,
    orderIndex: 8,
    questionText: "Nghe chữ cái và viết lại:",
    audioFilePath: "/assets/auditoryTest/Length/3_F_length_medium_2_437.mp3",
    correctAnswer: "S",
    maxScore: 2,
    isTextInput: true
  },

  // Module 5: Hiểu và nhận dạng ngôn ngữ (2 câu)
  {
    id: 9,
    module: DyslexiaModule.LANGUAGE_COMPREHENSION,
    orderIndex: 9,
    questionText: "Hai câu này có cùng ngôn ngữ không?",
    optionA: "Thích ăn kem (Tiếng Việt)",
    optionB: "Ice cream (Tiếng Anh)",
    optionC: "Cùng ngôn ngữ",
    optionD: "Khác ngôn ngữ",
    correctAnswer: "D",
    maxScore: 2
  },
  {
    id: 10,
    module: DyslexiaModule.LANGUAGE_COMPREHENSION,
    orderIndex: 10,
    questionText: "Hai câu tiếng Việt này có giống nhau không?",
    optionA: "Con mèo màu đen",
    optionB: "Con mèo màu đen",
    optionC: "Giống nhau",
    optionD: "Khác nhau",
    correctAnswer: "C",
    maxScore: 2
  }
];
