import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Info, X, Check } from 'lucide-react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface TooltipProps {
  content: React.ReactNode;
  title?: string;
  badge?: string;
  position?: TooltipPosition;
  children?: React.ReactNode;
  icon?: 'help' | 'info' | 'none';
  iconSize?: 'sm' | 'md';
  className?: string;
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  title,
  badge,
  position = 'top-right',
  children,
  icon = children ? 'none' : 'help',
  iconSize = 'sm',
  className = '',
  delay = 100,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const toggleTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible((prev) => !prev);
  };

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVisible(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  // Position styles and animation variants for Desktop
  const getDesktopPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2.5 origin-bottom';
      case 'top-right':
        return 'bottom-full right-0 mb-2.5 origin-bottom-right';
      case 'top-left':
        return 'bottom-full left-0 mb-2.5 origin-bottom-left';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2.5 origin-top';
      case 'bottom-right':
        return 'top-full right-0 mt-2.5 origin-top-right';
      case 'bottom-left':
        return 'top-full left-0 mt-2.5 origin-top-left';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2.5 origin-right';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2.5 origin-left';
      default:
        return 'top-full right-0 mt-2.5 origin-top-right';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {/* Trigger element */}
      {children ? (
        <div
          className="inline-flex items-center cursor-pointer"
          onClick={toggleTooltip}
          aria-expanded={isVisible}
        >
          {children}
        </div>
      ) : icon !== 'none' ? (
        <button
          type="button"
          onClick={toggleTooltip}
          aria-label={title ? `Information regarding ${title}` : 'Help information'}
          aria-expanded={isVisible}
          className={`rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5C9E] flex items-center justify-center cursor-pointer shrink-0 ${
            iconSize === 'sm'
              ? 'w-5 h-5 text-[#5A5568] hover:text-[#7B5C9E] hover:bg-[#F2ECF9]'
              : 'w-6 h-6 text-[#5A5568] hover:text-[#234F56] hover:bg-[#FAF3EA]'
          } ${isVisible ? 'bg-[#F2ECF9] text-[#7B5C9E] ring-1 ring-[#D5C6EC]' : ''}`}
        >
          {icon === 'info' ? (
            <Info className={iconSize === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
          ) : (
            <HelpCircle className={iconSize === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
          )}
        </button>
      ) : null}

      <AnimatePresence>
        {isVisible && (
          <>
            {/* 1. MOBILE BACKDROP (Ensures focus on small screens and tap-to-dismiss) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[90] sm:hidden pointer-events-auto"
              aria-hidden="true"
            />

            {/* 2. MOBILE FLOATING ACTION CARD (Fixed at bottom of viewport, never cut off by parent overflow or edges) */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={title || 'Information'}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-3.5 bottom-6 z-[100] sm:hidden p-4 rounded-3xl bg-[#FAF8F5] border border-[#E5E0D8] shadow-2xl text-left pointer-events-auto max-w-md mx-auto space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Accent Gradient Bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7B5C9E] via-[#234F56] to-[#D4A373] rounded-t-3xl" 
                aria-hidden="true" 
              />

              {/* Header */}
              <div className="flex items-start justify-between gap-2.5 border-b border-[#ECE7DE] pb-2.5">
                <div className="space-y-0.5 min-w-0 flex-1">
                  {badge && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7B5C9E] block truncate">
                      {badge}
                    </span>
                  )}
                  {title && (
                    <h5 className="font-serif font-bold text-[#181524] text-base leading-snug">
                      {title}
                    </h5>
                  )}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVisible(false);
                  }}
                  aria-label="Close help info"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-[#F2ECF9] text-[#5A5568] hover:text-[#181524] transition-colors shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content Body */}
              <div className="text-xs sm:text-sm text-[#4A4558] leading-relaxed space-y-2 font-sans max-h-[45vh] overflow-y-auto pr-1">
                {typeof content === 'string' ? (
                  <p className="text-[#2C2836]">{content}</p>
                ) : (
                  content
                )}
              </div>

              {/* Mobile Quick Dismiss Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVisible(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Got it, close info</span>
                </button>
              </div>
            </motion.div>

            {/* 3. DESKTOP FLOATING POPOVER (Hover/focus contextual tooltip for screens >= 640px) */}
            <motion.div
              role="tooltip"
              initial={{ opacity: 0, scale: 0.95, y: position.startsWith('top') ? 4 : -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: position.startsWith('top') ? 4 : -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className={`hidden sm:block absolute z-50 w-80 p-4 rounded-2xl bg-[#FAF8F5]/98 backdrop-blur-md border border-[#E5E0D8] shadow-xl text-left pointer-events-auto ${getDesktopPositionClasses()}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Accent Line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7B5C9E] via-[#234F56] to-[#8C5D2A] rounded-t-2xl" 
                aria-hidden="true" 
              />

              {(title || badge) && (
                <div className="flex items-start justify-between gap-2 border-b border-[#ECE7DE] pb-2 mb-2.5">
                  <div className="space-y-0.5 min-w-0">
                    {badge && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7B5C9E] block truncate">
                        {badge}
                      </span>
                    )}
                    {title && (
                      <h5 className="font-serif font-bold text-[#181524] text-sm leading-snug">
                        {title}
                      </h5>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsVisible(false);
                    }}
                    aria-label="Close tooltip"
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[#5A5568] hover:text-[#181524] hover:bg-[#F0EDE8] transition-colors shrink-0 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Tooltip Body */}
              <div className="text-xs text-[#5A5568] leading-relaxed space-y-1.5 font-sans">
                {typeof content === 'string' ? <p className="text-[#2C2836]">{content}</p> : content}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

