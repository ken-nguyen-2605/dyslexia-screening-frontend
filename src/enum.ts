export type TestType = "auditory" | "visual" | "language" | "dyslexia-child" | "basic";

export const DyslexiaRiskLevel = {
  LOW: "low",      // Rủi ro thấp - không có dấu hiệu
  MEDIUM: "medium", // Rủi ro trung bình - cần theo dõi  
  HIGH: "high"     // Rủi ro cao - cần can thiệp
} as const;

export type DyslexiaRiskLevel = typeof DyslexiaRiskLevel[keyof typeof DyslexiaRiskLevel];

export const DyslexiaModule = {
  PHONOLOGICAL_AWARENESS: "phonological_awareness",  // Nhận thức âm vị
  DECODING: "decoding",                             // Nhận diện chữ & giải mã
  UNDERSTANDING_FLUENCY: "understanding_fluency",    // Tốc độ hiểu
  SPELLING_WRITING: "spelling_writing",             // Chính tả & viết
  LANGUAGE_COMPREHENSION: "language_comprehension"   // Hiểu và nhận dạng ngôn ngữ
} as const;

export type DyslexiaModule = typeof DyslexiaModule[keyof typeof DyslexiaModule];
