import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Compass,
  ShieldCheck,
  LineChart,
  Layers,
  Activity,
  Stethoscope,
  Volume2
} from 'lucide-react';
import { PersonaData, CompanionId } from '../types';
import { PERSONAS } from '../data/personasData';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface CompanionAvatarProps {
  persona?: PersonaData;
  companionId?: CompanionId;
  size?: AvatarSize;
  showStatusRing?: boolean;
  isOnline?: boolean;
  isLoading?: boolean;
  isSpeaking?: boolean;
  className?: string;
  borderGlow?: boolean;
  shape?: 'circle' | 'rounded';
  showBadgeIcon?: boolean;
  onClick?: () => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Compass,
  ShieldCheck,
  LineChart,
  Layers,
  Activity,
  Stethoscope
};

const SIZE_CONFIGS: Record<AvatarSize, {
  container: string;
  imgSize: string;
  iconSize: string;
  badgeSize: string;
  badgeOffset: string;
  pulseSize: string;
  fontSize: string;
}> = {
  xs: {
    container: 'w-6 h-6',
    imgSize: 'w-6 h-6',
    iconSize: 'w-3 h-3',
    badgeSize: 'w-2 h-2',
    badgeOffset: '-bottom-0.5 -right-0.5',
    pulseSize: 'w-2 h-2',
    fontSize: 'text-[10px]'
  },
  sm: {
    container: 'w-8 h-8',
    imgSize: 'w-8 h-8',
    iconSize: 'w-4 h-4',
    badgeSize: 'w-2.5 h-2.5',
    badgeOffset: 'bottom-0 right-0',
    pulseSize: 'w-2.5 h-2.5',
    fontSize: 'text-xs'
  },
  md: {
    container: 'w-11 h-11',
    imgSize: 'w-11 h-11',
    iconSize: 'w-5 h-5',
    badgeSize: 'w-3 h-3',
    badgeOffset: 'bottom-0 right-0',
    pulseSize: 'w-3 h-3',
    fontSize: 'text-sm'
  },
  lg: {
    container: 'w-14 h-14',
    imgSize: 'w-14 h-14',
    iconSize: 'w-6 h-6',
    badgeSize: 'w-3.5 h-3.5',
    badgeOffset: 'bottom-0.5 right-0.5',
    pulseSize: 'w-3.5 h-3.5',
    fontSize: 'text-base'
  },
  xl: {
    container: 'w-18 h-18 sm:w-20 sm:h-20',
    imgSize: 'w-18 h-18 sm:w-20 sm:h-20',
    iconSize: 'w-8 h-8',
    badgeSize: 'w-4 h-4',
    badgeOffset: 'bottom-1 right-1',
    pulseSize: 'w-4 h-4',
    fontSize: 'text-xl'
  },
  '2xl': {
    container: 'w-24 h-24 sm:w-28 sm:h-28',
    imgSize: 'w-24 h-24 sm:w-28 sm:h-28',
    iconSize: 'w-10 h-10',
    badgeSize: 'w-5 h-5',
    badgeOffset: 'bottom-1.5 right-1.5',
    pulseSize: 'w-5 h-5',
    fontSize: 'text-2xl'
  },
  '3xl': {
    container: 'w-32 h-32 sm:w-36 sm:h-36',
    imgSize: 'w-32 h-32 sm:w-36 sm:h-36',
    iconSize: 'w-14 h-14',
    badgeSize: 'w-6 h-6',
    badgeOffset: 'bottom-2 right-2',
    pulseSize: 'w-6 h-6',
    fontSize: 'text-3xl'
  }
};

export const CompanionAvatar: React.FC<CompanionAvatarProps> = ({
  persona: propPersona,
  companionId,
  size = 'md',
  showStatusRing = true,
  isOnline = true,
  isLoading = false,
  isSpeaking = false,
  className = '',
  borderGlow = true,
  shape = 'rounded',
  showBadgeIcon = false,
  onClick
}) => {
  const [imageError, setImageError] = useState(false);

  // Resolve target persona
  const targetPersona = propPersona || (companionId ? PERSONAS.find(p => p.id === companionId) : undefined) || PERSONAS[0];
  const sizeConfig = SIZE_CONFIGS[size];
  const IconComp = ICON_MAP[targetPersona.avatarIcon] || Sparkles;

  // Reset error when persona changes
  useEffect(() => {
    setImageError(false);
  }, [targetPersona.id, targetPersona.avatarImage]);

  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';
  const imgShapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none group/avatar ${sizeConfig.container} ${className}`}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {/* Outer Border & Glowing Shadow Container */}
      <div
        className={`w-full h-full ${shapeClass} relative overflow-hidden transition-all duration-300 border-2 flex items-center justify-center bg-stone-900`}
        style={{
          borderColor: borderGlow ? targetPersona.themeColor.primary : 'rgba(255,255,255,0.2)',
          boxShadow: borderGlow ? `0 0 20px -2px ${targetPersona.themeColor.glow}` : 'none'
        }}
      >
        {/* Real Avatar Photo Image (renders immediately with high contrast) */}
        {targetPersona.avatarImage && !imageError ? (
          <img
            key={targetPersona.id}
            src={targetPersona.avatarImage}
            alt={`${targetPersona.name} - ${targetPersona.role}`}
            referrerPolicy="no-referrer"
            loading="eager"
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center ${imgShapeClass} group-hover/avatar:scale-105 transition-transform duration-300`}
          />
        ) : (
          /* Fallback Graphic (Stylized Background Gradient & Icon/Initials) */
          <div
            className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${targetPersona.themeColor.gradient}`}
          >
            <div className="flex flex-col items-center justify-center text-white">
              {size === 'xs' || size === 'sm' ? (
                <span className={`font-serif font-bold ${sizeConfig.fontSize}`}>
                  {targetPersona.name.charAt(0)}
                </span>
              ) : (
                <IconComp className={sizeConfig.iconSize} />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mini Icon Overlay Badge (Optional top-right or bottom-left) */}
      {showBadgeIcon && (
        <div
          className="absolute -top-1 -right-1 p-0.5 rounded-full bg-stone-900 border border-stone-700 shadow-sm flex items-center justify-center z-10"
          style={{ borderColor: targetPersona.themeColor.primary }}
        >
          <IconComp className="w-2.5 h-2.5" style={{ color: targetPersona.themeColor.primary }} />
        </div>
      )}

      {/* Status Indicators (Online, Loading/Thinking, Speaking) */}
      {showStatusRing && (
        <div
          className={`absolute ${sizeConfig.badgeOffset} z-10 flex items-center justify-center`}
        >
          {isLoading ? (
            <span
              className={`${sizeConfig.badgeSize} rounded-full border-2 border-stone-900 relative flex items-center justify-center`}
              style={{ backgroundColor: targetPersona.themeColor.primary }}
            >
              <span
                className={`absolute inset-0 rounded-full animate-ping opacity-75`}
                style={{ backgroundColor: targetPersona.themeColor.primary }}
              />
            </span>
          ) : isSpeaking ? (
            <span
              className="px-1 py-0.2 rounded-full bg-stone-900 border text-[9px] text-purple-200 border-purple-500 flex items-center gap-0.5 shadow-xs animate-pulse"
            >
              <Volume2 className="w-2.5 h-2.5 text-purple-300" />
            </span>
          ) : isOnline ? (
            <span
              className={`${sizeConfig.badgeSize} rounded-full bg-emerald-500 border-2 border-stone-900 shadow-xs relative`}
              title="Online & Ready"
            />
          ) : null}
        </div>
      )}
    </div>
  );
};
