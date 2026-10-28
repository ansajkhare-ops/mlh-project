import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  Filter, 
  ExternalLink, 
  Tv, 
  ChevronRight,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QuestionStatus } from '../../types';

export const QuickQuestionQueue: React.FC = () => {
  const { 
    questions, 
    activeQuestion, 
    setActiveQuestionId, 
    setActiveView,
    broadcastToSmartBoard 
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredQuestions = questions.filter(q => {
    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
    const matchesSearch = 
      q.originalTranscript.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: QuestionStatus) => {
    switch (status) {
      case 'Answered':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <CheckCircle className="w-2.5 h-2.5" />
            <span>Answered</span>
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 animate-pulse">
            <Clock className="w-2.5 h-2.5" />
            <span>Processing</span>
          </span>
        );
      case 'Needs Teacher Attention':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
            <AlertCircle className="w-2.5 h-2.5" />
            <span>Teacher Review</span>
          </span>
        );
      case 'New':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200/60">
            <Sparkles className="w-2.5 h-2.5" />
            <span>New</span>
          </span>
        );
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Basic':
        return <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Basic</span>;
      case 'Intermediate':
        return <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">Intermediate</span>;
      case 'Advanced':
        return <span className="text-[10px] font-medium text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">Advanced</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs mt-5">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-gray-900">Live Question Queue</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {filteredQuestions.length} questions
            </span>
          </div>
          <p className="text-[11px] text-gray-400">Classroom inquiries transcribed and triaged in real time</p>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions or student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 rounded-md pl-7 pr-2.5 py-1 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-44"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-1.5" />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-md text-[11px] font-medium">
            {['All', 'Processing', 'Answered', 'Needs Teacher Attention'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2 py-1 rounded transition-colors ${
                  statusFilter === status 
                    ? 'bg-white text-gray-900 font-semibold shadow-2xs' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {status === 'Needs Teacher Attention' ? 'Review' : status}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveView('questions')}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 pl-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Questions Table */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-medium text-[11px] uppercase tracking-wider">
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Student & Seat</th>
              <th className="py-2.5 px-3 w-1/2">Question</th>
              <th className="py-2.5 px-3">Topic</th>
              <th className="py-2.5 px-3">Level</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredQuestions.map(q => {
              const isSelected = activeQuestion?.id === q.id;
              return (
                <tr 
                  key={q.id}
                  onClick={() => setActiveQuestionId(q.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-indigo-50/50 hover:bg-indigo-50/70' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    {getStatusBadge(q.status)}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="font-semibold text-gray-800">{q.studentName}</span>
                    <span className="block text-[10px] text-gray-400 font-mono">{q.studentSeat}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-gray-900 font-medium line-clamp-1">
                      {q.originalTranscript}
                    </span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      Captured at {q.timestamp} · STT Confidence: {q.confidenceScore}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="text-gray-600 bg-gray-100/80 px-2 py-0.5 rounded text-[11px]">
                      {q.topic}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    {getDifficultyBadge(q.difficulty)}
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          setActiveQuestionId(q.id);
                          broadcastToSmartBoard(q.id);
                        }}
                        className="p-1 rounded text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        title="Broadcast visual to Smart Board"
                      >
                        <Tv className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setActiveQuestionId(q.id);
                          setActiveView('questions');
                        }}
                        className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
