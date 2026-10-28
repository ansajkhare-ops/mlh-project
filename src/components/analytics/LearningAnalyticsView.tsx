import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Lightbulb,
  AlertCircle,
  Filter,
  Calendar,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LearningAnalyticsView: React.FC = () => {
  const { analytics, pastSessions } = useApp();
  const [selectedRange, setSelectedRange] = useState<string>('5-sessions');

  // Interactive filter effect
  const questionsPerSessionData = selectedRange === '3-sessions'
    ? analytics.questionsPerSession.slice(-3)
    : analytics.questionsPerSession;

  const curiosityData = selectedRange === '3-sessions'
    ? analytics.curiosityIndicators.slice(-3)
    : analytics.curiosityIndicators;

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto">
      {/* Top Banner with Filter */}
      <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h1 className="text-base font-bold text-gray-900 tracking-tight">Classroom Learning Analytics</h1>
            <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
              Aggregated AI Insights
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Observational patterns across classroom sessions tracking question frequency, topic confusion, and curiosity indicators.
          </p>
        </div>

        {/* Date / Session Range Filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-md">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="bg-transparent border-none text-gray-800 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="5-sessions">Recent 5 Sessions (Oct 19 - Oct 28)</option>
              <option value="3-sessions">Recent 3 Sessions (Oct 24 - Oct 28)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Analytics Summary Card (Section 6 Requirement) */}
      <div className="bg-gradient-to-r from-indigo-50/80 via-white to-blue-50/80 border border-indigo-100 rounded-xl p-4 shadow-xs">
        <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Automated Pedagogical Synthesis</span>
          <span className="text-[10px] text-indigo-600 font-normal lowercase">(simulated summary)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-3 bg-white/90 rounded-lg border border-indigo-100">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Most Discussed Topic</span>
            <span className="text-sm font-bold text-gray-900">Gravity</span>
            <span className="text-[10px] text-indigo-600 block mt-0.5">8 distinct questions</span>
          </div>

          <div className="p-3 bg-white/90 rounded-lg border border-indigo-100">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Most Common Question Type</span>
            <span className="text-sm font-bold text-gray-900">Conceptual Reasoning</span>
            <span className="text-[10px] text-emerald-600 block mt-0.5">High inquisitive value</span>
          </div>

          <div className="p-3 bg-white/90 rounded-lg border border-indigo-100">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Priority Revision Area</span>
            <span className="text-sm font-bold text-amber-700">Motion & Force</span>
            <span className="text-[10px] text-amber-600 block mt-0.5">3 recurring confusions</span>
          </div>

          <div className="p-3 bg-white/90 rounded-lg border border-indigo-100">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Suggested Teaching Action</span>
            <span className="text-sm font-bold text-indigo-900">Visual Demo + Quiz</span>
            <span className="text-[10px] text-gray-500 block mt-0.5">Vacuum tube drop test</span>
          </div>

          <div className="p-3 bg-white/90 rounded-lg border border-indigo-100">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Engagement Trend</span>
            <span className="text-sm font-bold text-emerald-700">Increasing (+125%)</span>
            <span className="text-[10px] text-emerald-600 block mt-0.5">8 → 18 questions across term</span>
          </div>
        </div>
      </div>

      {/* Charts Grid: 2x2 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart A: Questions Per Session */}
        <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-xs font-bold text-gray-900">Chart A — Questions Per Session</h3>
              <p className="text-[11px] text-gray-400">Total inquiries captured vs answered across recent classes</p>
            </div>
            <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              Trend: Upward
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={questionsPerSessionData} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="session" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} domain={[0, 20]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line
                  type="monotone"
                  dataKey="questions"
                  name="Questions Asked"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#4f46e5' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="answered"
                  name="AI-Assisted Resolved"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3, fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Question Complexity */}
        <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-xs font-bold text-gray-900">Chart B — Question Complexity Breakdown</h3>
              <p className="text-[11px] text-gray-400">Cognitive taxonomy distribution: Basic, Intermediate, Advanced</p>
            </div>
            <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              Bloom's Taxonomy
            </span>
          </div>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.questionComplexity}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} ${(((percent ?? 0)) * 100).toFixed(0)}%`}
                >
                  {analytics.questionComplexity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`${value}%`, 'Proportion']}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart C: Topic-wise Confusion */}
        <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-xs font-bold text-gray-900">Chart C — Topic-Wise Recurring Confusion</h3>
              <p className="text-[11px] text-gray-400">Questions requiring teacher intervention or follow-up breakdown</p>
            </div>
            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Revision Priority
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={analytics.topicConfusion}
                margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} domain={[0, 10]} />
                <YAxis dataKey="topic" type="category" tick={{ fontSize: 11, fill: '#334155', fontWeight: 500 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="questionsCount" name="Total Questions" fill="#6366f1" radius={[0, 4, 4, 0]} />
                <Bar dataKey="unresolvedCount" name="Needs Attention" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart D: Curiosity Indicators */}
        <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-xs font-bold text-gray-900">Chart D — Curiosity & "What If" Indicators</h3>
              <p className="text-[11px] text-gray-400">Frequency of hypothetical, exploratory thought experiments</p>
            </div>
            <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Creative Inquiry
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={curiosityData} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="session" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} domain={[0, 8]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line
                  type="monotone"
                  dataKey="exploratoryCount"
                  name="Exploratory Questions"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#3b82f6' }}
                />
                <Line
                  type="monotone"
                  dataKey="whatIfCount"
                  name="'What If' Scenarios"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={{ r: 4, fill: '#8b5cf6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
