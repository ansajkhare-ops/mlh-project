import React from 'react';
import { 
  X, 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Video, 
  Mic, 
  Tv, 
  Headphones, 
  BrainCircuit, 
  Trash2 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationDrawer: React.FC = () => {
  const { 
    notificationDrawerOpen, 
    setNotificationDrawerOpen, 
    timelineEvents, 
    selectedRoom 
  } = useApp();

  if (!notificationDrawerOpen) return null;

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Camera': return <Video className="w-3.5 h-3.5 text-blue-600" />;
      case 'Mic': return <Mic className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Speech-to-Text': return <Info className="w-3.5 h-3.5 text-cyan-600" />;
      case 'LLM-Engine': return <BrainCircuit className="w-3.5 h-3.5 text-purple-600" />;
      case 'SmartBoard': return <Tv className="w-3.5 h-3.5 text-emerald-600" />;
      case 'TeacherHeadset': return <Headphones className="w-3.5 h-3.5 text-indigo-600" />;
      default: return <Bell className="w-3.5 h-3.5 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-gray-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-sm text-gray-900">Classroom Event Telemetry</h3>
            <span className="text-[10px] font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              {timelineEvents.length} events
            </span>
          </div>

          <button
            onClick={() => setNotificationDrawerOpen(false)}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Event List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-2.5">
          {timelineEvents.map((evt) => (
            <div 
              key={evt.id}
              className="p-3 rounded-lg border border-gray-100 bg-gray-50/70 hover:bg-gray-100/80 transition-colors text-xs"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  {getSourceIcon(evt.source)}
                  <span className="font-semibold text-gray-900 text-[11px]">{evt.stage}</span>
                </div>
                <span className="font-mono text-[10px] text-gray-400">{evt.timestamp}</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed mb-1.5">
                {evt.description}
              </p>
              <div className="flex items-center justify-between text-[10px] text-gray-400">
                <span className="font-mono">Source: {evt.source}</span>
                <span className="text-emerald-600 font-medium">Logged</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <span>Connected to {selectedRoom} Telemetry Bus</span>
          <button
            onClick={() => setNotificationDrawerOpen(false)}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
