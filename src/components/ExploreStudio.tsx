import React, { useState } from 'react';
import { CompanionId } from '../types';
import { EcosystemTab, EcosystemTabBar, DualPathDeploymentCards } from './LavenderHillEcosystem';
import { PersonaSelectorGrid } from './PersonaSelectorGrid';
import { PrivateArchitectureTools } from './PrivateArchitectureTools';
import { WorkspacePlanner } from './WorkspacePlanner';
import { EmbodiedNotebookStudio } from './EmbodiedNotebookStudio';
import { AmbientRoomScanner } from './AmbientRoomScanner';

interface ExploreStudioProps {
  activeCompanionId: CompanionId;
  onSelectCompanion: (id: CompanionId) => void;
  onOpenChat: (id?: CompanionId) => void;
  onOpenBio: () => void;
  onOpenConsultation: () => void;
  onOpenCharter: () => void;
  onOpenLedger: () => void;
  onOpenTrainingFiles: () => void;
  initialTab?: EcosystemTab;
  currentTab?: EcosystemTab;
  onTabChange?: (tab: EcosystemTab) => void;
}

export const ExploreStudio: React.FC<ExploreStudioProps> = ({
  activeCompanionId,
  onSelectCompanion,
  onOpenChat,
  onOpenBio,
  onOpenConsultation,
  onOpenCharter,
  onOpenLedger,
  onOpenTrainingFiles,
  initialTab = 'team',
  currentTab,
  onTabChange
}) => {
  const [internalTab, setInternalTab] = useState<EcosystemTab>(initialTab);
  
  const activeTab = currentTab !== undefined ? currentTab : internalTab;
  const handleTabChange = (tab: EcosystemTab) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalTab(tab);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Horizontal Capsule Tab Navigation Track */}
      <EcosystemTabBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* 2. Dynamic Content Area based on active tab state */}
      <div className="transition-all duration-300">
        {/* Tab 1: Meet the Team & Research Leadership (Comes FIRST) */}
        {activeTab === 'team' && (
          <div id="panel-team" role="tabpanel" aria-labelledby="tab-team" className="space-y-8">
            {/* Primary: Meet the Team & Research Leadership (Paul Stephensen + 6 Personas) */}
            <PersonaSelectorGrid
              selectedId={activeCompanionId}
              onSelect={onSelectCompanion}
              onOpenChat={onOpenChat}
              onOpenBio={onOpenBio}
              onOpenConsultation={onOpenConsultation}
            />

            {/* Architectural Foundation: Dual-Path Deployment Choices */}
            <DualPathDeploymentCards
              onOpenConsultation={onOpenConsultation}
            />
          </div>
        )}

        {/* Tab 2: Embodied Notebooks & Domain Mastery */}
        {activeTab === 'notebooks' && (
          <div id="panel-notebooks" role="tabpanel" aria-labelledby="tab-notebooks" className="space-y-8">
            <EmbodiedNotebookStudio
              onOpenConsultation={onOpenConsultation}
              onOpenTrainingFiles={onOpenTrainingFiles}
              onOpenChat={onOpenChat}
            />
          </div>
        )}

        {/* Tab 3: Ambient Room & Self-Regulation Scanner (Optional Extra) */}
        {activeTab === 'ambient-scan' && (
          <div id="panel-ambient-scan" role="tabpanel" aria-labelledby="tab-ambient-scan" className="space-y-8">
            <AmbientRoomScanner
              activeCompanionId={activeCompanionId}
              onSelectCompanion={onSelectCompanion}
              onOpenChat={onOpenChat}
              onOpenConsultation={onOpenConsultation}
            />
          </div>
        )}

        {/* Tab 4: Private Architecture & Tools (Gia, Angel.AI, FAB Standalone Workspaces) */}
        {activeTab === 'tools' && (
          <div id="panel-tools" role="tabpanel" aria-labelledby="tab-tools" className="space-y-6">
            <PrivateArchitectureTools
              onOpenLedger={onOpenLedger}
              onOpenCharter={onOpenCharter}
              onOpenTrainingFiles={onOpenTrainingFiles}
              onOpenConsultation={onOpenConsultation}
            />
          </div>
        )}

        {/* Tab 3: Plan Your Workspace (Interactive Configuration Estimator) */}
        {activeTab === 'planner' && (
          <div id="panel-planner" role="tabpanel" aria-labelledby="tab-planner" className="space-y-6">
            <WorkspacePlanner
              onOpenConsultation={onOpenConsultation}
            />
          </div>
        )}
      </div>
    </div>
  );
};
