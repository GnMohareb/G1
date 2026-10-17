import React, { useState, useMemo, useRef } from 'react';
import { UserProgress, TestMode, Question } from '../types';
import { QUESTIONS } from '../data/questions';
import { 
  computeTopicBreakdown, 
  resetAllProgress, 
  clearIncorrectQuestions, 
  toggleFlagQuestion,
  loadUserProgress,
  saveUserProgress,
  validateProgressData
} from '../utils/storage';
import { 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  RotateCcw, 
  Trash2, 
  AlertTriangle, 
  BookOpen, 
  History, 
  HardDrive,
  Play,
  Download,
  Upload,
  AlertCircle
} from 'lucide-react';
import { RoadSignSvg } from './RoadSignSvg';

interface MyProgressSectionProps {
  progress: UserProgress;
  onRefreshProgress: () => void;
  onStartCustomTest: (mode: TestMode, specificIds?: string[]) => void;
  onGoToStudyGuide: (topicId?: string) => void;
}

export const MyProgressSection: React.FC<MyProgressSectionProps> = ({
  progress,
  onRefreshProgress,
  onStartCustomTest,
  onGoToStudyGuide,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'weaknesses' | 'incorrect' | 'flagged' | 'history'>('overview');
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [confirmImportOpen, setConfirmImportOpen] = useState(false);
  const [pendingImportProgress, setPendingImportProgress] = useState<UserProgress | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compute weakness topics from actual user records
  const topicBreakdown = useMemo(() => {
    return computeTopicBreakdown(progress);
  }, [progress]);

  const weakTopics = topicBreakdown.filter(t => t.answered >= 2 && t.accuracy < 75);

  const totalAnswered = progress.totalQuestionsAnswered;
  const overallAccuracy = totalAnswered > 0 
    ? Math.round((progress.totalCorrect / totalAnswered) * 100) 
    : 0;

  const signsAccuracy = progress.categoryStats.signs.answered > 0
    ? Math.round((progress.categoryStats.signs.correct / progress.categoryStats.signs.answered) * 100)
    : 0;

  const rulesAccuracy = progress.categoryStats.rules.answered > 0
    ? Math.round((progress.categoryStats.rules.correct / progress.categoryStats.rules.answered) * 100)
    : 0;

  // Retrieve full Question objects for incorrect and flagged questions
  const incorrectQuestions: Question[] = useMemo(() => {
    const qMap = new Map(QUESTIONS.map(q => [q.id, q]));
    return progress.incorrectQuestionIds
      .map(id => qMap.get(id))
      .filter((q): q is Question => Boolean(q));
  }, [progress.incorrectQuestionIds]);

  const flaggedQuestions: Question[] = useMemo(() => {
    const qMap = new Map(QUESTIONS.map(q => [q.id, q]));
    return progress.flaggedQuestionIds
      .map(id => qMap.get(id))
      .filter((q): q is Question => Boolean(q));
  }, [progress.flaggedQuestionIds]);

  const handleResetData = () => {
    resetAllProgress();
    onRefreshProgress();
    setConfirmResetOpen(false);
    setImportError(null);
  };

  const handleClearIncorrect = () => {
    clearIncorrectQuestions();
    onRefreshProgress();
  };

  const handleUnflag = (id: string) => {
    toggleFlagQuestion(id);
    onRefreshProgress();
  };

  const handleExportProgress = () => {
    try {
      setImportError(null);
      const currentProgress = loadUserProgress();
      const dataStr = JSON.stringify(currentProgress, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const dateStr = new Date().toISOString().split('T')[0];
      const link = document.createElement('a');
      link.href = url;
      link.download = `g1-ready-progress-${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3500);
    } catch (err) {
      setImportError('Failed to export progress data: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    setImportSuccess(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const rawText = event.target?.result;
        if (typeof rawText !== 'string') {
          setImportError('Could not read file contents.');
          return;
        }
        let parsed: unknown;
        try {
          parsed = JSON.parse(rawText);
        } catch {
          setImportError('Malformed JSON: Selected file does not contain valid JSON text.');
          return;
        }
        const validation = validateProgressData(parsed);
        if (!validation.valid || !validation.progress) {
          setImportError(validation.error || 'Invalid progress data: The file does not conform to the expected G1 Ready data schema.');
          return;
        }
        // Valid file parsed - prepare for user confirmation
        setPendingImportProgress(validation.progress);
        setConfirmImportOpen(true);
      } catch (err) {
        setImportError('An unexpected error occurred while parsing the file: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    reader.onerror = () => {
      setImportError('Failed to read the file from disk.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (pendingImportProgress) {
      saveUserProgress(pendingImportProgress);
      onRefreshProgress();
      setConfirmImportOpen(false);
      setPendingImportProgress(null);
      setImportSuccess('Progress successfully imported! Metrics and history updated immediately.');
      setTimeout(() => setImportSuccess(null), 4000);
    }
  };

  const handleCancelImport = () => {
    setConfirmImportOpen(false);
    setPendingImportProgress(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>Practice Performance Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            My Practice Progress
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Actual test results and accuracy metrics recorded from your practice sessions.
          </p>
        </div>

        {/* Action Controls: Export, Import, Reset */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={handleFileSelected}
          />

          <button
            onClick={handleExportProgress}
            className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs focus-visible:ring-2 focus-visible:ring-slate-500"
            title="Download your practice progress as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export progress</span>
          </button>

          <button
            onClick={() => {
              setImportError(null);
              fileInputRef.current?.click();
            }}
            className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs focus-visible:ring-2 focus-visible:ring-slate-500"
            title="Upload a previously exported progress JSON file"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import progress</span>
          </button>

          <button
            onClick={() => setConfirmResetOpen(true)}
            className="text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1.5 px-3 py-2 rounded-lg border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>
        </div>
      </div>

      {/* Visible Inline Error Message */}
      {importError && (
        <div role="alert" className="mt-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200 flex items-start justify-between gap-3 animate-fadeIn">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Import Error:</strong>
              <span>{importError}</span>
            </div>
          </div>
          <button
            onClick={() => setImportError(null)}
            className="text-rose-600 hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-200 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Visible Inline Success Notification */}
      {exportSuccess && (
        <div role="status" className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Progress exported successfully! Check your browser downloads folder.</span>
        </div>
      )}

      {importSuccess && (
        <div role="status" className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{importSuccess}</span>
        </div>
      )}

      {/* Local Storage Device Notice (Updated Wording) */}
      <div role="note" className="mt-4 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2.5">
          <HardDrive className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            Practice records are stored privately in your browser&apos;s local storage. No account required. Progress does not transfer automatically to another device or browser — use Export and Import below to move it yourself.
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="mt-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px" role="tablist" aria-label="Progress tabs">
        <button
          role="tab"
          aria-selected={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'overview'
              ? 'border-red-600 text-red-600 dark:text-red-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Overview &amp; Metrics
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'weaknesses'}
          onClick={() => setActiveTab('weaknesses')}
          className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'weaknesses'
              ? 'border-red-600 text-red-600 dark:text-red-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Weak Areas ({weakTopics.length})
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'incorrect'}
          onClick={() => setActiveTab('incorrect')}
          className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'incorrect'
              ? 'border-red-600 text-red-600 dark:text-red-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Incorrect Questions ({incorrectQuestions.length})
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'flagged'}
          onClick={() => setActiveTab('flagged')}
          className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'flagged'
              ? 'border-red-600 text-red-600 dark:text-red-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Flagged ({flaggedQuestions.length})
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'history'}
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'history'
              ? 'border-red-600 text-red-600 dark:text-red-400'
              : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Test History ({progress.recentResults.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW & METRICS */}
      {activeTab === 'overview' && (
        <div className="mt-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Overall Accuracy</span>
              <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white font-mono-numbers">
                {totalAnswered > 0 ? `${overallAccuracy}%` : '0%'}
              </div>
              <span className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 block">
                {totalAnswered === 0 ? 'No attempts recorded' : overallAccuracy >= 80 ? 'Meeting 80% practice target' : 'Below 80% practice target'}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Total Answered</span>
              <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white font-mono-numbers">
                {totalAnswered}
              </div>
              <span className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 block">
                {progress.totalCorrect} correct · {progress.totalIncorrect} incorrect
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Road Signs Accuracy</span>
              <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white font-mono-numbers">
                {progress.categoryStats.signs.answered > 0 ? `${signsAccuracy}%` : '—'}
              </div>
              <span className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 block">
                {progress.categoryStats.signs.answered} questions attempted
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Rules Accuracy</span>
              <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white font-mono-numbers">
                {progress.categoryStats.rules.answered > 0 ? `${rulesAccuracy}%` : '—'}
              </div>
              <span className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 block">
                {progress.categoryStats.rules.answered} questions attempted
              </span>
            </div>
          </div>

          {/* Category Progress Bars */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Category Readiness Breakdown
            </h2>

            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-800 dark:text-slate-200">Road Signs &amp; Markings</span>
                  <span className="font-mono-numbers text-slate-900 dark:text-white">
                    {signsAccuracy}% ({progress.categoryStats.signs.correct} / {progress.categoryStats.signs.answered})
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      signsAccuracy >= 80 ? 'bg-emerald-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(signsAccuracy, 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-800 dark:text-slate-200">Rules of the Road</span>
                  <span className="font-mono-numbers text-slate-900 dark:text-white">
                    {rulesAccuracy}% ({progress.categoryStats.rules.correct} / {progress.categoryStats.rules.answered})
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      rulesAccuracy >= 80 ? 'bg-emerald-600' : 'bg-blue-600'
                    }`}
                    style={{ width: `${Math.min(rulesAccuracy, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WEAK AREAS */}
      {activeTab === 'weaknesses' && (
        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Identified Weak Knowledge Areas
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Topics where your practice score is under 75% accuracy based on recorded attempts.
            </p>
          </div>

          {weakTopics.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                No Weak Areas Detected
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-md mx-auto">
                {totalAnswered === 0
                  ? 'Complete a practice test first to allow the diagnostic tracker to analyze your performance.'
                  : 'All attempted topics are currently at or above 75% accuracy.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weakTopics.map(t => (
                <div
                  key={t.topic}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="capitalize">{t.category === 'signs' ? 'Road Signs' : 'Rules of the Road'}</span>
                      <span className="text-rose-700 dark:text-rose-400 font-semibold">{t.accuracy}% Accuracy</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      {t.topic}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                      Answered correctly {t.correct} of {t.answered} attempts ({t.answered - t.correct} mistakes).
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => onGoToStudyGuide()}
                      className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Review Study Guide</span>
                    </button>

                    <button
                      onClick={() => onStartCustomTest(t.category)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-colors focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                      Practice Topic
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: INCORRECT QUESTIONS (DEDICATED REVIEW MODE PER REQUIREMENT E2) */}
      {activeTab === 'incorrect' && (
        <div className="mt-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Review Incorrect Answers ({incorrectQuestions.length})
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Dedicated review of all questions answered incorrectly during your practice tests.
              </p>
            </div>

            {incorrectQuestions.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onStartCustomTest('incorrect', progress.incorrectQuestionIds)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-xs flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start Quiz on All {incorrectQuestions.length} Missed</span>
                </button>
                <button
                  onClick={handleClearIncorrect}
                  className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-slate-500"
                >
                  Clear Queue
                </button>
              </div>
            )}
          </div>

          {incorrectQuestions.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Queue Empty
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Questions you answer incorrectly will appear here so you can review explanations and retry them.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {incorrectQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Missed #{idx + 1}</span>
                    <span>{q.topic}</span>
                  </div>

                  <div className="mt-3 flex flex-col sm:flex-row sm:items-start gap-4">
                    {q.signType && (
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shrink-0 self-start">
                        <RoadSignSvg type={q.signType} size={70} />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {q.question}
                      </h3>
                      <div className="mt-3 p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/60 text-xs">
                        <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-1">
                          Correct Answer:
                        </span>
                        <p className="text-emerald-950 dark:text-emerald-100 font-medium">
                          {q.options[q.correctAnswer]}
                        </p>
                        <p className="mt-2 text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: FLAGGED QUESTIONS (REQUIREMENT E3) */}
      {activeTab === 'flagged' && (
        <div className="mt-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Bookmarked &amp; Flagged Questions ({flaggedQuestions.length})
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Questions you explicitly flagged during practice tests for later study.
              </p>
            </div>

            {flaggedQuestions.length > 0 && (
              <button
                onClick={() => onStartCustomTest('flagged', progress.flaggedQuestionIds)}
                className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors shadow-xs flex items-center gap-1.5 self-start sm:self-auto focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>Practice {flaggedQuestions.length} Flagged Questions</span>
              </button>
            )}
          </div>

          {flaggedQuestions.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <Bookmark className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                No Flagged Questions
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                During any test, click the bookmark icon on any question to save it here for targeted review.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {flaggedQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Flagged #{idx + 1}</span>
                    <button
                      onClick={() => handleUnflag(q.id)}
                      className="text-amber-600 dark:text-amber-400 font-medium hover:underline focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                    >
                      Remove Bookmark
                    </button>
                  </div>

                  <div className="mt-3 flex flex-col sm:flex-row sm:items-start gap-4">
                    {q.signType && (
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shrink-0 self-start">
                        <RoadSignSvg type={q.signType} size={70} />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {q.question}
                      </h3>
                      <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs">
                        <span className="font-bold text-slate-900 dark:text-white block mb-1">
                          Correct Answer: {q.options[q.correctAnswer]}
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: TEST HISTORY */}
      {activeTab === 'history' && (
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Completed Test History ({progress.recentResults.length})
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Full chronological record of your practice sessions.
              </p>
            </div>
          </div>

          {progress.recentResults.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <History className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                No completed tests recorded yet.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-xs">
              {progress.recentResults.map((res) => {
                const dateStr = new Date(res.date).toLocaleDateString('en-CA', {
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
                  <div key={res.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      {res.passed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                      )}
                      <div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white block">
                          {modeTitle}
                        </span>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          <span>{dateStr}</span>
                          <span className="mx-1.5" aria-hidden="true">·</span>
                          <span className="font-mono-numbers">{res.correctCount} / {res.totalQuestions} questions correct</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-lg font-extrabold text-slate-900 dark:text-white font-mono-numbers">
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
        </div>
      )}

      {/* Confirmation Modal for Reset (Requirement E4) */}
      {confirmResetOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-dialog-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="max-w-sm w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <AlertTriangle className="w-8 h-8 text-rose-600 mb-3" />
            <h2 id="reset-dialog-title" className="text-lg font-bold text-slate-900 dark:text-white">
              Reset Practice Progress?
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              This will clear your test history, accuracy metrics, missed questions, and bookmarks from this browser. This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmResetOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg focus-visible:ring-2 focus-visible:ring-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={handleResetData}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Import Overwrite */}
      {confirmImportOpen && pendingImportProgress && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="import-dialog-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400">
              <Upload className="w-6 h-6" />
              <h2 id="import-dialog-title" className="text-lg font-bold text-slate-900 dark:text-white">
                Overwrite Existing Progress?
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Importing will replace your current practice statistics, test history, and bookmarked questions with the data from the imported file:
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <div><strong>Tests taken:</strong> {pendingImportProgress.totalTestsTaken} (Passed: {pendingImportProgress.totalTestsPassed})</div>
              <div><strong>Questions answered:</strong> {pendingImportProgress.totalQuestionsAnswered} ({pendingImportProgress.totalCorrect} correct · {pendingImportProgress.totalIncorrect} incorrect)</div>
              <div><strong>Missed in queue:</strong> {pendingImportProgress.incorrectQuestionIds.length} · <strong>Flagged:</strong> {pendingImportProgress.flaggedQuestionIds.length}</div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              Existing progress stored in this browser will be overwritten. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleCancelImport}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg focus-visible:ring-2 focus-visible:ring-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmImport}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 shadow-xs"
              >
                Confirm Import &amp; Overwrite
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
