import React from 'react';
import { UserProgress, TestMode } from '../types';
import { QUESTIONS } from '../data/questions';
import { 
  Sparkles, 
  ShieldAlert, 
  Compass, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Info,
  BookOpen,
  ClipboardList
} from 'lucide-react';
import { AdSlot } from './AdSlot';
import { AD_SLOTS } from '../config/ads';

interface HomeDashboardProps {
  progress: UserProgress;
  onStartTest: (mode: TestMode, specificIds?: string[]) => void;
  onNavigateTab: (tab: 'practice' | 'signs' | 'rules' | 'progress' | 'study' | 'about') => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  progress,
  onStartTest,
  onNavigateTab,
}) => {
  const totalAvailable = QUESTIONS.length;
  const signsAvailable = QUESTIONS.filter(q => q.category === 'signs').length;
  const rulesAvailable = QUESTIONS.filter(q => q.category === 'rules').length;

  const totalAnswered = progress.totalQuestionsAnswered;
  const overallAccuracy = totalAnswered > 0 
    ? Math.round((progress.totalCorrect / totalAnswered) * 100) 
    : 0;

  const signsAnswered = progress.categoryStats.signs.answered;
  const signsCorrect = progress.categoryStats.signs.correct;
  const signsAccuracy = signsAnswered > 0
    ? Math.round((signsCorrect / signsAnswered) * 100)
    : 0;

  const rulesAnswered = progress.categoryStats.rules.answered;
  const rulesCorrect = progress.categoryStats.rules.correct;
  const rulesAccuracy = rulesAnswered > 0
    ? Math.round((rulesCorrect / rulesAnswered) * 100)
    : 0;

  const hasRecentTests = progress.recentResults.length > 0;
  const hasIncorrect = progress.incorrectQuestionIds.length > 0;
  const testsPassed = progress.totalTestsPassed ?? progress.recentResults.filter(r => r.passed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Hero Welcome Banner */}
      <section aria-labelledby="hero-title" className="relative rounded-2xl bg-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-md overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-400 mb-3 tracking-wide">
            <span>INDEPENDENT G1 PRACTICE — UNOFFICIAL STUDY APP</span>
          </div>

          <h1 id="hero-title" className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Prepare for Your Ontario G1 Written Knowledge Test
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Independent practice questions covering Ontario road signs, signals, right-of-way rules, and driver safety principles sourced from the Driver&apos;s Handbook.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartTest('full')}
              className="px-6 py-3.5 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 active:bg-red-800 transition-colors shadow-sm flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-white"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Full Practice Test</span>
            </button>

            <button
              onClick={() => onNavigateTab('study')}
              className="px-5 py-3.5 text-sm font-semibold text-slate-200 bg-white/10 hover:bg-white/15 rounded-xl border border-white/15 transition-colors flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-white"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse Study Guide</span>
            </button>
          </div>
        </div>
      </section>

      {/* Prominent Independence Disclaimer */}
      <div role="note" aria-label="Disclaimer" className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-900 dark:text-white font-semibold">Independent App Notice: </strong>
          G1 Ready Ontario is an independent educational app. It is not affiliated with, endorsed by, or operated by the Government of Ontario, the Ministry of Transportation, or DriveTest. Practice questions are original study material and are not actual examination questions.
        </p>
      </div>

      {/* Clean Metric Row */}
      <section aria-labelledby="metrics-title" className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 id="metrics-title" className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Your Practice Activity
          </h2>
          <button
            onClick={() => onNavigateTab('progress')}
            className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-red-500 rounded"
          >
            <span>View Full Progress</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Questions Available */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
              Question Bank
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono-numbers">
                {totalAvailable}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">questions</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
              {signsAvailable} signs · {rulesAvailable} rules
            </div>
          </div>

          {/* Questions Answered */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
              Questions Answered
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono-numbers">
                {totalAnswered}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">attempts</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
              {totalAnswered === 0 ? 'No practice yet' : `${progress.totalCorrect} correct · ${progress.totalIncorrect} incorrect`}
            </div>
          </div>

          {/* Overall Accuracy */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
              Overall Accuracy
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono-numbers">
                {totalAnswered > 0 ? `${overallAccuracy}%` : '—'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {totalAnswered === 0 ? 'No attempts' : overallAccuracy >= 80 ? 'Target met' : 'Needs work'}
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
              Practice target: 80%
            </div>
          </div>

          {/* Tests Completed */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
              Tests Completed
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono-numbers">
                {progress.totalTestsTaken}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">sessions</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
              {testsPassed} reached 80%
            </div>
          </div>
        </div>

        {/* Visual Category Accuracy & Readiness Bar */}
        {totalAnswered > 0 && (
          <div className="mt-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 dark:text-slate-300">
                  Road Signs Accuracy ({signsCorrect} / {signsAnswered} correct)
                </span>
                <span className="font-mono-numbers text-slate-900 dark:text-white">
                  {signsAnswered > 0 ? `${signsAccuracy}%` : '—'}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${signsAccuracy >= 80 ? 'bg-emerald-600' : 'bg-amber-500'}`}
                  style={{ width: `${Math.min(signsAccuracy, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 dark:text-slate-300">
                  Rules of the Road Accuracy ({rulesCorrect} / {rulesAnswered} correct)
                </span>
                <span className="font-mono-numbers text-slate-900 dark:text-white">
                  {rulesAnswered > 0 ? `${rulesAccuracy}%` : '—'}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${rulesAccuracy >= 80 ? 'bg-emerald-600' : 'bg-blue-600'}`}
                  style={{ width: `${Math.min(rulesAccuracy, 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Missed Questions Banner (if user has missed questions) */}
      {hasIncorrect && (
        <div className="mt-6 p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0" aria-hidden="true">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Review Your {progress.incorrectQuestionIds.length} Missed Questions
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                You previously answered these questions incorrectly. Practice them now to reinforce the rules.
              </p>
            </div>
          </div>

          <button
            onClick={() => onStartTest('incorrect', progress.incorrectQuestionIds)}
            className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors shadow-xs shrink-0 self-start sm:self-auto focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            Retry {progress.incorrectQuestionIds.length} Missed Questions
          </button>
        </div>
      )}

      {/* Practice Test Mode Cards */}
      <section aria-labelledby="modes-title" className="mt-10">
        <h2 id="modes-title" className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Practice Test Modes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Road Signs */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4" aria-hidden="true">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Road Signs Test
              </h3>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                <span>20 Questions</span>
                <span aria-hidden="true">·</span>
                <span>Signs &amp; Markings</span>
              </div>
              <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Practice recognizing Ontario regulatory signs, warning markers, high-occupancy lanes, and pavement symbols.
              </p>
            </div>

            <button
              onClick={() => onStartTest('signs')}
              className="mt-6 w-full py-2.5 px-4 text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <span>Start Road Signs Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Rules of the Road */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4" aria-hidden="true">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Rules of the Road Test
              </h3>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                <span>20 Questions</span>
                <span aria-hidden="true">·</span>
                <span>Traffic Rules</span>
              </div>
              <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Right-of-way, school bus laws, Move Over requirements, speed limits, parking rules, and novice restrictions.
              </p>
            </div>

            <button
              onClick={() => onStartTest('rules')}
              className="mt-6 w-full py-2.5 px-4 text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <span>Start Rules Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Full Practice Test */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-red-600 dark:border-red-500 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-4" aria-hidden="true">
                <ClipboardList className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Full Practice Test
              </h3>
              <div className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center gap-2 font-medium">
                <span>40 Questions (20 Signs + 20 Rules)</span>
              </div>
              <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Comprehensive practice test combining both sections with an unofficial 80% practice target.
              </p>
              <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
                Practice target (unofficial): 16/20 on each section
              </div>
            </div>

            <button
              onClick={() => onStartTest('full')}
              className="mt-6 w-full py-2.5 px-4 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <span>Start Full Practice (40 Qs)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Recent Practice Results */}
      <section aria-labelledby="recent-title" className="mt-10">
        <h2 id="recent-title" className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Recent Practice Sessions
        </h2>

        {!hasRecentTests ? (
          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No practice sessions completed yet. Choose a test mode above to start practicing.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {progress.recentResults.slice(0, 5).map((res) => {
              const formattedDate = new Date(res.date).toLocaleDateString('en-CA', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              const modeTitle = res.mode === 'full' 
                ? 'Full Practice Test' 
                : res.mode === 'signs' 
                ? 'Road Signs Test' 
                : 'Rules of the Road';

              return (
                <div key={res.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {res.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {modeTitle}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        <span>{formattedDate}</span>
                        <span className="mx-1" aria-hidden="true">·</span>
                        <span className="font-mono-numbers">{res.correctCount} / {res.totalQuestions} correct</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-slate-900 dark:text-white font-mono-numbers">
                      {res.scorePercentage}%
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      res.passed
                        ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-300'
                    }`}>
                      {res.passed ? 'TARGET MET' : 'UNDER 80%'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Real AdSlot Location 1: Bottom of Home Dashboard */}
      <AdSlot slotId={AD_SLOTS.homeBanner} className="mt-8" />

    </div>
  );
};
