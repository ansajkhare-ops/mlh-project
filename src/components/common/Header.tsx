import React from 'react';
import { 
  Bell, 
  Clock, 
  ChevronDown, 
  Radio, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  HelpCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { 
    activeView, 
    selectedRoom, 
    setSelectedRoom, 
    selectedSubject, 
    setSelectedSubject, 
    sessionState,
    sessionDuration,
    formatDuration,
    simulateNextQuestion,
    isSimulating,
    resetDemoData,
    timelineEvents,
    notificationDrawerOpen,
    setNotificationDrawerOpen
  } = useApp();

  const getBreadcrumbTitle = () => {
    switch (activeView) {
      case 'overview':
        return 'Overview Dashboard';
      case 'classroom':
        return 'Live Classroom & Sensors';
      case 'questions':
        return 'Question Intelligence & AI Workspace';
      case 'analytics':
        return 'Learning Analytics & Trends';
      case 'history':
        return 'Session History & Reports';
      case 'settings':
        return 'System & AI Settings';
      default:
        return 'Dashboard';
    }
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-20 select-none shadow-xs">
      {/* Left: Breadcrumbs & Page Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center text-xs text-gray-500 font-medium">
          <span className="text-gray-400">Classroom</span>
          <span className="mx-1.5 text-gray-300">/</span>
          <span className="font-semibold text-gray-800">{getBreadcrumbTitle()}</span>
        </div>

        {/* SIMULATED LIVE DATA BADGE (Explicitly required for hackathon) */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-[11px] font-bold text-indigo-700 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          <span>SIMULATED LIVE DATA</span>
        </div>
      </div>

      {/* Middle & Right: Controls, Selectors, Timer, Notifications */}
      <div className="flex items-center gap-3">
        {/* Room Selector */}
        <div className="relative inline-flex items-center">
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="appearance-none bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold rounded-md pl-2.5 pr-7 py-1.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
          >
            <option value="Room 204">Room 204 (Physics Lab)</option>
            <option value="Room 108">Room 108 (Lecture Hall)</option>
            <option value="Room 302">Room 302 (Seminar Room)</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 pointer-events-none" />
        </div>

        {/* Subject Selector */}
        <div className="relative inline-flex items-center">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="appearance-none bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold rounded-md pl-2.5 pr-7 py-1.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
          >
            <option value="Physics">Physics (Gravitation)</option>
            <option value="Chemistry">Chemistry (Thermodynamics)</option>
            <option value="Mathematics">Mathematics (Calculus)</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 pointer-events-none" />
        </div>

        {/* Session Status indicator */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-[11px]">{sessionState}</span>
        </div>

        {/* Session Timer & Date */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-200/80 px-2.5 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-mono font-medium text-gray-800">{formatDuration(sessionDuration)}</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500 text-[11px]">{formattedDate}</span>
        </div>

        {/* Live Simulation Button for Judges */}
        <button
          onClick={simulateNextQuestion}
          disabled={isSimulating}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white shadow-xs transition-all ${
            isSimulating 
              ? 'bg-indigo-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
          }`}
          title="Simulate a student raising hand and asking question"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'Simulating Pipeline...' : 'Simulate Hand Raise'}</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setNotificationDrawerOpen(!notificationDrawerOpen)}
          className="relative p-1.5 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
          title="View Event Stream & Notifications"
        >
          <Bell className="w-4 h-4" />
          {timelineEvents.length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white"></span>
          )}
        </button>

        {/* Reset Demo State Button */}
        <button
          onClick={resetDemoData}
          className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          title="Reset Demo Data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
