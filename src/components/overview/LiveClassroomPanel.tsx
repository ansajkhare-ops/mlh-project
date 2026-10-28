import React from 'react';
import { 
  Video, 
  Mic, 
  Tv, 
  Headphones, 
  Play, 
  Pause, 
  Square, 
  CheckCircle2, 
  Sparkles, 
  Activity, 
  Maximize2 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LiveClassroomPanel: React.FC = () => {
  const { 
    sessionState, 
    startSession, 
    pauseSession, 
    endSession, 
    devices, 
    timelineEvents, 
    simulateNextQuestion, 
    isSimulating,
    activeQuestion,
    setActiveView,
    setSmartBoardModalOpen
  } = useApp();

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'camera': return <Video className="w-3.5 h-3.5" />;
      case 'microphone': return <Mic className="w-3.5 h-3.5" />;
      case 'smartboard': return <Tv className="w-3.5 h-3.5" />;
      case 'headset': return <Headphones className="w-3.5 h-3.5" />;
      default: return <Activity className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between h-full">
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <h2 className="text-sm font-semibold text-gray-900">Live Classroom</h2>
            <span className="text-[11px] font-mono text-gray-400">Room 204</span>
          </div>
          <button
            onClick={() => setActiveView('classroom')}
            className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            <span>Sensors View</span>
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* Simulated Camera Feed Viewport */}
        <div className="mt-3 relative rounded-lg overflow-hidden bg-gray-950 aspect-[16/9] border border-gray-800 flex items-center justify-center group">
          {/* Scanline overlay */}
          <div className="absolute inset-0 camera-scanline pointer-events-none opacity-40"></div>

          {/* Camera HUD Header */}
          <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-gray-300 z-10">
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              <span className="font-bold text-red-400">REC</span>
              <span>1080p60 · CAM-01</span>
            </div>
            <div className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10 text-emerald-400">
              POSE TRACK: ACTIVE (98.2%)
            </div>
          </div>

          {/* Classroom Schematic Scene (SVG) */}
          <svg className="w-full h-full object-contain p-4" viewBox="0 0 400 220" fill="none">
            {/* Background Classroom Grid */}
            <defs>
              <pattern id="classGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="400" height="220" fill="url(#classGrid)" />

            {/* Front Stage / Teacher Podium */}
            <rect x="140" y="25" width="120" height="18" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <text x="200" y="37" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Teacher Station · Dr. Sharma</text>

            {/* Smart Board on Front Wall */}
            <rect x="290" y="10" width="85" height="40" rx="3" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="332" y="26" fill="#60a5fa" fontSize="6.5" textAnchor="middle" fontWeight="bold">SMART BOARD</text>
            <text x="332" y="38" fill="#93c5fd" fontSize="5.5" textAnchor="middle">{activeQuestion?.smartBoardVisual?.title || 'Gravitational Vectors'}</text>

            {/* Desks & Students Layout (3 rows x 4 columns) */}
            {/* Row 1 */}
            <g transform="translate(40, 75)">
              <rect x="10" y="0" width="55" height="22" rx="3" fill="#1e293b" stroke="#334155" />
              <circle cx="37" cy="11" r="5.5" fill="#475569" />
              <text x="37" y="27" fill="#64748b" fontSize="6" textAnchor="middle">S-01</text>
            </g>
            <g transform="translate(125, 75)">
              <rect x="10" y="0" width="55" height="22" rx="3" fill="#1e293b" stroke="#334155" />
              <circle cx="37" cy="11" r="5.5" fill="#475569" />
              <text x="37" y="27" fill="#64748b" fontSize="6" textAnchor="middle">S-02</text>
            </g>
            <g transform="translate(210, 75)">
              <rect x="10" y="0" width="55" height="22" rx="3" fill="#1e293b" stroke="#334155" />
              <circle cx="37" cy="11" r="5.5" fill="#475569" />
              <text x="37" y="27" fill="#64748b" fontSize="6" textAnchor="middle">S-03</text>
            </g>
            <g transform="translate(295, 75)">
              <rect x="10" y="0" width="55" height="22" rx="3" fill="#1e293b" stroke="#334155" />
              <circle cx="37" cy="11" r="5.5" fill="#475569" />
              <text x="37" y="27" fill="#64748b" fontSize="6" textAnchor="middle">S-04</text>
            </g>

            {/* Row 2 - Active Student Seat #14 highlighted */}
            <g transform="translate(40, 120)">
              <rect x="10" y="0" width="55" height="22" rx="3" fill="#1e293b" stroke="#334155" />
              <circle cx="37" cy="11" r="5.5" fill="#475569" />
              <text x="37" y="27" fill="#64748b" fontSize="6" textAnchor="middle">S-08</text>
            </g>
            {/* ACTIVE QUESTION SEAT (Aarav Patel / Ishaan) */}
            <g transform="translate(125, 120)">
              <rect x="10" y="0" width="55" height="22" rx="3" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
              <circle cx="37" cy="11" r="6" fill="#4f46e5" />
              {/* Hand raise vector / icon */}
              <circle cx="37" cy="11" r="10" stroke="#818cf8" strokeWidth="1" strokeDasharray="2 2" />
              <path d="M 46 7 L 46 0 L 49 -2" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
              <text x="37" y="27" fill="#a5b4fc" fontSize="6.5" fontWeight="bold" textAnchor="middle">Seat #14 (Asking)</text>
              {/* Detection bounding box */}
              <rect x="5" y="-6" width="65" height="38" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" />
            </g>
            <g transform="translate(210, 120)">
              <rect x="10" y="0" width="55" height="22" rx="3" fill="#1e293b" stroke="#334155" />
              <circle cx="37" cy="11" r="5.5" fill="#475569" />
              <text x="37" y="27" fill="#64748b" fontSize="6" textAnchor="middle">S-15</text>
            </g>
            <g transform="translate(295, 120)">
              <rect x="10" y="0" width="55" height="22" rx="3" fill="#1e293b" stroke="#334155" />
              <circle cx="37" cy="11" r="5.5" fill="#475569" />
              <text x="37" y="27" fill="#64748b" fontSize="6" textAnchor="middle">S-16</text>
            </g>

            {/* Row 3 */}
            <g transform="translate(40, 165)">
              <rect x="10" y="0" width="55" height="22" rx="3" fill="#1e293b" stroke="#334155" />
              <circle cx="37" cy="11" r="5.5" fill="#475569" />
              <text x="37" y="27" fill="#64748b" fontSize="6" textAnchor="middle">S-17</text>
            </g>
            <g transform="translate(125, 165)">
              <rect x="10" y="0" width="55" height="22" rx="3" fill="#1e293b" stroke="#334155" />
              <circle cx="37" cy="11" r="5.5" fill="#475569" />
              <text x="37" y="27" fill="#64748b" fontSize="6" textAnchor="middle">S-18</text>
            </g>
            <g transform="translate(210, 165)">
              <rect x="10" y="0" width="55" height="22" rx="3" fill="#1e293b" stroke="#334155" />
              <circle cx="37" cy="11" r="5.5" fill="#475569" />
              <text x="37" y="27" fill="#64748b" fontSize="6" textAnchor="middle">S-19</text>
            </g>
            <g transform="translate(295, 165)">
              <rect x="10" y="0" width="55" height="22" rx="3" fill="#1e293b" stroke="#334155" />
              <circle cx="37" cy="11" r="5.5" fill="#475569" />
              <text x="37" y="27" fill="#64748b" fontSize="6" textAnchor="middle">S-20</text>
            </g>
          </svg>

          {/* Camera Footer HUD */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-gray-400 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded border border-white/10">
            <span>Subject: {activeQuestion?.studentName} ({activeQuestion?.studentSeat})</span>
            <span className="text-indigo-400 font-mono">Beamforming Target: 3.4m @ 18°</span>
          </div>
        </div>

        {/* Hardware Status Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
          {devices.map(device => (
            <div 
              key={device.id}
              className="p-2 rounded-lg bg-gray-50/90 border border-gray-200/70 text-left hover:bg-gray-100/60 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-500">{getDeviceIcon(device.type)}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <div className="text-[11px] font-semibold text-gray-800 truncate">{device.name.replace('Classroom ', '')}</div>
              <div className="text-[10px] text-emerald-700 font-medium">{device.status} (sim)</div>
            </div>
          ))}
        </div>

        {/* Compact Event Timeline */}
        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Classroom Event Stream</span>
            <span className="text-[10px] text-gray-400">Chronological</span>
          </div>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {timelineEvents.slice(0, 5).map(evt => (
              <div 
                key={evt.id}
                className="flex items-start gap-2 p-1.5 rounded bg-gray-50/70 border border-gray-100 text-xs hover:bg-gray-100/80 transition-colors"
              >
                <span className="font-mono text-[10px] text-gray-400 mt-0.5 whitespace-nowrap">{evt.timestamp}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-gray-800 text-[11px]">{evt.stage}</span>
                    <span className="text-[9px] px-1 rounded bg-gray-200/80 text-gray-600 font-mono">{evt.source}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 truncate">{evt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Session Controls */}
      <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={startSession}
            disabled={sessionState === 'Live Demo'}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
              sessionState === 'Live Demo' 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Play className="w-3 h-3" />
            <span>Start</span>
          </button>
          <button
            onClick={pauseSession}
            disabled={sessionState === 'Paused'}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
              sessionState === 'Paused' 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
            }`}
          >
            <Pause className="w-3 h-3" />
            <span>Pause</span>
          </button>
          <button
            onClick={endSession}
            disabled={sessionState === 'Ended'}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
              sessionState === 'Ended' 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600'
            }`}
          >
            <Square className="w-3 h-3" />
            <span>End</span>
          </button>
        </div>

        <button
          onClick={simulateNextQuestion}
          disabled={isSimulating}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          <span>Simulate Hand Raise</span>
        </button>
      </div>
    </div>
  );
};
