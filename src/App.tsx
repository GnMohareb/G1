import React, { useState, useEffect, useCallback } from 'react';
import { 
  Header, 
  NavTab 
} from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HomeDashboard } from './components/HomeDashboard';
import { PracticeTestsHub } from './components/PracticeTestsHub';
import { RoadSignsSection } from './components/RoadSignsSection';
import { RulesOfTheRoadSection } from './components/RulesOfTheRoadSection';
import { MyProgressSection } from './components/MyProgressSection';
import { StudyGuideSectionView } from './components/StudyGuideSectionView';
import { AboutSection } from './components/AboutSection';
import { PracticeTestEngine } from './components/PracticeTestEngine';
import { 
  loadUserProgress, 
  getThemePreference, 
  setThemePreference 
} from './utils/storage';
import { TestMode, UserProgress } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress());
  
  // Active test state
  const [activeTestMode, setActiveTestMode] = useState<TestMode | null>(null);
  const [specificTestQuestionIds, setSpecificTestQuestionIds] = useState<string[] | undefined>(undefined);
  const [isTestFinishedScreen, setIsTestFinishedScreen] = useState(false);
  
  // Topic jump for study guide
  const [selectedStudyTopicId, setSelectedStudyTopicId] = useState<string | undefined>(undefined);

  // Initialize theme on mount
  useEffect(() => {
    const initialTheme = getThemePreference();
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setThemePreference(nextTheme);
  };

  const handleRefreshProgress = useCallback(() => {
    setProgress(loadUserProgress());
  }, []);

  // Launch a practice test
  const handleStartTest = (mode: TestMode, specificIds?: string[]) => {
    setIsTestFinishedScreen(false);
    setActiveTestMode(mode);
    setSpecificTestQuestionIds(specificIds);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTestCompleted = useCallback(() => {
    setIsTestFinishedScreen(true);
    handleRefreshProgress();
  }, [handleRefreshProgress]);

  const handleExitTest = () => {
    setIsTestFinishedScreen(false);
    setActiveTestMode(null);
    setSpecificTestQuestionIds(undefined);
    handleRefreshProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToStudyGuide = (topicId?: string) => {
    setSelectedStudyTopicId(topicId);
    setIsTestFinishedScreen(false);
    setActiveTestMode(null);
    setCurrentTab('study');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [pendingTab, setPendingTab] = useState<NavTab | null>(null);

  const handleSelectTab = (tab: NavTab) => {
    if (activeTestMode) {
      if (!isTestFinishedScreen) {
        setPendingTab(tab);
        return;
      }
      setIsTestFinishedScreen(false);
      setActiveTestMode(null);
      setSpecificTestQuestionIds(undefined);
      handleRefreshProgress();
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmLeaveTest = () => {
    if (pendingTab) {
      setIsTestFinishedScreen(false);
      setActiveTestMode(null);
      setSpecificTestQuestionIds(undefined);
      handleRefreshProgress();
      setCurrentTab(pendingTab);
      setPendingTab(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCancelLeaveTest = () => {
    setPendingTab(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors pb-16 lg:pb-0">
      
      {/* Top Header Bar */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onStartQuickTest={() => handleStartTest('full')}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area with Skip Link Landmark Target */}
      <main id="main-content" role="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {activeTestMode ? (
          <PracticeTestEngine
            initialMode={activeTestMode}
            onExit={handleExitTest}
            onGoToStudyGuide={handleGoToStudyGuide}
            onTestCompleted={handleTestCompleted}
            specificQuestionIds={specificTestQuestionIds}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomeDashboard
                progress={progress}
                onStartTest={handleStartTest}
                onNavigateTab={(tab) => handleSelectTab(tab as NavTab)}
              />
            )}

            {currentTab === 'practice' && (
              <PracticeTestsHub
                progress={progress}
                onStartTest={handleStartTest}
              />
            )}

            {currentTab === 'signs' && (
              <RoadSignsSection
                onStartSignsTest={() => handleStartTest('signs')}
              />
            )}

            {currentTab === 'rules' && (
              <RulesOfTheRoadSection
                onStartRulesTest={() => handleStartTest('rules')}
                onGoToStudyGuideTopic={handleGoToStudyGuide}
              />
            )}

            {currentTab === 'progress' && (
              <MyProgressSection
                progress={progress}
                onRefreshProgress={handleRefreshProgress}
                onStartCustomTest={handleStartTest}
                onGoToStudyGuide={handleGoToStudyGuide}
              />
            )}

            {currentTab === 'study' && (
              <StudyGuideSectionView
                initialTopicId={selectedStudyTopicId}
                onStartTopicTest={(questionIds) => handleStartTest('custom', questionIds)}
              />
            )}

            {currentTab === 'about' && (
              <AboutSection />
            )}
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation (Only visible on screens < lg, capped height) */}
      {!activeTestMode && (
        <MobileBottomNav
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
        />
      )}

      {/* Persistent Footer Disclaimer (Requirement A5: on every section) */}
      <footer role="contentinfo" className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 px-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white">G1 Ready Ontario</span>
              <span aria-hidden="true">·</span>
              <span>Independent Educational Study App</span>
            </div>
            <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <span>Client-side local storage</span>
              <span aria-hidden="true">·</span>
              <button 
                onClick={() => handleSelectTab('about')}
                className="hover:underline focus-visible:ring-2 focus-visible:ring-red-500 rounded"
              >
                About &amp; Disclaimers
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 text-center sm:text-left">
            <p>
              <strong>Persistent Disclaimer: </strong>
              G1 Ready Ontario is an independent educational app. It is not affiliated with, endorsed by, or operated by the Government of Ontario, the Ministry of Transportation, or DriveTest. Practice questions are original study material and are not actual examination questions.
            </p>
          </div>
        </div>
      </footer>

      {/* In-app Exit Test Confirmation Modal */}
      {pendingTab && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-modal-title"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 id="exit-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
              Exit Practice Test Session?
            </h3>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              You are currently in an active test. If you leave now, your answers for this session will not be recorded in your progress history.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleCancelLeaveTest}
                className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-slate-500"
              >
                Stay on Test
              </button>
              <button
                type="button"
                onClick={handleConfirmLeaveTest}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                Exit Test
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
