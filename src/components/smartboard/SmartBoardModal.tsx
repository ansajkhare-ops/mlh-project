import React, { useState } from 'react';
import { 
  X, 
  Tv, 
  Maximize2, 
  PenTool, 
  Highlighter, 
  MousePointer, 
  RotateCcw,
  Sparkles,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SmartBoardModal: React.FC = () => {
  const { 
    smartBoardModalOpen, 
    setSmartBoardModalOpen, 
    activeQuestion,
    selectedRoom 
  } = useApp();

  const [activeTool, setActiveTool] = useState<'pointer' | 'pen' | 'highlighter'>('pointer');
  const [showFormula, setShowFormula] = useState<boolean>(true);

  if (!smartBoardModalOpen) return null;

  const visual = activeQuestion.smartBoardVisual;

  const renderVisualDiagram = () => {
    switch (visual.diagramType) {
      case 'vacuum-chamber':
        return (
          <svg className="w-full h-full max-h-[360px]" viewBox="0 0 500 280" fill="none">
            {/* Vacuum Chamber Cylinder */}
            <rect x="150" y="20" width="200" height="230" rx="20" fill="#090d16" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
            <text x="250" y="45" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">VACUUM CHAMBER (P ≈ 0 kPa)</text>
            
            {/* Top Release Mechanism */}
            <rect x="180" y="60" width="140" height="12" rx="3" fill="#334155" />
            <circle cx="210" cy="78" r="14" fill="#64748b" stroke="#94a3b8" strokeWidth="2" />
            <text x="210" y="82" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">5 kg</text>
            
            {/* Feather */}
            <path d="M 285 70 Q 295 85 285 95 Q 280 85 285 70" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <text x="290" y="105" fill="#e2e8f0" fontSize="8" textAnchor="middle">0.005 kg</text>

            {/* Falling trajectory lines */}
            <line x1="210" y1="100" x2="210" y2="200" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="285" y1="115" x2="285" y2="200" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />

            {/* Simultaneous Impact Position */}
            <circle cx="210" cy="210" r="14" fill="#475569" stroke="#38bdf8" strokeWidth="2" />
            <path d="M 285 205 Q 295 220 285 230 Q 280 220 285 205" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />

            {/* Floor */}
            <line x1="160" y1="230" x2="340" y2="230" stroke="#64748b" strokeWidth="4" />
            
            {/* Annotation callouts */}
            <text x="70" y="150" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Identical Acceleration:</text>
            <text x="70" y="170" fill="#94a3b8" fontSize="10" textAnchor="middle">a = g = 9.8 m/s²</text>
            <text x="70" y="185" fill="#64748b" fontSize="9" textAnchor="middle">No Air Drag (F_drag = 0)</text>

            <text x="420" y="150" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">Equivalence Principle:</text>
            <text x="420" y="170" fill="#e2e8f0" fontSize="10" textAnchor="middle">m_grav = m_inertial</text>
            <text x="420" y="185" fill="#94a3b8" fontSize="9" textAnchor="middle">Mass terms cancel out</text>
          </svg>
        );

      case 'satellite-orbit':
        return (
          <svg className="w-full h-full max-h-[360px]" viewBox="0 0 500 280" fill="none">
            {/* Earth */}
            <circle cx="250" cy="150" r="65" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="250" cy="150" r="62" fill="#1d4ed8" opacity="0.6" />
            <text x="250" y="155" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">EARTH</text>

            {/* Circular Orbit Path */}
            <circle cx="250" cy="150" r="105" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 4" />

            {/* Satellite Node */}
            <g transform="translate(250, 45)">
              <rect x="-8" y="-5" width="16" height="10" rx="2" fill="#cbd5e1" stroke="#f8fafc" />
              <line x1="-18" y1="0" x2="-8" y2="0" stroke="#38bdf8" strokeWidth="2" />
              <line x1="8" y1="0" x2="18" y2="0" stroke="#38bdf8" strokeWidth="2" />
              {/* Tangential Velocity Vector */}
              <line x1="10" y1="0" x2="50" y2="0" stroke="#22c55e" strokeWidth="2.5" />
              <polygon points="50,-3 56,0 50,3" fill="#22c55e" />
              <text x="35" y="-6" fill="#22c55e" fontSize="9" fontWeight="bold">v = 7.8 km/s</text>
              {/* Gravitational Pull Vector inward */}
              <line x1="0" y1="6" x2="0" y2="35" stroke="#ef4444" strokeWidth="2.5" />
              <polygon points="-3,35 0,41 3,35" fill="#ef4444" />
              <text x="6" y="24" fill="#ef4444" fontSize="9" fontWeight="bold">F_g = m·g</text>
            </g>

            {/* Labels */}
            <text x="100" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold">Continuous Free-Fall:</text>
            <text x="100" y="78" fill="#94a3b8" fontSize="10">Falls toward Earth at exact rate</text>
            <text x="100" y="92" fill="#94a3b8" fontSize="10">surface curves away underneath</text>
          </svg>
        );

      case 'gravity-fall':
      default:
        return (
          <svg className="w-full h-full max-h-[360px]" viewBox="0 0 500 280" fill="none">
            {/* Tree Branch */}
            <path d="M 40 40 Q 140 50 240 40" stroke="#78350f" strokeWidth="8" strokeLinecap="round" />
            <circle cx="100" cy="35" r="25" fill="#15803d" opacity="0.8" />
            <circle cx="150" cy="30" r="30" fill="#16a34a" opacity="0.9" />
            <circle cx="200" cy="35" r="22" fill="#15803d" opacity="0.8" />

            {/* Stalk & Falling Apple */}
            <circle cx="210" cy="110" r="18" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
            <path d="M 210 92 Q 215 84 220 82" stroke="#15803d" strokeWidth="3" />

            {/* Downward Acceleration Vector */}
            <line x1="210" y1="135" x2="210" y2="195" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            <polygon points="202,195 218,195 210,210" fill="#38bdf8" />
            
            {/* Vector Label */}
            <rect x="225" y="150" width="130" height="42" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
            <text x="235" y="168" fill="#38bdf8" fontSize="11" fontWeight="bold">Acceleration Vector:</text>
            <text x="235" y="184" fill="#ffffff" fontSize="12" fontWeight="bold">g ≈ 9.8 m/s²</text>

            {/* Earth Ground Section */}
            <line x1="40" y1="240" x2="460" y2="240" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
            <text x="250" y="262" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">EARTH'S SURFACE (CENTER OF MASS DIRECTION ⬇)</text>
          </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0b0f19] border border-slate-700 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col text-white">
        {/* Top Smart Board Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Tv className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-white">Classroom Smart Board</span>
                <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30">
                  {selectedRoom} · 4K UltraHD Mirror
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Live AI Generated Educational Visual Deck</p>
            </div>
          </div>

          {/* Interactive Annotation Tools Bar */}
          <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => setActiveTool('pointer')}
              className={`p-1.5 rounded transition-colors ${activeTool === 'pointer' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Pointer"
            >
              <MousePointer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('pen')}
              className={`p-1.5 rounded transition-colors ${activeTool === 'pen' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Digital Marker"
            >
              <PenTool className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('highlighter')}
              className={`p-1.5 rounded transition-colors ${activeTool === 'highlighter' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Concept Highlighter"
            >
              <Highlighter className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowFormula(!showFormula)}
              className={`px-2 py-1 text-xs rounded font-mono font-semibold transition-colors ${showFormula ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              f(x) Formula
            </button>
          </div>

          <button
            onClick={() => setSmartBoardModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Smart Board Canvas Area */}
        <div className="p-6 flex-1 flex flex-col justify-between relative bg-gradient-to-b from-[#090d16] to-[#04060a]">
          {/* Question Banner */}
          <div className="mb-4 bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Student Inquiry:</span>
              <h3 className="text-base font-bold text-white tracking-tight">"{activeQuestion.originalTranscript}"</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">{activeQuestion.studentName}</span>
              <span className="block text-[10px] text-slate-500 font-mono">{activeQuestion.studentSeat}</span>
            </div>
          </div>

          {/* Educational Visual Diagram */}
          <div className="relative flex-1 flex items-center justify-center p-2 min-h-[300px]">
            {renderVisualDiagram()}
          </div>

          {/* Formula and Key Takeaways Footer */}
          <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Formula Card */}
            {visual.formula && (
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col justify-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">Governing Equation</span>
                <code className="text-sm font-bold text-amber-300 font-mono">
                  {visual.formula}
                </code>
              </div>
            )}

            {/* Key Concepts Bullets */}
            <div className="md:col-span-2 p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block mb-1.5">Key Classroom Takeaways</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {visual.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Mirror Target: SMART-BOARD-4K-UHD-204 · Low-Latency HDMI/AirPlay Sync</span>
          <span className="text-blue-400 font-semibold cursor-pointer" onClick={() => setSmartBoardModalOpen(false)}>
            Close Screen (ESC)
          </span>
        </div>
      </div>
    </div>
  );
};
