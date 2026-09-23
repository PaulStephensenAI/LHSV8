import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
  dark?: boolean;
}

/**
 * Official Lavender Hill Studio Logo (Primary Canonical Brand Mark)
 * Faithfully matches the official insignia: 
 * Three blooming purple lavender sprigs rising from a golden hill mound, 
 * with the signature cursive calligraphy "Lavender Hill Studio".
 */
export const OfficialLavenderHillLogo: React.FC<LogoProps> = ({ 
  className = "w-auto h-16", 
  size,
  showText = true,
  textColor,
  dark = false
}) => {
  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 240 160" 
        width={size ? size * 1.5 : undefined} 
        height={size || undefined} 
        className="w-full h-auto max-h-full" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Lavender Hill Studio Official Logo"
      >
        <defs>
          {/* Golden Hill Radial & Linear Gradients */}
          <linearGradient id="goldenHillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2B768" />
            <stop offset="35%" stopColor="#C99846" />
            <stop offset="70%" stopColor="#B68230" />
            <stop offset="100%" stopColor="#9E6D24" />
          </linearGradient>

          <radialGradient id="hillShine" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#F9DF9C" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#D4A34D" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#B27E2B" stopOpacity="0" />
          </radialGradient>

          {/* Lavender Florets Gradients */}
          <linearGradient id="lavenderTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B39DDB" />
            <stop offset="50%" stopColor="#7E57C2" />
            <stop offset="100%" stopColor="#512DA8" />
          </linearGradient>

          {/* Stem & Leaf Gradients */}
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4D6E44" />
            <stop offset="50%" stopColor="#628956" />
            <stop offset="100%" stopColor="#3E5C36" />
          </linearGradient>
        </defs>

        {/* 1. Golden Hill Mound Base */}
        <g id="golden-hill">
          <path 
            d="M 36 108 C 65 92 175 92 204 108 C 175 124 65 124 36 108 Z" 
            fill="url(#goldenHillGrad)" 
          />
          <path 
            d="M 38 108 C 65 93 175 93 202 108 C 170 120 70 120 38 108 Z" 
            fill="url(#hillShine)" 
          />
        </g>

        {/* 2. Plant Stems & Foliage Leaves */}
        <g id="stems-and-leaves">
          <path 
            d="M 120 120 L 120 42" 
            stroke="url(#stemGrad)" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
          />
          <path 
            d="M 115 119 C 110 105 102 85 96 52" 
            stroke="url(#stemGrad)" 
            strokeWidth="2.8" 
            strokeLinecap="round" 
          />
          <path 
            d="M 125 119 C 130 105 138 85 144 52" 
            stroke="url(#stemGrad)" 
            strokeWidth="2.8" 
            strokeLinecap="round" 
          />

          {/* Leaves */}
          <path d="M 108 118 C 96 112 90 98 88 88 C 92 94 100 106 108 114 Z" fill="#55774C" />
          <path d="M 112 110 C 104 100 100 88 100 80 C 104 88 108 98 113 106 Z" fill="#668C5B" />
          <path d="M 114 96 C 108 86 105 76 104 70 C 108 77 112 85 115 92 Z" fill="#55774C" />

          <path d="M 132 118 C 144 112 150 98 152 88 C 148 94 140 106 132 114 Z" fill="#55774C" />
          <path d="M 128 110 C 136 100 140 88 140 80 C 136 88 132 98 127 106 Z" fill="#668C5B" />
          <path d="M 126 96 C 132 86 135 76 136 70 C 132 77 128 85 125 92 Z" fill="#55774C" />

          <path d="M 119 112 C 114 100 112 86 113 78 C 116 86 118 98 120 108 Z" fill="#668C5B" />
          <path d="M 121 112 C 126 100 128 86 127 78 C 124 86 122 98 120 108 Z" fill="#55774C" />
        </g>

        {/* 3. Center Tall Lavender Sprig */}
        <g id="center-sprig">
          <ellipse cx="120" cy="18" rx="3.5" ry="5.5" fill="#7E57C2" />
          <ellipse cx="118" cy="22" rx="3" ry="5" fill="#9575CD" />
          <ellipse cx="122" cy="22" rx="3" ry="5" fill="#673AB7" />
          <ellipse cx="120" cy="25" rx="3.8" ry="5.5" fill="#5E35B1" />

          <ellipse cx="115" cy="29" rx="4.2" ry="5.5" fill="#7E57C2" transform="rotate(-15 115 29)" />
          <ellipse cx="125" cy="29" rx="4.2" ry="5.5" fill="#7E57C2" transform="rotate(15 125 29)" />
          <ellipse cx="120" cy="30" rx="4.5" ry="5.8" fill="#512DA8" />

          <ellipse cx="113" cy="36" rx="4.8" ry="6" fill="#9575CD" transform="rotate(-25 113 36)" />
          <ellipse cx="127" cy="36" rx="4.8" ry="6" fill="#673AB7" transform="rotate(25 127 36)" />
          <ellipse cx="120" cy="37" rx="5.2" ry="6.2" fill="#5E35B1" />
          <ellipse cx="117" cy="38" rx="3.2" ry="4.5" fill="#B39DDB" />
          <ellipse cx="123" cy="38" rx="3.2" ry="4.5" fill="#7E57C2" />

          <ellipse cx="112" cy="44" rx="5.2" ry="6.5" fill="#7E57C2" transform="rotate(-28 112 44)" />
          <ellipse cx="128" cy="44" rx="5.2" ry="6.5" fill="#512DA8" transform="rotate(28 128 44)" />
          <ellipse cx="120" cy="45" rx="5.8" ry="6.5" fill="#673AB7" />
          <circle cx="120" cy="45" r="1.8" fill="#FFFFFF" opacity="0.85" />

          <ellipse cx="111" cy="53" rx="5.5" ry="6.8" fill="#9575CD" transform="rotate(-30 111 53)" />
          <ellipse cx="129" cy="53" rx="5.5" ry="6.8" fill="#5E35B1" transform="rotate(30 129 53)" />
          <ellipse cx="120" cy="54" rx="6" ry="6.8" fill="#512DA8" />

          <ellipse cx="111" cy="62" rx="5.2" ry="6.5" fill="#7E57C2" transform="rotate(-25 111 62)" />
          <ellipse cx="129" cy="62" rx="5.2" ry="6.5" fill="#4527A0" transform="rotate(25 129 62)" />
          <ellipse cx="120" cy="63" rx="5.8" ry="6.5" fill="#5E35B1" />
        </g>

        {/* 4. Left Lavender Sprig */}
        <g id="left-sprig">
          <ellipse cx="94" cy="32" rx="3.2" ry="5" fill="#7E57C2" transform="rotate(-15 94 32)" />
          <ellipse cx="91" cy="36" rx="3.5" ry="5.2" fill="#9575CD" transform="rotate(-20 91 36)" />
          <ellipse cx="97" cy="36" rx="3.5" ry="5.2" fill="#5E35B1" transform="rotate(-10 97 36)" />

          <ellipse cx="88" cy="42" rx="4.5" ry="5.8" fill="#7E57C2" transform="rotate(-30 88 42)" />
          <ellipse cx="99" cy="42" rx="4.5" ry="5.8" fill="#512DA8" transform="rotate(0 99 42)" />
          <ellipse cx="93" cy="44" rx="4.8" ry="6" fill="#673AB7" transform="rotate(-15 93 44)" />

          <ellipse cx="86" cy="50" rx="4.8" ry="6.2" fill="#9575CD" transform="rotate(-35 86 50)" />
          <ellipse cx="101" cy="50" rx="4.8" ry="6.2" fill="#4527A0" transform="rotate(-5 101 50)" />
          <ellipse cx="93" cy="52" rx="5.2" ry="6.4" fill="#5E35B1" transform="rotate(-15 93 52)" />

          <ellipse cx="86" cy="59" rx="5" ry="6.4" fill="#7E57C2" transform="rotate(-35 86 59)" />
          <ellipse cx="102" cy="59" rx="5" ry="6.4" fill="#512DA8" transform="rotate(-5 102 59)" />
          <ellipse cx="94" cy="61" rx="5.5" ry="6.6" fill="#673AB7" transform="rotate(-15 94 61)" />

          <ellipse cx="88" cy="68" rx="4.8" ry="6" fill="#9575CD" transform="rotate(-30 88 68)" />
          <ellipse cx="103" cy="68" rx="4.8" ry="6" fill="#4527A0" transform="rotate(-10 103 68)" />
          <ellipse cx="95" cy="70" rx="5.2" ry="6.2" fill="#5E35B1" transform="rotate(-15 95 70)" />
        </g>

        {/* 5. Right Lavender Sprig */}
        <g id="right-sprig">
          <ellipse cx="146" cy="32" rx="3.2" ry="5" fill="#7E57C2" transform="rotate(15 146 32)" />
          <ellipse cx="143" cy="36" rx="3.5" ry="5.2" fill="#9575CD" transform="rotate(10 143 36)" />
          <ellipse cx="149" cy="36" rx="3.5" ry="5.2" fill="#5E35B1" transform="rotate(20 149 36)" />

          <ellipse cx="141" cy="42" rx="4.5" ry="5.8" fill="#512DA8" transform="rotate(0 141 42)" />
          <ellipse cx="152" cy="42" rx="4.5" ry="5.8" fill="#7E57C2" transform="rotate(30 152 42)" />
          <ellipse cx="147" cy="44" rx="4.8" ry="6" fill="#673AB7" transform="rotate(15 147 44)" />

          <ellipse cx="139" cy="50" rx="4.8" ry="6.2" fill="#4527A0" transform="rotate(5 139 50)" />
          <ellipse cx="154" cy="50" rx="4.8" ry="6.2" fill="#9575CD" transform="rotate(35 154 50)" />
          <ellipse cx="147" cy="52" rx="5.2" ry="6.4" fill="#5E35B1" transform="rotate(15 147 52)" />

          <ellipse cx="138" cy="59" rx="5" ry="6.4" fill="#512DA8" transform="rotate(5 138 59)" />
          <ellipse cx="154" cy="59" rx="5" ry="6.4" fill="#7E57C2" transform="rotate(35 154 59)" />
          <ellipse cx="146" cy="61" rx="5.5" ry="6.6" fill="#673AB7" transform="rotate(15 146 61)" />

          <ellipse cx="137" cy="68" rx="4.8" ry="6" fill="#4527A0" transform="rotate(10 137 68)" />
          <ellipse cx="152" cy="68" rx="4.8" ry="6.2" fill="#9575CD" transform="rotate(30 152 68)" />
          <ellipse cx="145" cy="70" rx="5.2" ry="6.2" fill="#5E35B1" transform="rotate(15 145 70)" />
        </g>

        {/* 6. Signature Cursive Calligraphy "Lavender Hill Studio" */}
        {showText && (
          <text 
            x="120" 
            y="148" 
            textAnchor="middle" 
            fontFamily="'Great Vibes', 'Alex Brush', cursive" 
            fontSize="26" 
            fontWeight="500"
            fill={textColor || (dark ? "#E9D5FF" : "#4A2060")}
            letterSpacing="0.5"
          >
            Lavender Hill Studio
          </text>
        )}
      </svg>
    </div>
  );
};

