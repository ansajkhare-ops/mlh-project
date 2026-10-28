import { Question, DeviceStatus, TimelineEvent, SessionData, AnalyticsData } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q-101',
    studentName: 'Aarav Patel',
    studentSeat: 'Seat #14 (Row 2, Center)',
    timestamp: '10:32:14',
    subject: 'Physics',
    topic: 'Gravitation',
    originalTranscript: 'Why does an apple fall toward the ground instead of floating in the air?',
    correctedTranscript: 'Why does an apple fall toward the ground instead of floating in the air?',
    status: 'Answered',
    difficulty: 'Basic',
    confidenceScore: 96,
    keyConcepts: ["Gravitational force", "Earth's mass", "Acceleration due to gravity"],
    aiExplanation: {
      conciseAnswer: "Earth possesses a vast mass which produces a gravitational field pulling nearby objects inward toward its center of mass with an acceleration of approximately 9.8 m/s².",
      pedagogicalHint: "Connect this directly to Newton's Universal Law of Gravitation. Emphasize that both the apple and Earth exert forces on each other, but Earth's enormous mass results in virtually all observable acceleration happening to the apple.",
      commonMisconception: "Students often believe lighter objects fall slower because of gravity, rather than understanding air resistance is the true dampener.",
      analogy: "Like a heavy bowling ball sitting on a flexible trampoline, Earth bends the space around it, causing smaller marbles nearby to roll toward it."
    },
    teacherHeadsetBrief: {
      whisperText: "Explain Earth's gravitational attraction. Relate the downward gravitational force vector directly to the apple's observed acceleration (g ≈ 9.8 m/s²).",
      keywords: ["Gravitational attraction", "Mass differential", "Free fall vector"],
      suggestedFollowUps: [
        "What would happen to the apple if Earth had half its current mass?",
        "Does the apple pull on the Earth with the exact same magnitude of force?"
      ]
    },
    smartBoardVisual: {
      title: "Gravitational Vector & Free Fall",
      diagramType: 'gravity-fall',
      caption: "Downward acceleration vector g = 9.8 m/s² pulling the apple toward Earth's center of mass.",
      formula: "F = G · (m₁ · m₂) / r²",
      keyPoints: [
        "Gravitational force acts toward the planetary center of mass",
        "Air resistance is negligible for dense low-velocity objects",
        "Net acceleration in free fall: a = g ≈ 9.8 m/s²"
      ]
    }
  },
  {
    id: 'q-102',
    studentName: 'Meera Sen',
    studentSeat: 'Seat #08 (Row 1, Left)',
    timestamp: '10:35:42',
    subject: 'Physics',
    topic: 'Gravity & Planetary Dynamics',
    originalTranscript: 'What would happen if gravity suddenly became zero right now?',
    correctedTranscript: 'What would happen if gravity suddenly became zero right now?',
    status: 'Processing',
    difficulty: 'Intermediate',
    confidenceScore: 92,
    keyConcepts: ["Inertia", "Atmospheric retention", "Orbital mechanics", "Newton's First Law"],
    aiExplanation: {
      conciseAnswer: "Without gravity, there would be no centripetal force keeping Earth in orbit or holding the atmosphere, oceans, and unsecured objects to the surface; everything would fly off along straight-line tangents due to inertia.",
      pedagogicalHint: "Guide students using Newton's First Law (Law of Inertia). Because the Earth is rotating at ~1670 km/h at the equator, release from gravity means objects would tangentially continue in linear motion.",
      commonMisconception: "Students imagine things immediately 'floating peacefully' like in sci-fi, rather than violent tangential ejection due to Earth's rotational velocity.",
      analogy: "Spinning a weight on a string and suddenly cutting the string with scissors—the weight shoots straight in the direction it was already heading."
    },
    teacherHeadsetBrief: {
      whisperText: "Highlight Newton's First Law: without gravitational centripetal restraint, Earth's rotation flings the atmosphere and objects tangentially outward.",
      keywords: ["Newton's First Law", "Tangential velocity", "Loss of atmospheric pressure"],
      suggestedFollowUps: [
        "Why would the atmosphere disperse into space before anything else?",
        "What would happen to the Moon's path around the Earth?"
      ]
    },
    smartBoardVisual: {
      title: "Sudden Zero-Gravity & Tangential Inertia",
      diagramType: 'zero-gravity',
      caption: "In the absence of centripetal gravitational pull, rotational velocity causes tangential trajectory dispersion.",
      formula: "v_tangential = ω · r",
      keyPoints: [
        "Inertia drives linear velocity without centripetal restraint",
        "Atmosphere disperses due to thermal kinetic expansion",
        "Celestial orbits dissolve into straight-line inertial paths"
      ]
    }
  },
  {
    id: 'q-103',
    studentName: 'Rohan Verma',
    studentSeat: 'Seat #21 (Row 3, Right)',
    timestamp: '10:38:05',
    subject: 'Physics',
    topic: 'Vacuum & Equivalence Principle',
    originalTranscript: 'Why do heavier and lighter objects fall at approximately the same rate in a vacuum?',
    correctedTranscript: 'Why do heavier and lighter objects fall at approximately the same rate in a vacuum?',
    status: 'Needs Teacher Attention',
    difficulty: 'Advanced',
    confidenceScore: 88,
    keyConcepts: ["Equivalence Principle", "Inertial vs Gravitational Mass", "Galileo's Leaning Tower", "Vacuum free fall"],
    aiExplanation: {
      conciseAnswer: "While a heavier object experiences a proportionally greater gravitational force (F = m · g), it also has proportionally greater inertia (resistance to acceleration: F = m · a). The mass terms cancel out completely: a = g.",
      pedagogicalHint: "Walk through the mathematical cancellation on the smart board. Show F_grav = G·M·m/r² alongside F_net = m·a. Highlight why heavier things need more force just to move at the same acceleration.",
      commonMisconception: "Students confuse total force (which IS larger for heavier objects) with acceleration (which is identical).",
      analogy: "Pushing a heavy truck requires more force than a bicycle; similarly, gravity pulls the heavier mass harder, but the heavier mass resists acceleration equally harder."
    },
    teacherHeadsetBrief: {
      whisperText: "Key insight: Gravitational mass cancels inertial mass (m_g · g = m_i · a). Recommend deriving a = g on the board.",
      keywords: ["Mass cancellation", "Equivalence principle", "Galileo vacuum experiment"],
      suggestedFollowUps: [
        "If you drop a feather and a bowling ball on the Moon, what lands first?",
        "Why does air resistance change this outcome in normal room conditions?"
      ]
    },
    smartBoardVisual: {
      title: "Equivalence Principle: Vacuum Chamber Fall",
      diagramType: 'vacuum-chamber',
      caption: "In the absence of air drag, a 5kg iron sphere and a 0.005kg feather accelerate at exactly the identical rate.",
      formula: "a = (G · M_earth) / r² = g (Independent of object mass)",
      keyPoints: [
        "Gravitational pull is proportional to mass (F ∝ m)",
        "Inertial resistance is also proportional to mass (m = F/a)",
        "Resulting acceleration 'g' is mathematically independent of falling mass"
      ]
    }
  },
  {
    id: 'q-104',
    studentName: 'Priya Nambiar',
    studentSeat: 'Seat #11 (Row 2, Left)',
    timestamp: '10:41:20',
    subject: 'Physics',
    topic: 'Orbital Mechanics & Satellites',
    originalTranscript: 'How does gravity affect the motion of satellites if they are in zero-g in space?',
    correctedTranscript: 'How does gravity affect the motion of satellites if they are said to be in zero gravity in space?',
    status: 'New',
    difficulty: 'Intermediate',
    confidenceScore: 94,
    keyConcepts: ["Perpetual free fall", "Microgravity vs zero gravity", "Orbital velocity", "Centripetal acceleration"],
    aiExplanation: {
      conciseAnswer: "Satellites in low Earth orbit are NOT in zero gravity; gravity is still ~90% as strong as on Earth's surface! They feel weightless because they are in constant perpetual free fall around Earth at high horizontal velocity (~7.8 km/s).",
      pedagogicalHint: "Use Newton's Cannonball thought experiment. The cannonball falls toward Earth, but the curvature of the Earth falls away underneath it at the exact same rate.",
      commonMisconception: "Astronauts and satellites float because 'there is no gravity in space'. In reality, gravity is what keeps them in orbit!",
      analogy: "An elevator with broken cables: passengers float inside because the elevator and passengers are falling at the exact same rate."
    },
    teacherHeadsetBrief: {
      whisperText: "Clarify: Gravity in orbit is ~89% of surface gravity. Satellites don't escape gravity—they are in endless free fall (Newton's Cannonball).",
      keywords: ["Continuous free fall", "Newton's cannonball", "Apparent weightlessness"],
      suggestedFollowUps: [
        "What happens if a satellite slows down its horizontal velocity?",
        "Why do we call it 'microgravity' instead of zero gravity?"
      ]
    },
    smartBoardVisual: {
      title: "Newton's Cannonball: Orbital Free Fall",
      diagramType: 'satellite-orbit',
      caption: "Forward velocity matches Earth's curvature, resulting in a continuous free-fall closed circular orbit.",
      formula: "v_orbit = √(G · M / r) ≈ 7.8 km/s (LEO)",
      keyPoints: [
        "Gravity at 400km altitude is ~8.7 m/s² (nearly 90% of sea level)",
        "Weightlessness is apparent, caused by free fall of both satellite and occupants",
        "Orbital velocity balances gravitational drop against Earth's curvature"
      ]
    }
  },
  {
    id: 'q-105',
    studentName: 'Devansh Joshi',
    studentSeat: 'Seat #03 (Row 1, Right)',
    timestamp: '10:15:30',
    subject: 'Physics',
    topic: 'General Relativity vs Newtonian Force',
    originalTranscript: 'Is gravity actually a physical pulling force or curved space as Einstein said?',
    correctedTranscript: 'Is gravity actually a physical pulling force or curved spacetime as Einstein said?',
    status: 'Answered',
    difficulty: 'Advanced',
    confidenceScore: 91,
    keyConcepts: ["Spacetime curvature", "Geodesics", "General Relativity", "Newtonian approximation"],
    aiExplanation: {
      conciseAnswer: "In Newtonian physics, gravity is modeled as an attractive force between masses. In General Relativity, mass bends spacetime, and objects simply travel along the straightest possible paths (geodesics) through that curved geometry.",
      pedagogicalHint: "Reassure students that Newton's model is an extremely accurate approximation for everyday human scales and engineering, while Einstein's framework explains deeper cosmic realities like gravitational lensing and GPS time dilation.",
      commonMisconception: "That Newton was 'wrong'—rather, his equations are the low-energy, low-speed limiting case of General Relativity.",
      analogy: "Rolling a ball across a flat sheet vs a sheet indented by a heavy bowling ball."
    },
    teacherHeadsetBrief: {
      whisperText: "Frame Newton as practical classical approximation; Einstein as geometrical spacetime curvature. Both models have their educational domains.",
      keywords: ["Newtonian limit", "Spacetime geometry", "Geodesic trajectory"],
      suggestedFollowUps: [
        "Why does GPS need Einstein's corrections to stay accurate?",
        "Does light bend in a gravitational field even though photons have no rest mass?"
      ]
    },
    smartBoardVisual: {
      title: "Newtonian Pull vs Spacetime Curvature",
      diagramType: 'gravity-fall',
      caption: "Newtonian vector field vs 2D embedding of curved Riemannian spacetime fabric.",
      formula: "G_μν = (8πG / c⁴) · T_μν",
      keyPoints: [
        "Mass dictates to spacetime how to curve",
        "Curved spacetime dictates to mass how to move",
        "Newton's F = G·m₁m₂/r² is the non-relativistic weak-field limit"
      ]
    }
  },
  {
    id: 'q-106',
    studentName: 'Kavita Chawla',
    studentSeat: 'Seat #19 (Row 3, Center)',
    timestamp: '10:22:18',
    subject: 'Physics',
    topic: 'Universal Gravitation & Magnitude',
    originalTranscript: 'Why don’t we feel the gravitational pull between two people standing next to each other?',
    correctedTranscript: 'Why do we not feel the gravitational pull between two people standing next to each other?',
    status: 'Answered',
    difficulty: 'Basic',
    confidenceScore: 98,
    keyConcepts: ["Gravitational constant G", "Magnitude comparison", "Friction vs gravity", "Universal attraction"],
    aiExplanation: {
      conciseAnswer: "The gravitational attraction does exist between any two people, but because the gravitational constant G is minuscule (6.674 × 10⁻¹¹ N·m²/kg²), the force between two 70kg humans is less than 0.00000003 Newtons—far too small to overcome friction or be sensed.",
      pedagogicalHint: "Calculate the exact number on the smart board. Show that Earth's mass is ~6 × 10²⁴ kg, which is why Earth's pull is perceptible while human-to-human attraction is imperceptible.",
      commonMisconception: "Students often think gravity only applies to celestial bodies like planets, rather than every particle of mass in the cosmos.",
      analogy: "A single grain of sand on a weighing scale designed for elephants—the scale registers nothing not because the sand has zero mass, but because it is vastly overshadowed."
    },
    teacherHeadsetBrief: {
      whisperText: "Highlight the tiny value of G (10⁻¹¹). The mutual force between two humans is roughly ~30 nanonewtons, dwarfed by friction.",
      keywords: ["Constant G", "Order of magnitude", "Microscopic force"],
      suggestedFollowUps: [
        "How large would two bodies have to be before they noticeably attract each other?",
        "What experiment first measured the tiny gravitational pull between metal spheres?"
      ]
    },
    smartBoardVisual: {
      title: "Magnitude Comparison: Planetary vs Human Gravitation",
      diagramType: 'gravity-fall',
      caption: "Comparing the 686 N pull of Earth against the 0.00000003 N mutual pull between two individuals.",
      formula: "F_mutual ≈ 3.2 × 10⁻⁸ N  (vs  F_earth = 686 N)",
      keyPoints: [
        "Gravitational constant G = 6.674 × 10⁻¹¹ N·m²/kg² is exceedingly weak",
        "Noticeable gravity requires planetary-scale mass accumulation",
        "Universal attraction holds true for all matter without exception"
      ]
    }
  }
];

