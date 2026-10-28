import React from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Tv, 
  CheckCircle2, 
  Headphones, 
  ArrowRight, 
  FileText, 
  BrainCircuit, 
  Lightbulb, 
  BookOpen, 
  Maximize2,
  Volume2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PipelineStage } from '../../types';

export const QuestionIntelligencePanel: React.FC = () => {
  const { 
    activeQuestion, 
    currentPipelineStage, 
    regenerateExplanation, 
    broadcastToSmartBoard, 
    markQuestionAnswered,
    sendToTeacherHeadset,
    setActiveView
  } = useApp();

  const pipelineStages: { id: PipelineStage; label: string; short: string }[] = [
    { id: 'hand-raise', label: 'Hand Raise', short: 'Raise' },
    { id: 'audio-capture', label: 'Audio Captured', short: 'Audio' },
    { id: 'transcription', label: 'Transcribed', short: 'STT' },
    { id: 'ai-reasoning', label: 'AI Reasoning', short: 'Reason' },
    { id: 'visual-prep', label: 'Visual Generated', short: 'Visual' },
    { id: 'teacher-notified', label: 'Teacher Notified', short: 'Brief' },
  ];

  const getStageIndex = (stage: PipelineStage) => {
    switch (stage) {
      case 'idle': return -1;
      case 'hand-raise': return 0;
      case 'audio-capture': return 1;
      case 'transcription': return 2;
      case 'ai-reasoning': return 3;
      case 'visual-prep': return 4;
      case 'teacher-notified': return 5;
      case 'resolved': return 6;
      default: return 5;
    }
  };

  const currentIdx = getStageIndex(currentPipelineStage);

  return (
    <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Panel Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-semibold text-gray-900">Question Intelligence</h2>
            <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {activeQuestion?.subject || 'Physics'} · {activeQuestion?.topic || 'Gravitation'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Simulated AI Confidence */}
            <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>{activeQuestion?.confidenceScore || 96}% AI Confidence</span>
              <span className="text-[9px] text-emerald-600 font-normal">(simulated)</span>
            </div>
            <button
              onClick={() => setActiveView('questions')}
              className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
            >
              <span>Full Workspace</span>
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 6-Stage Pipeline Graphic */}
        <div className="my-3.5 bg-gray-50/80 p-2.5 rounded-lg border border-gray-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Processing Pipeline</span>
            <span className="text-[10px] font-semibold text-indigo-600">
              Stage: {pipelineStages[Math.min(currentIdx >= 0 ? currentIdx : 0, 5)].label}
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1.5 items-center">
            {pipelineStages.map((stage, idx) => {
              const isPassed = currentIdx >= idx;
              const isCurrent = currentIdx === idx;
              return (
                <div key={stage.id} className="flex flex-col items-center text-center">
                  <div 
                    className={`w-full h-1.5 rounded-full mb-1 transition-colors ${
                      isCurrent 
                        ? 'bg-indigo-600 animate-pulse' 
                        : isPassed 
                        ? 'bg-indigo-400' 
                        : 'bg-gray-200'
                    }`}
                  />
                  <span className={`text-[9px] font-medium leading-tight truncate w-full ${
                    isCurrent ? 'text-indigo-700 font-bold' : isPassed ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {stage.short}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Question Header & Transcript */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-semibold text-gray-700">Student Question</span>
            <span className="text-[11px] text-gray-400">{activeQuestion?.studentName} · {activeQuestion?.studentSeat}</span>
          </div>
          <div className="p-2.5 bg-indigo-50/40 border border-indigo-100 rounded-lg">
            <p className="text-xs font-semibold text-indigo-950 italic">
              "{activeQuestion?.originalTranscript || 'Why does an apple fall toward the ground instead of floating in the air?'}"
            </p>
          </div>
        </div>

        {/* Key Concepts Tags */}
        <div className="mb-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Core Concepts</span>
          <div className="flex flex-wrap gap-1.5">
            {activeQuestion?.keyConcepts.map((concept, idx) => (
              <span 
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-800 border border-gray-200/80"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>

        {/* Two Mini Columns: Teacher Headset Brief + Smart Board Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {/* Teacher Headset Brief */}
          <div className="p-2.5 rounded-lg border border-gray-200 bg-[#fafafa] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
                  <Headphones className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Teacher Headset Brief</span>
                </div>
                <button
                  onClick={() => sendToTeacherHeadset(activeQuestion.id)}
                  className="p-1 rounded hover:bg-gray-200 text-gray-500 transition-colors"
                  title="Simulate Headset Whisper Audio"
                >
                  <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                </button>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed italic">
                "{activeQuestion?.teacherHeadsetBrief.whisperText}"
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100">
              <span className="text-[10px] text-indigo-700 font-semibold">Keywords: </span>
              <span className="text-[10px] text-gray-600 font-mono">
                {activeQuestion?.teacherHeadsetBrief.keywords.join(' · ')}
              </span>
            </div>
          </div>

          {/* Smart Board Visual Preview (Interactive SVG Vector Diagram) */}
          <div className="p-2.5 rounded-lg border border-gray-200 bg-white flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
                <Tv className="w-3.5 h-3.5 text-blue-600" />
                <span>Smart Board Visual</span>
              </div>
              <button
                onClick={() => broadcastToSmartBoard(activeQuestion.id)}
                className="text-[10px] text-blue-600 font-semibold hover:underline"
              >
                Full Screen
              </button>
            </div>

            {/* Educational Vector Graphic */}
            <div className="h-20 bg-slate-900 rounded border border-slate-800 flex items-center justify-center p-1 relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 160 80" fill="none">
                {/* Branch */}
                <path d="M 0 15 Q 40 18 80 15" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
                {/* Leaves */}
                <circle cx="30" cy="12" r="10" fill="#15803d" opacity="0.8" />
                <circle cx="50" cy="10" r="12" fill="#16a34a" opacity="0.9" />
                {/* Apple */}
                <circle cx="70" cy="35" r="7" fill="#ef4444" />
                <path d="M 70 28 Q 72 24 74 23" stroke="#15803d" strokeWidth="1.5" />
                {/* Gravity Vector Downward */}
                <line x1="70" y1="44" x2="70" y2="65" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
                <polygon points="67,65 73,65 70,70" fill="#38bdf8" />
                {/* Acceleration label */}
                <text x="82" y="55" fill="#38bdf8" fontSize="7" fontWeight="bold">g = 9.8 m/s²</text>
                <text x="82" y="65" fill="#94a3b8" fontSize="6">F = m·g</text>
                {/* Ground */}
                <line x1="0" y1="76" x2="160" y2="76" stroke="#475569" strokeWidth="2" />
              </svg>
            </div>

            <p className="text-[10px] text-gray-500 truncate mt-1">
              {activeQuestion?.smartBoardVisual?.title}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => regenerateExplanation(activeQuestion.id)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Generate alternative pedagogical phrasing"
          >
            <RotateCcw className="w-3 h-3 text-gray-500" />
            <span>Regenerate</span>
          </button>

          <button
            onClick={() => broadcastToSmartBoard(activeQuestion.id)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors"
          >
            <Tv className="w-3 h-3 text-indigo-600" />
            <span>Show on Smart Board</span>
          </button>
        </div>

        <button
          onClick={() => markQuestionAnswered(activeQuestion.id)}
          disabled={activeQuestion?.status === 'Answered'}
          className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold shadow-xs transition-colors ${
            activeQuestion?.status === 'Answered'
              ? 'bg-emerald-100 text-emerald-800 cursor-default'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          <CheckCircle2 className="w-3 h-3" />
          <span>{activeQuestion?.status === 'Answered' ? 'Resolved ✓' : 'Mark as Resolved'}</span>
        </button>
      </div>
    </div>
  );
};
