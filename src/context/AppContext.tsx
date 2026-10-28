import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Question, 
  DeviceStatus, 
  TimelineEvent, 
  ActiveView, 
  SessionData,
  AnalyticsData,
  PipelineStage 
} from '../types';
import { 
  INITIAL_QUESTIONS, 
  INITIAL_DEVICES, 
  INITIAL_TIMELINE_EVENTS, 
  INITIAL_ANALYTICS, 
  PAST_SESSIONS 
} from '../data/mockData';

interface AppContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedRoom: string;
  setSelectedRoom: (room: string) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  sessionState: 'Live Demo' | 'Paused' | 'Ended';
  setSessionState: (state: 'Live Demo' | 'Paused' | 'Ended') => void;
  sessionDuration: number; // in seconds
  formatDuration: (seconds: number) => string;
  
  // Data
  questions: Question[];
  activeQuestion: Question;
  setActiveQuestionId: (id: string) => void;
  devices: DeviceStatus[];
  timelineEvents: TimelineEvent[];
  analytics: AnalyticsData;
  pastSessions: SessionData[];
  
  // Pipeline
  currentPipelineStage: PipelineStage;
  isSimulating: boolean;
  
  // UI States
  smartBoardModalOpen: boolean;
  setSmartBoardModalOpen: (open: boolean) => void;
  headsetModalOpen: boolean;
  setHeadsetModalOpen: (open: boolean) => void;
  notificationDrawerOpen: boolean;
  setNotificationDrawerOpen: (open: boolean) => void;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
  
  // Actions
  simulateNextQuestion: () => void;
  markQuestionAnswered: (id: string) => void;
  flagQuestionForReview: (id: string) => void;
  regenerateExplanation: (id: string) => void;
  sendToTeacherHeadset: (id: string) => void;
  broadcastToSmartBoard: (id: string) => void;
  startSession: () => void;
  pauseSession: () => void;
  endSession: () => void;
  resetDemoData: () => void;
  
  // Computed KPI metrics
  kpis: {
    totalQuestions: number;
    answeredQuestions: number;
    resolutionRate: number;
    conceptsNeedingAttention: number;
    engagementScore: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [selectedRoom, setSelectedRoom] = useState<string>('Room 204');
  const [selectedSubject, setSelectedSubject] = useState<string>('Physics');
  const [sessionState, setSessionState] = useState<'Live Demo' | 'Paused' | 'Ended'>('Live Demo');
  const [sessionDuration, setSessionDuration] = useState<number>(48 * 60 + 24); // 48m 24s
  
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [activeQuestionId, setActiveQuestionId] = useState<string>('q-101');
  const [devices, setDevices] = useState<DeviceStatus[]>(INITIAL_DEVICES);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(INITIAL_TIMELINE_EVENTS);
  const [analytics, setAnalytics] = useState<AnalyticsData>(INITIAL_ANALYTICS);
  const [pastSessions] = useState<SessionData[]>(PAST_SESSIONS);
  
  const [currentPipelineStage, setCurrentPipelineStage] = useState<PipelineStage>('teacher-notified');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  
  const [smartBoardModalOpen, setSmartBoardModalOpen] = useState<boolean>(false);
  const [headsetModalOpen, setHeadsetModalOpen] = useState<boolean>(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Session duration timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (sessionState === 'Live Demo') {
      interval = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionState]);

  const formatDuration = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return hours > 0 ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
  };

  const activeQuestion = questions.find(q => q.id === activeQuestionId) || questions[0];

  // Helper to get formatted current time
  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  };

  const markQuestionAnswered = (id: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, status: 'Answered' } : q));
    setToastMessage(`Question marked as Answered.`);
  };

  const flagQuestionForReview = (id: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, status: 'Needs Teacher Attention' } : q));
    setToastMessage(`Question flagged for direct Teacher Review.`);
  };

  const regenerateExplanation = (id: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === id) {
        return {
          ...q,
          confidenceScore: Math.min(99, Math.max(90, q.confidenceScore + (Math.random() > 0.5 ? 2 : -1))),
          aiExplanation: {
            ...q.aiExplanation,
            pedagogicalHint: `${q.aiExplanation.pedagogicalHint} [AI Alternative Viewpoint]: Frame as an energy conservation relationship (gravitational potential converted to kinetic work).`
          }
        };
      }
      return q;
    }));
    setToastMessage(`AI explanation re-synthesized with alternative pedagogical framework.`);
  };

  const sendToTeacherHeadset = (id: string) => {
    const q = questions.find(item => item.id === id);
    if (!q) return;
    setHeadsetModalOpen(true);
    setToastMessage(`Audio brief transmitted to Teacher Headset (Room 204).`);
  };

  const broadcastToSmartBoard = (id: string) => {
    const q = questions.find(item => item.id === id);
    if (!q) return;
    setSmartBoardModalOpen(true);
    setToastMessage(`Visual diagram mirrored to Smart Board in Room 204.`);
  };

  // Live simulation of a new student raising hand and asking question
  const simulateNextQuestion = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setCurrentPipelineStage('hand-raise');

    const newTime = getCurrentTime();
    const newId = `q-${Date.now().toString().slice(-4)}`;
    
    // Step 1: Hand raise event
    const event1: TimelineEvent = {
      id: `evt-${Date.now()}-1`,
      timestamp: newTime,
      stage: 'Hand Raise Detected',
      description: 'Camera sensor detected raised hand at Seat #17 (Ishaan Sharma).',
      source: 'Camera',
      status: 'info'
    };
    setTimelineEvents(prev => [event1, ...prev.slice(0, 15)]);
    setToastMessage(`Simulated Event: Hand raise detected at Seat #17.`);

    // Step 2: Audio capture after 1.5s
    setTimeout(() => {
      setCurrentPipelineStage('audio-capture');
      const event2: TimelineEvent = {
        id: `evt-${Date.now()}-2`,
        timestamp: getCurrentTime(),
        stage: 'Audio Capture Started',
        description: 'Directional mic focused on Seat #17; ambient classroom noise isolated.',
        source: 'Mic',
        status: 'info'
      };
      setTimelineEvents(prev => [event2, ...prev]);
    }, 1200);

    // Step 3: Transcription after 2.5s
    setTimeout(() => {
      setCurrentPipelineStage('transcription');
      const event3: TimelineEvent = {
        id: `evt-${Date.now()}-3`,
        timestamp: getCurrentTime(),
        stage: 'Speech Transcribed',
        description: 'Transcribed: "How does air friction change the terminal velocity of a falling parachute?"',
        source: 'Speech-to-Text',
        status: 'info'
      };
      setTimelineEvents(prev => [event3, ...prev]);
    }, 2400);

    // Step 4: AI Reasoning after 3.8s
    setTimeout(() => {
      setCurrentPipelineStage('ai-reasoning');
      const newQuestion: Question = {
        id: newId,
        studentName: 'Ishaan Sharma',
        studentSeat: 'Seat #17 (Row 3, Left)',
        timestamp: getCurrentTime(),
        subject: 'Physics',
        topic: 'Drag & Terminal Velocity',
        originalTranscript: 'How does air friction change the terminal velocity of a falling parachute?',
        correctedTranscript: 'How does air resistance affect the terminal velocity of a descending parachute?',
        status: 'Processing',
        difficulty: 'Intermediate',
        confidenceScore: 95,
        keyConcepts: ['Drag Force F_drag', 'Equilibrium of Forces', 'Terminal Velocity', 'Cross-sectional Area'],
        aiExplanation: {
          conciseAnswer: 'A parachute drastically increases cross-sectional surface area, generating upward air drag that matches gravitational weight at a much lower velocity, creating a safe terminal equilibrium.',
          pedagogicalHint: 'Emphasize that terminal velocity occurs when F_drag = F_gravity (Net Force = 0, therefore zero acceleration), not when gravity stops.',
          commonMisconception: 'Students often believe an opened parachute creates upward acceleration, rather than reducing downward velocity.',
          analogy: 'Dropping an open sheet of paper versus a crumpled ball of paper with identical mass.'
        },
        teacherHeadsetBrief: {
          whisperText: 'Focus on zero net force (F_drag = mg). Parachute doesn’t push upwards; it reduces downward equilibrium velocity from 200 km/h to ~20 km/h.',
          keywords: ['Terminal equilibrium', 'Net zero force', 'Area vs Drag'],
          suggestedFollowUps: [
            'What happens the instant the parachute deploys—does the skydiver move up?',
            'How would this work on Mars where the atmosphere is 100x thinner?'
          ]
        },
        smartBoardVisual: {
          title: 'Forces in Terminal Equilibrium: Parachute Descent',
          diagramType: 'gravity-fall',
          caption: 'When aerodynamic drag equals gravitational pull, net acceleration reaches 0.',
          formula: 'v_terminal = √( (2 · m · g) / (ρ · A · C_d) )',
          keyPoints: [
            'Drag force scales with velocity squared (F_d ∝ v²)',
            'At terminal velocity: F_drag = m·g (Net a = 0)',
            'Increased canopy area (A) reduces terminal descent speed'
          ]
        }
      };

      setQuestions(prev => [newQuestion, ...prev]);
      setActiveQuestionId(newId);

      const event4: TimelineEvent = {
        id: `evt-${Date.now()}-4`,
        timestamp: getCurrentTime(),
        stage: 'AI Reasoning Generated',
        description: 'Gemini reasoning pipeline synthesized concise physics explanation and teaching hints.',
        source: 'LLM-Engine',
        status: 'success'
      };
      setTimelineEvents(prev => [event4, ...prev]);
    }, 3600);

    // Step 5: Visual prep after 5s
    setTimeout(() => {
      setCurrentPipelineStage('visual-prep');
      const event5: TimelineEvent = {
        id: `evt-${Date.now()}-5`,
        timestamp: getCurrentTime(),
        stage: 'Visual Prepared',
        description: 'Terminal velocity vector equilibrium diagram prepared for Smart Board display.',
        source: 'SmartBoard',
        status: 'info'
      };
      setTimelineEvents(prev => [event5, ...prev]);
    }, 4800);

    // Step 6: Teacher notified after 6s
    setTimeout(() => {
      setCurrentPipelineStage('teacher-notified');
      const event6: TimelineEvent = {
        id: `evt-${Date.now()}-6`,
        timestamp: getCurrentTime(),
        stage: 'Teacher Notified',
        description: 'Audio brief and cue cards synchronized to Dr. Sharma\'s headset.',
        source: 'TeacherHeadset',
        status: 'success'
      };
      setTimelineEvents(prev => [event6, ...prev]);
      setIsSimulating(false);
      setToastMessage(`Pipeline Complete: New question from Ishaan Sharma is ready for teacher.`);
    }, 6000);
  };

  const startSession = () => {
    setSessionState('Live Demo');
    setDevices(prev => prev.map(d => ({ ...d, status: d.type === 'headset' ? 'Active' : d.type === 'microphone' ? 'Ready' : 'Connected' })));
    setToastMessage('Session resumed. Camera, mic, smart board, and headset active.');
  };

  const pauseSession = () => {
    setSessionState('Paused');
    setDevices(prev => prev.map(d => ({ ...d, status: 'Standby' })));
    setToastMessage('Session paused. Hardware sensors placed in standby mode.');
  };

  const endSession = () => {
    setSessionState('Ended');
    setDevices(prev => prev.map(d => ({ ...d, status: 'Standby' })));
    setToastMessage('Session ended. Analytics saved to session history.');
  };

  const resetDemoData = () => {
    setQuestions(INITIAL_QUESTIONS);
    setActiveQuestionId('q-101');
    setDevices(INITIAL_DEVICES);
    setTimelineEvents(INITIAL_TIMELINE_EVENTS);
    setAnalytics(INITIAL_ANALYTICS);
    setCurrentPipelineStage('teacher-notified');
    setSessionState('Live Demo');
    setSessionDuration(48 * 60 + 24);
    setToastMessage('Demo dataset reset to initial state.');
  };

  // KPIs
  const totalQuestions = questions.length;
  const answeredQuestions = questions.filter(q => q.status === 'Answered').length;
  const resolutionRate = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
  const conceptsNeedingAttention = questions.filter(q => q.status === 'Needs Teacher Attention' || q.status === 'Processing').length;
  const engagementScore = 78;

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedRoom,
        setSelectedRoom,
        selectedSubject,
        setSelectedSubject,
        sessionState,
        setSessionState,
        sessionDuration,
        formatDuration,
        questions,
        activeQuestion,
        setActiveQuestionId,
        devices,
        timelineEvents,
        analytics,
        pastSessions,
        currentPipelineStage,
        isSimulating,
        smartBoardModalOpen,
        setSmartBoardModalOpen,
        headsetModalOpen,
        setHeadsetModalOpen,
        notificationDrawerOpen,
        setNotificationDrawerOpen,
        toastMessage,
        setToastMessage,
        simulateNextQuestion,
        markQuestionAnswered,
        flagQuestionForReview,
        regenerateExplanation,
        sendToTeacherHeadset,
        broadcastToSmartBoard,
        startSession,
        pauseSession,
        endSession,
        resetDemoData,
        kpis: {
          totalQuestions,
          answeredQuestions,
          resolutionRate,
          conceptsNeedingAttention,
          engagementScore
        }
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