export const INITIAL_DEVICES: DeviceStatus[] = [
  {
    id: 'dev-1',
    name: 'Classroom Vision Sensor',
    type: 'camera',
    status: 'Connected',
    details: 'Wide-angle 1080p60 · Optical Pose Tracking Active',
    latencyMs: 14
  },
  {
    id: 'dev-2',
    name: 'Directional Mic Array',
    type: 'microphone',
    status: 'Ready',
    details: 'Quad-element Beamforming · Acoustic Noise Suppression',
    latencyMs: 8
  },
  {
    id: 'dev-3',
    name: 'Classroom Smart Board',
    type: 'smartboard',
    status: 'Connected',
    details: '75" UltraHD Display · Low-latency Canvas Mirroring',
    latencyMs: 22
  },
  {
    id: 'dev-4',
    name: 'Teacher Assistant Headset',
    type: 'headset',
    status: 'Active',
    details: 'Bone-conduction Wireless · Whisper Audio Link Open',
    latencyMs: 12
  }
];

export const INITIAL_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'evt-1',
    timestamp: '10:32:14',
    stage: 'Hand Raise Detected',
    description: 'Vision sensor identified raised hand at Seat #14 (Aarav Patel). Bounding box confidence: 97.4%',
    source: 'Camera',
    status: 'info'
  },
  {
    id: 'evt-2',
    timestamp: '10:32:16',
    stage: 'Audio Capture Started',
    description: 'Beamforming microphone array focused spatial gain on Sector B2. Background hum attenuated by 18dB.',
    source: 'Mic',
    status: 'info'
  },
  {
    id: 'evt-3',
    timestamp: '10:32:19',
    stage: 'Question Transcribed',
    description: 'Acoustic stream parsed into text: "Why does an apple fall toward the ground instead of floating in the air?"',
    source: 'Speech-to-Text',
    status: 'success'
  },
  {
    id: 'evt-4',
    timestamp: '10:32:21',
    stage: 'AI Reasoning Generated',
    description: 'Pedagogical synthesis generated 3 core concept tags, concise explanation, and misconception alerts.',
    source: 'LLM-Engine',
    status: 'success'
  },
  {
    id: 'evt-5',
    timestamp: '10:32:23',
    stage: 'Visual Prepared',
    description: 'Interactive gravitational vector diagram and formula card compiled and queued for Smart Board display.',
    source: 'SmartBoard',
    status: 'info'
  },
  {
    id: 'evt-6',
    timestamp: '10:32:25',
    stage: 'Teacher Notified',
    description: 'Private 12-second audio brief and cue cards synchronized to Dr. Ananya Sharma\'s wireless headset.',
    source: 'TeacherHeadset',
    status: 'success'
  }
];

