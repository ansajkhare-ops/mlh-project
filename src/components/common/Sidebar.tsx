import React from 'react';
import { 
  LayoutDashboard, 
  Video, 
  BrainCircuit, 
  BarChart3, 
  History, 
  Settings, 
  Radio, 
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActiveView } from '../../types';

export const Sidebar: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    selectedRoom, 
    sessionState 
  } = useApp();

  const navItems: { id: ActiveView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'classroom', label: 'Live Classroom', icon: <Video className="w-4 h-4" />, badge: 'LIVE' },
    { id: 'questions', label: 'Question Intelligence', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'analytics', label: 'Learning Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'history', label: 'Session History', icon: <History className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col justify-between select-none min-h-screen">
      {/* Top Branding */}
      <div>
        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            {/* Custom Guru Saarthi Logo Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-900 tracking-tight text-[15px]">Guru Saarthi</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">AI</span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium">Virtual Teaching Assistant</p>
          </div>
        </div>

        {/* Navigation links */}
        <div className="px-3 py-4">
          <p className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">Classroom Console</p>
          <nav className="space-y-1">
            {navItems.map(item => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-[13px] font-medium transition-colors text-left group ${
                    isActive 
                      ? 'bg-gray-100/80 text-gray-900 font-semibold shadow-xs' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      sessionState === 'Live Demo' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Quick-Action Simulator Banner */}
        <div className="px-4 py-2">
          <div className="p-3 rounded-lg bg-gray-50/80 border border-gray-200/70 text-xs">
            <div className="flex items-center gap-1.5 text-indigo-700 font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Real-Time Assist</span>
            </div>
            <p className="text-gray-500 text-[11px] leading-relaxed">
              Synthesizing student questions into smart board diagrams & teacher briefs.
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar Footer Metadata */}
      <div className="p-4 border-t border-gray-100 space-y-3 bg-[#fdfdfd]">
        {/* Connected Classroom */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Radio className="w-3.5 h-3.5 text-emerald-600" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
            </div>
            <span className="text-gray-600 font-medium">Room:</span>
            <span className="font-semibold text-gray-900">{selectedRoom}</span>
          </div>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/60">
            Demo Environment
          </span>
        </div>

        {/* Teacher Profile */}
        <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white flex items-center justify-center text-xs font-semibold shadow-xs">
            AS
          </div>
          <div className="overflow-hidden">
            <p className="text-[12px] font-semibold text-gray-900 truncate">Dr. Ananya Sharma</p>
            <p className="text-[11px] text-gray-500 truncate">Senior Physics Faculty</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
