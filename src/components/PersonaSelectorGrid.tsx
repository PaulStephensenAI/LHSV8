import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  ShieldCheck, 
  LineChart, 
  Layers, 
  Activity, 
  Stethoscope, 
  Sparkles, 
  ArrowRight,
  Shield,
  Clock,
  Cpu,
  Heart,
  LayoutTemplate,
  Waves,
  Search,
  X,
  GraduationCap,
  Quote,
  Scale,
  Database,
  Boxes,
  Calendar,
  MapPin,
  Info,
  Camera
} from 'lucide-react';
import { CompanionId, PersonaData } from '../types';
import { PERSONAS } from '../data/personasData';
import { CompanionAvatar } from './CompanionAvatar';
import { PaulStephensenPhoto } from './PaulStephensenPhoto';
import { Tooltip } from './Tooltip';

interface PersonaSelectorGridProps {
  selectedId: CompanionId;
  onSelect: (id: CompanionId) => void;
  onOpenChat: (id: CompanionId) => void;
  onOpenBio?: () => void;
  onOpenConsultation?: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Compass,
  ShieldCheck,
  LineChart,
  Layers,
  Activity,
  Stethoscope,
  LayoutTemplate,
  Shield,
  Waves,
  Cpu,
  Heart,
  Clock
};