export const INITIAL_ANALYTICS: AnalyticsData = {
  questionsPerSession: [
    { session: 'Session 1', questions: 8, answered: 7 },
    { session: 'Session 2', questions: 12, answered: 11 },
    { session: 'Session 3', questions: 10, answered: 8 },
    { session: 'Session 4', questions: 16, answered: 14 },
    { session: 'Session 5 (Today)', questions: 18, answered: 15 }
  ],
  questionComplexity: [
    { name: 'Basic', value: 35, color: '#3b82f6' },
    { name: 'Intermediate', value: 40, color: '#6366f1' },
    { name: 'Advanced', value: 25, color: '#8b5cf6' }
  ],
  topicConfusion: [
    { topic: 'Gravity', questionsCount: 8, unresolvedCount: 1 },
    { topic: 'Motion', questionsCount: 6, unresolvedCount: 2 },
    { topic: 'Force', questionsCount: 4, unresolvedCount: 1 },
    { topic: 'Energy', questionsCount: 3, unresolvedCount: 0 }
  ],
  curiosityIndicators: [
    { session: 'Session 1', exploratoryCount: 3, whatIfCount: 1 },
    { session: 'Session 2', exploratoryCount: 4, whatIfCount: 2 },
    { session: 'Session 3', exploratoryCount: 2, whatIfCount: 1 },
    { session: 'Session 4', exploratoryCount: 6, whatIfCount: 4 }
  ]
};

