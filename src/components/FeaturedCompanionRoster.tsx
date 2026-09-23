import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CompanionId } from '../types';
import { PERSONAS } from '../data/personasData';
import { CompanionAvatar } from './CompanionAvatar';
import { Tooltip } from './Tooltip';
import { COMPANION_CAPABILITIES } from './MasterHeroCard';

export const COMPANION_SIGNATURE_QUOTES: Record<CompanionId, string> = {
  toni: '“We craft gentle digital tools that help you protect your memories and ease your daily cognitive load.”',
  elysian: '“True innovation never sacrifices human dignity. Our architectural boundaries are your peace of mind.”',
  phoebe: '“Numbers tell a human story when we measure what genuinely matters, without algorithmic noise.”',
  holly: '“Every small, quiet win builds the foundation for lasting sovereign clarity.”',
  ari: '“Breathe. Pace yourself. We move forward one calm, steady milestone at a time.”',
  kenny: '“You are worthy of care, respect, and non-coercive support. Move forward at your own natural, dignified stride.”'
};

export const COMPANION_NOTEBOOK_MAPPING: Record<CompanionId, string> = {
  toni: 'Executive Strategy & Capital Governance',
  elysian: 'AI Ethics & EU AI Act Charter',
  phoebe: 'Quantitative Risk & Volatility Matrix',
  kenny: 'Trauma-Informed Clinical Protocols',
  ari: 'Sensory Ergonomics & Pacing Codex',
  holly: 'Narrative Lore & Character Bible'
};

export interface FeaturedCompanionRosterProps {
  activeCompanionId: CompanionId;
  onSelectCompanion: (id: CompanionId) => void;
  onOpenChat: (id: CompanionId) => void;
  className?: string;
}

