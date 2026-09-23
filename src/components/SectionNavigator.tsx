import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Users, 
  Layers, 
  Boxes, 
  Calculator, 
  Volume2, 
  Maximize2, 
  ShieldCheck, 
  BookOpen, 
  ArrowUp, 
  X, 
  Sparkles, 
  ChevronRight,
  Info,
  GraduationCap
} from 'lucide-react';
import { ViewSectionId } from '../types';
import { EcosystemTab } from './LavenderHillEcosystem';

interface SectionNavigatorProps {
  activeViewSection: ViewSectionId;
  onSelectViewSection: (section: ViewSectionId) => void;
  onOpenTeam: () => void;
  onOpenTools: () => void;
  onOpenPlanner: () => void;
  onOpenCharter: () => void;
  onOpenLedger: () => void;
  onOpenConsultation: () => void;
  onOpenBio?: () => void;
  className?: string;
}

interface NavSectionItem {
  id: string;
  label: string;
  shortLabel: string;
  category: 'workspace' | 'lab' | 'governance';
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  color: string;
  description: string;
  action: () => void;
  isActive: boolean;
}

export const SectionNavigator: React.FC<SectionNavigatorProps> = ({
  activeViewSection,
  onSelectViewSection,
  onOpenTeam,
  onOpenTools,
  onOpenPlanner,
  onOpenCharter,
  onOpenLedger,
  onOpenConsultation,
  onOpenBio,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeAnchor, setActiveAnchor] = useState<string>('top');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  // Monitor scroll position to highlight active section and show back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 400);

      const teamEl = document.getElementById('meet-the-team');
      const ecoEl = document.getElementById('lavender-hill-ecosystem');
      const plannerEl = document.getElementById('panel-planner');
      const toolsEl = document.getElementById('panel-tools');

      if (plannerEl && scrollY >= plannerEl.offsetTop - 200) {
        setActiveAnchor('planner');
      } else if (toolsEl && scrollY >= toolsEl.offsetTop - 200) {
        setActiveAnchor('tools');
      } else if (ecoEl && scrollY >= ecoEl.offsetTop - 200) {
        setActiveAnchor('ecosystem');
      } else if (teamEl && scrollY >= teamEl.offsetTop - 200) {
        setActiveAnchor('team');
      } else {
        setActiveAnchor('top');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsExpanded(false);
  };

  const navItems: NavSectionItem[] = [
    {
      id: 'team',
      label: 'Meet the Team & Research Leadership',
      shortLabel: 'Team & Leadership',
      category: 'workspace',
      icon: Users,
      badge: '6 Personas + Founder',
      color: '#7B5C9E',
      description: 'Explore Founder Paul Stephensen’s portfolio and interact with all 6 cognitive companions (Toni, Elysian, Phoebe, Kenny, Holly, Ari).',
      action: () => {
        onOpenTeam();
        setIsExpanded(false);
      },
      isActive: activeViewSection === 'workspace' && activeAnchor === 'team'
    },
    ...(onOpenBio ? [{
      id: 'founder-bio',
      label: 'Founder Biography & Portfolio',
      shortLabel: 'Founder Bio',
      category: 'workspace' as const,
      icon: GraduationCap,
      badge: 'Paul Stephensen',
      color: '#7B5C9E',
      description: 'View Founder Paul Stephensen’s full academic biography, ethics publications, and sovereign workspace architecture.',
      action: () => {
        onOpenBio();
        setIsExpanded(false);
      },
      isActive: false
    }] : []),
    {
      id: 'top',
      label: 'Studio Overview & Hero',
      shortLabel: 'Overview',
      category: 'workspace',
      icon: Sparkles,
      color: '#7B5C9E',
      description: 'Studio introduction, active companion greeting card, and neurorehab-calm core values.',
      action: () => {
        onSelectViewSection('workspace');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsExpanded(false);
      },
      isActive: activeViewSection === 'workspace' && activeAnchor === 'top'
    },
    {
      id: 'ecosystem',
      label: 'Cloud-Based Convenience & Local Sovereignty',
      shortLabel: 'Cloud vs. Local',
      category: 'workspace',
      icon: Layers,
      badge: 'Dual-Path',
      color: '#3B4A3F',
      description: 'Architectural comparison between Path 1 (Vercel Cloud edge sync) and Path 2 (100% Offline Local Sovereign hardware).',
      action: () => {
        onSelectViewSection('workspace');
        setTimeout(() => {
          const el = document.getElementById('lavender-hill-ecosystem');
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
        setIsExpanded(false);
      },
      isActive: activeViewSection === 'workspace' && activeAnchor === 'ecosystem'
    },
    {
      id: 'tools',
      label: '2. Private Architecture & Sovereign Tools',
      shortLabel: 'Sovereign Tools',
      category: 'workspace',
      icon: Boxes,
      badge: '3 Apps',
      color: '#234F56',
      description: 'Dedicated standalone applications: Gia (voice), Angel.AI (NDIS rehab & health), and FAB (spatial generative design).',
      action: () => {
        onOpenTools();
        setIsExpanded(false);
      },
      isActive: activeViewSection === 'workspace' && activeAnchor === 'tools'
    },
    {
      id: 'planner',
      label: '3. Plan Workspace (Estimator)',
      shortLabel: 'Estimator',
      category: 'workspace',
      icon: Calculator,
      badge: '4 Steps',
      color: '#D4A373',
      description: 'Interactive 4-step configuration calculator to customize models, hardware targets, and calculate live AUD handover costs.',
      action: () => {
        onOpenPlanner();
        setIsExpanded(false);
      },
      isActive: activeViewSection === 'workspace' && activeAnchor === 'planner'
    },
    {
      id: 'vocal-tones',
      label: 'Vocal Tone & Acoustic Synthesizer',
      shortLabel: 'Acoustics',
      category: 'lab',
      icon: Volume2,
      badge: 'Lab',
      color: '#7B5C9E',
      description: 'Real-time Web Audio API harmonic sound lab for low-frequency calming tones and whisper pacing.',
      action: () => {
        onSelectViewSection('vocal-tones');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsExpanded(false);
      },
      isActive: activeViewSection === 'vocal-tones'
    },
    {
      id: 'spatial-lab',
      label: '3D Spatial Hologram Lab',
      shortLabel: 'Holograms',
      category: 'lab',
      icon: Maximize2,
      badge: '3D Lab',
      color: '#234F56',
      description: 'Interactive 3D volumetric projections, scanline frequency sweeps, and coordinate grid testing.',
      action: () => {
        onSelectViewSection('spatial-lab');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsExpanded(false);
      },
      isActive: activeViewSection === 'spatial-lab'
    },
    {
      id: 'ledger',
      label: 'Dolphin Security SQLite Ledger',
      shortLabel: 'Security Vault',
      category: 'governance',
      icon: ShieldCheck,
      color: '#3B4A3F',
      description: 'Cryptographic air-gapped security ledger simulating local AES-256 encrypted database partitions.',
      action: () => {
        onOpenLedger();
        setIsExpanded(false);
      },
      isActive: false
    },
    {
      id: 'charter',
      label: 'AIEE Ethical Governance Charter',
      shortLabel: 'Ethical Charter',
      category: 'governance',
      icon: BookOpen,
      color: '#7B5C9E',
      description: 'The 10-point Artificial Intelligence Ethical Engineering standard ensuring zero telemetry and total data dignity.',
      action: () => {
        onOpenCharter();
        setIsExpanded(false);
      },
      isActive: false
    }
  ];

  const renderNavItem = (item: NavSectionItem) => {
    const Icon = item.icon;
    const isHovered = hoveredItemId === item.id;

    return (
      <div 
        key={item.id} 
        className="relative"
        onMouseEnter={() => setHoveredItemId(item.id)}
        onMouseLeave={() => setHoveredItemId(null)}
      >
        <button
          onClick={item.action}
          aria-describedby={`tooltip-${item.id}`}
          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between group outline-none focus-visible:ring-2 focus-visible:ring-[#7B5C9E] ${
            item.isActive
              ? 'bg-[#F2ECF9] text-[#5A3882] font-semibold border border-[#D5C6EC] shadow-2xs'
              : 'text-[#181524] hover:bg-[#F5F2EB]'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <Icon 
              className={`w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-110 ${
                item.isActive ? 'text-[#7B5C9E]' : 'text-[#5A5568] group-hover:text-[#7B5C9E]'
              }`} 
            />
            <span className="truncate">{item.label}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {item.badge && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white border border-[#E5E0D8] text-[#5A5568]">
                {item.badge}
              </span>
            )}
            <ChevronRight className={`w-3.5 h-3.5 text-[#5A5568] transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-30 group-hover:opacity-100'}`} />
          </div>
        </button>

        {/* Subtle glassmorphic info tooltip popover */}
        {isHovered && (
          <div
            id={`tooltip-${item.id}`}
            role="tooltip"
            className="absolute left-full top-1/2 -translate-y-1/2 ml-3.5 w-64 p-3 rounded-2xl bg-[#FAF8F5]/98 border border-[#E5E0D8] shadow-xl backdrop-blur-md z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150 hidden sm:block"
          >
            {/* Top three-tone decorative accent strip */}
            <div className="absolute top-0 left-3 right-3 h-0.5 rounded-t-full bg-gradient-to-r from-[#7B5C9E] via-[#234F56] to-[#D4A373]" />
            
            <div className="flex items-start gap-2 pt-0.5">
              <Info className="w-3.5 h-3.5 text-[#7B5C9E] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-[11px] font-serif font-bold text-[#181524] flex items-center justify-between">
                  <span>{item.shortLabel}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono text-[#7B5C9E] font-medium">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed text-[#5A5568] font-sans font-normal">
                  {item.description}
                </p>
              </div>
            </div>
            
            {/* Left triangle pointer arrow */}
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FAF8F5] border-l border-b border-[#E5E0D8] rotate-45" />
          </div>
        )}
      </div>
    );
  };

  return (
    <aside 
      aria-label="Studio Section Navigator"
      className={`fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 print:hidden ${className}`}
    >
      {/* Expanded Navigator Menu */}
      {isExpanded && (
        <div 
          id="section-navigator-menu"
          role="region"
          aria-label="Section Quick Jump Directory"
          className="holo-panel rounded-3xl p-4 sm:p-5 w-80 sm:w-96 shadow-2xl border border-[#E5E0D8] bg-white/95 backdrop-blur-xl animate-in slide-in-from-bottom-5 fade-in duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DE]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7B5C9E] animate-pulse" />
              <h3 className="font-serif font-bold text-sm text-[#181524] tracking-tight">
                Studio Section Navigator
              </h3>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-full text-[#5A5568] hover:text-[#181524] hover:bg-[#F5F2EB] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#7B5C9E]"
              aria-label="Close Section Navigator"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Section Jump List */}
          <div className="py-2.5 space-y-1 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-stone-300">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5A5568] px-2 pt-1 pb-0.5">
              Core Workspace & Studio
            </div>
            {navItems.filter(item => item.category === 'workspace').map(renderNavItem)}

            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5A5568] px-2 pt-2 pb-0.5">
              Specialized Labs
            </div>
            {navItems.filter(item => item.category === 'lab').map(renderNavItem)}

            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5A5568] px-2 pt-2 pb-0.5">
              Security & Ethical Governance
            </div>
            {navItems.filter(item => item.category === 'governance').map(renderNavItem)}
          </div>

          {/* Consultation CTA in Navigator Footer */}
          <div className="pt-3 border-t border-[#ECE7DE] flex items-center justify-between gap-2">
            <button
              onClick={() => {
                onOpenConsultation();
                setIsExpanded(false);
              }}
              className="flex-1 px-3 py-2 rounded-xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] font-serif font-bold text-xs border border-[#4A7C84] shadow-xs transition-all flex items-center justify-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-[#234F56]"
            >
              <span>Book Consultation</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D4A373]" />
            </button>

            {showScrollTop && (
              <button
                onClick={scrollToTop}
                title="Scroll back to top"
                className="p-2 rounded-xl bg-[#F5F2EB] hover:bg-[#ECE7DE] text-[#181524] border border-[#E5E0D8] transition-colors flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#7B5C9E]"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Navigator Trigger Capsule Button */}
      <div className="flex items-center gap-2">
        {/* Quick Back to Top Button */}
        {showScrollTop && !isExpanded && (
          <button
            onClick={scrollToTop}
            title="Scroll to Top"
            className="w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#181524] border border-[#E5E0D8] shadow-md hover:shadow-lg flex items-center justify-center transition-all hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-[#7B5C9E]"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4 text-[#7B5C9E]" />
          </button>
        )}

        {/* Master Navigator Toggle Button */}
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          aria-expanded={isExpanded}
          aria-controls="section-navigator-menu"
          className="holo-panel pl-3.5 pr-4 py-2.5 rounded-full bg-[#181524] hover:bg-[#2A243D] text-white border border-[#4A3B69] shadow-xl hover:shadow-2xl flex items-center gap-2.5 transition-all hover:scale-[1.03] active:scale-[0.98] group outline-none focus-visible:ring-2 focus-visible:ring-[#7B5C9E]"
        >
          <div className="w-6 h-6 rounded-full bg-[#7B5C9E]/30 flex items-center justify-center border border-[#9575CD]/40">
            {isExpanded ? (
              <X className="w-3.5 h-3.5 text-purple-200" />
            ) : (
              <Compass className="w-3.5 h-3.5 text-[#D4A373] group-hover:rotate-45 transition-transform duration-300" />
            )}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-serif font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>Section Navigator</span>
              <span className="text-[9px] font-mono px-1 rounded bg-[#7B5C9E] text-white">
                Jump
              </span>
            </span>
            <span className="text-[10px] text-purple-200 font-sans">
              Quick Directory
            </span>
          </div>
        </button>
      </div>
    </aside>
  );
};