export const PAST_SESSIONS: SessionData[] = [
  {
    id: 'sess-05',
    name: 'Physics Lecture 14: Universal Gravitation & Orbital Motion',
    subject: 'Physics',
    room: 'Room 204',
    date: 'Oct 28, 2026',
    durationMinutes: 48,
    totalQuestions: 18,
    answeredQuestions: 15,
    attentionNeeded: 3,
    engagementScore: 78,
    topicsCovered: ['Newton\'s Universal Law', 'Acceleration due to Gravity (g)', 'Orbiting Satellites', 'Weightlessness'],
    topicsNeedingRevision: ['Motion and force integration', 'Equivalence principle in vacuum'],
    recommendedActivity: 'Conduct a live vacuum tube feather-and-coin demonstration and follow up with a 5-question conceptual quiz.'
  },
  {
    id: 'sess-04',
    name: 'Physics Lecture 13: Newton\'s Laws of Motion & Momentum',
    subject: 'Physics',
    room: 'Room 204',
    date: 'Oct 26, 2026',
    durationMinutes: 50,
    totalQuestions: 16,
    answeredQuestions: 14,
    attentionNeeded: 2,
    engagementScore: 74,
    topicsCovered: ['Inertia', 'F = ma', 'Action & Reaction', 'Impulse'],
    topicsNeedingRevision: ['Third law paired forces misconception'],
    recommendedActivity: 'Pair students for interactive skate-cart impulse calculations.'
  },
  {
    id: 'sess-03',
    name: 'Physics Lecture 12: Work, Energy & Conservation',
    subject: 'Physics',
    room: 'Room 204',
    date: 'Oct 24, 2026',
    durationMinutes: 45,
    totalQuestions: 10,
    answeredQuestions: 8,
    attentionNeeded: 2,
    engagementScore: 68,
    topicsCovered: ['Kinetic Energy', 'Potential Energy', 'Conservation Law'],
    topicsNeedingRevision: ['Non-conservative frictional work dissipation'],
    recommendedActivity: 'Use interactive roller-coaster simulation on the Smart Board.'
  },
  {
    id: 'sess-02',
    name: 'Physics Lecture 11: Circular Motion & Centripetal Forces',
    subject: 'Physics',
    room: 'Room 204',
    date: 'Oct 21, 2026',
    durationMinutes: 45,
    totalQuestions: 12,
    answeredQuestions: 11,
    attentionNeeded: 1,
    engagementScore: 71,
    topicsCovered: ['Centripetal Acceleration', 'Banked Curves', 'Angular Velocity'],
    topicsNeedingRevision: ['Centrifugal fictitious force confusion'],
    recommendedActivity: 'Bucket-of-water circular spin physical demo.'
  },
  {
    id: 'sess-01',
    name: 'Physics Lecture 10: Introduction to Kinematics in 2D',
    subject: 'Physics',
    room: 'Room 204',
    date: 'Oct 19, 2026',
    durationMinutes: 45,
    totalQuestions: 8,
    answeredQuestions: 7,
    attentionNeeded: 1,
    engagementScore: 65,
    topicsCovered: ['Projectile Motion', 'Vector Decomposition', 'Trajectory Parabola'],
    topicsNeedingRevision: ['Independence of horizontal and vertical velocities'],
    recommendedActivity: 'Ballistic launcher table experiment.'
  }
];
