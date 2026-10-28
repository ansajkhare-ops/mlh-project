import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { SimulationController } from './components/common/SimulationController';
import { OverviewView } from './components/overview/OverviewView';
import { LiveClassroomView } from './components/classroom/LiveClassroomView';
import { QuestionIntelligenceView } from './components/questions/QuestionIntelligenceView';
import { LearningAnalyticsView } from './components/analytics/LearningAnalyticsView';
import { SessionHistoryView } from './components/history/SessionHistoryView';
import { SettingsView } from './components/settings/SettingsView';
import { SmartBoardModal } from './components/smartboard/SmartBoardModal';
import { TeacherHeadsetModal } from './components/modals/TeacherHeadsetModal';
import { NotificationDrawer } from './components/modals/NotificationDrawer';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { activeView, toastMessage, setToastMessage } = useApp();

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <OverviewView />;
      case 'classroom':
        return <LiveClassroomView />;
      case 'questions':
        return <QuestionIntelligenceView />;
      case 'analytics':
        return <LearningAnalyticsView />;
      case 'history':
        return <SessionHistoryView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#fbfbfa] text-gray-900 font-sans">
      {/* Left Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-6 pb-20">
          {renderActiveView()}
        </main>
      </div>

      {/* Floating Demo Simulation Controller */}
      <SimulationController />

      {/* Smart Board Full Screen Modal */}
      <SmartBoardModal />

      {/* Teacher Headset Audio Modal */}
      <TeacherHeadsetModal />

      {/* Notification Drawer */}
      <NotificationDrawer />

      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2.5 bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs border border-gray-700 animate-in fade-in slide-in-from-top-2 duration-150">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
