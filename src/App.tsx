import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Database, 
  ShieldCheck, 
  Layers, 
  Sliders, 
  Volume2, 
  Maximize2, 
  Clock, 
  BookOpen, 
  Lock, 
  CheckCircle2,
  ArrowRight,
  Tablet,
  Cloud,
  MessageSquare,
  FileText,
  Mic,
  MicOff,
  Radio,
  Calendar,
  Compass,
  GraduationCap,
  Calculator,
  Video
} from 'lucide-react';
import { CompanionId, ViewSectionId } from './types';
import { PERSONAS } from './data/personasData';
import { Navbar } from './components/Navbar';
import { ExploreStudio } from './components/ExploreStudio';
import { VocalToneSynthesizer } from './components/VocalToneSynthesizer';
import { SpatialHologramLab } from './components/SpatialHologramLab';
import { DolphinSecurityLedger } from './components/DolphinSecurityLedger';
import { AIEECharterModal } from './components/AIEECharterModal';
import { PersonaChatModal } from './components/PersonaChatModal';
import { FounderBioModal } from './components/FounderBioModal';
import { ConsultationModal } from './components/ConsultationModal';
import { TrainingContextModal } from './components/TrainingContextModal';
import { BrandGuideModal } from './components/BrandGuideModal';
import { SimulationTutorialModal, SimulationToolType } from './components/SimulationTutorialModal';
import { useVoiceControl } from './hooks/useVoiceControl';
import { VoiceControlWidget } from './components/VoiceControlWidget';
import { CompanionAvatar } from './components/CompanionAvatar';
import { MasterHeroCard } from './components/MasterHeroCard';
import { SectionNavigator } from './components/SectionNavigator';
import { EcosystemTab } from './components/LavenderHillEcosystem';
import { Tooltip } from './components/Tooltip';

