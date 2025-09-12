import { DyslexiaModule } from '../enum';
import type { DyslexiaTestResult, ModuleScore } from '../data/dyslexiaQuestions';
import { LEARNING_PLANS, TREATMENT_CENTERS, type LearningPlan, type TreatmentCenter } from '../data/learningPlan';

export interface LearningRecommendation {
  type: 'learning_plan' | 'treatment_centers';
  correctAnswers: number;
  totalQuestions: number;
  learningPlans?: LearningPlan[];
  treatmentCenters?: {
    north: TreatmentCenter[];
    central: TreatmentCenter[];
    south: TreatmentCenter[];
  };
  weakestModules?: string[];
}

export class LearningPlanService {
  /**
   * Tạo khuyến nghị học tập dựa trên kết quả test
   */
  static generateLearningRecommendation(testResult: DyslexiaTestResult): LearningRecommendation | null {
    const correctAnswers = testResult.totalScore;
    const totalQuestions = testResult.maxScore / 2; // Mỗi câu tối đa 2 điểm

    // Nếu số câu đúng trong khoảng 3 < x < 8, hiển thị lộ trình học
    if (correctAnswers > 3 && correctAnswers < 8) {
      const weakestModules = this.getWeakestModules(testResult.moduleScores);
      const learningPlans = this.generateCustomLearningPlans(weakestModules, testResult.moduleScores);

      return {
        type: 'learning_plan',
        correctAnswers,
        totalQuestions,
        learningPlans,
        weakestModules
      };
    }
    
    // Nếu số câu đúng <= 3, hiển thị thông tin điều trị
    else if (correctAnswers <= 3) {
      const treatmentCenters = this.getTreatmentCentersByRegion();
      
      return {
        type: 'treatment_centers',
        correctAnswers,
        totalQuestions,
        treatmentCenters
      };
    }

    // Nếu kết quả tốt (>= 8 câu đúng), không cần hiển thị gì thêm
    return null;
  }

  /**
   * Tìm các module yếu nhất
   */
  private static getWeakestModules(moduleScores: { [key: string]: ModuleScore }): DyslexiaModule[] {
    const modulesWithScores = Object.entries(moduleScores)
      .filter(([_, score]) => score.questionsCount > 0)
      .map(([module, score]) => ({
        module: module as DyslexiaModule,
        percentage: score.percentage,
        score: score.score,
        maxScore: score.maxScore
      }))
      .sort((a, b) => a.percentage - b.percentage);

    // Lấy 2-3 module yếu nhất (có điểm % thấp nhất)
    return modulesWithScores.slice(0, Math.min(3, modulesWithScores.length)).map(item => item.module);
  }

  /**
   * Tạo lộ trình học tùy chỉnh dựa trên module yếu
   */
  private static generateCustomLearningPlans(weakestModules: DyslexiaModule[], moduleScores: { [key: string]: ModuleScore }): LearningPlan[] {
    const learningPlans: LearningPlan[] = [];

    weakestModules.forEach(module => {
      if (LEARNING_PLANS[module]) {
        const basePlan = LEARNING_PLANS[module];
        const moduleScore = moduleScores[module];
        
        // Tùy chỉnh lộ trình dựa trên mức độ yếu
        const customizedPlan = this.customizeLearningPlan(basePlan, moduleScore);
        learningPlans.push(customizedPlan);
      }
    });

    return learningPlans;
  }

  /**
   * Tùy chỉnh lộ trình học dựa trên điểm số cụ thể
   */
  private static customizeLearningPlan(basePlan: LearningPlan, moduleScore: ModuleScore): LearningPlan {
    const intensity = this.calculateIntensity(moduleScore.percentage);
    
    return {
      ...basePlan,
      description: `${basePlan.description} (Mức độ tập trung: ${intensity})`,
      weeks: basePlan.weeks.map(week => ({
        ...week,
        activities: week.activities.map(activity => ({
          ...activity,
          duration: this.adjustDuration(activity.duration, intensity)
        })),
        tips: [
          ...week.tips,
          ...this.getIntensitySpecificTips(intensity)
        ]
      }))
    };
  }

  /**
   * Tính mức độ cần tập trung dựa trên điểm %
   */
  private static calculateIntensity(percentage: number): 'cao' | 'trung bình' | 'nhẹ' {
    if (percentage < 30) return 'cao';
    if (percentage < 60) return 'trung bình';
    return 'nhẹ';
  }

  /**
   * Điều chỉnh thời gian hoạt động dựa trên mức độ cần thiết
   */
  private static adjustDuration(originalDuration: string, intensity: 'cao' | 'trung bình' | 'nhẹ'): string {
    const minutes = parseInt(originalDuration.match(/\d+/)?.[0] || '10');
    
    switch (intensity) {
      case 'cao':
        return originalDuration.replace(/\d+/, (minutes * 1.5).toString());
      case 'trung bình':
        return originalDuration.replace(/\d+/, (minutes * 1.2).toString());
      case 'nhẹ':
      default:
        return originalDuration;
    }
  }

  /**
   * Thêm lời khuyên cụ thể dựa trên mức độ cần thiết
   */
  private static getIntensitySpecificTips(intensity: 'cao' | 'trung bình' | 'nhẹ'): string[] {
    switch (intensity) {
      case 'cao':
        return [
          "Thực hiện bài tập 2 lần/ngày nếu có thể",
          "Tìm sự hỗ trợ từ chuyên gia giáo dục",
          "Kiên nhẫn và không vội vàng"
        ];
      case 'trung bình':
        return [
          "Tăng cường luyện tập vào cuối tuần",
          "Theo dõi tiến triển hàng tuần"
        ];
      case 'nhẹ':
        return [
          "Duy trì luyện tập đều đặn",
          "Kết hợp với các hoạt động vui chơi"
        ];
      default:
        return [];
    }
  }

  /**
   * Lấy danh sách trung tâm điều trị theo vùng miền
   */
  private static getTreatmentCentersByRegion() {
    const centersByRegion = {
      north: TREATMENT_CENTERS.filter(center => center.region === 'north'),
      central: TREATMENT_CENTERS.filter(center => center.region === 'central'),
      south: TREATMENT_CENTERS.filter(center => center.region === 'south')
    };

    return centersByRegion;
  }

  /**
   * Lấy tên module bằng tiếng Việt
   */
  static getModuleDisplayName(module: DyslexiaModule): string {
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
   * Tạo thông điệp khuyến khích dựa trên tình trạng
   */
  static getEncouragementMessage(correctAnswers: number): string {
    if (correctAnswers <= 3) {
      return "Đừng lo lắng! Với sự hỗ trợ và can thiệp kịp thời từ các chuyên gia, trẻ có thể cải thiện đáng kể. Hãy liên hệ với các trung tâm dưới đây để được tư vấn chi tiết.";
    } else if (correctAnswers > 3 && correctAnswers < 8) {
      return "Kết quả cho thấy trẻ cần một số hỗ trợ trong việc học. Hãy thực hiện lộ trình học tập dưới đây để giúp trẻ cải thiện những kỹ năng cần thiết.";
    } else {
      return "Kết quả tuyệt vời! Hãy tiếp tục duy trì và phát triển những kỹ năng tốt này.";
    }
  }
}
