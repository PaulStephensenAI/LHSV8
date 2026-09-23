import { CompanionId, RoomScanMetrics, RoomScanResult } from '../types';

export interface RoomPresetScenario {
  id: string;
  name: string;
  subtitle: string;
  roomIcon: string;
  metrics: RoomScanMetrics;
  description: string;
  simulatedVisualDescription: string;
}

export const ROOM_PRESET_SCENARIOS: RoomPresetScenario[] = [
  {
    id: 'dim_glare',
    name: 'Late Night Screen Glare',
    subtitle: 'Low ambient light & elevated screen contrast',
    roomIcon: '🌙',
    metrics: {
      ambientBrightness: 18,
      movementDelta: 12,
      screenContrastRatio: 7.8,
      detectedPosture: 'slumped_forward',
      lightingQuality: 'dim_strained'
    },
    description: 'Room is dark while laptop/tablet emits harsh blue light. Neck is bent forward ~25 degrees with visible shoulder tension.',
    simulatedVisualDescription: 'Dark room environment; solitary blue-white screen illuminating face; forward head posture with hunched shoulders; closed curtains.'
  },
  {
    id: 'clutter_multitask',
    name: 'Overstimulated Desk Space',
    subtitle: 'High visual clutter & restless pacing',
    roomIcon: '⚡',
    metrics: {
      ambientBrightness: 68,
      movementDelta: 72,
      screenContrastRatio: 3.2,
      detectedPosture: 'tilted',
      lightingQuality: 'harsh_glare'
    },
    description: 'Multiple active devices, papers scattered across desk, rapid hand and head movements indicating sensory multi-tasking overwhelm.',
    simulatedVisualDescription: 'Overhead cool fluorescent lighting; open coffee cups, notepad piles, dual monitors; frequent shifting and rapid gaze alternation.'
  },
  {
    id: 'slump_fatigue',
    name: 'Afternoon Energy Slump',
    subtitle: 'Prolonged sitting & shallow breathing cues',
    roomIcon: '☕',
    metrics: {
      ambientBrightness: 42,
      movementDelta: 8,
      screenContrastRatio: 4.1,
      detectedPosture: 'slumped_forward',
      lightingQuality: 'soft_balanced'
    },
    description: 'Static seated posture for over 90 minutes; head supported by hand; shallow chest breathing and frequent blinking indicating eye fatigue.',
    simulatedVisualDescription: 'Diffused afternoon light fading in room; resting chin on palm; shoulders rolled inward; water glass empty.'
  },
  {
    id: 'sanctuary_calm',
    name: 'Balanced Focus Sanctuary',
    subtitle: 'Indirect daylight & aligned relaxed posture',
    roomIcon: '🌿',
    metrics: {
      ambientBrightness: 58,
      movementDelta: 24,
      screenContrastRatio: 2.1,
      detectedPosture: 'relaxed',
      lightingQuality: 'soft_balanced'
    },
    description: 'Soft, indirect side lighting; relaxed spine with shoulders dropped; steady diaphragmatic breathing and minimal physical strain.',
    simulatedVisualDescription: 'Warm, natural window daylight from the side; clear desk workspace; upright relaxed spine; grounded feet.'
  }
];

