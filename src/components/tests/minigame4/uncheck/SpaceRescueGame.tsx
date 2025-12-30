import React, { useEffect } from "react";
import styles from "./SpaceRescueGame.module.css";

// 1. IMPORT LOGIC
import { useGameLogic } from "../../../../hooks/useGameLogic";

// 2. IMPORT VISUALS
import PlanetBackground from "../visuals/PlanetBackground";
import Spaceship from "../visuals/SpaceShip";
import Mascot from "../visuals/Mascot";
import EffectLayer from "../visuals/EffectLayer";

// 3. IMPORT HUD
import GameHeader from "../HUD/GameHeader";

// 4. IMPORT PLAY AREA
import DrawingPad from "../playArea/DrawingPad";

interface SpaceRescueGameProps {
  studentName?: string;
  onExit?: () => void;
}

const SpaceRescueGame: React.FC<SpaceRescueGameProps> = ({
  studentName = "Phi Hành Gia Tí Hon",
  onExit,
}) => {
  const { gameState, actions } = useGameLogic();

  const {
    level,
    energy,
    targetLetter,
    mascotEmotion,
    currentTheme,
    isBoosting,
    isProcessing,
    feedbackMessage,
    effectType,
  } = gameState;

  // --- LOGIC ÂM THANH (TTS) ---
  useEffect(() => {
    const speak = () => {
      if ("speechSynthesis" in window) {
        const msg = new SpeechSynthesisUtterance(
          `Hãy viết chữ ${targetLetter}`
        );
        msg.lang = "vi-VN";
        msg.rate = 0.9;
        window.speechSynthesis.speak(msg);
      }
    };
    const timer = setTimeout(speak, 500);
    return () => clearTimeout(timer);
  }, [targetLetter]);

  const handleReplayAudio = () => {
    if ("speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance(targetLetter);
      msg.lang = "vi-VN";
      window.speechSynthesis.speak(msg);
    }
  };

  return (
    <div className={styles.gameContainer}>
      {/* --- LỚP 1: HẬU CẢNH --- */}
      <PlanetBackground theme={currentTheme} />
      <EffectLayer effectType={effectType} />

      {/* --- LỚP 2: HUD --- */}
      <div className={styles.hudLayer}>
        <GameHeader
          playerName={studentName}
          level={level}
          energy={energy}
          onExit={onExit || (() => console.log("Exit Game"))}
        />
      </div>

      {/* --- LỚP 3: SÂN KHẤU CHÍNH --- */}
      <div className={styles.stageArea}>
        {/* Tàu vũ trụ */}
        <div className={styles.spaceshipWrapper}>
          <Spaceship isBoosting={isBoosting} />
        </div>

        {/* Mascot */}
        <div className={styles.mascotWrapper}>
          <div className={styles.speechBubble}>{feedbackMessage}</div>
          <Mascot emotion={mascotEmotion} />
        </div>
      </div>

      {/* --- LỚP 4: TƯƠNG TÁC --- */}
      <div className={styles.interactionArea}>
        {/* Nút loa (Đã sửa text ngắn gọn) */}
        <button onClick={handleReplayAudio} className={styles.audioBtn}>
          🔊 Nghe lại
        </button>

        {/* Bảng vẽ */}
        <div className={styles.padWrapper}>
          <DrawingPad
            onCheckSubmit={actions.submitAnswer}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};

export default SpaceRescueGame;
