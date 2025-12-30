import { useState, useCallback } from "react";

// Import Types từ Visuals
import type { PlanetTheme } from "../components/tests/minigame4/visuals/PlanetBackground";
import type { MascotEmotion } from "../components/tests/minigame4/visuals/Mascot";

// Import Services (Hậu cần & Cấu hình)
import { checkHandwritingAI } from "../components/tests/minigame4/uncheck/services/mockAI";
import {
  GAME_CONFIG,
  LETTERS_POOL,
  PRAISE_MESSAGES,
  ENCOURAGE_MESSAGES,
} from "../components/tests/minigame4/uncheck/services/gameConfig";

// --- INTERFACE STATE ---
export interface GameState {
  level: number;
  energy: number; // 0 - 100
  targetLetter: string; // Chữ cái đề bài
  mascotEmotion: MascotEmotion;
  currentTheme: PlanetTheme;
  isBoosting: boolean; // Hiệu ứng bay qua màn
  isProcessing: boolean; // Đang chờ chấm điểm
  feedbackMessage: string;
  effectType: "success" | "error" | null; // Để kích hoạt hiệu ứng Visuals
}

// Danh sách Theme để xoay vòng
const THEMES: PlanetTheme[] = ["ice", "candy", "jungle"];

export const useGameLogic = () => {
  // --- KHAI BÁO STATE ---
  const [level, setLevel] = useState(1);
  const [energy, setEnergy] = useState(0);
  const [targetLetter, setTargetLetter] = useState(LETTERS_POOL[0]);
  const [themeIndex, setThemeIndex] = useState(0);

  const [isBoosting, setIsBoosting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [mascotEmotion, setMascotEmotion] = useState<MascotEmotion>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState(
    "Hãy viết chữ cái bạn nghe được!"
  );
  const [effectType, setEffectType] = useState<"success" | "error" | null>(
    null
  );

  // Helper: Lấy tin nhắn ngẫu nhiên từ danh sách
  const getRandomMsg = (list: string[]) =>
    list[Math.floor(Math.random() * list.length)];

  // --- ACTION: XỬ LÝ NỘP BÀI ---
  const handleSubmitAnswer = useCallback(
    async (imageBase64: string) => {
      if (isProcessing) return; // Chặn click nhiều lần

      setIsProcessing(true);
      setMascotEmotion("thinking");
      setFeedbackMessage("Đang liên lạc trạm vũ trụ...");
      setEffectType(null);

      try {
        // 1. Gọi Service AI
        const isCorrect = await checkHandwritingAI(imageBase64, targetLetter);

        // 2. Xử lý kết quả
        if (isCorrect) {
          handleCorrect();
        } else {
          handleWrong();
        }
      } finally {
        setIsProcessing(false);
      }
    },
    [targetLetter, isProcessing]
  );

  // --- LOGIC: KHI ĐÚNG ---
  const handleCorrect = () => {
    setMascotEmotion("happy");
    setFeedbackMessage(getRandomMsg(PRAISE_MESSAGES));
    setEffectType("success"); // Nổ pháo hoa

    setEnergy((prev) => {
      const newEnergy = prev + GAME_CONFIG.POINTS_PER_CORRECT;

      // Nếu đầy bình -> Level Up
      if (newEnergy >= GAME_CONFIG.MAX_ENERGY) {
        triggerLevelUp();
        return GAME_CONFIG.MAX_ENERGY;
      }
      return newEnergy;
    });

    // Đổi câu hỏi sau thời gian chờ (trừ khi Level Up)
    setTimeout(() => {
      setEffectType(null);
      setEnergy((current) => {
        if (current < GAME_CONFIG.MAX_ENERGY) nextQuestion();
        return current;
      });
    }, GAME_CONFIG.WAIT_TIME_NEXT_QUESTION);
  };

  // --- LOGIC: KHI SAI ---
  const handleWrong = () => {
    setMascotEmotion("worried");
    setFeedbackMessage(getRandomMsg(ENCOURAGE_MESSAGES));
    setEffectType("error"); // Rung màn hình

    // Reset trạng thái sau 0.5s
    setTimeout(() => {
      setEffectType(null);
      setMascotEmotion("idle");
    }, 500);
  };

  // --- LOGIC: LEVEL UP (TÀU BAY ĐI) ---
  const triggerLevelUp = () => {
    setIsBoosting(true);
    setFeedbackMessage("Năng lượng đầy! Phóng thôiiii!");

    // Đợi tàu bay xong mới reset game sang màn mới
    setTimeout(() => {
      setLevel((prev) => prev + 1);
      setEnergy(0);
      setIsBoosting(false);
      setMascotEmotion("idle");
      setEffectType(null);

      // Đổi Theme nền tiếp theo
      setThemeIndex((prev) => (prev + 1) % THEMES.length);

      // Đổi câu hỏi mới
      nextQuestion();

      setFeedbackMessage(`Chào mừng đến Hành tinh số ${level + 1}!`);
    }, GAME_CONFIG.WAIT_TIME_LEVEL_UP);
  };

  // --- HELPER: ĐỔI CÂU HỎI NGẪU NHIÊN ---
  const nextQuestion = () => {
    let nextChar = targetLetter;
    // Đảm bảo không trùng chữ vừa làm
    while (nextChar === targetLetter) {
      const randIndex = Math.floor(Math.random() * LETTERS_POOL.length);
      nextChar = LETTERS_POOL[randIndex];
    }
    setTargetLetter(nextChar);
    setMascotEmotion("idle");
  };

  // --- RETURN DATA ---
  return {
    gameState: {
      level,
      energy,
      targetLetter,
      mascotEmotion,
      currentTheme: THEMES[themeIndex],
      isBoosting,
      isProcessing,
      feedbackMessage,
      effectType,
    },
    actions: {
      submitAnswer: handleSubmitAnswer,
    },
  };
};