export const COMPANION_SENSORY_ROLES: Record<CompanionId, {
  scannerRole: string;
  focusArea: string;
  signatureStyle: string;
  breathingCadence: string;
}> = {
  ari: {
    scannerRole: 'Sensory Pacing & Lighting Harmonizer',
    focusArea: 'Sensory overload, screen luminance, soft lighting, and gentle resets',
    signatureStyle: 'Calm, gentle, sensory-soothing phrasing designed to lower autonomic nervous system arousal.',
    breathingCadence: 'Soft Inhale 4s • Gentle Hold 4s • Lengthened Exhale 7s'
  },
  kenny: {
    scannerRole: 'Trauma-Informed Somatic Co-Regulator',
    focusArea: 'Physical tension validation, non-coercive agency, and grounding in the space',
    signatureStyle: 'Deeply respectful, validating your physical comfort without pressure or diagnostic judgment.',
    breathingCadence: 'Natural Inhale 4s • Gentle Pause 2s • Settling Exhale 6s'
  },
  toni: {
    scannerRole: 'Executive Focus & Ergonomic Grounder',
    focusArea: 'Workstation clutter reduction, neck/shoulder alignment, and cognitive breaks',
    signatureStyle: 'Crisp, structured, practical micro-steps to reset physical and mental clutter.',
    breathingCadence: 'Clearing Inhale 4s • Stillness 4s • Release Exhale 4s'
  },
  elysian: {
    scannerRole: 'Ethical Privacy & Boundary Guardian',
    focusArea: 'Environmental perimeter comfort, air-gapped zero recording, and dignified ease',
    signatureStyle: 'Reassuring architectural boundary protection with clear ergonomic awareness.',
    breathingCadence: 'Grounded Inhale 5s • Safe Hold 3s • Ease Exhale 5s'
  },
  phoebe: {
    scannerRole: 'Quantitative Sensory Rhythm Analyst',
    focusArea: 'Luminance ratios, posture delta tracking, and optimal focus-rest equilibrium',
    signatureStyle: 'Objective, transparent measurements with human warmth and zero algorithmic anxiety.',
    breathingCadence: 'Measured Inhale 4s • Rhythmic Hold 4s • Smooth Exhale 6s'
  },
  holly: {
    scannerRole: 'Creative Atmosphere & Mood Nurturer',
    focusArea: 'Visual harmony, natural warmth, room mood, and creative flow barriers',
    signatureStyle: 'Warm, narrative, inspiring observations that bring warmth back into cold workstations.',
    breathingCadence: 'Expansive Inhale 4s • Open Hold 4s • Releasing Exhale 6s'
  }
};

