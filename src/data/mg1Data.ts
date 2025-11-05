export type SpellingItem = {
  id: string;
  word: string;           // đáp án đúng
  description: string;    // mô tả / định nghĩa ngắn
  example: string;        // ví dụ ngữ cảnh
  audioUrl?: string;      // nếu có file .mp3; nếu không có sẽ dùng speechSynthesis
  hint?: string;          // gợi ý nhẹ (tuỳ chọn)
};

export const MG1_ITEMS: SpellingItem[] = [
  {
    id: "w1",
    word: "robot",
    description: "A machine that can perform tasks automatically.",
    example: "The factory uses a new robot to assemble parts.",
    // audioUrl: "/audio/robot.mp3"
  },
  {
    id: "w2",
    word: "engineer",
    description: "A person who designs or builds machines or systems.",
    example: "An engineer fixed the production line this morning."
  },
  {
    id: "w3",
    word: "circuit",
    description: "A closed path through which electricity flows.",
    example: "The circuit failed because of a loose wire."
  },
  {
    id: "w4",
    word: "assembly",
    description: "The act of putting parts together to make a whole.",
    example: "The robot moved to the assembly stage."
  },
  {
    id: "w5",
    word: "battery",
    description: "A device that stores energy and provides power.",
    example: "The robot runs on a rechargeable battery."
  }
];
