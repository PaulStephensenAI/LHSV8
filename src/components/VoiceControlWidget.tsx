import React, { useState, useMemo } from 'react';
import { 
  Mic, 
  MicOff, 
  Radio, 
  CheckCircle2, 
  Sparkles, 
  Sliders, 
  Volume2, 
  Maximize2, 
  HelpCircle, 
  X, 
  Info,
  ChevronRight,
  AlertCircle,
  Search,
  Users,
  ShieldCheck,
  MessageSquare,
  WifiOff,
  BookOpen,
  FileText,
  VolumeX,
  Play,
  Check,
  Headphones,
  Video
} from 'lucide-react';
import { ViewSectionId, VoiceControlStatus, VoiceFeedback, CompanionId } from '../types';

interface VoiceControlWidgetProps {
  isListening: boolean;
  isSupported: boolean;
  status: VoiceControlStatus;
  interimTranscript: string;
  feedback: VoiceFeedback | null;
  volumeLevel: number;
  activeViewSection: ViewSectionId;
  activeCompanionId?: CompanionId;
  onToggleListening: () => void;
  onSelectSection: (section: ViewSectionId) => void;
  onSelectCompanion?: (companionId: CompanionId) => void;
  onOpenChat?: (companionId?: CompanionId) => void;
  onOpenCharter?: () => void;
  onOpenLedger?: () => void;
  onOpenTrainingFiles?: () => void;
  onOpenTutorial?: () => void;
  onToggleOffline?: () => void;
}

type CommandCategory = 'all' | 'navigation' | 'companions' | 'chat' | 'governance' | 'system';

interface VoiceCommandItem {
  id: string;
  category: CommandCategory;
  categoryLabel: string;
  title: string;
  description: string;
  phrases: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  badge?: string;
  actionText: string;
  action: () => void;
}

const COMMAND_SHORTCUTS: { section: ViewSectionId; label: string; icon: any; color: string; bg: string; phrases: string[] }[] = [
  {
    section: 'workspace',
    label: 'Companion Workspace',
    icon: Sliders,
    color: 'text-purple-400',
    bg: 'bg-purple-950/60 border-purple-800/60 hover:bg-purple-900/60',
    phrases: ['"Workspace"', '"Go to workspace"', '"Open workspace"', '"Companions"']
  },
  {
    section: 'vocal-tones',
    label: 'Vocal Tone Synthesizer',
    icon: Volume2,
    color: 'text-indigo-400',
    bg: 'bg-indigo-950/60 border-indigo-800/60 hover:bg-indigo-900/60',
    phrases: ['"Vocal tones"', '"Synthesizer"', '"Acoustic synthesizer"', '"Sound"']
  },
  {
    section: 'spatial-lab',
    label: '3D Spatial Hologram Lab',
    icon: Maximize2,
    color: 'text-amber-400',
    bg: 'bg-amber-950/60 border-amber-800/60 hover:bg-amber-900/60',
    phrases: ['"Spatial lab"', '"3D spatial"', '"Hologram"', '"Open spatial"']
  }
];