export function generateLocalRoomScanAnalysis(
  companionId: CompanionId,
  metrics: RoomScanMetrics,
  customNote?: string
): RoomScanResult {
  const role = COMPANION_SENSORY_ROLES[companionId] || COMPANION_SENSORY_ROLES.ari;
  
  // Calculate equilibrium score based on metrics
  let score = 85;
  if (metrics.lightingQuality === 'dim_strained') score -= 22;
  if (metrics.lightingQuality === 'harsh_glare') score -= 18;
  if (metrics.detectedPosture === 'slumped_forward') score -= 16;
  if (metrics.detectedPosture === 'tilted') score -= 12;
  if (metrics.movementDelta > 65) score -= 14; // sensory overwhelm
  if (metrics.movementDelta < 10) score -= 10; // static freeze
  if (metrics.screenContrastRatio > 6) score -= 12;
  score = Math.max(32, Math.min(98, score));

  // Companion-specific observation texts
  const observations: Record<CompanionId, string> = {
    ari: metrics.lightingQuality === 'dim_strained'
      ? `I can see the room around you has grown quite dim, leaving your screen as a sharp, intense light source. Your shoulders are carrying a noticeable lift of tension. Let's soften the room lighting together and take a peaceful, slow breath.`
      : metrics.movementDelta > 60
      ? `There seems to be a lot of rapid visual motion in your space right now. When screens and open tabs compete for attention, our sensory systems naturally feel overwhelmed. Let's give your eyes a quiet moment to settle.`
      : `Your room has a steady, gentle quality. Your posture looks relatively relaxed, though your neck is leaning slightly toward the display. Let's pause and maintain this calm pacing.`,
    
    kenny: metrics.detectedPosture === 'slumped_forward'
      ? `You look like you’ve been holding yourself up through sheer effort today. Your neck and upper back are carrying a lot of weight right now. You don't have to push through it. Let your chair support your lower back, and take whatever pace feels kind to you.`
      : metrics.movementDelta > 60
      ? `I notice a few shifts in your space. Remember, you have complete control over this environment. If the room feels too bright, too quiet, or cluttered, making even one small adjustment is a win.`
      : `I see you settled in your space. Your breathing cadence appears steady. Take a moment to notice your feet on the floor and feel grounded in your room.`,

    toni: metrics.lightingQuality === 'dim_strained' || metrics.screenContrastRatio > 5
      ? `Executive check: your screen contrast is working against you. Working in low ambient light with a bright display elevates cognitive fatigue by up to 35%. Turn on a warm desk lamp or lower display brightness to 60%.`
      : metrics.detectedPosture === 'slumped_forward'
      ? `Workstation scan complete: posture alignment is reasonable, but your shoulders have crept upward. Let's execute a quick physical reset: roll your shoulders back twice, clear two items off your direct desk line, and continue.`
      : `Your workspace shows calm, structured conditions. Keep your water within reach and schedule a standing stretch in 25 minutes.`,

    elysian: `Sovereign perimeter verification: our private lens observes your room in real-time with zero cloud recording. Your physical environment appears ${metrics.lightingQuality === 'soft_balanced' ? 'comfortable and well-proportioned' : 'strained by directional light glare'}. Dignified focus requires comfortable eyes.`,

    phoebe: `Measured equilibrium: Sensory stability index is currently ${score}/100. Ambient brightness is at ${metrics.ambientBrightness}% with a screen contrast ratio of ${metrics.screenContrastRatio}:1. Light balance is ${metrics.lightingQuality.replace('_', ' ')}. Recommended delta: increase ambient lumens or reduce display lux.`,

    holly: `The atmosphere in your room feels ${metrics.lightingQuality === 'dim_strained' ? 'a bit quiet and shadowy' : 'bustling with energy'}. When our surroundings feel cramped or harsh, creative thinking gets squeezed too. Let's open up a little room to breathe.`
  };

  const actionablePacingCues: string[] = [];
  if (metrics.lightingQuality === 'dim_strained') {
    actionablePacingCues.push('Turn on a warm, indirect side lamp to balance screen luminance.');
  } else if (metrics.lightingQuality === 'harsh_glare') {
    actionablePacingCues.push('Angle your screen away from direct overhead fixtures to cut glare.');
  } else {
    actionablePacingCues.push('Maintain your soft, balanced room illumination.');
  }

  if (metrics.detectedPosture === 'slumped_forward') {
    actionablePacingCues.push('Gently bring your chin back and let your back rest fully against your chair.');
  } else if (metrics.detectedPosture === 'tilted') {
    actionablePacingCues.push('Square your shoulders with the screen and ground both feet evenly.');
  } else {
    actionablePacingCues.push('Unclench your jaw and let your tongue rest on the roof of your mouth.');
  }

  actionablePacingCues.push('Follow the 20-20-20 rule: look at an object 20 feet away for 20 seconds.');

  return {
    id: `scan-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    companionId,
    equilibriumScore: score,
    companionObservation: observations[companionId] || observations.ari,
    clientSelfRegulation: {
      physicalCues: [
        metrics.detectedPosture === 'slumped_forward' ? 'Forward neck strain (~25° angle)' : 'Balanced vertical spinal alignment',
        metrics.movementDelta > 50 ? 'Elevated micro-movements / restless fidgeting' : 'Calm, steady physical pacing',
        'Shoulders slightly raised toward ears'
      ],
      breathingPaceRecommendation: role.breathingCadence,
      postureGuidance: metrics.detectedPosture === 'slumped_forward'
        ? 'Rest your lower back firmly into your seat cushion and elevate your screen so your eyes hit the top third of the glass.'
        : 'Spinal alignment is in a healthy, supported posture. Maintain soft relaxed breathing.'
    },
    environmentChanges: {
      summary: metrics.lightingQuality === 'dim_strained'
        ? 'Room lighting has dropped relative to high display output, increasing eye pupil strain.'
        : metrics.movementDelta > 60
        ? 'Visual and physical activity in your immediate workspace is high.'
        : 'Room conditions are stable with comfortable ambient light.',
      lightingStatus: `${metrics.ambientBrightness}% ambient luminance • ${metrics.lightingQuality.replace('_', ' ')}`,
      clutterIndex: metrics.movementDelta > 60 ? 'high_cognitive_load' : metrics.ambientBrightness < 25 ? 'moderate' : 'low_minimal',
      recentShift: customNote ? `Client noted: "${customNote}"` : 'Camera lens detected subtle ambient light and posture transition'
    },
    actionablePacingCues,
    sovereignPrivacyStatus: 'zero_recorded_airgapped'
  };
}