/**
 * Official Lavender Hill Studio Emblem Icon (Square / Round Avatar Mark)
 * Focuses on the iconic 3 lavender sprigs emerging from the golden hill.
 */
export const OfficialLavenderHillIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 48,
  className = "w-12 h-12"
}) => {
  return (
    <svg 
      viewBox="0 0 160 130" 
      width={size} 
      height={size} 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Lavender Hill Studio Official Emblem"
    >
      <defs>
        <linearGradient id="iconGoldenHill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2B768" />
          <stop offset="40%" stopColor="#C99846" />
          <stop offset="80%" stopColor="#B68230" />
          <stop offset="100%" stopColor="#9E6D24" />
        </linearGradient>
        <radialGradient id="iconHillShine" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#F9DF9C" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#B27E2B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="iconStem" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4D6E44" />
          <stop offset="100%" stopColor="#3E5C36" />
        </linearGradient>
      </defs>

      {/* Golden Hill Base */}
      <path 
        d="M 16 98 C 42 84 118 84 144 98 C 118 112 42 112 16 98 Z" 
        fill="url(#iconGoldenHill)" 
      />
      <path 
        d="M 18 98 C 42 85 118 85 142 98 C 115 109 45 109 18 98 Z" 
        fill="url(#iconHillShine)" 
      />

      {/* Stems */}
      <path d="M 80 108 L 80 34" stroke="url(#iconStem)" strokeWidth="3" strokeLinecap="round" />
      <path d="M 75 107 C 71 94 64 76 59 44" stroke="url(#iconStem)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 85 107 C 89 94 96 76 101 44" stroke="url(#iconStem)" strokeWidth="2.5" strokeLinecap="round" />

      {/* Leaves */}
      <path d="M 69 105 C 59 99 54 87 52 78 C 56 83 63 94 69 101 Z" fill="#55774C" />
      <path d="M 91 105 C 101 99 106 87 108 78 C 104 83 97 94 91 101 Z" fill="#55774C" />

      {/* Center Tall Sprig */}
      <ellipse cx="80" cy="12" rx="3.2" ry="5" fill="#7E57C2" />
      <ellipse cx="78" cy="16" rx="2.8" ry="4.5" fill="#9575CD" />
      <ellipse cx="82" cy="16" rx="2.8" ry="4.5" fill="#673AB7" />
      <ellipse cx="80" cy="19" rx="3.5" ry="5" fill="#5E35B1" />

      <ellipse cx="75" cy="24" rx="4" ry="5.2" fill="#7E57C2" transform="rotate(-15 75 24)" />
      <ellipse cx="85" cy="24" rx="4" ry="5.2" fill="#7E57C2" transform="rotate(15 85 24)" />
      <ellipse cx="80" cy="25" rx="4.2" ry="5.5" fill="#512DA8" />

      <ellipse cx="73" cy="31" rx="4.5" ry="5.8" fill="#9575CD" transform="rotate(-25 73 31)" />
      <ellipse cx="87" cy="31" rx="4.5" ry="5.8" fill="#673AB7" transform="rotate(25 87 31)" />
      <ellipse cx="80" cy="32" rx="4.8" ry="5.8" fill="#5E35B1" />
      <ellipse cx="77" cy="33" rx="2.8" ry="4" fill="#B39DDB" />
      <ellipse cx="83" cy="33" rx="2.8" ry="4.5" fill="#7E57C2" />

      <ellipse cx="72" cy="39" rx="5" ry="6.2" fill="#7E57C2" transform="rotate(-28 72 39)" />
      <ellipse cx="88" cy="39" rx="5" ry="6.2" fill="#512DA8" transform="rotate(28 88 39)" />
      <ellipse cx="80" cy="40" rx="5.5" ry="6.2" fill="#673AB7" />
      <circle cx="80" cy="40" r="1.5" fill="#FFFFFF" opacity="0.8" />

      <ellipse cx="71" cy="48" rx="5.2" ry="6.5" fill="#9575CD" transform="rotate(-30 71 48)" />
      <ellipse cx="89" cy="48" rx="5.2" ry="6.5" fill="#5E35B1" transform="rotate(30 89 48)" />
      <ellipse cx="80" cy="49" rx="5.8" ry="6.5" fill="#512DA8" />

      {/* Left Sprig */}
      <ellipse cx="57" cy="26" rx="3" ry="4.5" fill="#7E57C2" transform="rotate(-15 57 26)" />
      <ellipse cx="51" cy="34" rx="4" ry="5.2" fill="#7E57C2" transform="rotate(-30 51 34)" />
      <ellipse cx="62" cy="34" rx="4" ry="5.2" fill="#512DA8" transform="rotate(0 62 34)" />
      <ellipse cx="56" cy="36" rx="4.5" ry="5.5" fill="#673AB7" transform="rotate(-15 56 36)" />

      <ellipse cx="49" cy="43" rx="4.5" ry="5.8" fill="#9575CD" transform="rotate(-35 49 43)" />
      <ellipse cx="64" cy="43" rx="4.5" ry="5.8" fill="#4527A0" transform="rotate(-5 64 43)" />
      <ellipse cx="56" cy="45" rx="5" ry="6" fill="#5E35B1" transform="rotate(-15 56 45)" />

      <ellipse cx="50" cy="52" rx="4.8" ry="6" fill="#7E57C2" transform="rotate(-35 50 52)" />
      <ellipse cx="65" cy="52" rx="4.8" ry="6" fill="#512DA8" transform="rotate(-5 65 52)" />
      <ellipse cx="57" cy="54" rx="5.2" ry="6.2" fill="#673AB7" transform="rotate(-15 57 54)" />

      {/* Right Sprig */}
      <ellipse cx="103" cy="26" rx="3" ry="4.5" fill="#7E57C2" transform="rotate(15 103 26)" />
      <ellipse cx="98" cy="34" rx="4" ry="5.2" fill="#512DA8" transform="rotate(0 98 34)" />
      <ellipse cx="109" cy="34" rx="4.2" ry="5.2" fill="#7E57C2" transform="rotate(30 109 34)" />
      <ellipse cx="104" cy="36" rx="4.5" ry="5.5" fill="#673AB7" transform="rotate(15 104 36)" />

      <ellipse cx="96" cy="43" rx="4.5" ry="5.8" fill="#4527A0" transform="rotate(5 96 43)" />
      <ellipse cx="111" cy="43" rx="4.5" ry="5.8" fill="#9575CD" transform="rotate(35 111 43)" />
      <ellipse cx="104" cy="45" rx="5" ry="6" fill="#5E35B1" transform="rotate(15 104 45)" />

      <ellipse cx="95" cy="52" rx="4.8" ry="6" fill="#512DA8" transform="rotate(5 95 52)" />
      <ellipse cx="110" cy="52" rx="4.8" ry="6" fill="#7E57C2" transform="rotate(35 110 52)" />
      <ellipse cx="103" cy="54" rx="5.2" ry="6.2" fill="#673AB7" transform="rotate(15 103 54)" />
    </svg>
  );
};