export const FeaturedCompanionRoster: React.FC<FeaturedCompanionRosterProps> = ({
  activeCompanionId,
  onSelectCompanion,
  onOpenChat,
  className = ''
}) => {
  const [hoveredCompanionId, setHoveredCompanionId] = useState<CompanionId | null>(null);

  const activePersona = PERSONAS.find(p => p.id === activeCompanionId) || PERSONAS[0];
  const displayedPersonaId = hoveredCompanionId || activeCompanionId;
  const displayedPersona = PERSONAS.find(p => p.id === displayedPersonaId) || activePersona;
  const displayedCapability = COMPANION_CAPABILITIES[displayedPersonaId] || COMPANION_CAPABILITIES.toni;

  return (
    <div
      id="featured-companion-roster-card"
      className={`flex flex-col justify-between p-5 sm:p-7 rounded-3xl bg-white border border-[#ECE7DE] shadow-sm relative overflow-hidden space-y-4 ${className}`}
      style={{
        boxShadow: `0 8px 30px -10px ${activePersona.themeColor.glow}`
      }}
    >
      {/* Header Row: Featured Companion Title + Live Active Status + Quick Chat */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 border-b border-[#ECE7DE]/70 pb-3.5">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[11px] sm:text-xs font-mono font-bold text-[#7B5C9E] uppercase tracking-wider">
            Featured Companion
          </span>
          <span 
            className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold transition-colors"
            style={{
              backgroundColor: `${activePersona.themeColor.primary}15`,
              color: activePersona.themeColor.primary,
              borderColor: `${activePersona.themeColor.primary}30`
            }}
          >
            {activePersona.name} Active
          </span>
        </div>
        
        <button
          type="button"
          onClick={() => onOpenChat(activeCompanionId)}
          className="px-2.5 sm:px-3.5 py-1 rounded-full text-xs font-bold bg-[#F2ECF9] text-[#5A3882] hover:bg-[#E8DEF5] border border-[#D5C6EC] transition-all flex items-center gap-1.5 shadow-2xs group shrink-0 cursor-pointer"
        >
          <span>Chat with {activePersona.name}</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Active Companion Spotlight with Full-Width Ethos Quote */}
      <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-3">
        {/* Identity line: Avatar + Name + Tagline */}
        <div 
          className="flex items-center gap-3.5 cursor-pointer group"
          onClick={() => onOpenChat(activePersona.id)}
          title={`Click to start private chat with ${activePersona.name}`}
        >
          <div className="relative shrink-0">
            <CompanionAvatar
              persona={activePersona}
              size="md"
              showStatusRing={true}
              isOnline={true}
              borderGlow={true}
              className="transition-transform group-hover:scale-105"
            />
            <span 
              className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold text-white shadow-xs"
              style={{ backgroundColor: activePersona.themeColor.primary }}
            >
              Active
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-[#181524] text-base tracking-tight truncate">
                {activePersona.name.toUpperCase()}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F2ECF9] text-[#653E8A] border border-[#D5C6EC] font-semibold shrink-0">
                {COMPANION_CAPABILITIES[activePersona.id]?.accentBadge || 'Companion'}
              </span>
            </div>
            <p className="text-xs text-[#7B5C9E] font-medium truncate">
              {COMPANION_CAPABILITIES[activePersona.id]?.tagline || activePersona.role}
            </p>
          </div>
        </div>

        {/* Quote Block */}
        <div className="border-t border-[#ECE7DE]/80 pt-2.5 space-y-1.5">
          <p className="font-serif italic text-xs sm:text-sm text-[#181524] leading-relaxed">
            {COMPANION_SIGNATURE_QUOTES[activePersona.id] || COMPANION_SIGNATURE_QUOTES.toni}
          </p>
          <div className="flex items-center justify-between pt-0.5 text-[10px] sm:text-[11px] text-[#5A5568]">
            <span className="flex items-center gap-1 font-sans">
              <span>📱 Private Tablet</span>
              <span>•</span>
              <span>Tap to talk with {activePersona.name}</span>
            </span>
            <div 
              className="h-1 w-14 rounded-full shrink-0" 
              style={{
                background: `linear-gradient(to right, ${activePersona.themeColor.primary}, #D4A373, #234F56)`
              }}
            />
          </div>
        </div>
      </div>

      {/* Companion Roster • Hover for Summary */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#7B5C9E]" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#5A5568]">
              Companion Roster • Hover for Summary
            </span>
          </div>
          <span className="text-[10px] text-[#7B5C9E] font-medium hidden sm:inline-block">
            {hoveredCompanionId ? `Previewing ${displayedPersona.name}` : '6 Personas • Click to Switch'}
          </span>
        </div>

        {/* 6 Companion Avatar Dock */}
        <div className="grid grid-cols-6 gap-1 sm:gap-1.5 p-1.5 bg-[#FAF8F5] rounded-xl sm:rounded-2xl border border-[#ECE7DE]">
          {PERSONAS.map((persona) => {
            const isSelected = activeCompanionId === persona.id;
            const isHovered = hoveredCompanionId === persona.id;
            const capability = COMPANION_CAPABILITIES[persona.id];

            return (
              <div key={persona.id} className="relative min-w-0">
                <Tooltip
                  title={`${persona.name} — Quick Summary`}
                  badge={capability.accentBadge}
                  position="top"
                  delay={50}
                  content={
                    <div className="space-y-1.5 text-left">
                      <p className="text-xs font-serif font-bold text-[#181524] leading-snug">
                        {capability.tagline}
                      </p>
                      <p className="text-[11px] text-[#4A4558] leading-relaxed">
                        {capability.oneSentence}
                      </p>
                      <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-[#7B5C9E]">
                        <span>{capability.architectureBadge}</span>
                        <span className="text-[#8C5D2A] font-bold">Click to switch</span>
                      </div>
                    </div>
                  }
                >
                  <button
                    id={`roster-avatar-btn-${persona.id}`}
                    type="button"
                    onMouseEnter={() => setHoveredCompanionId(persona.id)}
                    onMouseLeave={() => setHoveredCompanionId(null)}
                    onFocus={() => setHoveredCompanionId(persona.id)}
                    onBlur={() => setHoveredCompanionId(null)}
                    onClick={() => {
                      onSelectCompanion(persona.id);
                      setHoveredCompanionId(persona.id);
                    }}
                    className={`w-full flex flex-col items-center p-1 rounded-lg sm:rounded-xl transition-all duration-200 group/btn relative min-w-0 cursor-pointer ${
                      isSelected
                        ? 'bg-white shadow-xs border border-[#7B5C9E]/50 ring-2 ring-[#7B5C9E]/40 scale-[1.03]'
                        : isHovered
                        ? 'bg-white/90 shadow-2xs border border-[#E0DACF] scale-105'
                        : 'hover:bg-white/60 border border-transparent'
                    }`}
                  >
                    <div className="relative">
                      <CompanionAvatar
                        persona={persona}
                        size="sm"
                        showStatusRing={isSelected || isHovered}
                        isOnline={true}
                        borderGlow={isSelected}
                        className={`transition-transform duration-200 ${
                          isHovered ? 'scale-110' : isSelected ? 'scale-105' : 'group-hover/btn:scale-105'
                        }`}
                      />
                      {isSelected && (
                        <span 
                          className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-xs"
                          style={{ backgroundColor: persona.themeColor.primary }}
                        />
                      )}
                    </div>
                    <span className={`text-[10px] font-semibold mt-1 transition-colors leading-none truncate w-full text-center ${
                      isSelected ? 'text-[#7B5C9E] font-bold' : isHovered ? 'text-[#181524]' : 'text-[#5A5568]'
                    }`}>
                      {persona.name}
                    </span>
                  </button>
                </Tooltip>
              </div>
            );
          })}
        </div>

        {/* Dynamic Quick Summary Hover/Selected Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={displayedPersona.id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.15 }}
            className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border ${displayedCapability.borderLight} ${displayedCapability.bgLight} space-y-1.5 transition-colors overflow-hidden`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span 
                  className="w-2 h-2 rounded-full shrink-0" 
                  style={{ backgroundColor: displayedCapability.color }} 
                />
                <strong className="text-xs font-bold text-[#181524] font-serif truncate">
                  {displayedPersona.name}: {displayedCapability.tagline}
                </strong>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/90 border border-black/5 text-[#5A5568] font-semibold">
                  {displayedCapability.accentBadge}
                </span>
                {displayedPersona.id !== activeCompanionId ? (
                  <button
                    type="button"
                    onClick={() => onSelectCompanion(displayedPersona.id)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7B5C9E] hover:bg-[#653E8A] text-white transition-colors shadow-2xs cursor-pointer"
                  >
                    Set Active
                  </button>
                ) : (
                  <span className="text-[10px] font-bold text-[#7B5C9E] px-1 font-mono">
                    ✓ Active
                  </span>
                )}
              </div>
            </div>

            {/* 1-Sentence Capability Description */}
            <p className="text-[11px] sm:text-xs text-[#3B3450] leading-relaxed">
              <strong className="text-[#181524] font-semibold">Quick Summary: </strong>
              {displayedCapability.oneSentence}
            </p>

            {/* Architecture Invariant Sub-Tag & Linked Embodied Notebook */}
            <div className="pt-0.5 flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono">
              <div className="flex items-center gap-1.5 text-[#5A5568] truncate">
                <CheckCircle2 className="w-3 h-3 text-[#1E5D3A] shrink-0" />
                <span className="truncate">{displayedCapability.architectureBadge}</span>
              </div>
              <span className="text-[#653E8A] font-semibold bg-white/90 px-2 py-0.5 rounded-md border border-purple-200/60 shrink-0">
                📚 Linked: {COMPANION_NOTEBOOK_MAPPING[displayedPersona.id]}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
