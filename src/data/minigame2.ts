export interface Question {
  id: number;
  sentence: string;
  correctAnswer: boolean;
}

export const QUESTIONS: Question[] = [
  { id: 1, sentence: "Con cá biết bay.", correctAnswer: false },
  {
    id: 2,
    sentence: "Hoàng Sa Trường Sa là của Việt Nam.",
    correctAnswer: true,
  },
  { id: 3, sentence: "Con mèo kêu meo meo.", correctAnswer: true },
  { id: 4, sentence: "1 + 1 = 2", correctAnswer: true },
  { id: 5, sentence: "Mặt trời mọc ở hướng Tây", correctAnswer: false },
];