/**
 * Brand Logo 1: The Biomorphic Data Stem (Exploratory Concept)
 * Merges organic biology with artificial intelligence: A stylized, minimalist lavender stem
 * whose buds organically transition into interconnected geometric data nodes.
 */
export const BiomorphicDataStemLogo: React.FC<LogoProps> = ({ 
  className = "w-10 h-10", 
  size = 48 
}) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      width={size} 
      height={size} 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Lavender Hill Studio Biomorphic Data Stem Logo"
    >
      {/* Central Organic Plant Stems in Sage Green */}
      <path 
        d="M50 92 C50 68 49 45 49 22" 
        stroke="#3B4A3F" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M50 72 C42 60 36 46 32 30" 
        stroke="#3B4A3F" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M50 66 C58 55 64 44 68 30" 
        stroke="#3B4A3F" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />

      {/* Network Data Strands Linking Nodes */}
      <path 
        d="M32 30 L49 22 L68 30 M38 42 L49 35 L62 42 M49 22 L49 10" 
        stroke="#7B5C9E" 
        strokeWidth="1.5" 
        strokeDasharray="2 2" 
        opacity="0.8" 
      />

      {/* Lower Organic Buds (Soft Lavender Petals) */}
      <ellipse cx="40" cy="52" rx="4" ry="6.5" fill="#7B5C9E" opacity="0.9" />
      <ellipse cx="60" cy="52" rx="4" ry="6.5" fill="#7B5C9E" opacity="0.9" />
      <ellipse cx="49" cy="48" rx="4.5" ry="7" fill="#684A87" />

      {/* Middle Hybrid Transition Buds (Lavender with Gold Data Core) */}
      <ellipse cx="36" cy="38" rx="4" ry="6" fill="#8C6BAC" />
      <circle cx="36" cy="38" r="2" fill="#D4A373" />

      <ellipse cx="64" cy="38" rx="4" ry="6" fill="#8C6BAC" />
      <circle cx="64" cy="38" r="2" fill="#D4A373" />

      <ellipse cx="49" cy="34" rx="4.5" ry="6" fill="#8C6BAC" />
      <circle cx="49" cy="34" r="2.2" fill="#D4A373" />

      {/* Upper Geometric Data Nodes (Hexagons & Circles) */}
      {/* Top Node */}
      <circle cx="49" cy="10" r="5" fill="#234F56" stroke="#D4A373" strokeWidth="2" />
      <circle cx="49" cy="10" r="2" fill="#F5F2EB" />

      {/* Left Node */}
      <circle cx="32" cy="28" r="4.5" fill="#234F56" stroke="#7B5C9E" strokeWidth="1.8" />
      <circle cx="32" cy="28" r="1.8" fill="#F5F2EB" />

      {/* Right Node */}
      <circle cx="68" cy="28" r="4.5" fill="#234F56" stroke="#7B5C9E" strokeWidth="1.8" />
      <circle cx="68" cy="28" r="1.8" fill="#F5F2EB" />

      {/* Subtle Data Radiance */}
      <circle cx="49" cy="10" r="8" stroke="#D4A373" strokeWidth="0.8" opacity="0.5" strokeDasharray="1 2" />
    </svg>
  );
};

