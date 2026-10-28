import React, { useState } from 'react';
import {
  BrainCircuit,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Sparkles,
  Tv,
  Headphones,
  RotateCcw,
  CheckCircle2,
  Flag,
  Lightbulb,
  BookOpen,
  HelpCircle,
  FileText,
  Volume2,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Question, QuestionStatus } from '../../types';

export const QuestionIntelligenceView: React.FC = () => {
  const {
    questions,
    activeQuestion,
    setActiveQuestionId,
    markQuestionAnswered,
    flagQuestionForReview,
    regenerateExplanation,
    sendToTeacherHeadset,
    broadcastToSmartBoard,
    setSmartBoardModalOpen,
    setHeadsetModalOpen
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [topicFilter, setTopicFilter] = useState<string>('All');

  const topics = ['All', 'Gravitation', 'Gravity & Planetary Dynamics', 'Vacuum & Equivalence Principle', 'Orbital Mechanics & Satellites'];

  const filteredQuestions = questions.filter(q => {
    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
    const matchesTopic = topicFilter === 'All' || q.topic.includes(topicFilter);
    const matchesSearch =
      q.originalTranscript.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesTopic && matchesSearch;
  });

  const getStatusBadge = (status: QuestionStatus) => {
    switch (status) {
      case 'Answered':
        return <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Answered</span>;
      case 'Processing':
        return <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 animate-pulse">Processing</span>;
      case 'Needs Teacher Attention':
        return <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Needs Attention</span>;
      case 'New':
        return <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">New</span>;
    }
  };

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto">

      {/* Master-Detail Split Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Question Queue & Filters (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs flex flex-col">
          {/* Search & Filters */}
          <div className="space-y-2 mb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search transcripts or students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md pl-8 pr-3 py-1.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px]">
              {['All', 'Processing', 'Answered', 'Needs Teacher Attention'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-2 py-1 rounded whitespace-nowrap transition-colors ${statusFilter === status
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {status === 'Needs Teacher Attention' ? 'Review' : status}
                </button>
              ))}
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-2 overflow-y-auto max-h-[680px] pr-1">
            {filteredQuestions.map(q => {
              const isSelected = activeQuestion?.id === q.id;
              return (
                <div
                  key={q.id}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${isSelected
                      ? 'bg-indigo-50/70 border-indigo-300 shadow-2xs'
                      : 'bg-gray-50/60 border-gray-200 hover:bg-gray-100/70'
                    }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-xs text-gray-900">{q.studentName}</span>
                    {getStatusBadge(q.status)}
                  </div>
                  <p className="text-xs text-gray-700 font-medium line-clamp-2 mb-2">
                    "{q.originalTranscript}"
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-gray-200/50">
                    <span>{q.studentSeat}</span>
                    <span className="font-mono">{q.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Question Workspace (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-gray-200/90 rounded-xl p-5 shadow-xs space-y-5">
          {/* Workspace Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-gray-900">
                  {activeQuestion?.studentName} — {activeQuestion?.studentSeat}
                </h2>
                {getStatusBadge(activeQuestion?.status)}
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                  {activeQuestion?.difficulty}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Topic: <span className="font-medium text-gray-800">{activeQuestion?.topic}</span> · Captured at {activeQuestion?.timestamp}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => sendToTeacherHeadset(activeQuestion.id)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
                title="Send audio whisper to teacher headset"
              >
                <Headphones className="w-3.5 h-3.5 text-indigo-600" />
                <span>Send to Headset</span>
              </button>

              <button
                onClick={() => broadcastToSmartBoard(activeQuestion.id)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition-colors"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Show on Board</span>
              </button>

              <button
                onClick={() => flagQuestionForReview(activeQuestion.id)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200 transition-colors"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Flag for Review</span>
              </button>

              <button
                onClick={() => markQuestionAnswered(activeQuestion.id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Answered</span>
              </button>
            </div>
          </div>

          {/* Section 1: Transcripts (Original vs Corrected) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Acoustic Microphone Stream (Raw)
              </span>
              <p className="text-xs text-gray-800 italic leading-relaxed">
                "{activeQuestion?.originalTranscript}"
              </p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50/50 border border-indigo-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                  AI Context-Corrected Query
                </span>
                <span className="text-[10px] text-indigo-700 font-mono">Confidence: {activeQuestion?.confidenceScore}%</span>
              </div>
              <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                "{activeQuestion?.correctedTranscript}"
              </p>
            </div>
          </div>

          {/* Section 2: AI Pedagogical Explanation */}
          <div className="p-4 rounded-xl border border-gray-200 bg-[#fafafa] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                  AI Pedagogical Explanation & Teaching Guide
                </h3>
              </div>
              <button
                onClick={() => regenerateExplanation(activeQuestion.id)}
                className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Regenerate Angle</span>
              </button>
            </div>

            {/* Concise Answer */}
            <div className="p-3 rounded-lg bg-white border border-gray-200/80 shadow-2xs">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">Concise Explanation for Class</span>
              <p className="text-xs text-gray-800 leading-relaxed font-medium">
                {activeQuestion?.aiExplanation.conciseAnswer}
              </p>
            </div>

            {/* Pedagogical Hint + Analogy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white border border-gray-200/80">
                <div className="flex items-center gap-1.5 text-amber-700 font-semibold mb-1">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Pedagogical Teaching Hint</span>
                </div>
                <p className="text-gray-600 text-[11px] leading-relaxed">
                  {activeQuestion?.aiExplanation.pedagogicalHint}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-gray-200/80">
                <div className="flex items-center gap-1.5 text-blue-700 font-semibold mb-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Intuitive Analogy</span>
                </div>
                <p className="text-gray-600 text-[11px] leading-relaxed">
                  {activeQuestion?.aiExplanation.analogy}
                </p>
              </div>
            </div>

            {/* Common Misconception Alert */}
            <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-900 text-[11px]">Common Student Misconception: </span>
                <span className="text-amber-800 text-[11px]">{activeQuestion?.aiExplanation.commonMisconception}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Smart Board Visual Preview & Suggested Follow-up Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Smart Board Visual Card */}
            <div className="p-3.5 rounded-xl border border-gray-200 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                    <Tv className="w-3.5 h-3.5 text-blue-600" />
                    <span>Smart Board Visual Deck</span>
                  </div>
                  <button
                    onClick={() => setSmartBoardModalOpen(true)}
                    className="text-[11px] text-blue-600 font-semibold hover:underline"
                  >
                    Launch Presentation
                  </button>
                </div>

                <div className="h-32 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center p-2 relative overflow-hidden">
                  {/* Schematic Representation */}
                  <div className="text-center">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">{activeQuestion?.smartBoardVisual.title}</span>
                    {activeQuestion?.smartBoardVisual.formula && (
                      <code className="text-[11px] bg-slate-800/80 text-amber-300 px-2 py-0.5 rounded font-mono block mb-1">
                        {activeQuestion?.smartBoardVisual.formula}
                      </code>
                    )}
                    <span className="text-[10px] text-slate-400 max-w-xs line-clamp-2">
                      {activeQuestion?.smartBoardVisual.caption}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 space-y-1">
                  {activeQuestion?.smartBoardVisual.keyPoints.map((pt, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-600">
                      <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => broadcastToSmartBoard(activeQuestion.id)}
                className="mt-3 w-full py-1.5 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 transition-colors"
              >
                Sync with Classroom Board
              </button>
            </div>

            {/* Suggested Follow-up Questions for the Teacher */}
            <div className="p-3.5 rounded-xl border border-gray-200 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 mb-2">
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Suggested Socratic Follow-Up Questions</span>
                </div>
                <p className="text-[11px] text-gray-400 mb-2">
                  Use these to stimulate active classroom discussion and verify conceptual grasp:
                </p>

                <div className="space-y-2">
                  {activeQuestion?.teacherHeadsetBrief.suggestedFollowUps.map((qText, i) => (
                    <div key={i} className="p-2 rounded bg-gray-50 border border-gray-200 text-xs text-gray-800 flex items-start gap-2">
                      <span className="font-bold text-indigo-600 text-[11px]">{i + 1}.</span>
                      <span className="text-[11px] leading-relaxed font-medium">{qText}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span>Prompted via Teacher Headset</span>
                <span className="text-indigo-600 font-semibold cursor-pointer" onClick={() => setHeadsetModalOpen(true)}>
                  Test Audio Whisper →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
