import React, { useState, useEffect } from 'react';
import { ShieldCheck, Camera } from 'lucide-react';

interface PaulStephensenPhotoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'rounded' | 'circle';
  allowUpload?: boolean;
  showBadge?: boolean;
  onClick?: () => void;
  onUploadClick?: () => void;
}

const STORAGE_KEYS = ['lavender_founder_photo_url', 'lhs_founder_photo_v2'];

export const PaulStephensenPhoto: React.FC<PaulStephensenPhotoProps> = ({
  className = '',
  size = 'md',
  shape = 'rounded',
  allowUpload = false,
  showBadge = false,
  onClick,
  onUploadClick
}) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>('/paul-stephensen.jpg');

  useEffect(() => {
    // 1. Check bundled static portrait file first (guaranteed permanent on Vercel/Cloud Run production)
    const checkPortraitSource = async () => {
      const candidates = [
        '/paul-stephensen.jpg',
        '/founder-paul-stephensen.jpg',
        '/author_paul_stephensen.jpg'
      ];

      for (const candidate of candidates) {
        try {
          const res = await fetch(candidate, { method: 'HEAD' });
          if (res.ok && res.status === 200) {
            setPhotoUrl(candidate);
            return true;
          }
        } catch {
          // ignore
        }
      }

      // 2. Check dynamic server-hosted portrait endpoint
      try {
        const res = await fetch('/api/author/photo', { method: 'HEAD' });
        if (res.ok) {
          setPhotoUrl('/api/author/photo');
          return true;
        }
      } catch {
        // ignore
      }
      return false;
    };

    checkPortraitSource().then((hasPhoto) => {
      if (!hasPhoto) {
        // 3. Fall back to local storage if user saved it in their current browser
        try {
          for (const key of STORAGE_KEYS) {
            const saved = localStorage.getItem(key);
            if (saved) {
              setPhotoUrl(saved);
              break;
            }
          }
        } catch {
          // ignore
        }
      }
    });
  }, []);

  // Listen for storage events across components
  useEffect(() => {
    const handleStorage = () => {
      try {
        for (const key of STORAGE_KEYS) {
          const saved = localStorage.getItem(key);
          if (saved) {
            setPhotoUrl(saved);
            return;
          }
        }
        setPhotoUrl(null);
      } catch {
        // ignore
      }
    };

    const handleCustomPhotoUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string | null>;
      setPhotoUrl(customEvent.detail ?? null);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('lavender_photo_updated', handleCustomPhotoUpdate);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('lavender_photo_updated', handleCustomPhotoUpdate);
    };
  }, []);

  const sizeClasses = {
    sm: 'w-14 h-14',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-28 h-28 sm:w-32 sm:h-32',
    xl: 'w-36 h-36 sm:w-44 sm:h-44'
  };

  const radiusClass = shape === 'circle' ? 'rounded-full' : 'rounded-2xl sm:rounded-3xl';

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (allowUpload && onUploadClick) {
      onUploadClick();
    }
  };

  const isClickable = Boolean(onClick || (allowUpload && onUploadClick));

  return (
    <div 
      className={`relative group inline-flex items-center justify-center shrink-0 select-none ${sizeClasses[size]} ${isClickable ? 'cursor-pointer' : ''} ${className}`}
      onClick={handleClick}
    >
      {/* Ambient Backlight Halo */}
      <div className={`absolute inset-0 ${radiusClass} bg-gradient-to-tr from-purple-600/35 via-amber-500/20 to-cyan-500/25 blur-md pointer-events-none transition-all duration-300`} />

      {/* Frame Border */}
      <div 
        className={`relative w-full h-full ${radiusClass} p-[2px] bg-gradient-to-b from-stone-400/50 via-purple-500/40 to-stone-800/90 shadow-2xl overflow-hidden flex items-center justify-center`}
        title="Paul Stephensen - Founder & Principal Researcher (Verified Identity)"
      >
        {/* Inner Container */}
        <div className={`w-full h-full ${radiusClass} overflow-hidden relative bg-[#1c1a24] flex items-center justify-center`}>
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Paul Stephensen - Founder & Principal Researcher"
              className="w-full h-full object-cover object-[center_20%]"
              loading="eager"
              onError={() => {
                try {
                  for (const key of STORAGE_KEYS) {
                    localStorage.removeItem(key);
                  }
                } catch {
                  // ignore
                }
                setPhotoUrl(null);
              }}
            />
          ) : (
              /* High-Fidelity Vector Photographic Rendering of Paul Stephensen */
              <svg
              viewBox="0 0 500 500"
              className="w-full h-full object-cover"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Photographic Depth Gradient */}
                <radialGradient id="psPhotoBg" cx="35%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="#4E443C" />
                  <stop offset="40%" stopColor="#30292B" />
                  <stop offset="80%" stopColor="#1C1820" />
                  <stop offset="100%" stopColor="#100E14" />
                </radialGradient>

                {/* Bokeh Pendant Glow */}
                <radialGradient id="psBokeh" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF4B8" stopOpacity="0.95" />
                  <stop offset="35%" stopColor="#FFA63E" stopOpacity="0.7" />
                  <stop offset="75%" stopColor="#E67E22" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#E67E22" stopOpacity="0.0" />
                </radialGradient>

                {/* Skin Shading Gradients */}
                <linearGradient id="psSkin" x1="20%" y1="10%" x2="80%" y2="90%">
                  <stop offset="0%" stopColor="#FBDBC0" />
                  <stop offset="35%" stopColor="#ECC4A2" />
                  <stop offset="70%" stopColor="#D89C76" />
                  <stop offset="100%" stopColor="#C07750" />
                </linearGradient>

                <linearGradient id="psForeheadGlow" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2E6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ECC4A2" stopOpacity="0.0" />
                </linearGradient>

                {/* Shirt Fabric Gradients (Crisp Sky Blue) */}
                <linearGradient id="psShirt" x1="10%" y1="0%" x2="90%" y2="100%">
                  <stop offset="0%" stopColor="#BCE0F8" />
                  <stop offset="30%" stopColor="#9BCDF2" />
                  <stop offset="70%" stopColor="#78B9E6" />
                  <stop offset="100%" stopColor="#589BCA" />
                </linearGradient>

                <linearGradient id="psLensReflect" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
                  <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#9BD0F5" stopOpacity="0.12" />
                </linearGradient>
              </defs>

              {/* Background */}
              <rect width="500" height="500" fill="url(#psPhotoBg)" />

              {/* Studio Ceiling Beam */}
              <rect x="0" y="22" width="500" height="26" fill="#141218" opacity="0.85" />
              <line x1="0" y1="48" x2="500" y2="48" stroke="#38303B" strokeWidth="2" opacity="0.4" />

              {/* Bokeh Warm Pendant Light (Upper Left) */}
              <line x1="110" y1="0" x2="110" y2="95" stroke="#1D1A22" strokeWidth="3" />
              <circle cx="110" cy="115" r="48" fill="url(#psBokeh)" />
              <path d="M 98 102 Q 110 92 122 102 L 126 110 Q 110 114 94 110 Z" fill="#242022" />
              <ellipse cx="110" cy="115" rx="10" ry="7" fill="#FFFDF0" />

              {/* Shelving with decorative items (Upper Right) */}
              <rect x="335" y="60" width="165" height="115" rx="4" fill="#231E24" opacity="0.65" stroke="#38303B" strokeWidth="2" />
              <line x1="335" y1="115" x2="500" y2="115" stroke="#443A48" strokeWidth="3" />
              <rect x="350" y="72" width="28" height="42" rx="2" fill="#645548" opacity="0.55" />
              <rect x="384" y="78" width="22" height="36" rx="2" fill="#88705C" opacity="0.65" />
              <circle cx="430" cy="94" r="14" fill="#CFA06A" opacity="0.45" />

              {/* Sofa / Lounge Backrest */}
              <path d="M 0 375 Q 250 355 500 375 L 500 500 L 0 500 Z" fill="#221F27" opacity="0.75" />

              {/* TORSO & LIGHT BLUE BUTTON-UP SHIRT */}
              <g id="ps-torso-shirt">
                <path
                  d="M 5 500 L 15 415 C 35 335 100 290 180 268 L 250 292 L 320 268 C 400 290 465 335 485 415 L 495 500 Z"
                  fill="url(#psShirt)"
                />

                {/* Natural Fabric Folds */}
                <path d="M 95 335 C 135 370 155 405 165 500" stroke="#5697C5" strokeWidth="4" fill="none" opacity="0.5" />
                <path d="M 405 335 C 365 370 345 405 335 500" stroke="#5697C5" strokeWidth="4" fill="none" opacity="0.5" />
                <path d="M 55 435 C 105 415 135 435 165 465" stroke="#5697C5" strokeWidth="3" fill="none" opacity="0.4" />
                <path d="M 445 435 C 395 415 365 435 335 465" stroke="#5697C5" strokeWidth="3" fill="none" opacity="0.4" />

                {/* Chest Pocket on Left Chest (Viewer's Right) */}
                <path
                  d="M 290 338 L 368 330 L 362 412 C 362 420 352 426 330 426 C 308 426 290 420 290 412 Z"
                  fill="#92C9F0"
                  stroke="#62A9D6"
                  strokeWidth="2"
                />
                <path d="M 290 338 L 368 330" stroke="#4890BF" strokeWidth="2.5" />

                {/* Center Button Placket */}
                <path d="M 235 292 L 235 500 L 265 500 L 265 292 Z" fill="#9FD4F6" />
                <line x1="235" y1="292" x2="235" y2="500" stroke="#68AEDB" strokeWidth="1.5" />
                <line x1="265" y1="292" x2="265" y2="500" stroke="#68AEDB" strokeWidth="1.5" />

                {/* Pearl White Buttons */}
                <circle cx="250" cy="322" r="5.5" fill="#FFFFFF" stroke="#8DC5EC" strokeWidth="2" />
                <circle cx="250" cy="322" r="2" fill="#BCE0F8" />
                <circle cx="250" cy="382" r="5.5" fill="#FFFFFF" stroke="#8DC5EC" strokeWidth="2" />
                <circle cx="250" cy="382" r="2" fill="#BCE0F8" />
                <circle cx="250" cy="458" r="5.5" fill="#FFFFFF" stroke="#8DC5EC" strokeWidth="2" />
                <circle cx="250" cy="458" r="2" fill="#BCE0F8" />

                {/* Open Collar Wings */}
                <path
                  d="M 180 268 L 250 302 L 225 238 L 175 248 Z"
                  fill="#B0E2FC"
                  stroke="#5C9BC6"
                  strokeWidth="2"
                />
                <path
                  d="M 320 268 L 250 302 L 275 238 L 325 248 Z"
                  fill="#B0E2FC"
                  stroke="#5C9BC6"
                  strokeWidth="2"
                />
              </g>

              {/* NECK */}
              <g id="ps-neck">
                <path d="M 205 208 L 205 282 Q 250 298 295 282 L 295 208 Z" fill="#D89C76" />
                <path d="M 205 212 Q 250 252 295 212 Q 250 266 205 212 Z" fill="#AF6842" opacity="0.6" />
              </g>

              {/* HEAD & FACIAL FEATURES */}
              <g id="ps-head">
                {/* Face Base */}
                <path
                  d="M 160 148 C 160 82 185 58 250 58 C 315 58 340 82 340 148 C 340 212 305 248 250 248 C 195 248 160 212 160 148 Z"
                  fill="url(#psSkin)"
                />

                {/* Forehead Glow */}
                <ellipse cx="250" cy="98" rx="55" ry="24" fill="url(#psForeheadGlow)" />

                {/* Cheek Warmth */}
                <circle cx="195" cy="172" r="28" fill="#E88864" opacity="0.25" />
                <circle cx="305" cy="172" r="28" fill="#E88864" opacity="0.25" />

                {/* Ears */}
                <path d="M 160 138 C 150 138 146 168 160 178 Z" fill="#D6946E" />
                <path d="M 340 138 C 350 138 354 168 340 178 Z" fill="#D6946E" />

                {/* Groomed Dark Hair */}
                <path
                  d="M 160 138 C 158 92 175 50 230 46 C 275 42 325 50 340 92 C 342 118 338 138 334 142 C 330 108 318 75 250 75 C 200 75 180 100 165 140 Z"
                  fill="#221A15"
                />
                <path
                  d="M 170 68 C 208 44 278 44 322 68 C 302 52 262 44 230 46 C 198 48 180 58 170 68 Z"
                  fill="#3A2D24"
                />

                {/* Eyebrows */}
                <path d="M 182 120 Q 206 114 226 121" stroke="#2B1E17" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M 274 121 Q 294 114 318 120" stroke="#2B1E17" strokeWidth="4.5" strokeLinecap="round" />

                {/* Eyes */}
                <ellipse cx="206" cy="134" rx="8" ry="6" fill="#382419" />
                <circle cx="209" cy="132" r="2.2" fill="#FFFFFF" />
                <path d="M 194 133 Q 206 126 218 133" stroke="#261810" strokeWidth="2" fill="none" />
                <path d="M 196 135 Q 206 140 216 135" stroke="#9A5D3E" strokeWidth="1.2" fill="none" />

                <ellipse cx="294" cy="134" rx="8" ry="6" fill="#382419" />
                <circle cx="297" cy="132" r="2.2" fill="#FFFFFF" />
                <path d="M 282 133 Q 294 126 306 133" stroke="#261810" strokeWidth="2" fill="none" />
                <path d="M 284 135 Q 294 140 304 135" stroke="#9A5D3E" strokeWidth="1.2" fill="none" />

                {/* Nose */}
                <path d="M 246 126 L 244 168 Q 250 174 256 168 L 254 126" stroke="#B46B44" strokeWidth="2" fill="none" />
                <path d="M 240 170 Q 250 176 260 170" stroke="#9A5532" strokeWidth="3" strokeLinecap="round" fill="none" />

                {/* Rectangular Eyeglasses */}
                <g id="ps-glasses">
                  <rect x="178" y="118" width="56" height="34" rx="7" fill="url(#psLensReflect)" stroke="#161210" strokeWidth="4.5" />
                  <rect x="266" y="118" width="56" height="34" rx="7" fill="url(#psLensReflect)" stroke="#161210" strokeWidth="4.5" />
                  <path d="M 234 128 Q 250 124 266 128" stroke="#161210" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  <path d="M 178 126 L 160 130" stroke="#161210" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 322 126 L 340 130" stroke="#161210" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 186 123 L 222 123" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
                  <path d="M 274 123 L 310 123" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
                </g>

                {/* Smile & Teeth */}
                <g id="ps-smile">
                  <path
                    d="M 218 198 Q 250 224 282 198"
                    fill="#752924"
                    stroke="#541B18"
                    strokeWidth="2"
                  />
                  <path
                    d="M 224 199 Q 250 209 276 199 Q 250 201 224 199 Z"
                    fill="#FFFFFF"
                  />
                  <path d="M 208 192 Q 212 200 216 208" stroke="#B46B44" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M 292 192 Q 288 200 284 208" stroke="#B46B44" strokeWidth="2" strokeLinecap="round" fill="none" />
                </g>

                {/* Chin */}
                <path d="M 240 234 Q 250 240 260 234" stroke="#B46B44" strokeWidth="2" strokeLinecap="round" fill="none" />
              </g>
            </svg>
          )}
          {allowUpload && onUploadClick && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onUploadClick();
              }}
              className="absolute inset-0 bg-stone-950/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer z-10 text-white"
              title="Click to upload or update Paul's photo"
            >
              <Camera className="w-5 h-5 text-purple-300 drop-shadow" />
              <span className="text-[10px] font-mono tracking-tight font-medium text-purple-100">Update Photo</span>
            </div>
          )}
        </div>
      </div>

      {/* Upload Photo Camera Badge on Top-Right */}
      {allowUpload && onUploadClick && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onUploadClick();
          }}
          className="absolute -top-1.5 -right-1.5 z-30 p-1.5 rounded-full bg-purple-700 hover:bg-purple-600 text-white border-2 border-[#171424] shadow-lg transition-transform hover:scale-110 cursor-pointer"
          title="Upload or change Paul's portrait photo"
          aria-label="Upload photo"
        >
          <Camera className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Verified Author Identity Shield Badge on Bottom-Right */}
      {showBadge && (
        <div
          className="absolute -bottom-1 -right-1 z-20 w-6 h-6 rounded-full bg-emerald-700 text-white border-2 border-[#171424] flex items-center justify-center shadow-md select-none"
          title="Paul Stephensen - Verified Author Identity"
          aria-label="Verified Author Identity"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-100" />
        </div>
      )}
    </div>
  );
};
