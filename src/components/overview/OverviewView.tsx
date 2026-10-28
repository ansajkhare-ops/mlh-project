import React from 'react';
import { KPICards } from './KPICards';
import { LiveClassroomPanel } from './LiveClassroomPanel';
import { QuestionIntelligencePanel } from './QuestionIntelligencePanel';
import { QuickQuestionQueue } from './QuickQuestionQueue';

export const OverviewView: React.FC = () => {
  return (
    <div className="space-y-4 max-w-[1600px] mx-auto">
      {/* Row 1: Key Performance Indicators */}
      <KPICards />

      {/* Row 2: Live Classroom Activity + Question Intelligence (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch min-h-[460px]">
        <div className="h-full">
          <LiveClassroomPanel />
        </div>
        <div className="h-full">
          <QuestionIntelligencePanel />
        </div>
      </div>

      {/* Row 3: Live Question Queue */}
      <QuickQuestionQueue />
    </div>
  );
};
