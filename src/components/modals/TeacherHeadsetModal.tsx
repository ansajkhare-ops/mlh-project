import React, { useState } from 'react';
import {
  X,
  Headphones,
  Volume2,
  Play,
  Pause,
  Radio,
  Sparkles,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherHeadsetModal: React.FC = () => {
  const {
    headsetModalOpen,
    setHeadsetModalOpen,
    activeQuestion,
    selectedRoom
  } = useApp();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  if (!headsetModalOpen) return null;

  const brief = activeQuestion.teacherHeadsetBrief;

  const togglePlayAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white border border-gray-200 w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col text-gray-900 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/50 to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-gray-900">Teacher Headset Whisper Link</h3>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  Active (12ms)
                </span>
              </div>
              <p className="text-[11px] text-gray-500">Dr. Ananya Sharma · Bone-Conduction Channel</p>
            </div>
          </div>

          <button
            onClick={() => setHeadsetModalOpen(false)}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Question context */}
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-0.5">
              Target Student Question ({activeQuestion.studentName} · {activeQuestion.studentSeat})
            </span>
            <p className="text-gray-800 font-medium italic">
              "{activeQuestion.originalTranscript}"
            </p>
          </div>

          {/* Keywords */}
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
              Keywords Pushed to Heads-Up Display
            </span>
            <div className="flex flex-wrap gap-1.5">
              {brief.keywords.map((kw, i) => (
                <span key={i} className="text-xs font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-800 border border-gray-200 font-medium">
                  {kw}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Encrypted BLE Mesh Link · Room 204</span>
          <button
            onClick={() => setHeadsetModalOpen(false)}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
