import { useState } from "react";

interface AudioTestDifficultyRatingProps {
  onSubmit: (rating: number) => void;
  defaultValue?: number;
}

const ratingLabels = {
  1: "Very Easy",
  2: "Easy",
  3: "Moderate",
  4: "Difficult",
  5: "Very Difficult",
};

const min = 1;
const max = 5;

const AudioTestDifficultyRating = ({
  onSubmit,
  defaultValue = 3,
}: AudioTestDifficultyRatingProps) => {
  const [rating, setRating] = useState(defaultValue);

  // Calculate percent for background
  const percent = ((rating - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-white border border-gray-100 p-8 rounded-2xl items-center space-y-4 shadow-lg max-w-md w-full mx-auto mt-10"
    >
      
      {/* Heading, icon, instructions */}
      <div className="flex flex-col items-center w-full">
        
        <h2 className="text-2xl text-teal-600 font-bold text-center mb-1">
          Audio Test Difficulty Rating
        </h2>
        <div className="font-bold text-black text-center mb-2 mt-2">
          How difficult was that for you?
        </div>
        <div className="text-justify text-gray-700 mb-2">
          Please rate how difficult you found the audio test you just completed. 
        </div>
        <div className="mb-3 text-black font-semibold text-left">
          Rating from 1 to 5 (1 = Very Easy, 5 = Very Difficult)
        </div>
      </div>
      {/* Range Slider (styled to match) */}
      <div className="w-full flex flex-col items-center">
        <style>{`
          .custom-range {
            width: 100%;
            max-width: 320px;
            height: 8px;
            border-radius: 4px;
            accent-color: #14b8a6;
            background: transparent;
          }
          .custom-range::-webkit-slider-runnable-track {
            height: 8px;
            border-radius: 4px;
            background: linear-gradient(
              to right,
              #14b8a6 0%,
              #14b8a6 var(--val, 50%),
              #fff var(--val, 50%),
              #fff 100%
            );
          }
          .custom-range::-moz-range-track {
            height: 8px;
            border-radius: 4px;
            background: linear-gradient(
              to right,
              #14b8a6 0%,
              #14b8a6 var(--val, 50%),
              #fff var(--val, 50%),
              #fff 100%
            );
          }
          .custom-range::-ms-fill-lower {
            background: #14b8a6;
            border-radius: 4px 0 0 4px;
          }
          .custom-range::-ms-fill-upper {
            background: #fff;
            border-radius: 0 4px 4px 0;
          }
          .custom-range::-webkit-slider-thumb {
            width: 24px;
            height: 24px;
            background: #14b8a6;
            border: 3px solid #fff;
            border-radius: 50%;
            cursor: pointer;
            margin-top: -4px;
            box-shadow: 0 2px 8px #14b8a624;
            transition: background 0.2s;
          }
          .custom-range:focus::-webkit-slider-thumb {
            outline: 2px solid #0d9488;
          }
          .custom-range::-moz-range-thumb {
            width: 24px;
            height: 24px;
            background: #14b8a6;
            border: 3px solid #fff;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 8px #14b8a624;
            transition: background 0.2s;
          }
          .custom-range:focus::-moz-range-thumb {
            outline: 2px solid #0d9488;
          }
          .custom-range::-ms-thumb {
            width: 24px;
            height: 24px;
            background: #14b8a6;
            border: 3px solid #fff;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 8px #14b8a624;
            transition: background 0.2s;
          }
          .custom-range:focus::-ms-thumb {
            outline: 2px solid #0d9488;
          }
          .custom-range:focus {
            outline: none;
          }
          .custom-range::-moz-focus-outer {
            border: 0;
          }
        `}</style>
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={rating}
          onChange={handleChange}
          className="custom-range"
          style={{
            "--val": `${percent}%`,
          } as React.CSSProperties}
        />
        {/* Numbers */}
        <div className="flex justify-between w-full max-w-xs text-teal-600 font-bold select-none mt-3 text-lg">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-[18px]">{i + 1}</span>
          ))}
        </div>
        {/* Label below the current rating */}
        {ratingLabels[rating as keyof typeof ratingLabels] && (
          <div className="mt-2 text-black font-semibold text-[17px]">
            {ratingLabels[rating as keyof typeof ratingLabels]}
          </div>
        )}
      </div>
      {/* Next/Submit button */}
      <button
        type="submit"
        className="bg-teal-500 py-2 w-full rounded-lg text-white font-semibold hover:bg-teal-600 transition focus:ring-2 focus:ring-teal-200 focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
};

export default AudioTestDifficultyRating;