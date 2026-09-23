import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Database, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Layers, 
  Terminal, 
  Search, 
  ExternalLink,
  Calendar,
  Eye,
  Sliders,
  Check,
  Share2,
  RefreshCw,
  Cpu,
  Brain,
  Quote
} from 'lucide-react';
import { CompanionId } from '../types';
import { PERSONAS } from '../data/personasData';
import { EMBODIED_NOTEBOOKS, EmbodiedNotebookItem } from '../data/embodiedNotebooksData';
import { CompanionAvatar } from './CompanionAvatar';
import { Tooltip } from './Tooltip';

interface EmbodiedNotebookStudioProps {
  onOpenConsultation: () => void;
  onOpenTrainingFiles: () => void;
  onOpenChat: (id: CompanionId) => void;
  className?: string;
}

export const EmbodiedNotebookStudio: React.FC<EmbodiedNotebookStudioProps> = ({
  onOpenConsultation,
  onOpenTrainingFiles,
  onOpenChat,
  className = ''
}) => {
  const [selectedNotebookId, setSelectedNotebookId] = useState<string>(EMBODIED_NOTEBOOKS[0].id);
  const [activeTab, setActiveTab] = useState<'interactive-linker' | 'architecture' | 'how-it-works'>('interactive-linker');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isSimulatingQuery, setIsSimulatingQuery] = useState<boolean>(false);
  const [activeCitationModal, setActiveCitationModal] = useState<{ reference: string; excerpt: string } | null>(null);

  const activeNotebook = EMBODIED_NOTEBOOKS.find(nb => nb.id === selectedNotebookId) || EMBODIED_NOTEBOOKS[0];
  const linkedPersona = PERSONAS.find(p => p.id === activeNotebook.companionAffinity) || PERSONAS[0];

  const handleSimulateCustom = () => {
    setIsSimulatingQuery(true);
    setTimeout(() => {
      setIsSimulatingQuery(false);
    }, 400);
  };

  return (
    <section 
      id="embodied-notebooks-studio"
      aria-labelledby="notebooks-studio-title"
      className={`rounded-[32px] bg-[#F9F7F4] border border-[#E5E0D8] p-5 sm:p-8 lg:p-10 shadow-sm space-y-8 relative overflow-hidden ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -mt-20" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -mb-20" />

      {/* Header Banner */}
      <div className="space-y-4 max-w-4xl relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2ECF9] border border-[#D4C4E8] text-[#653E8A] text-xs font-bold uppercase tracking-wider font-mono">
          <BookOpen className="w-3.5 h-3.5 text-[#7B5C9E]" />
          <span>Core Studio Architecture • Embodied Notebooks</span>
        </div>

        <h2 id="notebooks-studio-title" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#181524] tracking-tight leading-tight">
          How AI Avatars Embody Your Domain Knowledge
          <span className="block text-base sm:text-xl font-serif font-normal text-[#7B5C9E] mt-1">
            Linking proprietary client notes, SOPs, and research to sovereign cognitive companions.
          </span>
        </h2>

        <p className="text-[#5A5568] text-sm sm:text-base leading-relaxed">
          Generic AI tools guess from public internet noise and invent false facts. Lavender Hill’s <strong>Embodied Notebooks</strong> fuse your private company knowledge directly into the avatar’s thinking core. Your companion doesn’t just read your notes—they <em>embody</em> your domain expertise with strict citation transparency, complete offline data dignity, and unhurried human pacing.
        </p>
      </div>

      {/* 4 Core Pillars of Embodied Notebooks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200/80 flex items-center justify-center text-[#7B5C9E]">
            <Quote className="w-4 h-4" />
          </div>
          <h3 className="font-serif font-bold text-sm text-[#181524]">
            1. Zero Hallucination Citations
          </h3>
          <p className="text-xs text-[#5A5568] leading-relaxed">
            Every insight provides exact provenance. The avatar cites paragraph, page, and policy references straight from your customized notebook.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-[#234F56]">
            <Brain className="w-4 h-4" />
          </div>
          <h3 className="font-serif font-bold text-sm text-[#181524]">
            2. Persona &amp; Tone Fusion
          </h3>
          <p className="text-xs text-[#5A5568] leading-relaxed">
            Toni mentors with strategic patience, Phoebe reasons with quantitative rigour, and Kenny communicates with trauma-informed empathy.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-[#047857]">
            <Database className="w-4 h-4" />
          </div>
          <h3 className="font-serif font-bold text-sm text-[#181524]">
            3. Local SQLite Vector Vault
          </h3>
          <p className="text-xs text-[#5A5568] leading-relaxed">
            Partitioned into UI Operations and Strategic Intelligence. Operates 100% offline on Windows 11 &amp; Samsung Galaxy tablets.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-[#92400E]">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="font-serif font-bold text-sm text-[#181524]">
            4. Unconditional Data Dignity
          </h3>
          <p className="text-xs text-[#5A5568] leading-relaxed">
            You own 100% of the code, notes, and weights. Your confidential documents are never uploaded to public training loops.
          </p>
        </div>
      </div>

      {/* Main Studio Interactive Section */}
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#ECE7DE] shadow-sm overflow-hidden">
        
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-b border-[#ECE7DE] bg-[#FAFAF8]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5568]">
              Studio Workspace:
            </span>
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#ECE7DE]">
              <button
                type="button"
                onClick={() => setActiveTab('interactive-linker')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'interactive-linker'
                    ? 'bg-[#7B5C9E] text-white shadow-xs font-bold'
                    : 'text-[#5A5568] hover:text-[#181524]'
                }`}
              >
                1. Avatar + Notebook Linker
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('architecture')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'architecture'
                    ? 'bg-[#234F56] text-[#F5F2EB] shadow-xs font-bold'
                    : 'text-[#5A5568] hover:text-[#181524]'
                }`}
              >
                2. Dual-Notebook Architecture
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('how-it-works')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'how-it-works'
                    ? 'bg-[#181524] text-white shadow-xs font-bold'
                    : 'text-[#5A5568] hover:text-[#181524]'
                }`}
              >
                3. How to Link Your Data
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenTrainingFiles}
              className="px-3 py-1.5 rounded-xl bg-white border border-[#D5C6EC] text-[#5A3882] hover:bg-[#F2ECF9] font-semibold text-xs transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#7B5C9E]" />
              <span>Inspect Baseline Training Files</span>
            </button>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-3.5 py-1.5 rounded-xl bg-[#234F56] text-[#F5F2EB] hover:brightness-110 font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Request Custom Notebook</span>
            </button>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE LINKER SANDBOX */}
        {activeTab === 'interactive-linker' && (
          <div className="p-5 sm:p-7 space-y-6">
            
            {/* Step 1: Select a Domain Notebook */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#5A5568] uppercase tracking-wider">
                  Step 1: Select a Client Domain Notebook Preset
                </span>
                <span className="text-xs font-mono text-[#7B5C9E]">
                  6 Specialized Domain Presets Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {EMBODIED_NOTEBOOKS.map((nb) => {
                  const isSelected = nb.id === selectedNotebookId;
                  const persona = PERSONAS.find(p => p.id === nb.companionAffinity);

                  return (
                    <button
                      key={nb.id}
                      type="button"
                      onClick={() => setSelectedNotebookId(nb.id)}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                        isSelected 
                          ? 'border-[#7B5C9E] bg-[#F9F6FC] shadow-xs ring-1 ring-[#7B5C9E]' 
                          : 'border-[#ECE7DE] bg-white hover:border-[#D5C6EC] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-[#7B5C9E] border border-purple-200/60 font-bold truncate">
                            {nb.domainTitle.split(',')[0]}
                          </span>
                          <span className="text-[11px] font-mono text-stone-500">
                            {nb.documentCount} Docs
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-[#181524] leading-snug">
                          {nb.name}
                        </h4>
                        <p className="text-[11px] text-[#5A5568] line-clamp-2 leading-relaxed">
                          {nb.subtitle}
                        </p>
                      </div>

                      <div className="pt-2 mt-2 border-t border-[#ECE7DE] flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[#684A87] font-semibold flex items-center gap-1">
                          <span>Linked to:</span>
                          <strong className="text-[#181524]">{persona?.name}</strong>
                        </span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Bound</span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Live Avatar + Notebook Fusion Panel */}
            <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#ECE7DE] space-y-5">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#ECE7DE] pb-4">
                
                {/* Avatar Info */}
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <CompanionAvatar
                      avatarIcon={linkedPersona.avatarIcon}
                      avatarImage={linkedPersona.avatarImage}
                      name={linkedPersona.name}
                      themeColor={linkedPersona.themeColor}
                      size="lg"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-base text-[#181524]">
                        {linkedPersona.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#EAF0F1] text-[#234F56] border border-[#BFDFEA] font-bold">
                        Domain Specialist Active
                      </span>
                    </div>
                    <p className="text-xs text-[#5A5568]">
                      {linkedPersona.tagline}
                    </p>
                  </div>
                </div>

                {/* Corpus Telemetry */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-[#ECE7DE] text-[#181524]">
                    <strong>Corpus:</strong> {activeNotebook.documentCount} Files ({activeNotebook.totalTokens})
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-[#ECE7DE] text-[#7B5C9E]">
                    <strong>Partition:</strong> {activeNotebook.vectorPartition}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Local Air-Gapped Vault</span>
                  </span>
                </div>
              </div>

              {/* Invariants & Citations Pill Strip */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <span className="font-mono font-bold text-[#5A5568] uppercase tracking-wider block text-[11px]">
                    Inviolable Domain Invariants:
                  </span>
                  <ul className="space-y-1 text-[#3B3450]">
                    {activeNotebook.keyInvariants.map((inv, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono font-bold text-[#5A5568] uppercase tracking-wider block text-[11px]">
                    Grounded Source Document Citations:
                  </span>
                  <div className="space-y-1.5">
                    {activeNotebook.sampleCitations.map((cit, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveCitationModal(cit)}
                        className="w-full text-left p-2 rounded-lg bg-white border border-[#ECE7DE] hover:border-[#7B5C9E] transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span className="font-mono font-semibold text-[11px] text-[#653E8A] truncate">
                          {cit.reference}
                        </span>
                        <span className="text-[10px] text-stone-500 group-hover:text-[#7B5C9E] shrink-0 flex items-center gap-1">
                          <span>Inspect Excerpt</span>
                          <Eye className="w-3 h-3" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Interactive Domain Query Runner */}
              <div className="pt-3 border-t border-[#ECE7DE] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#181524] uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#7B5C9E]" />
                    <span>Domain Query Simulation</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#5A5568]">
                    Testing live citation grounding against {activeNotebook.name}
                  </span>
                </div>

                {/* Sample Prompt Box */}
                <div className="p-3.5 rounded-xl bg-white border border-[#ECE7DE] space-y-2">
                  <span className="text-[10px] font-mono text-[#5A5568] uppercase tracking-wider">
                    Client Question Prompt:
                  </span>
                  <p className="font-serif italic text-xs sm:text-sm text-[#181524]">
                    &ldquo;{activeNotebook.interactiveDemo.suggestedPrompt}&rdquo;
                  </p>
                </div>

                {/* Grounded Persona Response Box */}
                <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#D5C6EC] shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#ECE7DE] pb-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#7B5C9E]" />
                      <span className="font-serif font-bold text-xs sm:text-sm text-[#181524]">
                        {linkedPersona.name}&apos;s Grounded Response
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Zero Hallucinations Verified</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#3B3450] leading-relaxed">
                    {activeNotebook.interactiveDemo.sampleResponse.intro}
                  </p>

                  <div className="space-y-3">
                    {activeNotebook.interactiveDemo.sampleResponse.groundedPoints.map((point, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#FAF8F5] border border-[#ECE7DE] space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <h5 className="font-serif font-bold text-xs sm:text-sm text-[#181524]">
                            {point.title}
                          </h5>
                          <span className="text-[10px] font-mono bg-[#F2ECF9] text-[#653E8A] border border-[#D5C6EC] px-2 py-0.5 rounded-full font-semibold">
                            {point.citation}
                          </span>
                        </div>
                        <p className="text-xs text-[#5A5568] leading-relaxed">
                          {point.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs italic text-[#5A5568]">
                    {activeNotebook.interactiveDemo.sampleResponse.closing}
                  </p>

                  <div className="pt-2 border-t border-[#ECE7DE] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#5A5568]">
                    <span className="text-emerald-700 font-semibold">
                      {activeNotebook.interactiveDemo.sampleResponse.offlineVerification}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenChat(linkedPersona.id)}
                      className="text-[#7B5C9E] hover:text-[#5A3882] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Continue Conversation with {linkedPersona.name}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DUAL-NOTEBOOK ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <div className="p-5 sm:p-8 space-y-6">
            <div className="max-w-3xl space-y-2">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#181524]">
                The Offline Dual-Vault System: Keeping It Fast &amp; Private
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5568] leading-relaxed">
                To guarantee lightning-fast screen responsiveness while ensuring your confidential work never leaks to the cloud, Lavender Hill separates information into two distinct, secure compartments:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Partition 1: notebook_ui_ops */}
              <div className="p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-[#234F56]">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-50 text-[#234F56] border border-teal-200 font-bold">
                    Partition: notebook_ui_ops
                  </span>
                </div>

                <h4 className="font-serif font-bold text-base text-[#181524]">
                  Screen Layout &amp; Avatar Positioning (Temporary)
                </h4>

                <p className="text-xs text-[#5A5568] leading-relaxed">
                  Remembers how your screen is set up, keeps your avatar sitting comfortably beside you at a natural 45-degree angle, and saves your place in walkthroughs—all kept temporarily in your device&apos;s memory so everything feels instant and smooth.
                </p>

                <ul className="space-y-1.5 text-xs text-[#3B3450] bg-[#FAF8F5] p-3 rounded-xl border border-[#ECE7DE]">
                  <li>• Instant, fluid screen adjustments without stutter or lag</li>
                  <li>• Keeps your companion sitting right beside you as you work</li>
                  <li>• 100% temporary: cleanly clears itself whenever you close the app</li>
                </ul>
              </div>

              {/* Partition 2: notebook_strategic */}
              <div className="p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200/80 flex items-center justify-center text-[#7B5C9E]">
                    <Database className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-[#7B5C9E] border border-purple-200 font-bold">
                    Partition: notebook_strategic
                  </span>
                </div>

                <h4 className="font-serif font-bold text-base text-[#181524]">
                  Your Private Knowledge Vault (Encrypted &amp; Permanent)
                </h4>

                <p className="text-xs text-[#5A5568] leading-relaxed">
                  Holds your organization&apos;s manuals, clinical guides, or private research notes so your avatar can answer questions with exact page citations and zero guesswork.
                </p>

                <ul className="space-y-1.5 text-xs text-[#3B3450] bg-[#FAF8F5] p-3 rounded-xl border border-[#ECE7DE]">
                  <li>• Encrypted securely right on your own laptop or tablet</li>
                  <li>• Searches your PDFs, notes, and records without needing the internet</li>
                  <li>• Absolute privacy: your private files never train global AI models</li>
                </ul>
              </div>
            </div>

            {/* Ingestion Flowchart */}
            <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#ECE7DE] space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5568] block">
                The 4-Stage Ingestion &amp; Embodiment Pipeline:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-[#ECE7DE] space-y-1.5">
                  <span className="w-6 h-6 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center font-mono font-bold text-[11px]">
                    1
                  </span>
                  <h5 className="font-serif font-bold text-[#181524]">Document Intake</h5>
                  <p className="text-[11px] text-[#5A5568]">
                    Client supplies SOPs, PDFs, research binders, or Notion databases.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#ECE7DE] space-y-1.5">
                  <span className="w-6 h-6 rounded-lg bg-purple-50 text-[#7B5C9E] flex items-center justify-center font-mono font-bold text-[11px]">
                    2
                  </span>
                  <h5 className="font-serif font-bold text-[#181524]">Semantic Slicing</h5>
                  <p className="text-[11px] text-[#5A5568]">
                    Auto-chunked with intact headers, tables, and citation indices.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#ECE7DE] space-y-1.5">
                  <span className="w-6 h-6 rounded-lg bg-teal-50 text-[#234F56] flex items-center justify-center font-mono font-bold text-[11px]">
                    3
                  </span>
                  <h5 className="font-serif font-bold text-[#181524]">Persona Fusion</h5>
                  <p className="text-[11px] text-[#5A5568]">
                    Companion adopts domain vocabulary, invariants, and dialogue style.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#ECE7DE] space-y-1.5">
                  <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-mono font-bold text-[11px]">
                    4
                  </span>
                  <h5 className="font-serif font-bold text-[#181524]">Sovereign Handover</h5>
                  <p className="text-[11px] text-[#5A5568]">
                    Installed onto your Samsung tablet or private Vercel cloud container.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HOW TO LINK YOUR DATA */}
        {activeTab === 'how-it-works' && (
          <div className="p-5 sm:p-8 space-y-6">
            <div className="max-w-3xl space-y-2">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#181524]">
                How to Link Your Organization’s Data to a Custom Avatar
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5568] leading-relaxed">
                Whether you are an independent researcher, a clinical practice, a legal boutique, or an enterprise engineering team, deploying an Embodied Notebook follows a calm, 3-step bespoke handover:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-50 text-[#7B5C9E] font-bold border border-purple-200">
                  Step 01
                </span>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#181524]">
                  Curate Your Internal Knowledge
                </h4>
                <p className="text-xs text-[#5A5568] leading-relaxed">
                  Gather your proprietary PDF manuals, internal guidelines, case files, or research manuscripts. No special formatting is required—our pipeline ingests raw Markdown, PDF, Word, and text files.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-teal-50 text-[#234F56] font-bold border border-teal-200">
                  Step 02
                </span>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#181524]">
                  Select or Build Your Avatar
                </h4>
                <p className="text-xs text-[#5A5568] leading-relaxed">
                  Choose from our 6 existing cognitive avatars (e.g. Toni for strategy, Kenny for clinical care, Phoebe for quant analysis) or design a custom corporate persona with bespoke vocal tone and spatial postures.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  Step 03
                </span>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#181524]">
                  Zero Subscription Handover
                </h4>
                <p className="text-xs text-[#5A5568] leading-relaxed">
                  We hand over a sealed, self-contained application. Run it 100% offline on a dedicated Samsung Galaxy tablet or on your own Vercel infrastructure. Zero recurring API fees or vendor lock-in.
                </p>
              </div>
            </div>

            {/* Callout Box */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h5 className="font-serif font-bold text-sm text-[#181524]">
                  Ready to link your domain knowledge?
                </h5>
                <p className="text-xs text-[#5A5568]">
                  Schedule a private consultation with Founder Paul Stephensen to map your organization’s knowledge artifacts into an Embodied Notebook.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-5 py-2.5 rounded-xl bg-[#234F56] text-[#F5F2EB] hover:brightness-110 font-semibold text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Schedule Knowledge Consultation</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Citation Modal Popup */}
      {activeCitationModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setActiveCitationModal(null)}
        >
          <div 
            className="w-full max-w-lg bg-white rounded-2xl p-5 shadow-2xl border border-[#D5C6EC] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#ECE7DE] pb-3">
              <div className="flex items-center gap-2">
                <Quote className="w-4 h-4 text-[#7B5C9E]" />
                <h4 className="font-serif font-bold text-sm text-[#181524]">
                  Grounded Citation Excerpt
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveCitationModal(null)}
                className="text-stone-400 hover:text-stone-700 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-[#653E8A] bg-[#F2ECF9] px-2.5 py-1 rounded-md block">
                {activeCitationModal.reference}
              </span>
              <p className="font-serif italic text-xs sm:text-sm text-[#181524] bg-[#FAF8F5] p-3.5 rounded-xl border border-[#ECE7DE] leading-relaxed">
                &ldquo;{activeCitationModal.excerpt}&rdquo;
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#5A5568]">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified in Local SQLite Partition</span>
              </span>
              <button
                type="button"
                onClick={() => setActiveCitationModal(null)}
                className="px-3 py-1 rounded-lg bg-[#7B5C9E] text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
