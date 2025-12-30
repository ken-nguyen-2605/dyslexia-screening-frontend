// MiniGame4Canvas.tsx
import React, { useRef, useEffect } from "react";

interface MiniGame4CanvasProps {
  onSubmit: (letter: string) => void;
  round: number;
}

const MiniGame4Canvas: React.FC<MiniGame4CanvasProps> = ({ onSubmit, round }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Vẽ thành phố dựa trên số tòa nhà
  const drawCity = (ctx: CanvasRenderingContext2D, buildings: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Vẽ nền trời
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Vẽ đất
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(0, ctx.canvas.height - 100, ctx.canvas.width, 100);

    // Vẽ tòa nhà
    for (let i = 0; i < buildings; i++) {
      const width = 40;
      const height = 60 + Math.random() * 40;
      const x = 20 + i * 50;
      const y = ctx.canvas.height - 100 - height;
      ctx.fillStyle = "#555";
      ctx.fillRect(x, y, width, height);

      // cửa sổ vàng
      ctx.fillStyle = "#FFD700";
      for (let wx = 5; wx < width; wx += 15) {
        for (let wy = 5; wy < height; wy += 15) {
          ctx.fillRect(x + wx, y + wy, 5, 5);
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Lấy rewardState từ localStorage
    const data = localStorage.getItem("minigame4_rewards");
    const buildings = data ? JSON.parse(data).buildings : 0;

    drawCity(ctx, buildings);
  }, [round]); // redraw mỗi khi round thay đổi

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      className="border border-gray-400 rounded-lg shadow"
    />
  );
};

export default MiniGame4Canvas;
