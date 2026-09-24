import React from 'react';

export const HolographicSphereGraphic: React.FC<{
  className?: string;
  size?: number;
  primaryColor?: string;
}> = ({
  className = "w-44 h-44 sm:w-52 sm:h-52",
  size,
  primaryColor = "#9333ea"
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 240 240"
        width={size || undefined}
        height={size || undefined}
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main sphere multi-stop iridescent gradient */}
          <radialGradient id="sphereMainGrad" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="15%" stopColor="#E9D8FD" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#C4B5FD" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#A78BFA" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#818CF8" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.7" />
          </radialGradient>

          {/* Mint/Cyan subsurface iridescent sheen */}
          <radialGradient id="cyanSheen" cx="72%" cy="65%" r="55%">
            <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#93C5FD" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
          </radialGradient>

          {/* Core specular highlight reflection */}
          <radialGradient id="specularGlow" cx="32%" cy="28%" r="35%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="45%" stopColor="#F5F3FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* Soft ambient drop shadow under sphere */}
          <radialGradient id="sphereShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#9333EA" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>

          {/* Orbit Ring Gradient */}
          <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#E9D5FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="orbitGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#DDD6FE" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Ambient Back Glow */}
        <circle cx="120" cy="115" r="75" fill={primaryColor} opacity="0.12" filter="blur(16px)" />

        {/* Soft Ground Shadow */}
        <ellipse cx="120" cy="195" rx="55" ry="12" fill="url(#sphereShadow)" />

        {/* Back Half of Orbit Ring 1 */}
        <g transform="rotate(-26 120 115)">
          <path
            d="M 28 115 A 92 28 0 0 1 212 115"
            stroke="url(#orbitGrad1)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 2"
            opacity="0.6"
          />
        </g>

        {/* Back Half of Orbit Ring 2 */}
        <g transform="rotate(32 120 115)">
          <path
            d="M 36 115 A 84 22 0 0 1 204 115"
            stroke="url(#orbitGrad2)"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* The Holographic Sphere */}
        <g id="main-sphere">
          {/* Base Sphere */}
          <circle cx="120" cy="115" r="54" fill="url(#sphereMainGrad)" />
          
          {/* Cyan/Mint Iridescent Edge Overlay */}
          <circle cx="120" cy="115" r="54" fill="url(#cyanSheen)" />

          {/* Inner Rim Light / Edge Glow */}
          <circle
            cx="120"
            cy="115"
            r="53"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeOpacity="0.65"
          />

          {/* Pearlescent Core Specular Highlight */}
          <ellipse cx="106" cy="98" rx="20" ry="14" fill="url(#specularGlow)" transform="rotate(-18 106 98)" />

          {/* Secondary micro highlight */}
          <circle cx="132" cy="138" r="4" fill="#FFFFFF" opacity="0.45" />
        </g>

        {/* Front Half of Orbit Ring 1 (layered on top for true 3D orbital overlap) */}
        <g transform="rotate(-26 120 115)">
          <path
            d="M 212 115 A 92 28 0 0 1 28 115"
            stroke="url(#orbitGrad1)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Orbiting small pearl bead */}
          <circle cx="196" cy="120" r="3.5" fill="#FFFFFF" stroke="#A78BFA" strokeWidth="1.2" />
        </g>

        {/* Front Half of Orbit Ring 2 */}
        <g transform="rotate(32 120 115)">
          <path
            d="M 204 115 A 84 22 0 0 1 36 115"
            stroke="url(#orbitGrad2)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Second orbiting pearl bead */}
          <circle cx="48" cy="112" r="3" fill="#FFFFFF" stroke="#6EE7B7" strokeWidth="1.2" />
        </g>

        {/* Small floating holographic sparkle stars */}
        <g opacity="0.8">
          <circle cx="56" cy="62" r="1.8" fill="#C4B5FD" />
          <circle cx="188" cy="54" r="2.2" fill="#E9D5FF" />
          <circle cx="178" cy="168" r="1.6" fill="#93C5FD" />
        </g>
      </svg>
    </div>
  );
};
