import React from 'react';

interface SimpleProgressBarProps {
  current: number;
  total: number;
}

const SimpleProgressBar: React.FC<SimpleProgressBarProps> = ({ current, total }) => {
  const percent = (current / total) * 100;

  return (
    <div className="mb-8 mt-4 w-full max-w-[500px] px-4 mx-auto">
      <div className="text-left text-sm font-medium text-gray-800 mb-1">
        Step {current} of {total}
      </div>
      <div className="h-2 rounded-full bg-gray-200 w-full">
        <div
          className="h-2 rounded-full bg-teal-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default SimpleProgressBar;
