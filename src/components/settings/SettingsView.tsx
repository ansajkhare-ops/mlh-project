import React, { useState } from 'react';
import { 
  Settings, 
  Sliders, 
  Cpu, 
  ShieldCheck, 
  Headphones, 
  Tv, 
  Video, 
  Mic, 
  Save, 
  RotateCcw,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { setToastMessage, resetDemoData } = useApp();

  const [handRaiseSensitivity, setHandRaiseSensitivity] = useState<number>(85);
  const [beamformingSector, setBeamformingSector] = useState<string>('Dynamic Multi-Beam');
  const [selectedModel, setSelectedModel] = useState<string>('Gemini 1.5 Pro (Edu-Tuned)');
  const [ttsSpeed, setTtsSpeed] = useState<string>('1.1x (Quick Whisper)');
  const [hapticFeedback, setHapticFeedback] = useState<boolean>(true);
  const [edgeInference, setEdgeInference] = useState<boolean>(true);

  const handleSave = () => {
    setToastMessage('System settings and AI parameters saved successfully.');
  };

  return (
    <div className="space-y-4 max-w-[1200px] mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-gray-200/90 rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600" />
            <h1 className="text-base font-bold text-gray-900 tracking-tight">System & AI Infrastructure Settings</h1>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure classroom camera vision sensors, audio beamforming, edge LLM reasoning, and teacher privacy protocols.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDemoData}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Defaults</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>

      {/* Settings Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Section 1: Vision & Camera Sensor */}
        <div className="bg-white border border-gray-200/90 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Video className="w-4 h-4 text-indigo-600" />
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Vision & Pose Sensor (Room 204)</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-gray-700 font-medium">Hand-Raise Pose Sensitivity</label>
                <span className="font-mono font-bold text-indigo-600">{handRaiseSensitivity}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                value={handRaiseSensitivity}
                onChange={(e) => setHandRaiseSensitivity(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Threshold for optical arm elevation angle before initiating directional microphone capture.
              </p>
            </div>

            <div className="pt-2">
              <label className="text-gray-700 font-medium block mb-1">Optical Frame Rate</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-md p-1.5 text-xs text-gray-800 font-medium focus:ring-1 focus:ring-indigo-500">
                <option value="60">60 FPS (Ultra Low Latency)</option>
                <option value="30">30 FPS (Standard Energy Saving)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Audio & Microphone Beamforming */}
        <div className="bg-white border border-gray-200/90 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Mic className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Spatial Microphone Array</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-gray-700 font-medium block mb-1">Beamforming Capture Mode</label>
              <select 
                value={beamformingSector} 
                onChange={(e) => setBeamformingSector(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-md p-1.5 text-xs text-gray-800 font-medium focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Dynamic Multi-Beam">Dynamic Multi-Beam (Tracks Raised Hand Location)</option>
                <option value="Cardioid Center">Cardioid Center (Podium Priority)</option>
                <option value="Omnidirectional">Omnidirectional (Whole Room Ambience)</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-medium block mb-1">Acoustic Noise Reduction</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-md p-1.5 text-xs text-gray-800 font-medium focus:ring-1 focus:ring-indigo-500">
                <option value="aggressive">Aggressive (-24dB AC & Fan Suppression)</option>
                <option value="moderate">Moderate (-16dB Standard)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: AI Reasoning & LLM Configuration */}
        <div className="bg-white border border-gray-200/90 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Cpu className="w-4 h-4 text-emerald-600" />
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">AI Reasoning Engine</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-gray-700 font-medium block mb-1">Language Model Backend</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-md p-1.5 text-xs text-gray-800 font-medium focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Gemini 1.5 Pro (Edu-Tuned)">Gemini 1.5 Pro (Education & Socratic Tuned)</option>
                <option value="Gemini 1.5 Flash (Ultra Fast)">Gemini 1.5 Flash (Sub-200ms Latency)</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-medium block mb-1">Pedagogical Stance</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-md p-1.5 text-xs text-gray-800 font-medium focus:ring-1 focus:ring-indigo-500">
                <option value="conceptual">Intuitive Conceptual (Analogies & Misconception Focus)</option>
                <option value="mathematical">Rigorous Mathematical (Formula Derivations)</option>
                <option value="socratic">Socratic (Counter-questioning prompts)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Teacher Headset & Privacy */}
        <div className="bg-white border border-gray-200/90 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Headphones className="w-4 h-4 text-purple-600" />
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Teacher Headset & Privacy</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-gray-700 font-medium block mb-1">Whisper TTS Voice Profile</label>
              <select
                value={ttsSpeed}
                onChange={(e) => setTtsSpeed(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-md p-1.5 text-xs text-gray-800 font-medium focus:ring-1 focus:ring-indigo-500"
              >
                <option value="1.1x (Quick Whisper)">1.1x Speed · Soft Natural Whisper (Low cognitive load)</option>
                <option value="1.0x (Standard Tone)">1.0x Speed · Standard Neutral Tone</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-gray-800 font-medium block">Haptic Buzz on Hand-Raise</span>
                <span className="text-[11px] text-gray-400">Silent subtle vibration to alert teacher without room noise</span>
              </div>
              <input
                type="checkbox"
                checked={hapticFeedback}
                onChange={(e) => setHapticFeedback(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-start gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600 mt-0.5" />
                <div>
                  <span className="text-gray-800 font-medium block">Local Edge Privacy Mode</span>
                  <span className="text-[11px] text-gray-400">Video frames and voice never stored; discarded after STT</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={edgeInference}
                onChange={(e) => setEdgeInference(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