export const VoiceControlWidget: React.FC<VoiceControlWidgetProps> = ({
  isListening,
  isSupported,
  status,
  interimTranscript,
  feedback,
  volumeLevel,
  activeViewSection,
  activeCompanionId = 'toni',
  onToggleListening,
  onSelectSection,
  onSelectCompanion,
  onOpenChat,
  onOpenCharter,
  onOpenLedger,
  onOpenTrainingFiles,
  onOpenTutorial,
  onToggleOffline
}) => {
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CommandCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [executedCommandId, setExecutedCommandId] = useState<string | null>(null);

  // Full Voice Commands Catalog
  const allCommands: VoiceCommandItem[] = useMemo(() => [
    // Section Navigation Commands
    {
      id: 'nav-workspace',
      category: 'navigation',
      categoryLabel: 'Section Navigation',
      title: 'Companion Workspace',
      description: 'Navigates to the main companion roster, hero cards, dual-path deployment, and workspace planner.',
      phrases: ['"Workspace"', '"Go to workspace"', '"Open workspace"', '"Companions"', '"Home"', '"Overview"'],
      icon: Sliders,
      color: 'text-purple-400',
      bg: 'bg-purple-950/40 border-purple-800/50',
      badge: 'Core View',
      actionText: 'Switch to Workspace',
      action: () => onSelectSection('workspace')
    },
    {
      id: 'nav-vocal-tones',
      category: 'navigation',
      categoryLabel: 'Section Navigation',
      title: 'Vocal Tone Synthesizer',
      description: 'Enters the real-time Web Audio harmonic acoustics lab with diaphragmatic pacing & whisper synthesis.',
      phrases: ['"Vocal tones"', '"Synthesizer"', '"Acoustic synthesizer"', '"Sound"', '"Voice synthesizer"'],
      icon: Volume2,
      color: 'text-indigo-400',
      bg: 'bg-indigo-950/40 border-indigo-800/50',
      badge: 'Audio Lab',
      actionText: 'Switch to Vocal Tones',
      action: () => onSelectSection('vocal-tones')
    },
    {
      id: 'nav-spatial-lab',
      category: 'navigation',
      categoryLabel: 'Section Navigation',
      title: '3D Spatial Hologram Lab',
      description: 'Opens interactive Three.js volumetric projections, scanline sweeps, and coordinate grid testing.',
      phrases: ['"Spatial lab"', '"3D spatial"', '"Hologram"', '"Open spatial"', '"Volumetric"', '"3D lab"'],
      icon: Maximize2,
      color: 'text-amber-400',
      bg: 'bg-amber-950/40 border-amber-800/50',
      badge: '3D Canvas',
      actionText: 'Switch to Spatial Lab',
      action: () => onSelectSection('spatial-lab')
    },

    // Companion Selection Commands
    {
      id: 'comp-toni',
      category: 'companions',
      categoryLabel: 'Companion Activation',
      title: 'Activate Toni',
      description: 'Sets Toni as active companion (Lead Architect, Calming Facilitator & Adaptive Pacer).',
      phrases: ['"Switch to Toni"', '"Toni"', '"Select Toni"', '"Activate Toni"'],
      icon: Users,
      color: 'text-purple-400',
      bg: 'bg-purple-950/30 border-purple-800/40',
      badge: 'Lead Architect',
      actionText: 'Select Toni',
      action: () => onSelectCompanion?.('toni')
    },
    {
      id: 'comp-elysian',
      category: 'companions',
      categoryLabel: 'Companion Activation',
      title: 'Activate Elysian',
      description: 'Sets Elysian as active companion (Cognitive Neuro-Rehab Specialist & Ethics Interceptor).',
      phrases: ['"Switch to Elysian"', '"Elysian"', '"Select Elysian"', '"Activate Elysian"'],
      icon: ShieldCheck,
      color: 'text-teal-400',
      bg: 'bg-teal-950/30 border-teal-800/40',
      badge: 'Neuro-Rehab',
      actionText: 'Select Elysian',
      action: () => onSelectCompanion?.('elysian')
    },
    {
      id: 'comp-phoebe',
      category: 'companions',
      categoryLabel: 'Companion Activation',
      title: 'Activate Phoebe',
      description: 'Sets Phoebe as active companion (Speech & Language Pathologist, Predictive Forecaster).',
      phrases: ['"Switch to Phoebe"', '"Phoebe"', '"Select Phoebe"', '"Activate Phoebe"'],
      icon: Sparkles,
      color: 'text-pink-400',
      bg: 'bg-pink-950/30 border-pink-800/40',
      badge: 'Speech Therapy',
      actionText: 'Select Phoebe',
      action: () => onSelectCompanion?.('phoebe')
    },
    {
      id: 'comp-kenny',
      category: 'companions',
      categoryLabel: 'Companion Activation',
      title: 'Activate Kenny',
      description: 'Sets Kenny as active companion (Occupational Strategist & Struggle-Preserving Guardian).',
      phrases: ['"Switch to Kenny"', '"Kenny"', '"Select Kenny"', '"Activate Kenny"'],
      icon: Users,
      color: 'text-amber-400',
      bg: 'bg-amber-950/30 border-amber-800/40',
      badge: 'Autonomy Guard',
      actionText: 'Select Kenny',
      action: () => onSelectCompanion?.('kenny')
    },
    {
      id: 'comp-holly',
      category: 'companions',
      categoryLabel: 'Companion Activation',
      title: 'Activate Holly',
      description: 'Sets Holly as active companion (Somatic Voice Guide & Hardware Thermal Throttler).',
      phrases: ['"Switch to Holly"', '"Holly"', '"Select Holly"', '"Activate Holly"'],
      icon: Volume2,
      color: 'text-cyan-400',
      bg: 'bg-cyan-950/30 border-cyan-800/40',
      badge: 'Somatic Tone',
      actionText: 'Select Holly',
      action: () => onSelectCompanion?.('holly')
    },
    {
      id: 'comp-ari',
      category: 'companions',
      categoryLabel: 'Companion Activation',
      title: 'Activate Ari',
      description: 'Sets Ari as active companion (Spatial Systems Engineer & 3D Projection Modeler).',
      phrases: ['"Switch to Ari"', '"Ari"', '"Select Ari"', '"Activate Ari"'],
      icon: Maximize2,
      color: 'text-indigo-400',
      bg: 'bg-indigo-950/30 border-indigo-800/40',
      badge: 'Spatial 3D',
      actionText: 'Select Ari',
      action: () => onSelectCompanion?.('ari')
    },

    // Chat Commands
    {
      id: 'chat-open',
      category: 'chat',
      categoryLabel: 'Conversational Chat',
      title: 'Open Companion Chat',
      description: 'Opens the sovereign end-to-end scannable chat modal with your currently active persona.',
      phrases: ['"Open chat"', '"Talk to companion"', '"Start conversation"', '"Message"', '"Talk to Toni"'],
      icon: MessageSquare,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/30 border-emerald-800/40',
      badge: 'Interactive Dialogue',
      actionText: 'Open Chat Modal',
      action: () => onOpenChat?.(activeCompanionId)
    },

    // Governance & Security Commands
    {
      id: 'gov-charter',
      category: 'governance',
      categoryLabel: 'Governance & Audits',
      title: 'AIEE Ethical Governance Charter',
      description: 'Opens the 10-point Artificial Intelligence Ethical Engineering Standard and Privacy Promise.',
      phrases: ['"Open charter"', '"Privacy promise"', '"Ethics"', '"Ethical charter"', '"AIEE Charter"'],
      icon: BookOpen,
      color: 'text-purple-400',
      bg: 'bg-purple-950/30 border-purple-800/40',
      badge: 'AIEE Standard',
      actionText: 'View Charter',
      action: () => onOpenCharter?.()
    },
    {
      id: 'gov-ledger',
      category: 'governance',
      categoryLabel: 'Governance & Audits',
      title: 'Dolphin Security SQLite Ledger',
      description: 'Opens the immutable local SQLite cryptographic audit trail and SHA-256 block ledger.',
      phrases: ['"Show ledger"', '"Dolphin ledger"', '"Audit trail"', '"Security ledger"', '"SQLite ledger"'],
      icon: ShieldCheck,
      color: 'text-teal-400',
      bg: 'bg-teal-950/30 border-teal-800/40',
      badge: 'SHA-256 Chain',
      actionText: 'View Ledger',
      action: () => onOpenLedger?.()
    },
    {
      id: 'gov-training',
      category: 'governance',
      categoryLabel: 'Governance & Audits',
      title: 'AI Training Context Files Hub',
      description: 'Inspects all 7 studio foundational training papers, ethics manifestos, and research portfolios.',
      phrases: ['"Training files"', '"Context files"', '"Studio context"', '"Training hub"', '"Inspect files"'],
      icon: FileText,
      color: 'text-amber-400',
      bg: 'bg-amber-950/30 border-amber-800/40',
      badge: '7 Files',
      actionText: 'View Training Files',
      action: () => onOpenTrainingFiles?.()
    },

    // System & Offline Sovereignty Commands
    {
      id: 'sys-tutorial',
      category: 'system',
      categoryLabel: 'Video Guides & Tutorials',
      title: 'Simulation Video Walkthroughs',
      description: 'Opens the interactive simulation tutorials and video masterclasses for Vocal Synthesizer & Spatial Hologram Lab.',
      phrases: ['"Open tutorial"', '"Video guide"', '"Watch tutorial"', '"Show guide"', '"How to use"'],
      icon: Video,
      color: 'text-purple-400',
      bg: 'bg-purple-950/30 border-purple-800/40',
      badge: 'Video + Guides',
      actionText: 'Watch Video Guides',
      action: () => onOpenTutorial?.()
    },
    {
      id: 'sys-offline',
      category: 'system',
      categoryLabel: 'Offline Hardware',
      title: 'Toggle Offline / Cloud Mode',
      description: 'Switches between Vercel Edge synchronization and 100% Offline Samsung Galaxy Tab S10 mode.',
      phrases: ['"Offline mode"', '"Galaxy tab mode"', '"Cloud sync"', '"Toggle offline"', '"Offline tab"'],
      icon: WifiOff,
      color: 'text-amber-400',
      bg: 'bg-amber-950/30 border-amber-800/40',
      badge: 'Hardware Dual-Path',
      actionText: 'Toggle Offline Mode',
      action: () => onToggleOffline?.()
    }
  ], [
    onSelectSection, 
    onSelectCompanion, 
    onOpenChat, 
    activeCompanionId, 
    onOpenCharter, 
    onOpenLedger, 
    onOpenTrainingFiles,
    onOpenTutorial,
    onToggleOffline
  ]);

  // Filter commands by category and search
  const filteredCommands = useMemo(() => {
    return allCommands.filter(cmd => {
      const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesQuery = 
        cmd.title.toLowerCase().includes(query) ||
        cmd.description.toLowerCase().includes(query) ||
        cmd.categoryLabel.toLowerCase().includes(query) ||
        cmd.phrases.some(p => p.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [allCommands, selectedCategory, searchQuery]);

  const handleExecuteCommand = (cmd: VoiceCommandItem) => {
    cmd.action();
    setExecutedCommandId(cmd.id);
    setTimeout(() => {
      setExecutedCommandId(null);
    }, 1500);
  };

  return (
    <>
      {/* Mini Top/Floating Voice Status Overlay when active or feedback is shown */}
      {(isListening || feedback) && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm sm:max-w-md w-full animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-auto">
          <div className="bg-[#14121F]/95 backdrop-blur-md border border-purple-500/40 rounded-2xl p-3.5 shadow-2xl shadow-purple-950/80 space-y-2.5">
            {/* Header Status Bar */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className={`relative flex items-center justify-center w-8 h-8 rounded-xl ${
                  isListening ? 'bg-purple-600 shadow-md shadow-purple-900' : 'bg-stone-800'
                }`}>
                  {isListening ? (
                    <>
                      <span className="absolute inset-0 rounded-xl bg-purple-500 animate-ping opacity-30" />
                      <Radio className="w-4 h-4 text-white animate-pulse" />
                    </>
                  ) : (
                    <Mic className="w-4 h-4 text-stone-300" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-100 font-display tracking-tight">
                      Web Speech Voice Control
                    </span>
                    <span className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded font-semibold border ${
                      isListening 
                        ? 'bg-purple-950/80 border-purple-500/60 text-purple-300 animate-pulse'
                        : 'bg-stone-900 border-stone-700 text-stone-400'
                    }`}>
                      {isListening ? 'LISTENING' : 'IDLE'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    {isListening ? 'Say any voice command or click Reference' : 'Voice command listener ready'}
                  </p>
                </div>
              </div>

              {/* Action Tools */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsHelpOpen(true)}
                  className="px-2 py-1 rounded-lg bg-purple-900/60 hover:bg-purple-800/80 border border-purple-600/50 text-purple-200 hover:text-white transition-all text-xs flex items-center gap-1.5 font-medium shadow-xs"
                  title="Open Voice Command Reference Guide"
                >
                  <BookOpen className="w-3.5 h-3.5 text-purple-300" />
                  <span className="text-[11px] font-bold">Commands</span>
                </button>
                <button
                  onClick={onToggleListening}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800/80 transition-all"
                  title={isListening ? 'Stop Listening' : 'Start Listening'}
                >
                  {isListening ? <MicOff className="w-4 h-4 text-red-400" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Live Audio Visualizer Bars when listening */}
            {isListening && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B0A10] border border-[#2B283A]">
                <div className="flex items-end gap-1 h-4 w-12 flex-shrink-0">
                  <span className="w-1 bg-purple-400 rounded-full animate-typing-dot-1 h-2" />
                  <span className="w-1 bg-purple-400 rounded-full animate-typing-dot-2 h-4" />
                  <span className="w-1 bg-purple-400 rounded-full animate-typing-dot-3 h-3" />
                  <span className="w-1 bg-cyan-400 rounded-full animate-typing-dot-2 h-3.5" />
                  <span className="w-1 bg-indigo-400 rounded-full animate-typing-dot-1 h-2" />
                </div>
                <div className="flex-1 truncate text-xs font-mono text-stone-300">
                  {interimTranscript ? (
                    <span className="text-purple-200 font-semibold italic">"{interimTranscript}"</span>
                  ) : (
                    <span className="text-stone-500 italic">Listening for: "Workspace", "Vocal Tones", "Spatial Lab", "Switch to Toni"...</span>
                  )}
                </div>
              </div>
            )}

            {/* Last Execution / Feedback Toast */}
            {feedback && (
              <div className={`p-2.5 rounded-xl border flex items-start gap-2.5 text-xs animate-in fade-in duration-150 ${
                feedback.type === 'success'
                  ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-200'
                  : feedback.type === 'error'
                  ? 'bg-red-950/60 border-red-700/60 text-red-200'
                  : 'bg-stone-900 border-stone-700 text-stone-300'
              }`}>
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : feedback.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="font-semibold">{feedback.message}</div>
                  {feedback.recognizedPhrase && (
                    <div className="text-[11px] opacity-80 mt-0.5 font-mono">
                      Heard: "{feedback.recognizedPhrase}"
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick-Click Command Reference Chips */}
            <div className="space-y-1.5 pt-1 border-t border-stone-800/80">
              <div className="flex items-center justify-between text-[10px] text-stone-400 px-1 font-mono">
                <span>QUICK JUMP</span>
                <button 
                  onClick={() => setIsHelpOpen(true)}
                  className="text-purple-300 hover:text-purple-200 underline cursor-pointer"
                >
                  View All 14 Voice Commands →
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {COMMAND_SHORTCUTS.map(cmd => {
                  const isCurrent = activeViewSection === cmd.section;
                  const IconComponent = cmd.icon;
                  return (
                    <button
                      key={cmd.section}
                      onClick={() => onSelectSection(cmd.section)}
                      className={`px-2 py-1 rounded-lg border text-left flex items-center gap-1.5 transition-all text-[11px] ${cmd.bg} ${
                        isCurrent ? 'ring-1 ring-white/30 border-white/40 font-bold' : ''
                      }`}
                    >
                      <IconComponent className={`w-3 h-3 ${cmd.color} flex-shrink-0`} />
                      <span className="truncate text-stone-200 text-[10px]">{cmd.label.split(' ')[0]}</span>
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-auto flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Voice Command Reference Modal View */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#12111A] border border-[#3D3754] rounded-3xl max-w-4xl w-full shadow-2xl text-stone-200 relative max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Top Three-Tone Decorative Accent Line */}
            <div className="h-1 bg-gradient-to-r from-purple-500 via-teal-400 to-amber-400 w-full shrink-0" />

            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-stone-800/80 shrink-0 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center shrink-0 shadow-md shadow-purple-950">
                    <Headphones className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-bold text-stone-100 font-display">
                        Voice Command Reference
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-700 font-semibold">
                        Web Speech API
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-semibold">
                        100% On-Device
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Explore the complete vocal directory. Speak any recognized phrase naturally, or click a card to simulate.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={onToggleListening}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isListening
                        ? 'bg-purple-600 border-purple-500 text-white shadow-md animate-pulse'
                        : 'bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-200'
                    }`}
                  >
                    {isListening ? (
                      <>
                        <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
                        <span>Mic Active</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5 text-purple-400" />
                        <span>Start Mic</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setIsHelpOpen(false)}
                    className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-all"
                    aria-label="Close Reference Guide"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Interactive Live Voice Testing Bar */}
              <div className="p-3 rounded-2xl bg-[#1A1824] border border-[#2F2942] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-3 h-3 rounded-full shrink-0 ${isListening ? 'bg-emerald-400 animate-ping' : 'bg-stone-600'}`} />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-stone-200 flex items-center gap-2">
                      <span>Live Speech Tester</span>
                      <span className="text-[10px] text-stone-400 font-normal">
                        ({isListening ? 'Listening for your voice...' : 'Mic is idle. Click "Start Mic" to practice'})
                      </span>
                    </div>
                    <div className="text-xs font-mono text-purple-300 truncate mt-0.5">
                      {interimTranscript ? `"${interimTranscript}"` : feedback ? feedback.message : 'Say: "Workspace", "Vocal Tones", "Spatial Lab", "Switch to Elysian"...'}
                    </div>
                  </div>
                </div>

                {/* Quick Search */}
                <div className="relative w-full sm:w-64 shrink-0">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search vocal triggers..."
                    className="w-full bg-[#12111A] border border-stone-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-purple-500 font-sans"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all' as CommandCategory, label: 'All Commands', count: allCommands.length },
                  { id: 'navigation' as CommandCategory, label: '🧭 Navigation', count: allCommands.filter(c => c.category === 'navigation').length },
                  { id: 'companions' as CommandCategory, label: '👥 Companions', count: allCommands.filter(c => c.category === 'companions').length },
                  { id: 'chat' as CommandCategory, label: '💬 Chat', count: allCommands.filter(c => c.category === 'chat').length },
                  { id: 'governance' as CommandCategory, label: '🛡️ Governance & Audits', count: allCommands.filter(c => c.category === 'governance').length },
                  { id: 'system' as CommandCategory, label: '📶 Offline Mode', count: allCommands.filter(c => c.category === 'system').length }
                ].map((tab) => {
                  const isActive = selectedCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-950 border border-purple-500'
                          : 'bg-stone-900/80 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-purple-800 text-purple-200' : 'bg-stone-800 text-stone-400'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Body: Commands Grid */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 max-h-[50vh]">
              {filteredCommands.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Search className="w-8 h-8 text-stone-600 mx-auto" />
                  <p className="text-sm text-stone-400 font-medium">No voice triggers match "{searchQuery}"</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 text-stone-200 text-xs font-semibold hover:bg-stone-700"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredCommands.map((cmd) => {
                    const Icon = cmd.icon;
                    const isExecuted = executedCommandId === cmd.id;
                    return (
                      <div
                        key={cmd.id}
                        className={`p-4 rounded-2xl border ${cmd.bg} space-y-3 transition-all group hover:border-purple-500/60 relative overflow-hidden flex flex-col justify-between`}
                      >
                        {/* Top Accent & Title */}
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-xl bg-stone-900/80 border border-stone-700/80 flex items-center justify-center shrink-0">
                                <Icon className={`w-4 h-4 ${cmd.color}`} />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-stone-100 font-serif">
                                  {cmd.title}
                                </h4>
                                <span className="text-[10px] text-stone-400 font-mono">
                                  {cmd.categoryLabel}
                                </span>
                              </div>
                            </div>

                            {cmd.badge && (
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-stone-900 border border-stone-700 text-stone-300 shrink-0">
                                {cmd.badge}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-stone-300 font-sans leading-relaxed">
                            {cmd.description}
                          </p>
                        </div>

                        {/* Vocal Triggers & Click-to-Test */}
                        <div className="space-y-2 pt-2 border-t border-stone-800/60">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-semibold flex items-center gap-1.5">
                            <Mic className="w-3 h-3 text-purple-400" />
                            <span>Recognized Vocal Triggers:</span>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {cmd.phrases.map((phrase, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-stone-900/90 border border-stone-700/80 text-stone-200 font-medium"
                              >
                                {phrase}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={() => handleExecuteCommand(cmd)}
                            className={`w-full mt-2 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border ${
                              isExecuted
                                ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                                : 'bg-stone-800/90 hover:bg-purple-950 border-stone-700 text-stone-200 hover:text-white hover:border-purple-600/60'
                            }`}
                          >
                            {isExecuted ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-white" />
                                <span>Command Triggered!</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 text-purple-400" />
                                <span>Test / Execute "{cmd.title}"</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer: Privacy & Guidance */}
            <div className="p-4 sm:p-5 border-t border-stone-800/80 bg-[#0E0D14] shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-stone-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Zero Cloud Audio Uploads:</strong> Web Speech API processes commands 100% locally in your browser. Audio chimes confirm execution.
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsHelpOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-md shadow-purple-950"
                >
                  Return to Studio
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

