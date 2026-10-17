import React, { useMemo } from 'react';
import { TestMode, UserProgress } from '../types';
import { QUESTIONS } from '../data/questions';
import { 
  CheckCircle2, 
  Award, 
  ShieldAlert, 
  Compass, 
  RotateCcw, 
  Bookmark, 
  ArrowRight,
  Info
} from 'lucide-react';

interface PracticeTestsHubProps {
  progress: UserProgress;
  onStartTest: (mode: TestMode, specificIds?: string[]) => void;
}

export const PracticeTestsHub: React.FC<PracticeTestsHubProps> = ({
  progress,
  onStartTest,
}) => {
  const hasMissed = progress.incorrectQuestionIds.length > 0;
  const hasFlagged = progress.flaggedQuestionIds.length > 0;

  const statusCounts = useMemo(() => {
    let verified = 0;
    let sourceCited = 0;
    let needsReview = 0;
    for (const q of QUESTIONS) {
      if (q.verificationStatus === 'verified') verified++;
      else if (q.verificationStatus === 'source-cited') sourceCited++;
      else needsReview++;
    }
    return {
      verified,
      sourceCited,
      needsReview,
      total: QUESTIONS.length,
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4" />
          <span>Interactive Practice Test Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Ontario G1 Practice Tests
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
          Choose a comprehensive simulation or focus on specific weak areas. All tests provide clear answer rationales and citations.
        </p>
      </div>

      {/* Compact Content Verification Status Summary */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-800 dark:text-slate-200">Question Bank Status:</span>
          <span className="inline-flex flex-wrap items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <strong className="text-slate-900 dark:text-white">{statusCounts.verified}</strong> Verified
            <span className="text-slate-400">·</span>
            <span className="inline-block w-2 h-2 rounded-full bg-slate-400"></span>
            <strong className="text-slate-900 dark:text-white">{statusCounts.sourceCited}</strong> Source-Cited
            <span className="text-slate-400">·</span>
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
            <strong className="text-slate-900 dark:text-white">{statusCounts.needsReview}</strong> Review Ongoing
          </span>
        </div>
        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          {statusCounts.total} total questions cross-referenced to official Ontario sources
        </span>
      </div>

      {/* Primary Exam Modes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Full Practice Test */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-red-600 dark:border-red-500 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mb-4" aria-hidden="true">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs text-red-600 dark:text-red-400 font-bold uppercase tracking-wider">
              Comprehensive Prep
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              Full Practice Test
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              40 questions composed of 20 Road Signs and 20 Rules of the Road. Unofficial practice benchmark: 80% (16/20 on both sections).
            </p>
            <div className="mt-4 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
              <div className="flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span><strong>Confirmed official pass mark:</strong> At least 80% to pass (multiple choice, 2–3 sections, ~20–30 mins; source: DriveTest.ca).</span>
              </div>
              <div className="pl-5 text-slate-500 dark:text-slate-400">
                <strong>Practice convention:</strong> Exact exam question count is not published; our 40-question split is an unofficial study structure.
              </div>
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

        {/* Road Signs */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4" aria-hidden="true">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              Signs &amp; Markings
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              Road Signs Practice Test
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              20 questions drawn from Ontario regulatory signs, warning markers, HOV signs, and pavement markings.
            </p>
            <div className="mt-4 text-[11px] text-slate-500 dark:text-slate-400">
              Practice target: 16/20 (80%) correct
            </div>
          </div>

          <button
            onClick={() => onStartTest('signs')}
            className="mt-6 w-full py-2.5 px-4 text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <span>Start Signs Test (20 Qs)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Rules of the Road */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4" aria-hidden="true">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              Driving Rules
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              Rules of the Road Test
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              20 questions on Ontario Highway Traffic Act principles: school buses, right-of-way, Move Over, speed, and demerits.
            </p>
            <div className="mt-4 text-[11px] text-slate-500 dark:text-slate-400">
              Practice target: 16/20 (80%) correct
            </div>
          </div>

          <button
            onClick={() => onStartTest('rules')}
            className="mt-6 w-full py-2.5 px-4 text-xs font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <span>Start Rules Test (20 Qs)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Targeted Review Tests (Missed & Flagged) */}
      <section aria-labelledby="targeted-heading">
        <h2 id="targeted-heading" className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Targeted Practice Modes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Missed Questions */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0" aria-hidden="true">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Retry Missed Questions
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {hasMissed 
                    ? `You currently have ${progress.incorrectQuestionIds.length} missed questions in your review queue.`
                    : 'No incorrect questions recorded yet. Complete a test session to build your review queue.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onStartTest('incorrect', progress.incorrectQuestionIds)}
              disabled={!hasMissed}
              className={`mt-4 py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-500 ${
                hasMissed
                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{hasMissed ? `Retry ${progress.incorrectQuestionIds.length} Missed Questions` : 'Queue Empty'}</span>
            </button>
          </div>

          {/* Flagged Questions */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0" aria-hidden="true">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Practice Flagged Questions
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {hasFlagged
                    ? `You have bookmarked ${progress.flaggedQuestionIds.length} questions for targeted practice.`
                    : 'Bookmark any question during a test session using the flag icon to study it here.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onStartTest('flagged', progress.flaggedQuestionIds)}
              disabled={!hasFlagged}
              className={`mt-4 py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-blue-500 ${
                hasFlagged
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{hasFlagged ? `Practice ${progress.flaggedQuestionIds.length} Flagged Questions` : 'No Flagged Questions'}</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
