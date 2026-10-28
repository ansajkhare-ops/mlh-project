import React, { useState } from 'react';
import {
  Video,
  Mic,
  Tv,
  Headphones,
  Activity,
  Sparkles,
  Play,
  Pause,
  Volume2,
  Wifi,
  Sliders,
  AlertCircle,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LiveClassroomView: React.FC = () => {
  const {
    selectedRoom,
    devices,
    timelineEvents,
    activeQuestion,
    simulateNextQuestion,
    isSimulating,
    setSmartBoardModalOpen,
    setHeadsetModalOpen
  } = useApp();

  const [selectedSeat, setSelectedSeat] = useState<string>('Seat #14');
  const [whisperVolume, setWhisperVolume] = useState<number>(75);

  const studentSeats = [
    { id: 'Seat #01', name: 'Tanvi Shah', row: 1, col: 1, state: 'Attentive' },
    { id: 'Seat #02', name: 'Kabir Das', row: 1, col: 2, state: 'Attentive' },
    { id: 'Seat #03', name: 'Devansh Joshi', row: 1, col: 3, state: 'Asked Earlier' },
    { id: 'Seat #04', name: 'Ananya Roy', row: 1, col: 4, state: 'Attentive' },

    { id: 'Seat #08', name: 'Meera Sen', row: 2, col: 1, state: 'Pending Queue' },
    { id: 'Seat #11', name: 'Priya Nambiar', row: 2, col: 2, state: 'Pending Queue' },
    { id: 'Seat #14', name: 'Aarav Patel', row: 2, col: 3, state: 'Hand Raised (Active)' },
    { id: 'Seat #16', name: 'Karthik Rao', row: 2, col: 4, state: 'Attentive' },

    { id: 'Seat #17', name: 'Ishaan Sharma', row: 3, col: 1, state: 'Attentive' },
    { id: 'Seat #18', name: 'Riya Pillai', row: 3, col: 2, state: 'Attentive' },
    { id: 'Seat #19', name: 'Kavita Chawla', row: 3, col: 3, state: 'Asked Earlier' },
    { id: 'Seat #21', name: 'Rohan Verma', row: 3, col: 4, state: 'Needs Review' },
  ];

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto">
      {/* Top Banner with Hardware Health */}

      {/* Main Grid: Interactive Seat Map (Left) + Hardware Diagnostics (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Interactive Classroom Seating Radar (2 Columns on large screens) */}
        <div className="lg:col-span-2 bg-white border border-gray-200/90 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Spatial Seat Map & Pose Detection</h2>
                <p className="text-[11px] text-gray-400">Click any student seat to inspect acoustic target & pose telemetry</p>
              </div>
              <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Tracking: 12 Students
              </span>
            </div>

            {/* Front Stage Visualization */}
            <div className="my-4 py-2 px-4 rounded bg-gray-100 border border-gray-200/70 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                <span>Front Stage · Teacher Podium (Dr. Sharma)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-gray-500">Camera FOV: 120°</span>
                <button
                  onClick={() => setSmartBoardModalOpen(true)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span>Open Smart Board Screen</span>
                </button>
              </div>
            </div>

            {/* Student Seating Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
              {studentSeats.map(seat => {
                const isActive = seat.id === 'Seat #14';
                const isSelected = selectedSeat === seat.id;
                return (
                  <div
                    key={seat.id}
                    onClick={() => setSelectedSeat(seat.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${isActive
                        ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200'
                        : isSelected
                          ? 'bg-gray-100 border-gray-400'
                          : 'bg-gray-50/70 border-gray-200 hover:bg-gray-100'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[11px] font-bold text-gray-700">{seat.id}</span>
                      {isActive ? (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                        </span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-gray-900 truncate">{seat.name}</div>
                    <div className={`text-[10px] font-medium mt-1 truncate ${isActive ? 'text-indigo-700 font-bold' : 'text-gray-500'
                      }`}>
                      {seat.state}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Seat Telemetry Box */}
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-800">Telemetry Inspector: {selectedSeat}</span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  Pose Confidence: 98.4%
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                Acoustic beam target locked. Ambient noise suppression: -22dB. Vision model detected arm elevation angle 74° at 10:32:14.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 mt-4 flex items-center justify-between text-xs text-gray-400">
            <span>Hardware Simulation Layer: active</span>
            <span className="font-mono">Sensor Clock: 1000Hz Sync</span>
          </div>
        </div>

        {/* Device Health & Live Waveforms (1 Column) */}
        <div className="space-y-4">
          {/* Audio Waveform Simulator */}
          <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
                <Mic className="w-3.5 h-3.5 text-blue-600" />
                <span>Directional Audio Stream</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                48 kHz · 24-bit
              </span>
            </div>

            <div className="my-3 p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div className="flex items-end justify-between h-14 gap-1">
                {[35, 60, 45, 80, 95, 70, 40, 85, 90, 65, 30, 50, 75, 92, 48, 62, 77, 88, 55, 70, 42].map((height, i) => (
                  <div
                    key={i}
                    style={{ height: `${height}%` }}
                    className="w-full bg-gradient-to-t from-indigo-500 to-cyan-400 rounded-xs transition-all duration-300"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2">
                <span>Beamforming: Seat #14</span>
                <span className="text-cyan-400">Speech Detected</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-500">
              Quad-element array attenuating room echoes and air-conditioning rumble for high-accuracy Whisper transcription.
            </p>
          </div>

          {/* Teacher Headset Link Simulator */}
          <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
                <Headphones className="w-3.5 h-3.5 text-indigo-600" />
                <span>Teacher Headset Link</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                Latency: 12ms
              </span>
            </div>

            <div className="my-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Whisper Audio Volume:</span>
                <span className="font-mono font-semibold text-gray-800">{whisperVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={whisperVolume}
                onChange={(e) => setWhisperVolume(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <button
              onClick={() => setHeadsetModalOpen(true)}
              className="w-full py-1.5 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Test Private Audio Whisper</span>
            </button>
          </div>

          {/* Smart Board Projector Sync */}
          <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
                <Tv className="w-3.5 h-3.5 text-blue-600" />
                <span>Smart Board Display</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                3840×2160 @ 60Hz
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-2 font-medium">
              Current Slide: {activeQuestion?.smartBoardVisual?.title || 'Gravitational Vectors'}
            </p>
            <button
              onClick={() => setSmartBoardModalOpen(true)}
              className="mt-3 w-full py-1.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Screen Projector View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
