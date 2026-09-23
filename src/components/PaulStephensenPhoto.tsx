import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, RefreshCw, Check, AlertCircle } from 'lucide-react';

interface PaulStephensenPhotoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'rounded' | 'circle';
  allowUpload?: boolean;
  showBadge?: boolean;
}

const STORAGE_KEY = 'lavender_founder_photo_url';

export const PaulStephensenPhoto: React.FC<PaulStephensenPhotoProps> = ({
  className = '',
  size = 'md',
  shape = 'rounded',
  allowUpload = true,
  showBadge = true
}) => {
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCustomPhotoUrl(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const processAndSaveImage = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload an image file (PNG, JPG, WEBP).');
      setTimeout(() => setErrorMessage(null), 3500);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      if (!rawDataUrl) return;

      // Use an offscreen canvas to scale and optimize the image so it fits cleanly in localStorage
      const img = new Image();
      img.onload = () => {
        try {
          const maxDim = 640;
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
            setCustomPhotoUrl(optimizedDataUrl);
            localStorage.setItem(STORAGE_KEY, optimizedDataUrl);
            window.dispatchEvent(new Event('storage'));
            setShowSavedToast(true);
            setTimeout(() => setShowSavedToast(false), 2500);
          } else {
            // Fallback to raw data url
            setCustomPhotoUrl(rawDataUrl);
            localStorage.setItem(STORAGE_KEY, rawDataUrl);
            window.dispatchEvent(new Event('storage'));
            setShowSavedToast(true);
            setTimeout(() => setShowSavedToast(false), 2500);
          }
        } catch (err) {
          console.error('Failed to save compressed photo to localStorage:', err);
          setErrorMessage('Photo too large for local cache. Try a smaller file.');
          setTimeout(() => setErrorMessage(null), 3500);
        }
      };
      img.onerror = () => {
        setErrorMessage('Could not decode image.');
        setTimeout(() => setErrorMessage(null), 3500);
      };
      img.src = rawDataUrl;
    };
    reader.onerror = () => {
      setErrorMessage('Error reading uploaded file.');
      setTimeout(() => setErrorMessage(null), 3500);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndSaveImage(file);
    }
    // Reset file input value to allow re-uploading the same file if needed
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!allowUpload) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!allowUpload) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!allowUpload) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processAndSaveImage(file);
    }
  };

  // Listen for storage events across components
  useEffect(() => {
    const handleStorage = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        setCustomPhotoUrl(saved);
      } catch {
        // ignore
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomPhotoUrl(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('storage'));
    } catch {
      // ignore
    }
  };

  const sizeClasses = {
    sm: 'w-14 h-14',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-28 h-28 sm:w-32 sm:h-32',
    xl: 'w-36 h-36 sm:w-44 sm:h-44'
  };

  const radiusClass = shape === 'circle' ? 'rounded-full' : 'rounded-2xl sm:rounded-3xl';

  return (
    <div className={`relative group inline-flex items-center justify-center shrink-0 select-none ${sizeClasses[size]} ${className}`}>
      {/* Ambient Backlight Halo */}
      <div className={`absolute inset-0 ${radiusClass} ${isDragging ? 'bg-purple-500/60 scale-105' : 'bg-gradient-to-tr from-purple-600/35 via-amber-500/20 to-cyan-500/25'} blur-md pointer-events-none transition-all duration-300`} />

      {/* Frame Border with Drag-and-Drop Dropzone */}
      <div 
        role={allowUpload ? "button" : undefined}
        tabIndex={allowUpload ? 0 : undefined}
        className={`relative w-full h-full ${radiusClass} p-[2px] ${isDragging ? 'ring-2 ring-purple-400 bg-purple-600 shadow-purple-500/50 scale-102' : 'bg-gradient-to-b from-stone-400/50 via-purple-500/40 to-stone-800/90'} shadow-2xl overflow-hidden flex items-center justify-center transition-all ${allowUpload ? 'cursor-pointer hover:border-purple-400 focus:outline-hidden focus:ring-2 focus:ring-purple-400' : ''}`}
        onClick={() => allowUpload && fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (allowUpload && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        title={allowUpload ? "Click or drag & drop to update founder avatar photo" : "Paul Stephensen - Founder"}
      >
        {/* Hidden File Input */}
        {allowUpload && (
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            aria-label="Upload founder profile photo"
          />
        )}

        {/* Inner Container */}
        <div className={`w-full h-full ${radiusClass} overflow-hidden relative bg-[#1c1a24] flex items-center justify-center`}>
          {customPhotoUrl ? (
            <img
              src={customPhotoUrl}
              alt="Paul Stephensen - Founder & Principal Researcher"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            /* High-Fidelity Vector Photographic Rendering of Paul Stephensen from the reference */
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
                  <stop offset="100%" stopColor="#E67E22" stopOpacity="0" />
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
                  <stop offset="100%" stopColor="#ECC4A2" stopOpacity="0" />
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

          {/* Dragging Active Dropzone Overlay */}
          {isDragging && (
            <div className="absolute inset-0 bg-purple-950/85 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-1 p-2 z-20 animate-in fade-in">
              <Upload className="w-6 h-6 text-purple-300 animate-bounce" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-center font-bold text-purple-200">
                Drop image here
              </span>
            </div>
          )}

          {/* Hover Overlay with Camera Icon */}
          {allowUpload && !isDragging && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1 p-1 z-10">
              <Camera className="w-5 h-5 text-purple-300" />
              <span className="text-[9px] font-mono uppercase tracking-wider text-center leading-tight font-semibold">
                {customPhotoUrl ? 'Change Photo' : 'Upload Photo'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Camera Edit Badge on Bottom-Right */}
      {allowUpload && showBadge && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute -bottom-1 -right-1 z-20 w-6 h-6 rounded-full bg-purple-700 hover:bg-purple-600 text-white border-2 border-[#171424] flex items-center justify-center shadow-md transition-all hover:scale-110 cursor-pointer"
          title="Update Founder Profile Photo"
          aria-label="Update Founder Profile Photo"
        >
          <Camera className="w-3 h-3 text-purple-100" />
        </button>
      )}

      {/* Success Notification Pill */}
      {showSavedToast && (
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-emerald-950/95 border border-emerald-500/80 text-emerald-300 text-[10px] font-mono flex items-center gap-1 shadow-lg animate-in fade-in">
          <Check className="w-3 h-3 text-emerald-400" />
          <span>Photo updated!</span>
        </div>
      )}

      {/* Error Notification Pill */}
      {errorMessage && (
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-red-950/95 border border-red-500/80 text-red-300 text-[10px] font-mono flex items-center gap-1 shadow-lg animate-in fade-in">
          <AlertCircle className="w-3 h-3 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Reset button if custom photo exists */}
      {allowUpload && customPhotoUrl && (
        <button
          type="button"
          onClick={handleReset}
          className="absolute -top-1.5 -right-1.5 z-20 w-5 h-5 rounded-full bg-stone-900 border border-stone-600 text-stone-300 hover:text-white hover:bg-stone-800 flex items-center justify-center shadow-lg transition-all hover:scale-110 cursor-pointer"
          title="Reset to default portrait"
          aria-label="Reset to default portrait"
        >
          <RefreshCw className="w-2.5 h-2.5" />
        </button>
      )}
    </div>
  );
};
