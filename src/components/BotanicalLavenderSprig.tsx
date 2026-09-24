import React from 'react';

export const BotanicalLavenderSprig: React.FC<{
  className?: string;
  size?: number;
}> = ({
  className = "w-28 h-40",
  size
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 120 180"
        width={size || undefined}
        height={size || undefined}
        className="w-full h-full opacity-90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="botanicalStemGrad" x1="0%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#4A6546" />
            <stop offset="50%" stopColor="#688A62" />
            <stop offset="100%" stopColor="#55754E" />
          </linearGradient>

          <linearGradient id="botanicalFlowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>

        {/* Delicate curving stem */}
        <path
          d="M 28 172 Q 46 120 62 60 Q 72 30 76 14"
          stroke="url(#botanicalStemGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Secondary gentle stem */}
        <path
          d="M 44 126 Q 30 96 24 68"
          stroke="url(#botanicalStemGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Side leaf sprigs */}
        <path d="M 38 138 C 22 134 16 122 14 114 C 20 118 30 126 38 134 Z" fill="#688A62" />
        <path d="M 46 120 C 58 116 66 106 70 96 C 64 102 54 112 46 118 Z" fill="#55754E" />
        <path d="M 54 88 C 42 82 36 72 34 62 C 40 68 48 78 54 84 Z" fill="#688A62" />
        <path d="M 60 70 C 72 64 78 54 80 44 C 74 50 66 60 60 66 Z" fill="#55754E" />

        {/* Left florets cluster (secondary stem) */}
        <g fill="url(#botanicalFlowerGrad)">
          <ellipse cx="23" cy="66" rx="4" ry="5.5" transform="rotate(-15 23 66)" />
          <ellipse cx="26" cy="58" rx="4" ry="5.5" transform="rotate(10 26 58)" />
          <ellipse cx="22" cy="52" rx="3.5" ry="5" transform="rotate(-20 22 52)" />
          <ellipse cx="25" cy="46" rx="3.2" ry="4.5" transform="rotate(15 25 46)" />
          <ellipse cx="23" cy="40" rx="2.8" ry="4" transform="rotate(-5 23 40)" />
        </g>

        {/* Main central flower spike florets */}
        <g fill="url(#botanicalFlowerGrad)">
          {/* Lower tier */}
          <ellipse cx="64" cy="56" rx="4.5" ry="6.2" transform="rotate(-25 64 56)" />
          <ellipse cx="73" cy="54" rx="4.5" ry="6.2" transform="rotate(25 73 54)" />
          <ellipse cx="68" cy="52" rx="4.8" ry="6.4" transform="rotate(0 68 52)" />

          {/* Mid tier */}
          <ellipse cx="67" cy="42" rx="4.2" ry="6" transform="rotate(-20 67 42)" />
          <ellipse cx="75" cy="40" rx="4.2" ry="6" transform="rotate(20 75 40)" />
          <ellipse cx="71" cy="38" rx="4.5" ry="6" transform="rotate(0 71 38)" />

          {/* Upper tier */}
          <ellipse cx="71" cy="28" rx="3.8" ry="5.5" transform="rotate(-15 71 28)" />
          <ellipse cx="77" cy="26" rx="3.8" ry="5.5" transform="rotate(15 77 26)" />
          <ellipse cx="74" cy="24" rx="4" ry="5.5" transform="rotate(0 74 24)" />

          {/* Top bud tip */}
          <ellipse cx="75" cy="16" rx="3.2" ry="4.8" transform="rotate(-5 75 16)" />
          <ellipse cx="76" cy="11" rx="2.5" ry="4" transform="rotate(0 76 11)" />
        </g>
      </svg>
    </div>
  );
};
