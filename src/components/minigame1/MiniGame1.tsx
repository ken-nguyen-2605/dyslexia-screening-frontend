import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MG1_ITEMS } from "../../data/mg1Data";
import SpeakerIcon from "../icon/SpeakerIcon";

type State = {
  index: number;
  correct: number;
  input: string;
  feedback: "idle" | "right" | "wrong";
};

const ROBOT_FULL_IMAGE_PATH = "/mascot.jpg";

export default function MiniGame1() {
  const navigate = useNavigate();
  const [st, setSt] = useState<State>({ index: 0, correct: 0, input: "", feedback: "idle" });
  const item = MG1_ITEMS[st.index];

  const progress = useMemo(() => Math.round((st.correct / MG1_ITEMS.length) * 100), [st.correct]);

  const playAudio = () => {
    if (item?.audioUrl) {
      const a = new Audio(item.audioUrl);
      a.play().catch(() => {});
    } else if (item?.word && "speechSynthesis" in window) {
      const ut = new SpeechSynthesisUtterance(item.word);
      ut.lang = "en-US";
      window.speechSynthesis.speak(ut);
    }
  };

  const norm = (s: string) => s.trim().toLowerCase();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    const isRight = norm(st.input) === norm(item.word);
    setSt((p) => ({ ...p, feedback: isRight ? "right" : "wrong", correct: isRight ? p.correct + 1 : p.correct }));

    setTimeout(() => {
      const next = st.index + 1;
      if (next >= MG1_ITEMS.length) {
        navigate("/test/minigame1/rating");
      } else {
        setSt({ index: next, correct: isRight ? st.correct + 1 : st.correct, input: "", feedback: "idle" });
      }
    }, 700);
  };

  const inpRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inpRef.current?.focus(); }, [st.index]);

  return (
    <div className="w-[1280px] max-w-[98vw] mx-auto">
      {/* ====== CONTAINER BAO QUANH 2 KHỐI ====== */}
      <div
        className="
          rounded-3xl p-4 md:p-6
          bg-gradient-to-br from-rose-50 via-white to-rose-100
          border border-rose-100 shadow-[0_25px_80px_-30px_rgba(244,63,94,0.20)]
        "
      >
        {/* ====== GRID 2 KHỐI ====== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          
{/* ========== KHỐI TRÁI: ROBOT + TIẾN ĐỘ ========== */}
<div className="relative rounded-2xl bg-rose-50 border border-rose-100 shadow-[0_20px_60px_-20px_rgba(244,63,94,0.18)] overflow-hidden min-h-[520px] md:min-h-[600px]">
  {/* Nền radial dịu – mở rộng cho khối lớn hơn */}
  <div className="absolute inset-0 bg-[radial-gradient(720px_720px_at_35%_48%,rgba(244,114,182,0.22),rgba(168,85,247,0.12)_45%,transparent_75%)]" />


  {/* Robot – cân đối với vòng */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative w-[300px] h-[300px] md:w-[440px] md:h-[440px] rounded-full overflow-hidden">
      <img
        src={ROBOT_FULL_IMAGE_PATH}
        alt="robot"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
      />
      <div className="absolute inset-0 bg-fuchsia-400/30 mix-blend-multiply" />
    </div>
  </div>

  {/* Thanh tiến độ – CĂN GIỮA và KHÔNG CHẠM vòng */}
  <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[66%] md:w-[62%]">
    <div className="w-full h-3 bg-rose-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-rose-500 transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
    <div className="mt-1 text-center text-sm text-rose-600">{progress}%</div>
  </div>
</div>



          {/* ========== KHỐI PHẢI: PANEL NHẬP TỪ/NGHE/MÔ TẢ ========== */}
          <div className="rounded-2xl bg-white/95 border border-rose-100 shadow-[0_10px_40px_-15px_rgba(244,63,94,0.18)] p-6 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-rose-600">Spellatron</div>
              <button
                onClick={playAudio}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white"
              >
                <SpeakerIcon className="w-5 h-5" />
                Nghe
              </button>
            </div>

            {/* Gợi ý */}
            <div className="text-slate-800 text-sm space-y-3 mb-6">
              <div><span className="text-rose-600 font-semibold">Mô tả:</span> {item?.description}</div>
              <div className="italic">
                <span className="text-rose-600 not-italic font-semibold">Ví dụ:</span> “{item?.example}”
              </div>
              {item?.hint ? <div className="text-rose-600/90">Gợi ý: {item.hint}</div> : null}
            </div>

            {/* Ô nhập */}
            <form onSubmit={submit} className="mt-auto">
              <input
                ref={inpRef}
                value={st.input}
                onChange={(e) => setSt((p) => ({ ...p, input: e.target.value }))}
                placeholder="Gõ từ bạn đoán…"
                className="w-full px-4 py-3 rounded-xl bg-rose-50 text-slate-900 outline-none ring-1 ring-rose-200 focus:ring-rose-400"
                autoComplete="off"
              />
              <div className="mt-3 flex items-center justify-between">
                <div className="text-slate-500 text-sm">Câu {st.index + 1}/{MG1_ITEMS.length}</div>
                <button type="submit" className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow">
                  Xác nhận
                </button>
              </div>
            </form>

            {/* Feedback */}
            {st.feedback !== "idle" && (
              <div className={`mt-3 text-sm ${st.feedback === "right" ? "text-emerald-600" : "text-rose-600"}`}>
                {st.feedback === "right" ? "Chính xác! Bộ phận robot đã được lắp." : "Chưa đúng, thử lại ở câu tiếp theo nhé."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