export default function App() {
  const [activeCompanionId, setActiveCompanionId] = useState<CompanionId>('toni');
  const [activeViewSection, setActiveViewSection] = useState<ViewSectionId>('workspace');
  const [ecosystemTab, setEcosystemTab] = useState<EcosystemTab>('team');
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [isCharterOpen, setIsCharterOpen] = useState<boolean>(false);
  const [isLedgerOpen, setIsLedgerOpen] = useState<boolean>(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);
  const [isBioModalOpen, setIsBioModalOpen] = useState<boolean>(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState<boolean>(false);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState<boolean>(false);
  const [isBrandGuideOpen, setIsBrandGuideOpen] = useState<boolean>(false);
  const [isGlobalTutorialOpen, setIsGlobalTutorialOpen] = useState<boolean>(false);
  const [globalTutorialTool, setGlobalTutorialTool] = useState<SimulationToolType>('vocal-tones');

  const activePersona = PERSONAS.find(p => p.id === activeCompanionId) || PERSONAS[0];

  const handleSelectCompanion = (id: CompanionId) => {
    setActiveCompanionId(id);
  };

  const handleOpenChat = (id?: CompanionId) => {
    if (id) {
      setActiveCompanionId(id);
    }
    setIsChatModalOpen(true);
  };

  const handleToggleOfflineMode = () => {
    setIsOfflineMode(prev => !prev);
  };

  // Web Speech API Voice Navigation Control Listener Hook
  const {
    isSupported: isVoiceSupported,
    isListening: isVoiceListening,
    status: voiceStatus,
    transcript: voiceTranscript,
    interimTranscript: voiceInterimTranscript,
    feedback: voiceFeedback,
    volumeLevel: voiceVolumeLevel,
    toggleListening: handleToggleVoiceControl
  } = useVoiceControl({
    onSwitchSection: (section: ViewSectionId) => {
      setActiveViewSection(section);
    },
    onSelectCompanion: (id: CompanionId) => {
      setActiveCompanionId(id);
    },
    onOpenChat: (id?: CompanionId) => {
      handleOpenChat(id);
    },
    onToggleOffline: () => {
      handleToggleOfflineMode();
    },
    onOpenModal: (modal) => {
      if (modal === 'charter') setIsCharterOpen(true);
      if (modal === 'ledger') setIsLedgerOpen(true);
      if (modal === 'training') setIsTrainingModalOpen(true);
      if (modal === 'bio') setIsBioModalOpen(true);
      if (modal === 'consultation') setIsConsultationModalOpen(true);
      if (modal === 'tutorial') {
        setGlobalTutorialTool(activeViewSection === 'spatial-lab' ? 'spatial-lab' : 'vocal-tones');
        setIsGlobalTutorialOpen(true);
      }
    }
  });

  const handleScrollToTeam = () => {
    setActiveViewSection('workspace');
    setEcosystemTab('team');
    setTimeout(() => {
      const target = document.getElementById('meet-the-team') || document.getElementById('panel-team') || document.getElementById('lavender-hill-ecosystem');
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleOpenToolsTab = () => {
    setActiveViewSection('workspace');
    setEcosystemTab('tools');
    setTimeout(() => {
      const target = document.getElementById('panel-tools') || document.getElementById('tab-tools');
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleOpenPlannerTab = () => {
    setActiveViewSection('workspace');
    setEcosystemTab('planner');
    setTimeout(() => {
      const target = document.getElementById('panel-planner') || document.getElementById('tab-planner');
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // Synchronize live visitor spatial & viewport context with notebook_ui_ops
  useEffect(() => {
    fetch('/api/session/ui-ops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'live-visitor-session',
        componentName: activeViewSection === 'spatial-lab' ? 'SpatialHologramLab' : activeViewSection === 'vocal-tones' ? 'VocalToneSynthesizer' : 'WorkspaceRoot',
        activeView: activeViewSection,
        interactionType: activeViewSection === 'spatial-lab' ? 'webgl_kinetic' : 'dom_node',
        spatialAnchor: activeViewSection === 'spatial-lab' ? '45_deg_side_by_side' : '0_deg_direct'
      })
    }).catch(() => {});
  }, [activeViewSection]);

  return (
    <div className="min-h-screen bg-wood-panels text-[#181524] font-sans flex flex-col selection:bg-purple-200 selection:text-purple-900 relative overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar
        activeCompanionId={activeCompanionId}
        onSelectCompanion={handleSelectCompanion}
        isOfflineMode={isOfflineMode}
        onToggleOfflineMode={handleToggleOfflineMode}
        onOpenCharter={() => setIsCharterOpen(true)}
        onOpenLedger={() => setIsLedgerOpen(true)}
        onOpenChat={handleOpenChat}
        onOpenTrainingFiles={() => setIsTrainingModalOpen(true)}
        onOpenBrandGuide={() => setIsBrandGuideOpen(true)}
        onOpenBio={() => setIsBioModalOpen(true)}
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
        onOpenNotebooks={() => {
          setActiveViewSection('workspace');
          setEcosystemTab('notebooks');
          setTimeout(() => {
            const el = document.getElementById('embodied-notebooks-studio');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
        onOpenAmbientScan={() => {
          setActiveViewSection('workspace');
          setEcosystemTab('ambient-scan');
          setTimeout(() => {
            const el = document.getElementById('ambient-room-scanner-root');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
        onScrollToTeam={handleScrollToTeam}
        isVoiceListening={isVoiceListening}
        isVoiceSupported={isVoiceSupported}
        onToggleVoiceControl={handleToggleVoiceControl}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-8">
        
        {/* VIEW 1: Primary Companion Workspace */}
        {activeViewSection === 'workspace' && (
          <div className="animate-in fade-in duration-200 space-y-8">
            
            {/* THE MASTER HERO CARD (Dual-Path Deployment + Featured Companion Roster & Hero Companion Card Cockpit) */}
            <MasterHeroCard
              activeCompanionId={activeCompanionId}
              onSelectCompanion={handleSelectCompanion}
              onOpenChat={handleOpenChat}
              onOpenConsultation={() => setIsConsultationModalOpen(true)}
              onScrollToTeam={handleScrollToTeam}
              onSelectEcosystemTab={(tab) => {
                setActiveViewSection('workspace');
                setEcosystemTab(tab);
              }}
            />

            {/* Lavender Hill Ecosystem Dual-Path Component & Interactive Studio Explorer */}
            <ExploreStudio
              activeCompanionId={activeCompanionId}
              onSelectCompanion={handleSelectCompanion}
              onOpenChat={handleOpenChat}
              onOpenBio={() => setIsBioModalOpen(true)}
              onOpenConsultation={() => setIsConsultationModalOpen(true)}
              onOpenCharter={() => setIsCharterOpen(true)}
              onOpenLedger={() => setIsLedgerOpen(true)}
              onOpenTrainingFiles={() => setIsTrainingModalOpen(true)}
              currentTab={ecosystemTab}
              onTabChange={setEcosystemTab}
            />
          </div>
        )}

        {/* Navigation Mode Sub-Bar for Alternative Labs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2.5 bg-white/95 border border-[#E5E0D8] rounded-2xl shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none p-1">
            <button
              onClick={() => setActiveViewSection('workspace')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeViewSection === 'workspace'
                  ? 'bg-[#234F56] text-[#F5F2EB] border border-[#4A7C84] shadow-xs'
                  : 'text-[#5A5568] hover:text-[#181524] hover:bg-[#F5F2EB]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Companion Workspace</span>
            </button>

            <button
              onClick={() => setActiveViewSection('vocal-tones')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeViewSection === 'vocal-tones'
                  ? 'bg-[#7B5C9E] text-white border border-[#9575CD] shadow-xs'
                  : 'text-[#5A5568] hover:text-[#181524] hover:bg-[#F5F2EB]'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Vocal Tone & Acoustic Synthesizer</span>
            </button>

            <button
              onClick={() => setActiveViewSection('spatial-lab')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeViewSection === 'spatial-lab'
                  ? 'bg-[#D4A373] text-stone-950 font-bold border border-[#F9DF9C] shadow-xs'
                  : 'text-[#5A5568] hover:text-[#181524] hover:bg-[#F5F2EB]'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>3D Spatial Hologram Lab</span>
            </button>
          </div>

          {/* Quick Active Persona Chat & Voice Launch Buttons */}
          <div className="flex items-center gap-2">
            {/* Voice Control Quick Toggle Button */}
            <button
              onClick={handleToggleVoiceControl}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border shadow-2xs ${
                isVoiceListening
                  ? 'bg-[#7B5C9E] border-[#9575CD] text-white shadow-purple-900/40 animate-pulse'
                  : 'bg-white hover:bg-stone-50 border-[#E0DACF] text-[#7B5C9E]'
              }`}
              title={isVoiceListening ? 'Click to stop Voice Control' : 'Click to enable Web Speech Voice Commands'}
            >
              {isVoiceListening ? (
                <>
                  <Radio className="w-3.5 h-3.5 animate-pulse text-white" />
                  <span>Voice Listening</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5 text-[#7B5C9E]" />
                  <span className="hidden sm:inline">Voice Nav</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setGlobalTutorialTool(activeViewSection === 'spatial-lab' ? 'spatial-lab' : 'vocal-tones');
                setIsGlobalTutorialOpen(true);
              }}
              className="px-3 py-1.5 bg-white hover:bg-stone-50 border border-[#E0DACF] text-[#7B5C9E] hover:text-[#5A387E] rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Watch Video Guides & Tutorials for Simulation Tools"
            >
              <Video className="w-3.5 h-3.5 text-[#7B5C9E]" />
              <span className="hidden sm:inline">Video Tutorials</span>
            </button>

            <button
              onClick={() => setIsTrainingModalOpen(true)}
              className="px-3 py-1.5 bg-white hover:bg-stone-50 border border-[#E0DACF] text-[#5A5568] hover:text-[#181524] rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs"
              title="Inspect 7 Studio AI Training Context Files"
            >
              <FileText className="w-3.5 h-3.5 text-[#7B5C9E]" />
              <span className="hidden sm:inline">Training Files</span>
            </button>

            <button
              onClick={() => handleOpenChat(activeCompanionId)}
              className="px-3.5 py-1.5 bg-[#234F56] hover:bg-[#2C626A] border border-[#4A7C84] text-[#F5F2EB] rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Open Chat Interface</span>
            </button>

            <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 bg-[#F5F2EB] rounded-xl border border-[#E0DACF] text-xs font-medium">
              <span className="text-[10px] font-mono text-[#5A5568]">ACTIVE:</span>
              <span 
                className="w-2.5 h-2.5 rounded-full animate-pulse" 
                style={{ backgroundColor: activePersona.themeColor.primary }}
              />
              <span className="font-bold text-[#181524]">{activePersona.name}</span>
            </div>
          </div>
        </div>

        {/* VIEW 2: Vocal Tone Synthesizer */}
        {activeViewSection === 'vocal-tones' && (
          <div className="animate-in fade-in duration-200">
            <VocalToneSynthesizer
              activeCompanionId={activeCompanionId}
              onSelectCompanion={handleSelectCompanion}
              onClose={() => setActiveViewSection('workspace')}
            />
          </div>
        )}

        {/* VIEW 3: Spatial Hologram Lab */}
        {activeViewSection === 'spatial-lab' && (
          <div className="animate-in fade-in duration-200">
            <SpatialHologramLab
              activeCompanionId={activeCompanionId}
              onSelectCompanion={handleSelectCompanion}
              onClose={() => setActiveViewSection('workspace')}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[#E5E0D8] bg-[#F5F2EB] py-6 px-4 lg:px-8 text-xs text-[#5A5568]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#181524] font-serif">ToniAI™ Framework</span>
            <span>•</span>
            <span>Lavender Hill Studio</span>
            <span>•</span>
            <span className="text-[#7B5C9E] font-mono font-semibold">AIEE Compliant (v4.2.0)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono flex-wrap justify-center">
            <button
              onClick={() => setIsTrainingModalOpen(true)}
              className="hover:text-[#7B5C9E] transition-colors flex items-center gap-1 font-medium"
            >
              <FileText className="w-3 h-3 text-[#7B5C9E]" />
              <span>7 Training Files</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsCharterOpen(true)}
              className="hover:text-[#7B5C9E] transition-colors font-medium"
            >
              AIEE Ethical Charter
            </button>
            <span>•</span>
            <button
              onClick={() => setIsBrandGuideOpen(true)}
              className="hover:text-[#234F56] transition-colors font-medium"
            >
              Brand Guide
            </button>
            <span>•</span>
            <button
              onClick={() => setIsLedgerOpen(true)}
              className="hover:text-cyan-800 transition-colors font-medium"
            >
              Dolphin Security SQLite
            </button>
            <span>•</span>
            <button
              onClick={() => setIsBioModalOpen(true)}
              className="hover:text-[#7B5C9E] transition-colors font-medium"
            >
              Founder Bio
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setGlobalTutorialTool(activeViewSection === 'spatial-lab' ? 'spatial-lab' : 'vocal-tones');
                setIsGlobalTutorialOpen(true);
              }}
              className="hover:text-[#7B5C9E] transition-colors font-medium flex items-center gap-1 text-[#7B5C9E]"
            >
              <Video className="w-3 h-3" />
              <span>Video Tutorials & Guides</span>
            </button>
            <span>•</span>
            <span className="text-[#5A5568]">Offline Tab S10 Ready</span>
          </div>
        </div>
      </footer>

      {/* Persona Chat Modal Interface */}
      <PersonaChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        activeCompanionId={activeCompanionId}
        onSelectCompanion={handleSelectCompanion}
        isOfflineMode={isOfflineMode}
        activeViewSection={activeViewSection}
        activeModal={isBioModalOpen ? 'founder_bio' : isConsultationModalOpen ? 'consultation' : isTrainingModalOpen ? 'training_context' : isCharterOpen ? 'aiee_charter' : isLedgerOpen ? 'security_ledger' : ''}
        onOpenAmbientScan={() => {
          setActiveViewSection('workspace');
          setEcosystemTab('ambient-scan');
          setTimeout(() => {
            const el = document.getElementById('ambient-room-scanner-root');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
      />

      {/* Founder Bio Modal */}
      <FounderBioModal
        isOpen={isBioModalOpen}
        onClose={() => setIsBioModalOpen(false)}
        onOpenChat={() => handleOpenChat('toni')}
      />

      {/* Private Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        activeCompanionId={activeCompanionId}
      />

      {/* Training Files Context Hub Modal */}
      <TrainingContextModal
        isOpen={isTrainingModalOpen}
        onClose={() => setIsTrainingModalOpen(false)}
      />

      {/* AIEE Charter Modal Dialog */}
      <AIEECharterModal
        isOpen={isCharterOpen}
        onClose={() => setIsCharterOpen(false)}
      />

      {/* Dolphin Security SQLite Ledger Modal */}
      <DolphinSecurityLedger
        isOpen={isLedgerOpen}
        onClose={() => setIsLedgerOpen(false)}
        isOfflineMode={isOfflineMode}
        onToggleOffline={handleToggleOfflineMode}
      />

      {/* Brand & Visual Identity Guidelines Modal */}
      <BrandGuideModal
        isOpen={isBrandGuideOpen}
        onClose={() => setIsBrandGuideOpen(false)}
      />

      {/* Web Speech API Voice Control Overlay & HUD Widget */}
      <VoiceControlWidget
        isListening={isVoiceListening}
        isSupported={isVoiceSupported}
        status={voiceStatus}
        interimTranscript={voiceInterimTranscript}
        feedback={voiceFeedback}
        volumeLevel={voiceVolumeLevel}
        activeViewSection={activeViewSection}
        activeCompanionId={activeCompanionId}
        onToggleListening={handleToggleVoiceControl}
        onSelectSection={(section) => setActiveViewSection(section)}
        onSelectCompanion={(id) => setActiveCompanionId(id)}
        onOpenChat={handleOpenChat}
        onOpenCharter={() => setIsCharterOpen(true)}
        onOpenLedger={() => setIsLedgerOpen(true)}
        onOpenTrainingFiles={() => setIsTrainingModalOpen(true)}
        onOpenTutorial={() => {
          setGlobalTutorialTool(activeViewSection === 'spatial-lab' ? 'spatial-lab' : 'vocal-tones');
          setIsGlobalTutorialOpen(true);
        }}
        onToggleOffline={handleToggleOfflineMode}
      />

      {/* Floating Section Navigator & Quick Directory Switchboard */}
      <SectionNavigator
        activeViewSection={activeViewSection}
        onSelectViewSection={(sec) => setActiveViewSection(sec)}
        onOpenTeam={handleScrollToTeam}
        onOpenTools={handleOpenToolsTab}
        onOpenPlanner={handleOpenPlannerTab}
        onOpenCharter={() => setIsCharterOpen(true)}
        onOpenLedger={() => setIsLedgerOpen(true)}
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
        onOpenBio={() => setIsBioModalOpen(true)}
      />

      {/* Global Simulation Tools Video Masterclass & Interactive Guide Modal */}
      <SimulationTutorialModal
        isOpen={isGlobalTutorialOpen}
        onClose={() => setIsGlobalTutorialOpen(false)}
        defaultTool={globalTutorialTool}
        onSelectCompanion={handleSelectCompanion}
        onApplyPresetAction={(action) => {
          if (action === 'set-45-deg' || action === 'toggle-wireframe-glow') {
            setActiveViewSection('spatial-lab');
          } else if (action === 'reset-sliders' || action === 'play-phrase') {
            setActiveViewSection('vocal-tones');
          }
        }}
      />
    </div>
  );
}

