import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Question, 
  TestMode, 
  TestResult, 
  UserAnswerRecord 
} from '../types';
import { QUESTIONS, getFullG1ExamQuestions } from '../data/questions';
import { RoadSignSvg } from './RoadSignSvg';
import { 
  recordTestResult, 
  toggleFlagQuestion, 
  isQuestionFlagged 
} from '../utils/storage';
import { 
  Bookmark, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  Award,
  BookOpen,
  Info
} from 'lucide-react';
import { AdSlot } from './AdSlot';
import { AD_SLOTS } from '../config/ads';

interface PracticeTestEngineProps {
  initialMode: TestMode;
  onExit: () => void;
  onGoToStudyGuide?: (topicId?: string) => void;
  onTestCompleted?: (result: TestResult) => void;
  specificQuestionIds?: string[];
}

export const PracticeTestEngine: React.FC<PracticeTestEngineProps> = ({
  initialMode,
  onExit,
  onGoToStudyGuide,
  onTestCompleted,
  specificQuestionIds,
}) => {
  // Test configuration & questions list
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Per-question state: map of questionId -> UserAnswerRecord
  // Maintain both ref (for synchronous, immutable access in handlers/finishTest) and state (for reactive UI)
  const userAnswersRef = React.useRef<Record<string, UserAnswerRecord>>({});
  const [userAnswers, setUserAnswers] = useState<Record<string, UserAnswerRecord>>({});
  
  // Selected option before submission for current question
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  
  // Has current question been submitted?
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  
  // Test completion state
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  
  // Results screen filter: 'all' | 'incorrect' | 'flagged'
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'flagged'>('all');
  
  // Local flagged state for quick toggles
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());

  // Setup test questions based on mode
  const initQuestions = useCallback(() => {
    let list: Question[] = [];

    if (specificQuestionIds && specificQuestionIds.length > 0) {
      list = QUESTIONS.filter(q => specificQuestionIds.includes(q.id));
    } else if (initialMode === 'full') {
      const { signs, rules } = getFullG1ExamQuestions();
      list = [...signs, ...rules];
    } else if (initialMode === 'signs') {
      const allSigns = QUESTIONS.filter(q => q.category === 'signs');
      list = [...allSigns].sort(() => 0.5 - Math.random()).slice(0, 20);
    } else if (initialMode === 'rules') {
      const allRules = QUESTIONS.filter(q => q.category === 'rules');
      list = [...allRules].sort(() => 0.5 - Math.random()).slice(0, 20);
    } else {
      list = [...QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 20);
    }

    if (list.length === 0) {
      list = [...QUESTIONS].slice(0, 10);
    }

    userAnswersRef.current = {};
    setTestQuestions(list);
    setCurrentIndex(0);
    setUserAnswers({});
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setIsTestFinished(false);
    setTestResult(null);

    // Initial load of flagged questions
    const flagged = new Set<string>();
    list.forEach(q => {
      if (isQuestionFlagged(q.id)) {
        flagged.add(q.id);
      }
    });
    setFlaggedIds(flagged);
  }, [initialMode, specificQuestionIds]);

  useEffect(() => {
    initQuestions();
  }, [initQuestions]);

  const currentQuestion: Question | undefined = testQuestions[currentIndex];

  // Restore state when navigating between questions
  useEffect(() => {
    if (currentQuestion && userAnswersRef.current[currentQuestion.id]) {
      const prev = userAnswersRef.current[currentQuestion.id];
      setSelectedOptionIndex(prev.selectedOption);
      setIsAnswerSubmitted(true);
    } else {
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    }
  }, [currentIndex, currentQuestion]);

  // Handle Option Selection
  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIndex(index);
  };

  // Handle Answer Submission
  const handleSubmitAnswer = useCallback(() => {
    if (selectedOptionIndex === null || !currentQuestion || isAnswerSubmitted) return;

    const isCorrect = selectedOptionIndex === currentQuestion.correctAnswer;
    const answerRecord: UserAnswerRecord = {
      questionId: currentQuestion.id,
      selectedOption: selectedOptionIndex,
      isCorrect,
    };

    userAnswersRef.current[currentQuestion.id] = answerRecord;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerRecord,
    }));
    setIsAnswerSubmitted(true);
  }, [selectedOptionIndex, currentQuestion, isAnswerSubmitted]);

  // Calculate final score
  const finishTest = useCallback(() => {
    let correctCount = 0;
    let signsCorrect = 0;
    let signsTotal = 0;
    let rulesCorrect = 0;
    let rulesTotal = 0;

    // Generate complete record for EVERY test question to ensure exact consistency
    const completeRecords: UserAnswerRecord[] = testQuestions.map(q => {
      const recorded = userAnswersRef.current[q.id];
      const isCorrect = recorded ? recorded.isCorrect : false;
      if (isCorrect) correctCount += 1;

      if (q.category === 'signs') {
        signsTotal += 1;
        if (isCorrect) signsCorrect += 1;
      } else {
        rulesTotal += 1;
        if (isCorrect) rulesCorrect += 1;
      }

      return recorded || {
        questionId: q.id,
        selectedOption: -1,
        isCorrect: false,
      };
    });

    const totalQuestions = testQuestions.length;
    const incorrectCount = totalQuestions - correctCount;
    const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    // Unofficial practice benchmark: 80% passing threshold
    let passed = false;
    if (initialMode === 'full' && signsTotal > 0 && rulesTotal > 0) {
      const signsPct = (signsCorrect / signsTotal) * 100;
      const rulesPct = (rulesCorrect / rulesTotal) * 100;
      passed = signsPct >= 80 && rulesPct >= 80;
    } else {
      passed = scorePercentage >= 80;
    }

    const result: TestResult = {
      id: `test-${Date.now()}`,
      date: new Date().toISOString(),
      mode: initialMode,
      totalQuestions,
      correctCount,
      incorrectCount,
      scorePercentage,
      signsCorrect,
      signsTotal,
      rulesCorrect,
      rulesTotal,
      passed,
      userAnswers: completeRecords,
    };

    recordTestResult(result);
    setTestResult(result);
    setIsTestFinished(true);
    if (onTestCompleted) {
      onTestCompleted(result);
    }
  }, [initialMode, testQuestions, onTestCompleted]);

  // Handle Moving to Next Question or Finishing
  const handleNextQuestion = useCallback(() => {
    if (currentIndex < testQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishTest();
    }
  }, [currentIndex, testQuestions.length, finishTest]);

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Keyboard shortcut listener (1-4 keys and Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTestFinished) return;
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (currentQuestion && idx < currentQuestion.options.length && !isAnswerSubmitted) {
          handleSelectOption(idx);
        }
      } else if (e.key === 'Enter') {
        if (!isAnswerSubmitted && selectedOptionIndex !== null) {
          handleSubmitAnswer();
        } else if (isAnswerSubmitted) {
          handleNextQuestion();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTestFinished, isAnswerSubmitted, selectedOptionIndex, currentQuestion, handleSubmitAnswer, handleNextQuestion]);

  // Toggle bookmark / flag for current question
  const handleToggleFlag = (qId: string) => {
    const nowFlagged = toggleFlagQuestion(qId);
    setFlaggedIds(prev => {
      const next = new Set(prev);
      if (nowFlagged) {
        next.add(qId);
      } else {
        next.delete(qId);
      }
      return next;
    });
  };

  // Filtered list for results review
  const filteredReviewQuestions = useMemo(() => {
    if (!testResult) return [];
    return testQuestions.filter(q => {
      const ans = userAnswers[q.id];
      const isCorrect = ans ? ans.isCorrect : false;
      const isFlagged = flaggedIds.has(q.id);

      if (reviewFilter === 'incorrect') return !isCorrect;
      if (reviewFilter === 'flagged') return isFlagged;
      return true;
    });
  }, [testResult, testQuestions, userAnswers, flaggedIds, reviewFilter]);

  // Restart Missed Questions
  const handleRetryMissed = () => {
    const missedIds = testQuestions
      .filter(q => {
        const ans = userAnswersRef.current[q.id] || userAnswers[q.id];
        return !ans || !ans.isCorrect;
      })
      .map(q => q.id);

    if (missedIds.length === 0) return;

    const missedQuestions = QUESTIONS.filter(q => missedIds.includes(q.id));
    userAnswersRef.current = {};
    setTestQuestions(missedQuestions);
    setCurrentIndex(0);
    setUserAnswers({});
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setIsTestFinished(false);
    setTestResult(null);
  };

  // Helper for honest verification badge
  const renderVerificationBadge = (status: Question['verificationStatus']) => {
    if (status === 'source-cited') {
      return (
        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
          Source Cited
        </span>
      );
    }
    if (status === 'verified') {
      return (
        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          Verified
        </span>
      );
    }
    return (
      <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
        Review Ongoing
      </span>
    );
  };

  // =========================================================================
  // RESULTS SCREEN
  // =========================================================================
  if (isTestFinished && testResult) {
    const isFullTest = initialMode === 'full' && Boolean(testResult.signsTotal) && Boolean(testResult.rulesTotal);
    const signsPassed = isFullTest ? ((testResult.signsCorrect || 0) / (testResult.signsTotal || 1)) >= 0.8 : false;
    const rulesPassed = isFullTest ? ((testResult.rulesCorrect || 0) / (testResult.rulesTotal || 1)) >= 0.8 : false;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn" role="region" aria-label="Test Results">
        {/* Results Banner */}
        <div className={`rounded-xl p-6 md:p-8 border ${
          testResult.passed 
            ? 'bg-emerald-50/90 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800' 
            : 'bg-rose-50/90 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  testResult.passed 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-rose-600 text-white'
                }`} aria-hidden="true">
                  {testResult.passed ? <Award className="w-7 h-7" /> : <AlertCircle className="w-7 h-7" />}
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {testResult.passed ? 'Practice Target Met (≥80%)' : 'Practice Test Completed'}
                  </h1>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Practice target (unofficial): 80% passing standard
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed">
                {testResult.passed
                  ? 'Great effort! You achieved the 80% practice target for this session. Continue practicing to reinforce your knowledge.'
                  : 'You scored below the 80% practice target for this session. Review the missed questions below to solidify your understanding.'}
              </p>
            </div>

            {/* Score Display */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 min-w-[160px] shadow-xs">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Session Score</span>
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono-numbers my-1" aria-live="polite">
                {testResult.scorePercentage}%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono-numbers">
                {testResult.correctCount} of {testResult.totalQuestions} Correct
              </span>
            </div>
          </div>

          {/* Section Breakdown for Full Test */}
          {isFullTest && (
            <div className="mt-6 pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">Road Signs Section</span>
                  <span className={signsPassed ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}>
                    {signsPassed ? 'TARGET MET (≥80%)' : 'NEEDS PRACTICE (<80%)'}
                  </span>
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-white font-mono-numbers">
                  {testResult.signsCorrect} / {testResult.signsTotal}{' '}
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    ({Math.round(((testResult.signsCorrect || 0) / (testResult.signsTotal || 1)) * 100)}%)
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-slate-300">Rules of the Road Section</span>
                  <span className={rulesPassed ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}>
                    {rulesPassed ? 'TARGET MET (≥80%)' : 'NEEDS PRACTICE (<80%)'}
                  </span>
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-white font-mono-numbers">
                  {testResult.rulesCorrect} / {testResult.rulesTotal}{' '}
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    ({Math.round(((testResult.rulesCorrect || 0) / (testResult.rulesTotal || 1)) * 100)}%)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Confirmed Facts vs Practice Conventions Notice */}
          <div className="mt-4 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-900/70 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <Info className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
            <div className="space-y-1 leading-relaxed">
              <p>
                <strong>Confirmed official fact:</strong> DriveTest states: <em>&ldquo;You must earn a total score of at least 80% to pass the test&rdquo;</em> (multiple choice, two or three sections, typically 20 to 30 minutes; source: DriveTest.ca Knowledge Tests).
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                <strong>Practice convention:</strong> The exact total question count and per-section question split are not published by DriveTest or ontario.ca. The 40-question structure (20 signs + 20 rules) used in this app is an unofficial practice convention designed to target that 80% threshold. Confirm all examination requirements at <a href="https://drivetest.ca" target="_blank" rel="noreferrer" className="underline font-medium text-slate-700 dark:text-slate-300">drivetest.ca</a>.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {testResult.incorrectCount > 0 && (
              <button
                onClick={handleRetryMissed}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-xs flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry {testResult.incorrectCount} Missed Questions</span>
              </button>
            )}

            <button
              onClick={initQuestions}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-500"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Test</span>
            </button>

            <button
              onClick={onExit}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-slate-500"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Real AdSlot Location 3: On Results Screen (NEVER during active test) */}
        <AdSlot slotId={AD_SLOTS.resultsFooter} className="mt-6" />

        {/* Detailed Question Review Section */}
        <section aria-labelledby="review-heading" className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 id="review-heading" className="text-lg font-bold text-slate-900 dark:text-white">
                Detailed Answer Review
              </h2>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span>{testQuestions.length} Questions</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">{testResult.correctCount} Correct</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span className="text-rose-700 dark:text-rose-400 font-medium">{testResult.incorrectCount} Incorrect</span>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start sm:self-auto" role="tablist" aria-label="Review filter">
              <button
                role="tab"
                aria-selected={reviewFilter === 'all'}
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  reviewFilter === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All ({testQuestions.length})
              </button>
              <button
                role="tab"
                aria-selected={reviewFilter === 'incorrect'}
                onClick={() => setReviewFilter('incorrect')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  reviewFilter === 'incorrect'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Incorrect ({testResult.incorrectCount})
              </button>
              <button
                role="tab"
                aria-selected={reviewFilter === 'flagged'}
                onClick={() => setReviewFilter('flagged')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  reviewFilter === 'flagged'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Flagged
              </button>
            </div>
          </div>

          {/* Question List */}
          <div className="mt-6 space-y-4">
            {filteredReviewQuestions.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {reviewFilter === 'incorrect' ? 'No incorrect questions in this test session!' : 'No questions match this filter.'}
                </p>
              </div>
            ) : (
              filteredReviewQuestions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isCorrect = ans ? ans.isCorrect : false;
                const isFlagged = flaggedIds.has(q.id);

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Question {idx + 1}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{q.category === 'signs' ? 'Road Sign' : 'Rules of the Road'}</span>
                        <span aria-hidden="true">·</span>
                        <span>{q.topic}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleFlag(q.id)}
                          className={`p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 ${
                            isFlagged ? 'text-amber-500' : 'text-slate-400'
                          }`}
                          title={isFlagged ? 'Flagged for review' : 'Flag question'}
                          aria-label={isFlagged ? 'Remove bookmark' : 'Bookmark question'}
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                        }`}>
                          {isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                    </div>

                    {/* Question text & sign graphic */}
                    <div className="mt-3 flex flex-col sm:flex-row sm:items-start gap-4">
                      {q.signType && (
                        <div className="shrink-0 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 self-start">
                          <RoadSignSvg type={q.signType} size={70} />
                        </div>
                      )}
                      <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                        {q.question}
                      </p>
                    </div>

                    {/* Options list */}
                    <div className="mt-4 grid grid-cols-1 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = ans?.selectedOption === optIdx;
                        const isThisCorrect = optIdx === q.correctAnswer;

                        let style = 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                        if (isThisCorrect) {
                          style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100 font-medium';
                        } else if (isSelected && !isThisCorrect) {
                          style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100 line-through';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-3 ${style}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 bg-white/70 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-600">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>
                            {isThisCorrect && (
                              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 shrink-0">
                                Correct Answer
                              </span>
                            )}
                            {isSelected && !isThisCorrect && (
                              <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 shrink-0">
                                Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Panel with Honest Verification Badge */}
                    <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          Explanation:
                        </span>
                        {renderVerificationBadge(q.verificationStatus)}
                      </div>
                      <p className="leading-relaxed">{q.explanation}</p>
                      <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 italic">
                        Source Reference: {q.sourceReference}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    );
  }

  // =========================================================================
  // ACTIVE QUESTION VIEW (ZERO ADS ALLOWED HERE PER REQUIREMENT C5)
  // =========================================================================
  if (!currentQuestion) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 dark:text-slate-400">Loading questions...</p>
      </div>
    );
  }

  const isCurrentFlagged = flaggedIds.has(currentQuestion.id);
  const progressPercent = Math.round(((currentIndex + 1) / testQuestions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10" role="region" aria-label="Practice Test Session">
      
      {/* Top Test Header Bar */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-red-500"
            title="Exit Test"
            aria-label="Exit current test session"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider block">
              {initialMode === 'full' 
                ? 'Full Practice Test (Unofficial Target: 80%)' 
                : initialMode === 'signs' 
                ? 'Road Signs Test' 
                : 'Rules of the Road Test'}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono-numbers">
                Question {currentIndex + 1} of {testQuestions.length}
              </span>
              <span aria-hidden="true">·</span>
              <span>{currentQuestion.topic}</span>
            </div>
          </div>
        </div>

        {/* Flag Button */}
        <button
          onClick={() => handleToggleFlag(currentQuestion.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 ${
            isCurrentFlagged
              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700'
              : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
          title={isCurrentFlagged ? 'Remove question flag' : 'Flag question for later review'}
          aria-label={isCurrentFlagged ? 'Remove question bookmark' : 'Bookmark question'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isCurrentFlagged ? 'fill-current' : ''}`} />
          <span className="hidden sm:inline">{isCurrentFlagged ? 'Flagged' : 'Flag'}</span>
        </button>
      </div>

      {/* Slim Accessible Progress Bar */}
      <div 
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={testQuestions.length}
        aria-label="Test progress"
        className="mt-3 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden"
      >
        <div
          className="bg-red-600 h-full rounded-full transition-all duration-200 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        
        {/* Road Sign Graphic (if applicable) */}
        {currentQuestion.signType && (
          <div className="mb-6 flex justify-center">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs">
              <RoadSignSvg type={currentQuestion.signType} size={130} />
            </div>
          </div>
        )}

        {/* Question Text */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
          {currentQuestion.question}
        </h2>

        {/* Answer Options (Min 44px touch targets) */}
        <div className="mt-6 space-y-3" role="radiogroup" aria-label="Question choices">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOptionIndex === idx;
            const letter = String.fromCharCode(65 + idx);

            // Styling states
            let cardClasses = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200';
            let circleClasses = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700';

            if (isSelected && !isAnswerSubmitted) {
              cardClasses = 'bg-red-50/50 dark:bg-red-950/20 border-red-500 dark:border-red-500 text-slate-950 dark:text-white font-medium shadow-xs';
              circleClasses = 'bg-red-600 text-white border-red-600';
            } else if (isAnswerSubmitted) {
              if (idx === currentQuestion.correctAnswer) {
                cardClasses = 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 dark:border-emerald-600 text-emerald-950 dark:text-emerald-100 font-medium';
                circleClasses = 'bg-emerald-600 text-white border-emerald-600';
              } else if (isSelected && idx !== currentQuestion.correctAnswer) {
                cardClasses = 'bg-rose-50 dark:bg-rose-950/30 border-rose-500 dark:border-rose-600 text-rose-950 dark:text-rose-100';
                circleClasses = 'bg-rose-600 text-white border-rose-600';
              } else {
                cardClasses = 'opacity-60 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerSubmitted}
                className={`w-full min-h-[52px] p-4 rounded-xl border text-left transition-all duration-150 flex items-start gap-3.5 focus-visible:ring-2 focus-visible:ring-red-500 ${cardClasses}`}
              >
                <span className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-bold shrink-0 font-mono-numbers mt-0.5 ${circleClasses}`}>
                  {letter}
                </span>
                <span className="text-sm leading-relaxed flex-1">
                  {option}
                </span>

                {isAnswerSubmitted && idx === currentQuestion.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                )}
                {isAnswerSubmitted && isSelected && idx !== currentQuestion.correctAnswer && (
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation Card (displayed after submission) */}
        {isAnswerSubmitted && (
          <div 
            aria-live="polite"
            className={`mt-6 p-5 rounded-xl border animate-fadeIn ${
              selectedOptionIndex === currentQuestion.correctAnswer
                ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                : 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {selectedOptionIndex === currentQuestion.correctAnswer ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      Correct
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    <span className="text-xs font-bold text-rose-800 dark:text-rose-300">
                      Incorrect — Option {String.fromCharCode(65 + currentQuestion.correctAnswer)} is correct
                    </span>
                  </>
                )}
              </div>

              {renderVerificationBadge(currentQuestion.verificationStatus)}
            </div>

            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              {currentQuestion.explanation}
            </p>

            <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <span>Source: {currentQuestion.sourceReference}</span>
              {onGoToStudyGuide && (
                <button
                  onClick={() => onGoToStudyGuide()}
                  className="font-medium text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Review in Study Guide</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Action Controls Bar */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrevQuestion}
            disabled={currentIndex === 0}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-slate-500 ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-3">
            {!isAnswerSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={selectedOptionIndex === null}
                className={`min-h-[44px] px-5 py-2.5 text-xs font-semibold rounded-lg transition-colors shadow-xs flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-red-500 ${
                  selectedOptionIndex === null
                    ? 'opacity-50 cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500'
                    : 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white'
                }`}
              >
                <span>Confirm Answer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="min-h-[44px] px-5 py-2.5 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xs flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <span>{currentIndex === testQuestions.length - 1 ? 'View Final Results' : 'Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Keyboard helper hint */}
      <div className="mt-4 text-center">
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          Tip: Press numbers <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] border border-slate-300 dark:border-slate-700 font-mono">1</kbd> to <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] border border-slate-300 dark:border-slate-700 font-mono">4</kbd> to select, and <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] border border-slate-300 dark:border-slate-700 font-mono">Enter</kbd> to confirm or advance.
        </span>
      </div>

    </div>
  );
};
