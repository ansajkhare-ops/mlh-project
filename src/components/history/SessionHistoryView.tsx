import React, { useState } from 'react';
import { 
  History, 
  Calendar, 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ChevronRight,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SessionData } from '../../types';

export const SessionHistoryView: React.FC = () => {
  const { pastSessions, setToastMessage } = useApp();
  const [selectedSessionId, setSelectedSessionId] = useState<string>(pastSessions[0].id);

  const selectedSession = pastSessions.find(s => s.id === selectedSessionId) || pastSessions[0];

  const handleExportReport = () => {
    setToastMessage(`Session Report for "${selectedSession.name}" exported as PDF.`);
  };

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-600" />
            <h1 className="text-base font-bold text-gray-900 tracking-tight">Classroom Session History & Teaching Reports</h1>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Archived classroom transcripts, teacher briefing digests, recurring misconceptions, and recommended revision activities.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Export Session Report</span>
        </button>
      </div>

      {/* Two Column Layout: Session Archive List (Left) + Printable Report Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Past Sessions List (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
            <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">Archived Sessions</span>
            <span className="text-[11px] text-gray-400 font-mono">{pastSessions.length} sessions logged</span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[640px] pr-1">
            {pastSessions.map(session => {
              const isSelected = session.id === selectedSession.id;
              return (
                <div
                  key={session.id}
                  onClick={() => setSelectedSessionId(session.id)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-indigo-50/80 border-indigo-300 shadow-2xs' 
                      : 'bg-gray-50/60 border-gray-200 hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                    <span className="font-mono">{session.date}</span>
                    <span className="font-semibold text-gray-700">{session.room}</span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 mb-1.5 line-clamp-1">{session.name}</h3>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-indigo-600 font-medium">
                      {session.totalQuestions} questions ({session.answeredQuestions} answered)
                    </span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                      {Math.round((session.answeredQuestions / session.totalQuestions) * 100)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Session Report Card (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-gray-200/90 rounded-xl p-6 shadow-xs space-y-6">
          {/* Report Header */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-1">
              <span>REPORT ID: {selectedSession.id.toUpperCase()}-GURU-AI</span>
              <span>{selectedSession.date} · {selectedSession.room} · {selectedSession.durationMinutes} Minutes</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">{selectedSession.name}</h2>
            <p className="text-xs text-gray-500 mt-1">
              Lead Instructor: <span className="font-semibold text-gray-800">Dr. Ananya Sharma</span> · Subject: <span className="font-semibold text-gray-800">{selectedSession.subject}</span>
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <span className="text-[10px] text-gray-400 font-semibold uppercase block">Total Questions</span>
              <span className="text-xl font-bold text-gray-900">{selectedSession.totalQuestions}</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Captures by sensor</span>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
              <span className="text-[10px] text-emerald-800 font-semibold uppercase block">Questions Answered</span>
              <span className="text-xl font-bold text-emerald-800">{selectedSession.answeredQuestions}</span>
              <span className="text-[10px] text-emerald-700 block mt-0.5">AI-assisted delivery</span>
            </div>

            <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200">
              <span className="text-[10px] text-amber-800 font-semibold uppercase block">Questions Pending</span>
              <span className="text-xl font-bold text-amber-800">{selectedSession.attentionNeeded}</span>
              <span className="text-[10px] text-amber-700 block mt-0.5">Needs teacher revisit</span>
            </div>

            <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200">
              <span className="text-[10px] text-blue-800 font-semibold uppercase block">Classroom Engagement</span>
              <span className="text-xl font-bold text-blue-800">{selectedSession.engagementScore}%</span>
              <span className="text-[10px] text-blue-700 block mt-0.5">Interaction index</span>
            </div>
          </div>

          {/* Topics Covered */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">Curriculum Topics Addressed</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSession.topicsCovered.map((topic, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 border border-gray-200 font-medium">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Topics Needing Revision & Recommended Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Priority Revision Areas Identified</span>
              </div>
              <ul className="space-y-1.5 text-xs text-amber-950">
                {selectedSession.topicsNeedingRevision.map((rev, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{rev}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 mb-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Recommended Classroom Activity</span>
              </div>
              <p className="text-xs text-indigo-950 leading-relaxed font-medium">
                {selectedSession.recommendedActivity}
              </p>
            </div>
          </div>

          {/* Non-evaluative Pedagogical Statement */}
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-[11px] text-gray-500 leading-relaxed">
            <span className="font-semibold text-gray-700">Supportive Teaching Notice: </span>
            Guru Saarthi is an educational support platform, not a teacher assessment or surveillance tool. 
            Teaching insights are presented as formative recommendations under instructor discretion and review.
          </div>
        </div>
      </div>
    </div>
  );
};
