import React from 'react';
import { 
  HelpCircle, 
  CheckCircle, 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const KPICards: React.FC = () => {
  const { kpis } = useApp();

  const cards = [
    {
      title: 'Questions Asked',
      value: kpis.totalQuestions,
      subtitle: 'During this session',
      trend: '+22% vs last session',
      trendPositive: true,
      icon: <HelpCircle className="w-4 h-4 text-indigo-600" />,
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-100'
    },
    {
      title: 'Questions Answered',
      value: kpis.answeredQuestions,
      subtitle: 'AI-assisted responses',
      trend: `${kpis.resolutionRate}% resolution rate`,
      trendPositive: true,
      icon: <CheckCircle className="w-4 h-4 text-emerald-600" />,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    },
    {
      title: 'Concepts Needing Attention',
      value: kpis.conceptsNeedingAttention,
      subtitle: 'Recurring confusion detected',
      trend: '4 flagged for review',
      trendPositive: false,
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-100'
    },
    {
      title: 'Classroom Engagement',
      value: `${kpis.engagementScore}%`,
      subtitle: 'Estimated interaction indicator',
      trend: 'Top 15% curiosity index',
      trendPositive: true,
      icon: <Activity className="w-4 h-4 text-blue-600" />,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
      {cards.map((card, idx) => (
        <div 
          key={idx}
          className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-medium text-gray-500 tracking-tight">{card.title}</span>
            <div className={`p-1.5 rounded-md border ${card.badgeColor}`}>
              {card.icon}
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold tracking-tight text-gray-900">{card.value}</span>
            <div className="flex items-center text-[11px] font-medium text-emerald-700 bg-emerald-50/80 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3 h-3 mr-0.5" />
              <span>{card.trend}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span>{card.subtitle}</span>
            <span className="text-[10px] text-gray-300">Demo metric</span>
          </div>
        </div>
      ))}
    </div>
  );
};
