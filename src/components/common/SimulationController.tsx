import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Tv, 
  Headphones, 
  Play, 
  ChevronUp, 
  ChevronDown, 
  Layers,
  HelpCircle,
  Radio
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SimulationController: React.FC = () => {
  const { 
    simulateNextQuestion, 
    isSimulating, 
    resetDemoData, 
    setSmartBoardModalOpen, 
    setHeadsetModalOpen,
    activeQuestion,
    currentPipelineStage
  } = useApp();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <aside 
      aria-label="Judge Demonstration Control Dock"
      className="fixed bottom-4 right-4 z-40 select-none hidden sm:block"
    >
      <div className="bg-gray-900/95 backdrop-blur-md text-white border border-gray-700/80 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 w-80">
        {/* Dock Header */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3.5 py-2.5 flex items-center justify-between cursor-pointer bg-gray-800/80 hover:bg-gray-800 border-b border-gray-700/60"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold tracking-tight text-white">Judge Demo Interactive Controls</span>
          </div>
          <button className="text-gray-400 hover:text-white">
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible Body */}
        {isExpanded && (
          <div className="p-3 space-y-2.5 text-xs">
            <div className="flex items-center justify-between text-[11px] text-gray-400">
              <span>Active Target:</span>
              <span className="font-semibold text-indigo-300 truncate max-w-[170px]">{activeQuestion?.studentName}</span>
            </div>

            {/* Stage Indicator */}
            <div className="p-2 rounded bg-gray-800/60 border border-gray-700/60 flex items-center justify-between text-[10px]">
              <span className="text-gray-400">AI Pipeline:</span>
              <span className="font-mono text-emerald-400 font-semibold uppercase">{currentPipelineStage}</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                onClick={simulateNextQuestion}
                disabled={isSimulating}
                className="col-span-2 py-2 px-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all disabled:opacity-50"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>{isSimulating ? 'Processing Pipeline...' : 'Simulate Hand Raise & Audio'}</span>
              </button>

              <button
                onClick={() => setSmartBoardModalOpen(true)}
                className="py-1.5 px-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium text-[11px] flex items-center justify-center gap-1 border border-gray-700 transition-colors"
              >
                <Tv className="w-3 h-3 text-blue-400" />
                <span>Smart Board</span>
              </button>

              <button
                onClick={() => setHeadsetModalOpen(true)}
                className="py-1.5 px-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium text-[11px] flex items-center justify-center gap-1 border border-gray-700 transition-colors"
              >
                <Headphones className="w-3 h-3 text-purple-400" />
                <span>Headset Brief</span>
              </button>
            </div>

            {/* Reset */}
            <div className="pt-1 border-t border-gray-800 flex items-center justify-between text-[10px] text-gray-400">
              <span>Simulated telemetry clock</span>
              <button
                onClick={resetDemoData}
                className="text-gray-300 hover:text-white flex items-center gap-1 font-medium hover:underline"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Reset Demo State</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
