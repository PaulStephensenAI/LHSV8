import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Layers, 
  Sliders, 
  SlidersHorizontal,
  Compass,
  ArrowRight
} from 'lucide-react';
import { BespokeEstimator } from './BespokeEstimator';

interface WorkspacePlannerProps {
  onOpenConsultation?: (configurationDetails?: any) => void;
}

export const WorkspacePlanner: React.FC<WorkspacePlannerProps> = ({
  onOpenConsultation
}) => {
  return (
    <div id="panel-planner" role="tabpanel" aria-labelledby="tab-planner" className="space-y-8 animate-in fade-in duration-300">
      {/* 4-Step Bespoke Workspace Estimator */}
      <BespokeEstimator onOpenConsultation={onOpenConsultation} />
    </div>
  );
};

