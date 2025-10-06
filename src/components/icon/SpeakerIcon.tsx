interface SpeakerIconProps {
  size?: number;
}

const SpeakerIcon = ({ size = 64 }: SpeakerIconProps) => {
  return (
    <div className="w-full h-full bg-pink-50 rounded-xl border-2 border-pink-200 flex items-center justify-center">
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100"
      >
        {/* Speaker body */}
        <rect 
          x="20" 
          y="35" 
          width="25" 
          height="30" 
          fill="#ec4899" 
          rx="3"
        />
        {/* Speaker cone */}
        <path 
          d="M 45 35 L 65 25 L 65 75 L 45 65 Z" 
          fill="#ec4899"
        />
        {/* Sound waves */}
        <path 
          d="M 70 40 Q 75 50 70 60" 
          stroke="#ec4899" 
          strokeWidth="3" 
          fill="none"
          strokeLinecap="round"
        />
        <path 
          d="M 75 35 Q 82 50 75 65" 
          stroke="#ec4899" 
          strokeWidth="3" 
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default SpeakerIcon;