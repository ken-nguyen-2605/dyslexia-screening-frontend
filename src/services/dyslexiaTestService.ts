import type { DyslexiaAnswer, DyslexiaTestResult, ModuleScore, DyslexiaQuestion } from '../data/dyslexiaQuestions';
import { DyslexiaModule, DyslexiaRiskLevel } from '../enum';

export class DyslexiaTestService {
  
  /**
   * Tính điểm cho một câu hỏi dựa trên độ chính xác và thời gian
   */
  static calculateQuestionScore(
    isCorrect: boolean, 
    maxScore: number, 
    responseTime: number
  ): number {
    if (!isCorrect) return 0;
    
    // Thời gian lý tưởng: 10-30 giây cho trẻ 4-5 tuổi
    if (responseTime <= 30) {
      return maxScore; // Điểm tối đa
    } else if (responseTime <= 45) {
      return Math.max(1, maxScore - 1); // Trừ 1 điểm
    } else {
      return Math.max(0, maxScore - 2); // Trừ 2 điểm
    }
  }

  /**
   * Tính điểm từng module
   */
  static calculateModuleScores(
    answers: DyslexiaAnswer[], 
    questions: DyslexiaQuestion[]
  ): { [key: string]: ModuleScore } {
    const moduleScores: { [key: string]: ModuleScore } = {};
    
    // Khởi tạo điểm cho từng module
    Object.values(DyslexiaModule).forEach(module => {
      moduleScores[module] = {
        score: 0,
        maxScore: 0,
        percentage: 0,
        questionsCount: 0
      };
    });

    // Tính điểm thực tế
    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question) {
        const module = question.module;
        moduleScores[module].score += answer.score;
        moduleScores[module].maxScore += question.maxScore;
        moduleScores[module].questionsCount += 1;
      }
    });

    // Tính phần trăm
    Object.keys(moduleScores).forEach(module => {
      const data = moduleScores[module];
      data.percentage = data.maxScore > 0 ? (data.score / data.maxScore) * 100 : 0;
    });

    return moduleScores;
  }

  /**
   * Xác định mức độ rủi ro dựa trên điểm số
   */
  static determineRiskLevel(
    overallPercentage: number, 
    moduleScores: { [key: string]: ModuleScore }
  ): DyslexiaRiskLevel {
    // Đếm số module có điểm thấp (< 50%)
    const lowScoringModules = Object.values(moduleScores).filter(
      module => module.percentage < 50 && module.questionsCount > 0
    ).length;

    // Logic xác định rủi ro
    if (overallPercentage >= 70 && lowScoringModules <= 1) {
      return DyslexiaRiskLevel.LOW;
    } else if (overallPercentage >= 50 && lowScoringModules <= 2) {
      return DyslexiaRiskLevel.MEDIUM;
    } else {
      return DyslexiaRiskLevel.HIGH;
    }
  }

  /**
   * Tạo khuyến nghị dựa trên kết quả
   */
  static generateRecommendations(
    riskLevel: DyslexiaRiskLevel, 
    moduleScores: { [key: string]: ModuleScore }
  ): string {
    const recommendations: string[] = [];

    if (riskLevel === DyslexiaRiskLevel.LOW) {
      recommendations.push("✅ Kết quả tốt! Trẻ không có dấu hiệu rủi ro dyslexia.");
      recommendations.push("📚 Tiếp tục khuyến khích trẻ đọc sách và luyện tập hàng ngày.");
      recommendations.push("🎯 Có thể tham gia các hoạt động ngôn ngữ phù hợp độ tuổi.");
      recommendations.push("👀 Theo dõi định kỳ sự phát triển ngôn ngữ của trẻ.");
      
    } else if (riskLevel === DyslexiaRiskLevel.MEDIUM) {
      recommendations.push("⚠️ Trẻ có một số dấu hiệu cần theo dõi thêm.");
      recommendations.push("👨‍🏫 Nên tham khảo ý kiến giáo viên và chuyên gia ngôn ngữ.");
      recommendations.push("📖 Tăng cường luyện tập đọc viết với sự hỗ trợ của người lớn.");
      recommendations.push("⏰ Thực hiện test lại sau 3-6 tháng để theo dõi tiến triển.");
      
      // Khuyến nghị cụ thể theo module yếu
      const weakModules = Object.entries(moduleScores)
        .filter(([_, data]) => data.percentage < 50 && data.questionsCount > 0)
        .map(([module, _]) => this.getModuleName(module));
        
      if (weakModules.length > 0) {
        recommendations.push(`🎯 Tập trung luyện tập: ${weakModules.join(', ')}`);
      }
      
    } else { // HIGH risk
      recommendations.push("🚨 Trẻ có nguy cơ cao về dyslexia - cần can thiệp sớm.");
      recommendations.push("🏥 Khuyến nghị thăm khám chuyên gia tại:");
      recommendations.push("   • Bệnh viện Nhi Trung ương - (024) 3747 0531");
      recommendations.push("   • Bệnh viện Đại học Y Hà Nội - (024) 3825 2141");
      recommendations.push("   • Trung tâm Can thiệp sớm - (024) 3576 2345");
      recommendations.push("📞 Hotline tư vấn miễn phí: 1900-xxx-xxx");
      recommendations.push("⚡ Nên bắt đầu can thiệp sớm để đạt hiệu quả tốt nhất.");
    }

    return recommendations.join('\n');
  }

  /**
   * Lấy tên module bằng tiếng Việt
   */
  static getModuleName(module: string): string {
    switch (module) {
      case DyslexiaModule.PHONOLOGICAL_AWARENESS:
        return "Nhận thức âm vị";
      case DyslexiaModule.DECODING:
        return "Nhận diện chữ & giải mã";
      case DyslexiaModule.UNDERSTANDING_FLUENCY:
        return "Tốc độ hiểu";
      case DyslexiaModule.SPELLING_WRITING:
        return "Chính tả & viết";
      case DyslexiaModule.LANGUAGE_COMPREHENSION:
        return "Hiểu và nhận dạng ngôn ngữ";
      default:
        return module;
    }
  }

  /**
   * Tính toán kết quả test tổng thể
   */
  static calculateTestResult(
    answers: DyslexiaAnswer[],
    questions: DyslexiaQuestion[],
    testStartTime: number,
    testEndTime: number
  ): DyslexiaTestResult {
    // Tính điểm tổng
    const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
    const maxScore = answers.length * 2; // Mỗi câu tối đa 2 điểm
    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    // Tính điểm từng module
    const moduleScores = this.calculateModuleScores(answers, questions);

    // Xác định mức độ rủi ro
    const riskLevel = this.determineRiskLevel(percentage, moduleScores);

    // Tạo khuyến nghị
    const recommendations = this.generateRecommendations(riskLevel, moduleScores);

    // Tính thời gian hoàn thành (phút)
    const completionTime = (testEndTime - testStartTime) / (1000 * 60);

    return {
      totalScore,
      maxScore,
      percentage,
      riskLevel,
      recommendations,
      moduleScores,
      completionTime,
      answers
    };
  }

  /**
   * Lưu kết quả test vào localStorage (tạm thời)
   */
  static saveTestResult(result: DyslexiaTestResult): void {
    const savedResults = this.getSavedTestResults();
    const newResult = {
      ...result,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    
    savedResults.push(newResult);
    localStorage.setItem('dyslexiaTestResults', JSON.stringify(savedResults));
  }

  /**
   * Lấy kết quả test đã lưu
   */
  static getSavedTestResults(): any[] {
    const saved = localStorage.getItem('dyslexiaTestResults');
    return saved ? JSON.parse(saved) : [];
  }

  /**
   * Kiểm tra câu trả lời đúng/sai
   */
  static checkAnswer(userAnswer: string, correctAnswer: string): boolean {
    return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
  }
}
