export type QuestionStatus = 'New' | 'Processing' | 'Answered' | 'Needs Teacher Attention';

export type QuestionDifficulty = 'Basic' | 'Intermediate' | 'Advanced';

export interface Question {
  id: string;
  studentName: string;
  studentSeat: string;
  timestamp: string;
  subject: string;
  topic: string;
  originalTranscript: string;
  correctedTranscript: string;
  status: QuestionStatus;
  difficulty: QuestionDifficulty;
  confidenceScore: number; // 0-100
  keyConcepts: string[];
  aiExplanation: {
    conciseAnswer: string;
    pedagogicalHint: string;
    commonMisconception: string;
    analogy: string;
  };
  teacherHeadsetBrief: {
    whisperText: string;
    keywords: string[];
    suggestedFollowUps: string[];
  };
  smartBoardVisual: {
    title: string;
    diagramType: 'gravity-fall' | 'vacuum-chamber' | 'satellite-orbit' | 'zero-gravity';
    caption: string;
    keyPoints: string[];
    formula?: string;
  };
}

export type PipelineStage = 
  | 'idle'
  | 'hand-raise'
  | 'audio-capture'
  | 'transcription'
  | 'ai-reasoning'
  | 'visual-prep'
  | 'teacher-notified'
  | 'resolved';

export interface TimelineEvent {
  id: string;
  timestamp: string;
  stage: string;
  description: string;
  source: 'Camera' | 'Mic' | 'Speech-to-Text' | 'LLM-Engine' | 'SmartBoard' | 'TeacherHeadset';
  status: 'info' | 'success' | 'warning';
}

export interface DeviceStatus {
  id: string;
  name: string;
  type: 'camera' | 'microphone' | 'smartboard' | 'headset';
  status: 'Connected' | 'Ready' | 'Active' | 'Standby' | 'Warning';
  details: string;
  latencyMs: number;
}

export interface SessionData {
  id: string;
  name: string;
  subject: string;
  room: string;
  date: string;
  durationMinutes: number;
  totalQuestions: number;
  answeredQuestions: number;
  attentionNeeded: number;
  engagementScore: number;
  topicsCovered: string[];
  topicsNeedingRevision: string[];
  recommendedActivity: string;
}

export interface AnalyticsData {
  questionsPerSession: { session: string; questions: number; answered: number }[];
  questionComplexity: { name: string; value: number; color: string }[];
  topicConfusion: { topic: string; questionsCount: number; unresolvedCount: number }[];
  curiosityIndicators: { session: string; exploratoryCount: number; whatIfCount: number }[];
}

export type ActiveView = 
  | 'overview' 
  | 'classroom' 
  | 'questions' 
  | 'analytics' 
  | 'history' 
  | 'settings';
