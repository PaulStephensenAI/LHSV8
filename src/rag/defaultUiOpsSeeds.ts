import { IngestionChunk } from './types';

export const DEFAULT_UI_OPS_SEEDS: IngestionChunk[] = [
  {
    id: 'UI_SPATIAL_HOLOGRAM_45DEG',
    partition: 'notebook_ui_ops',
    content: 'Spatial Hologram Lab 45-degree isometric projection stage. Toni strategic neurodivergent side-by-side positioning, laser emitter concentric rings, volumetric light cone shader, and quantum orbit nodes at 60 FPS.',
    tokenEstimate: 45,
    metadata: {
      componentName: 'SpatialHologramLab',
      interactionType: 'webgl_kinetic',
      spatialAnchor: '45_deg_side_by_side',
      perspectiveZ: 1.2,
      rotationTheta: 45.0,
      category: 'hologram_shader',
      extra: { shaderMode: 'laser_concentric_crt', frameTargetFps: 60 }
    }
  },
  {
    id: 'UI_SPATIAL_HOLOGRAM_0DEG',
    partition: 'notebook_ui_ops',
    content: 'Direct frontal avatar projection at 0 degrees for Elysian ethical guardian. Crystalline aura shaders, frontal focus eye contact, zero lateral angle, and depth scalar 1.0x.',
    tokenEstimate: 38,
    metadata: {
      componentName: 'SpatialHologramLab',
      interactionType: 'webgl_kinetic',
      spatialAnchor: '0_deg_direct',
      perspectiveZ: 1.0,
      rotationTheta: 0.0,
      category: 'hologram_shader',
      extra: { shaderMode: 'crystalline_aura', frameTargetFps: 60 }
    }
  },
  {
    id: 'UI_AUDIO_SYNTH_432HZ',
    partition: 'notebook_ui_ops',
    content: 'Web Audio API Solfeggio frequency tone generator at 432 Hz and 528 Hz for sensory cadence and daily affirmation resonance. Zero audio buffer underrun with soft exponential ramps.',
    tokenEstimate: 42,
    metadata: {
      componentName: 'DailyAffirmation',
      interactionType: 'gesture_event',
      category: 'audio_synthesizer',
      extra: { baseFrequency: 432, targetGain: 0.15 }
    }
  },
  {
    id: 'UI_WORKSPACE_PLANNER',
    partition: 'notebook_ui_ops',
    content: 'Bespoke Workspace Estimator and interactive deployment planner. Client-owned cloud tier (A$3,800 - A$8,000 AUD) vs local sovereign hardware tier (A$4,500 - A$10,000+ AUD). 4-step wizard with real-time AUD quotation.',
    tokenEstimate: 50,
    metadata: {
      componentName: 'WorkspacePlanner',
      interactionType: 'form_interaction',
      category: 'commercial_planner',
      extra: { baseCurrency: 'AUD', tiers: ['client_cloud', 'sovereign_hardware'] }
    }
  }
];