/**
 * Brand Logo 2: The Coastal Scallop Seal
 * Structured as a classic circular, scalloped wax-style seal portraying a serene coastal landscape
 * — rolling sand dunes, seaside flora, calm water, and a warm rising sun in deep ocean teals, blues, and sandy gold.
 */
export const CoastalScallopSealLogo: React.FC<LogoProps> = ({ 
  className = "w-10 h-10", 
  size = 48 
}) => {
  return (
    <svg 
      viewBox="0 0 120 120" 
      width={size} 
      height={size} 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Lavender Hill Studio Coastal Scallop Seal Emblem"
    >
      <defs>
        <radialGradient id="skyGrad" cx="60" cy="50" r="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="45%" stopColor="#F5F2EB" />
          <stop offset="100%" stopColor="#E0EDEE" />
        </radialGradient>
        <linearGradient id="oceanGrad" x1="60" y1="65" x2="60" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4A7C84" />
          <stop offset="100%" stopColor="#234F56" />
        </linearGradient>
        <linearGradient id="duneGrad" x1="30" y1="80" x2="90" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EED9B7" />
          <stop offset="100%" stopColor="#D4A373" />
        </linearGradient>
        <linearGradient id="rimGrad" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2C626A" />
          <stop offset="100%" stopColor="#1E3E42" />
        </linearGradient>
      </defs>

      {/* Scalloped Outer Seal Edge */}
      <circle cx="60" cy="60" r="56" fill="url(#rimGrad)" stroke="#4A7C84" strokeWidth="2.5" />

      {/* Decorative Scallop Dots Pattern around Ring */}
      {[...Array(16)].map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        const cx = 60 + 51 * Math.cos(rad);
        const cy = 60 + 51 * Math.sin(rad);
        return (
          <circle 
            key={i} 
            cx={cx} 
            cy={cy} 
            r="2.2" 
            fill="#D4A373" 
            stroke="#234F56" 
            strokeWidth="0.8" 
          />
        );
      })}

      {/* Inner Inscribed Ring */}
      <circle cx="60" cy="60" r="44" fill="url(#skyGrad)" stroke="#D0C8BC" strokeWidth="1.8" />

      {/* Clip Inner Scenery inside Circle */}
      <g clipPath="url(#sealClip)">
        <clipPath id="sealClip">
          <circle cx="60" cy="60" r="43" />
        </clipPath>

        {/* Warm Rising Sun */}
        <circle cx="60" cy="50" r="16" fill="#F59E0B" opacity="0.95" />
        <circle cx="60" cy="50" r="22" stroke="#FDE68A" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />

        {/* Sun Rays */}
        <line x1="60" y1="24" x2="60" y2="29" stroke="#D4A373" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="42" y1="32" x2="46" y2="36" stroke="#D4A373" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="78" y1="32" x2="74" y2="36" stroke="#D4A373" strokeWidth="1.5" strokeLinecap="round" />

        {/* Calm Coastal Water / Ocean Waves */}
        <path 
          d="M15 68 C30 65 45 71 60 67 C75 63 90 69 105 66 L105 105 L15 105 Z" 
          fill="url(#oceanGrad)" 
        />
        <path 
          d="M15 72 C35 69 50 74 65 71 C80 68 95 73 105 70" 
          stroke="#A7D2D8" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          opacity="0.8" 
        />

        {/* Rolling Sand Dunes */}
        <path 
          d="M15 82 C35 77 55 86 75 80 C90 75 100 82 105 84 L105 105 L15 105 Z" 
          fill="url(#duneGrad)" 
        />
        <path 
          d="M50 88 C70 82 88 89 105 85 L105 105 L50 105 Z" 
          fill="#C89260" 
          opacity="0.7" 
        />

        {/* Seaside Flora / Lavender Coastal Grass */}
        <path d="M28 88 C26 78 24 70 23 62" stroke="#3B4A3F" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M33 88 C34 76 36 68 37 60" stroke="#3B4A3F" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M30 88 C30 75 29 65 28 58" stroke="#3B4A3F" strokeWidth="1.5" strokeLinecap="round" />

        {/* Lavender Flower Sprig on Coast */}
        <ellipse cx="23" cy="60" rx="2" ry="3.5" fill="#7B5C9E" />
        <ellipse cx="23" cy="67" rx="2.2" ry="3.5" fill="#7B5C9E" />
        <ellipse cx="37" cy="58" rx="2" ry="3.5" fill="#7B5C9E" />
        <ellipse cx="37" cy="65" rx="2.2" ry="3.5" fill="#7B5C9E" />
        <ellipse cx="28" cy="56" rx="2" ry="3" fill="#D4A373" />
      </g>

      {/* Studio Banner Arc Text Overlay */}
      <path id="textArc" d="M 24 60 A 36 36 0 0 1 96 60" fill="none" />
      <text fill="#234F56" fontSize="7.5" fontWeight="bold" letterSpacing="2.5" fontFamily="'Cinzel', serif">
        <textPath href="#textArc" startOffset="50%" textAnchor="middle">
          LAVENDER HILL
        </textPath>
      </text>
    </svg>
  );
};
