import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Upload, 
  Camera, 
  Check, 
  Trash2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck,
  RefreshCw,
  Link as LinkIcon
} from 'lucide-react';
import { PaulStephensenPhoto } from './PaulStephensenPhoto';

interface AuthorPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoSaved?: (url: string | null) => void;
}

const STORAGE_KEYS = ['lavender_founder_photo_url', 'lhs_founder_photo_v2'];

export const AuthorPhotoModal: React.FC<AuthorPhotoModalProps> = ({
  isOpen,
  onClose,
  onPhotoSaved
}) => {
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load current photo when modal opens
  useEffect(() => {
    if (isOpen) {
      setSuccessMessage(null);
      setErrorMessage(null);
      setPreviewUrl(null);
      try {
        let found: string | null = null;
        for (const key of STORAGE_KEYS) {
          const val = localStorage.getItem(key);
          if (val) {
            found = val;
            break;
          }
        }
        setCurrentPhoto(found);
      } catch {
        setCurrentPhoto(null);
      }
    }
  }, [isOpen]);

  // Handle ESC key to close modal safely
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WebP, GIF).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('File size is too large. Please select an image under 15MB.');
      return;
    }

    setIsProcessing(true);

    const reader = new FileReader();
    reader.onerror = () => {
      setIsProcessing(false);
      setErrorMessage('Failed to read image file. Please try again.');
    };

    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => {
        setIsProcessing(false);
        setErrorMessage('Failed to decode image. Please try a different file.');
      };

      img.onload = () => {
        try {
          // Downscale cleanly to max 600px dimension for fast loading and safe localStorage storage
          const canvas = document.createElement('canvas');
          const maxDim = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Canvas rendering context unavailable');
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);

          // Save to local storage
          for (const key of STORAGE_KEYS) {
            localStorage.setItem(key, compressedDataUrl);
          }

          // Automatically persist permanently to server so all users & deployments see it
          try {
            fetch('/api/author/photo', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ imageBase64: compressedDataUrl })
            }).catch(() => {
              // ignore server write error
            });
          } catch {
            // ignore
          }

          // Broadcast change to other components
          window.dispatchEvent(new Event('storage'));
          window.dispatchEvent(new CustomEvent('lavender_photo_updated', { detail: compressedDataUrl }));

          setCurrentPhoto(compressedDataUrl);
          setPreviewUrl(compressedDataUrl);
          setIsProcessing(false);
          setSuccessMessage('Profile photo updated successfully!');

          if (onPhotoSaved) {
            onPhotoSaved(compressedDataUrl);
          }

          // Automatically close modal after brief confirmation so user is not stuck
          setTimeout(() => {
            onClose();
          }, 850);
        } catch (err) {
          setIsProcessing(false);
          setErrorMessage('Could not store photo in browser storage. Please try a smaller photo.');
        }
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawUrl = urlInput.trim();
    if (!rawUrl) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const maxDim = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', 0.88);

            for (const key of STORAGE_KEYS) {
              localStorage.setItem(key, compressed);
            }
            fetch('/api/author/photo', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ imageBase64: compressed })
            }).catch(() => {});

            window.dispatchEvent(new Event('storage'));
            window.dispatchEvent(new CustomEvent('lavender_photo_updated', { detail: compressed }));
            setCurrentPhoto(compressed);
            setPreviewUrl(compressed);
            setIsProcessing(false);
            setSuccessMessage('Photo applied successfully!');
            if (onPhotoSaved) onPhotoSaved(compressed);
            setTimeout(() => onClose(), 850);
            return;
          }
        } catch {
          // If canvas tainted due to CORS, fall back to saving URL directly
        }

        for (const key of STORAGE_KEYS) {
          localStorage.setItem(key, rawUrl);
        }
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('lavender_photo_updated', { detail: rawUrl }));
        setCurrentPhoto(rawUrl);
        setPreviewUrl(rawUrl);
        setIsProcessing(false);
        setSuccessMessage('Photo URL applied successfully!');
        if (onPhotoSaved) onPhotoSaved(rawUrl);
        setTimeout(() => onClose(), 850);
      };

      img.onerror = () => {
        setIsProcessing(false);
        setErrorMessage('Unable to load image from URL. Please upload a file directly or check the link.');
      };

      img.src = rawUrl;
    } catch {
      setIsProcessing(false);
      setErrorMessage('Failed to load image from URL.');
    }
  };

  const handleResetToDefault = async () => {
    try {
      for (const key of STORAGE_KEYS) {
        localStorage.removeItem(key);
      }
      try {
        await fetch('/api/author/photo', { method: 'DELETE' });
      } catch {
        // ignore
      }
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('lavender_photo_updated', { detail: null }));
      setCurrentPhoto(null);
      setPreviewUrl(null);
      setSuccessMessage('Reset to default portrait.');
      if (onPhotoSaved) {
        onPhotoSaved(null);
      }
      setTimeout(() => {
        onClose();
      }, 700);
    } catch {
      setErrorMessage('Failed to clear photo from storage.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="author-photo-modal-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-[#12111A] border border-[#2B283A] rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-900/30 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header with Close Button */}
        <div className="flex items-center justify-between border-b border-[#2B283A] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-300">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">
                Author Profile
              </div>
              <h3 id="author-photo-modal-title" className="text-lg font-bold text-white font-display">
                Update Profile Photo
              </h3>
            </div>
          </div>

          <button
            id="close-author-photo-modal-btn"
            type="button"
            onClick={onClose}
            aria-label="Close photo update modal"
            className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white transition-all cursor-pointer group shadow-sm active:scale-95"
            title="Close (Esc)"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Current Photo / Preview */}
        <div className="flex flex-col items-center justify-center gap-3 py-2">
          <div className="relative group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden p-[2px] bg-gradient-to-b from-stone-400/50 via-purple-500/40 to-stone-800 shadow-xl flex items-center justify-center bg-[#1c1a24]">
              {previewUrl || currentPhoto ? (
                <img
                  src={previewUrl || currentPhoto || ''}
                  alt="Paul Stephensen Profile Preview"
                  className="w-full h-full object-cover rounded-3xl"
                />
              ) : (
                <PaulStephensenPhoto size="lg" shape="rounded" showBadge={false} />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 text-white border-2 border-[#12111A] flex items-center justify-center shadow-md">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-white">Paul Stephensen</div>
            <div className="text-xs text-purple-300/80 font-mono">
              Founder & Principal Researcher
            </div>
          </div>
        </div>

        {/* Success or Error Notice */}
        {successMessage && (
          <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-200 text-xs flex items-center gap-2.5 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="flex-1 font-medium">{successMessage}</div>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 rounded-2xl bg-rose-950/80 border border-rose-600/60 text-rose-200 text-xs flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          id="author-photo-file-picker"
        />

        {/* Upload Dropzone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
            isDragging
              ? 'border-purple-500 bg-purple-950/40 text-purple-200'
              : 'border-[#2B283A] hover:border-purple-600/70 bg-[#161421] hover:bg-[#1C182A] text-stone-300'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-purple-950/90 border border-purple-700/50 flex items-center justify-center text-purple-300">
            {isProcessing ? (
              <RefreshCw className="w-5 h-5 animate-spin text-purple-400" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-white">
              {isProcessing ? 'Processing image...' : 'Click to select or drag photo here'}
            </p>
            <p className="text-[11px] text-stone-400 font-mono">
              Select your photo file (PNG, JPG, WebP)
            </p>
          </div>
        </div>

        {/* Alternative: Paste Image URL */}
        <form onSubmit={handleUrlSubmit} className="space-y-2">
          <div className="text-[11px] font-mono text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <LinkIcon className="w-3 h-3 text-purple-400" />
            <span>Or paste photo URL</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/paul-stephensen.jpg"
              className="flex-1 px-3 py-2 rounded-xl bg-[#161421] border border-[#2B283A] text-xs text-white placeholder-stone-500 focus:outline-none focus:border-purple-500 font-mono"
            />
            <button
              type="submit"
              disabled={isProcessing || !urlInput.trim()}
              className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold disabled:opacity-40 transition-all cursor-pointer shrink-0"
            >
              Load URL
            </button>
          </div>
        </form>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 border-t border-[#2B283A]">
          {currentPhoto ? (
            <button
              type="button"
              onClick={handleResetToDefault}
              className="w-full sm:w-auto px-3 py-2 rounded-xl bg-stone-900/90 hover:bg-rose-950/60 text-stone-400 hover:text-rose-300 text-xs font-medium border border-stone-800 hover:border-rose-800/60 transition-all flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset to Default</span>
            </button>
          ) : (
            <div className="text-[11px] text-stone-400 font-mono hidden sm:block">
              Locally stored in browser
            </div>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold transition-all border border-stone-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Choose Photo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