export const PersonaSelectorGrid: React.FC<PersonaSelectorGridProps> = ({
  selectedId,
  onSelect,
  onOpenChat,
  onOpenBio,
  onOpenConsultation
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const showFounderCard = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    const founderTerms = [
      'paul',
      'stephensen',
      'founder',
      'principal',
      'research',
      'ethic',
      'sovereign',
      'architect',
      'griffin',
      'carmel',
      'lavender',
      'dignity',
      'governance',
      'schema'
    ];
    return founderTerms.some(term => term.includes(query) || query.includes(term));
  }, [searchQuery]);

  const filteredPersonas = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return PERSONAS;

    return PERSONAS.filter((persona: PersonaData) => {
      const nameMatch = persona.name.toLowerCase().includes(query);
      const idMatch = persona.id.toLowerCase().includes(query);
      const codenameMatch = persona.codename.toLowerCase().includes(query);
      const roleMatch = persona.role.toLowerCase().includes(query);
      const taglineMatch = persona.tagline.toLowerCase().includes(query);
      const specialtyMatch = persona.specializations.some((spec) =>
        spec.toLowerCase().includes(query)
      );
      const featureMatch = persona.uniqueFeatures.some(
        (feat) =>
          feat.title.toLowerCase().includes(query) ||
          feat.description.toLowerCase().includes(query)
      );

      return (
        nameMatch ||
        idMatch ||
        codenameMatch ||
        roleMatch ||
        taglineMatch ||
        specialtyMatch ||
        featureMatch
      );
    });
  }, [searchQuery]);

  const quickFilterPills = [
    { label: 'All', query: '' },
    { label: 'Founder & Ethics', query: 'Paul' },
    { label: 'Strategic Mentor', query: 'Strategic' },
    { label: 'Ethical Safety', query: 'Ethical' },
    { label: 'Quantitative Forecasting', query: 'Quantitative' },
    { label: '3D Spatial', query: 'Spatial' },
    { label: 'Sensory Pacing', query: 'Sensory' },
    { label: 'Autonomy & Dignity', query: 'Autonomy' }
  ];

  return (
    <section id="meet-the-team" className="py-6 scroll-mt-20 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-[#7B5C9E] uppercase tracking-widest bg-[#F2ECF9] px-2.5 py-0.5 rounded-full border border-[#D5C6EC] font-semibold">
              Leadership & Companion Ecosystem
            </span>
            <span className="text-xs text-[#5A5568]">Founder & Principal Researcher • Six Active AI Personas</span>
            <Tooltip
              title="Meet the Team Directory"
              badge="7 Profiles"
              position="bottom-left"
              content="Comprehensive roster featuring Founder Paul Stephensen alongside 6 cognitive companions engineered for strategy, sensory safety, and quantitative reasoning."
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#181524] font-serif">
            Meet the Team & Research Leadership
          </h2>
          <p className="text-sm text-[#5A5568] max-w-3xl mt-1 font-sans">
            Architected by Paul Stephensen at Lavender Hill Studio. Explore our foundational engineering principles and interact with each specialized cognitive companion.
          </p>
        </div>

        {/* Results badge */}
        <div className="flex items-center gap-2 self-start md:self-end">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white border border-[#E0DACF] text-[#5A5568] font-medium shadow-2xs">
            {filteredPersonas.length + (showFounderCard ? 1 : 0)} Team Entities
          </span>
        </div>
      </div>

      {/* Search Bar & Quick Filter Chips */}
      <div className="space-y-3">
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="persona-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search team by name (e.g. Paul Stephensen, Toni, Ari), specialty (e.g. ethics, spatial, safety)..."
            className="w-full pl-10 pr-10 py-2.5 bg-white hover:bg-white focus:bg-white border border-[#D0C8BC] focus:border-[#7B5C9E] rounded-xl text-sm text-[#181524] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#7B5C9E]/20 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              id="clear-persona-search-btn"
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-[#181524] transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick filter chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-[#5A5568] font-medium mr-1">Quick Filters:</span>
          {quickFilterPills.map((pill) => {
            const isActive = 
              pill.query === '' 
                ? searchQuery === '' 
                : searchQuery.toLowerCase() === pill.query.toLowerCase();

            return (
              <button
                key={pill.label}
                id={`filter-pill-${pill.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                type="button"
                onClick={() => setSearchQuery(pill.query === searchQuery ? '' : pill.query)}
                className={`text-[11px] px-3 py-1 rounded-full transition-all font-medium border ${
                  isActive
                    ? 'bg-[#7B5C9E] text-white border-[#653E8A] shadow-xs'
                    : 'bg-[#F5F2EB] text-[#3B3450] hover:text-[#181524] hover:bg-[#ECE6DA] border-[#D8D2C6]'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. PAUL STEPHENSEN - FOUNDER & PRINCIPAL RESEARCHER CARD                  */}
      {/* ========================================================================= */}
      {showFounderCard && (
        <div 
          id="founder-team-card"
          className="rounded-2xl sm:rounded-3xl bg-white/95 border border-[#E5E0D8] text-[#181524] p-6 sm:p-8 shadow-xs relative overflow-hidden space-y-6 transition-all hover:border-[#7B5C9E]/60"
        >
          {/* Subtle Ambient Studio Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

          {/* Top Identity Block */}
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#ECE7DE]">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {/* Official Locked Founder Portrait */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <PaulStephensenPhoto size="lg" shape="rounded" allowUpload={false} showBadge={false} />
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2ECF9] border border-[#D5C6EC] text-[#5A3882] text-xs font-mono uppercase tracking-wider font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#7B5C9E]" />
                  <span>Founder & Principal Researcher</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#181524] tracking-tight">
                  Paul Stephensen
                </h3>
                <p className="text-sm sm:text-base text-[#7B5C9E] font-medium font-sans">
                  AI Ethicist and Architect of Sovereign Digital Workspaces
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs font-mono text-[#5A5568]">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-[#7B5C9E]" />
                    AI Ethicist & Systems Researcher
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#8C6239]">
                    <MapPin className="w-3.5 h-3.5 text-[#B87D4B]" />
                    Lavender Street, Griffin, QLD, Australia
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons on Founder Card */}
            <div className="flex flex-row sm:flex-col gap-2.5 shrink-0 self-center md:self-auto w-full sm:w-auto">
              {onOpenBio && (
                <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
                  <button
                    id="meet-team-open-bio-btn"
                    onClick={onOpenBio}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2ECF9] hover:bg-[#7B5C9E] text-[#5A3882] hover:text-white border border-[#D5C6EC] hover:border-[#653E8A] text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-2xs"
                  >
                    <GraduationCap className="w-4 h-4 text-[#7B5C9E] group-hover:text-white" />
                    <span>View Founder Portfolio</span>
                  </button>
                  <Tooltip
                    title="Founder Bio & Academic Portfolio"
                    badge="Paul Stephensen"
                    position="bottom-left"
                    content="Access Paul Stephensen's full background in AI ethics, system architecture, research publications, and hardware design."
                  />
                </div>
              )}
              {onOpenConsultation && (
                <button
                  id="meet-team-consultation-btn"
                  onClick={onOpenConsultation}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] text-xs font-semibold transition-all border border-[#4A7C84] shadow-xs flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#E2C391]" />
                  <span>Request Consultation</span>
                </button>
              )}
            </div>
          </div>

          {/* Ethos Quote Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] text-xs relative overflow-hidden">
            <div className="flex items-start gap-3.5">
              <Quote className="w-7 h-7 text-[#B87D4B] shrink-0 mt-0.5 opacity-90" />
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-[#8C6239] uppercase tracking-wider font-semibold">
                  Lavender Hill Studio Ethos & Manifesto
                </div>
                <blockquote className="font-serif italic text-[#181524] text-sm sm:text-base leading-snug">
                  &ldquo;Software should be a calm, sovereign extension of human cognition—never a landlord extracting rent for access to your own thoughts and memories.&rdquo;
                </blockquote>
                <div className="text-right text-xs font-semibold text-[#8C6239] font-mono">
                  — Paul Stephensen
                </div>
              </div>
            </div>
          </div>

          {/* Research & Engineering Pillars (3-Column Grid) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5A3882] font-semibold">
              <Boxes className="w-4 h-4 text-[#7B5C9E]" />
              <span>Research & Engineering Pillars</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Pillar 1 */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-2 hover:border-[#7B5C9E]/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-[#F2ECF9] border border-[#D5C6EC] flex items-center justify-center text-[#7B5C9E]">
                    <Scale className="w-4 h-4 text-[#7B5C9E]" />
                  </div>
                  <Tooltip
                    title="AIEE Governance Standard"
                    badge="AIEE Std 10"
                    position="bottom-left"
                    content="10-point governance framework ensuring consent-based agent interactions, neuro-cognitive pacing, and non-exploitative AI boundaries."
                  />
                </div>
                <h4 className="text-xs font-bold text-[#181524] font-serif">
                  AI Ethics & Governance
                </h4>
                <p className="text-[11px] text-[#5A5568] leading-relaxed font-sans">
                  Formalizing human-centered ethical constraints into autonomous agentic workflows.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-2 hover:border-[#234F56]/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-[#E6F4F8] border border-[#BFDFEA] flex items-center justify-center text-[#234F56]">
                    <Cpu className="w-4 h-4 text-[#234F56]" />
                  </div>
                  <Tooltip
                    title="Schema Validation"
                    badge="Deterministic"
                    position="bottom-left"
                    content="Eliminates hallucinated code and random API actions by enforcing strict JSON contracts and sandboxed type stripping."
                  />
                </div>
                <h4 className="text-xs font-bold text-[#181524] font-serif">
                  Schema-Driven Architectures
                </h4>
                <p className="text-[11px] text-[#5A5568] leading-relaxed font-sans">
                  Building modular, deterministic AI models that guarantee predictable execution.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-2 hover:border-[#1E5D3A]/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-[#E8F5EE] border border-[#C2E7D1] flex items-center justify-center text-[#1E5D3A]">
                    <Database className="w-4 h-4 text-[#1E5D3A]" />
                  </div>
                  <Tooltip
                    title="Data Dignity & Air-Gap"
                    badge="Zero Telemetry"
                    position="bottom-left"
                    content="Your memories and transcripts reside exclusively on your local hardware in encrypted SQLite partitions (AES-256)."
                  />
                </div>
                <h4 className="text-xs font-bold text-[#181524] font-serif">
                  Data Dignity
                </h4>
                <p className="text-[11px] text-[#5A5568] leading-relaxed font-sans">
                  Championing user-owned memory vaults with zero third-party telemetry or surveillance.
                </p>
              </div>
            </div>
          </div>

          {/* Genesis & Foundations Footer */}
          <div className="pt-4 border-t border-[#ECE7DE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5A5568]">
            <p className="max-w-2xl leading-relaxed">
              <strong className="text-[#5A3882] font-semibold font-display">Lavender Hill Studio</strong> derives its name from <strong className="text-[#181524] font-semibold">Lavender Street in Griffin (Queensland, Australia)</strong>, where Paul and his wife, Carmel, established their &ldquo;forever home&rdquo;—anchoring our craft in permanence, sanctuary, and resilient calm.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 rounded-full bg-[#F5F2EB] border border-[#E0DACF] text-[10px] font-mono text-[#5A5568] font-medium">
                AIEE Certified
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#F5F2EB] border border-[#E0DACF] text-[10px] font-mono text-[#5A5568] font-medium">
                Sovereign 100%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. THE SIX COMPANION PERSONAS GRID                                        */}
      {/* ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#7B5C9E] uppercase tracking-wider font-semibold">
              Cognitive Personas
            </span>
            <span className="text-xs text-[#5A5568]">• Specialized Dual-Path Human-Centred AI Avatar's</span>
          </div>
        </div>

        {filteredPersonas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPersonas.map((persona: PersonaData) => {
              const isSelected = persona.id === selectedId;

              return (
                <div
                  key={persona.id}
                  id={`persona-card-${persona.id}`}
                  onClick={() => {
                    onSelect(persona.id);
                    onOpenChat(persona.id);
                  }}
                  className={`group relative rounded-2xl border p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg ${
                    isSelected
                      ? 'bg-white border-[#7B5C9E] shadow-md ring-2 ring-[#7B5C9E]/30'
                      : 'bg-white/95 border-[#E5E0D8] hover:border-[#7B5C9E]/60 shadow-xs'
                  }`}
                >
                  {/* Top Row: Icon + Pronoun / Codename */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <CompanionAvatar
                          persona={persona}
                          size="md"
                          showStatusRing={true}
                          isOnline={true}
                          showBadgeIcon={true}
                          borderGlow={isSelected}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-[#181524] font-serif">
                              {persona.name}
                            </h3>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#F5F2EB] text-[#5A5568] border border-[#D8D2C6]">
                              {persona.id.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-[#7B5C9E] font-medium font-sans">
                            {persona.codename}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-[#5A3882] bg-[#F2ECF9] border border-[#D5C6EC] px-2.5 py-0.5 rounded-full flex items-center gap-1 group-hover:bg-[#7B5C9E] group-hover:text-white transition-all font-semibold">
                        <span>Chat</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs text-[#5A5568] leading-relaxed mb-3 font-sans">
                      {persona.tagline}
                    </p>

                    {/* Unique Feature Highlight Pills */}
                    <div className="space-y-1.5 mb-4">
                      {persona.uniqueFeatures.slice(0, 2).map((feat, idx) => (
                        <div 
                          key={idx} 
                          className="text-[11px] bg-[#FAF8F5] border border-[#ECE7DE] rounded-xl px-2.5 py-1.5 text-[#3B3450] flex items-start justify-between gap-1.5 group/feat hover:border-[#7B5C9E]/40 transition-colors"
                        >
                          <div className="flex items-start gap-1.5 min-w-0 pr-1">
                            <span className="text-[#7B5C9E] font-bold text-[12px] leading-none mt-0.5">•</span>
                            <div>
                              <strong className="text-[#181524] font-semibold">{feat.title}: </strong>
                              <span className="text-[#5A5568] line-clamp-1">{feat.description}</span>
                            </div>
                          </div>
                          {feat.technicalKey && (
                            <Tooltip
                              title={feat.title}
                              badge={feat.technicalKey}
                              position="top-right"
                              content={feat.description}
                              className="shrink-0"
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Specialization Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {persona.specializations.slice(0, 3).map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#F5F2EB] text-[#5A5568] px-2 py-0.5 rounded-md border border-[#E0DACF] font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                      {persona.specializations.length > 3 && (
                        <span className="text-[10px] text-stone-400 px-1 py-0.5">
                          +{persona.specializations.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Card Action */}
                  <div className="pt-3 border-t border-[#ECE7DE] flex items-center justify-between text-xs">
                    <span className="text-[#5A5568] font-mono text-[11px]">
                      {persona.identity.genderPronoun}
                    </span>
                    <button
                      id={`chat-btn-${persona.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(persona.id);
                        onOpenChat(persona.id);
                      }}
                      className="inline-flex items-center gap-1.5 font-semibold text-[#5A3882] group-hover:text-white transition-all bg-[#F2ECF9] group-hover:bg-[#7B5C9E] px-3 py-1 rounded-xl border border-[#D5C6EC] group-hover:border-[#653E8A]"
                    >
                      <span>Chat with {persona.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State (when personas filter produces 0 and no founder match) */
          !showFounderCard && (
            <div className="rounded-2xl border border-[#E0DACF] bg-white p-8 text-center max-w-md mx-auto my-6 shadow-xs">
              <Search className="w-8 h-8 text-stone-400 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-[#181524] mb-1">No matching team entities</h3>
              <p className="text-xs text-[#5A5568] mb-4">
                No team member or companion matched &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;Paul&rdquo;, &ldquo;Toni&rdquo;, &ldquo;ethics&rdquo;, or &ldquo;safety&rdquo;.
              </p>
              <button
                id="reset-search-filter-btn"
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 rounded-xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] text-xs font-semibold transition-colors"
              >
                Clear Filter
              </button>
            </div>
          )
        )}
      </div>
    </section>
  );
};
