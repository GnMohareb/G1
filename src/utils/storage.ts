import { UserProgress, TestResult, UserAnswerRecord } from '../types';
import { QUESTIONS } from '../data/questions';

const STORAGE_KEY = 'g1_ready_ontario_progress_v1';
const THEME_KEY = 'g1_ready_ontario_theme';

const DEFAULT_PROGRESS: UserProgress = {
  totalTestsTaken: 0,
  totalTestsPassed: 0,
  totalQuestionsAnswered: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  flaggedQuestionIds: [],
  incorrectQuestionIds: [],
  questionStats: {},
  recentResults: [],
  categoryStats: {
    signs: { answered: 0, correct: 0 },
    rules: { answered: 0, correct: 0 },
  },
};

export const loadUserProgress = (): UserProgress => {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return DEFAULT_PROGRESS;
    }
    const recent = Array.isArray(parsed.recentResults) ? parsed.recentResults : [];
    const passedCount = typeof parsed.totalTestsPassed === 'number'
      ? parsed.totalTestsPassed
      : recent.filter((r: TestResult) => r && r.passed).length;

    return {
      ...DEFAULT_PROGRESS,
      totalTestsTaken: typeof parsed.totalTestsTaken === 'number' ? parsed.totalTestsTaken : 0,
      totalTestsPassed: passedCount,
      totalQuestionsAnswered: typeof parsed.totalQuestionsAnswered === 'number' ? parsed.totalQuestionsAnswered : 0,
      totalCorrect: typeof parsed.totalCorrect === 'number' ? parsed.totalCorrect : 0,
      totalIncorrect: typeof parsed.totalIncorrect === 'number' ? parsed.totalIncorrect : 0,
      flaggedQuestionIds: Array.isArray(parsed.flaggedQuestionIds) ? parsed.flaggedQuestionIds.filter((x: unknown): x is string => typeof x === 'string') : [],
      incorrectQuestionIds: Array.isArray(parsed.incorrectQuestionIds) ? parsed.incorrectQuestionIds.filter((x: unknown): x is string => typeof x === 'string') : [],
      recentResults: recent,
      questionStats: parsed.questionStats && typeof parsed.questionStats === 'object' ? parsed.questionStats : {},
      categoryStats: {
        signs: {
          answered: typeof parsed.categoryStats?.signs?.answered === 'number' ? parsed.categoryStats.signs.answered : 0,
          correct: typeof parsed.categoryStats?.signs?.correct === 'number' ? parsed.categoryStats.signs.correct : 0,
        },
        rules: {
          answered: typeof parsed.categoryStats?.rules?.answered === 'number' ? parsed.categoryStats.rules.answered : 0,
          correct: typeof parsed.categoryStats?.rules?.correct === 'number' ? parsed.categoryStats.rules.correct : 0,
        },
      },
    };
  } catch (err) {
    console.warn('Failed to parse progress from localStorage, resetting to default:', err);
    return DEFAULT_PROGRESS;
  }
};

export const saveUserProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to localStorage:', err);
  }
};

export interface ProgressValidationResult {
  valid: boolean;
  error?: string;
  progress?: UserProgress;
}

export const validateProgressData = (data: unknown): ProgressValidationResult => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return { valid: false, error: 'File content is not a valid JSON progress object.' };
  }

  const obj = data as Record<string, unknown>;

  if (
    typeof obj.totalTestsTaken !== 'number' ||
    typeof obj.totalQuestionsAnswered !== 'number' ||
    typeof obj.totalCorrect !== 'number' ||
    typeof obj.totalIncorrect !== 'number'
  ) {
    return {
      valid: false,
      error: 'Missing or invalid numerical metrics (tests taken, questions answered, correct/incorrect totals).'
    };
  }

  if (!Array.isArray(obj.flaggedQuestionIds) || !Array.isArray(obj.incorrectQuestionIds)) {
    return {
      valid: false,
      error: 'Missing or invalid question ID lists (flagged or incorrect question arrays).'
    };
  }

  if (!obj.categoryStats || typeof obj.categoryStats !== 'object') {
    return {
      valid: false,
      error: 'Missing category statistics breakdown (signs/rules).'
    };
  }

  const cat = obj.categoryStats as Record<string, unknown>;
  const signs = cat.signs as Record<string, unknown> | undefined;
  const rules = cat.rules as Record<string, unknown> | undefined;

  if (
    !signs || typeof signs.answered !== 'number' || typeof signs.correct !== 'number' ||
    !rules || typeof rules.answered !== 'number' || typeof rules.correct !== 'number'
  ) {
    return {
      valid: false,
      error: 'Category metrics for Road Signs or Rules of the Road are malformed or missing.'
    };
  }

  const validatedProgress: UserProgress = {
    totalTestsTaken: obj.totalTestsTaken,
    totalTestsPassed: typeof obj.totalTestsPassed === 'number' ? obj.totalTestsPassed : 0,
    totalQuestionsAnswered: obj.totalQuestionsAnswered,
    totalCorrect: obj.totalCorrect,
    totalIncorrect: obj.totalIncorrect,
    flaggedQuestionIds: obj.flaggedQuestionIds.filter((x): x is string => typeof x === 'string'),
    incorrectQuestionIds: obj.incorrectQuestionIds.filter((x): x is string => typeof x === 'string'),
    questionStats: obj.questionStats && typeof obj.questionStats === 'object' ? (obj.questionStats as UserProgress['questionStats']) : {},
    recentResults: Array.isArray(obj.recentResults) ? (obj.recentResults as TestResult[]) : [],
    categoryStats: {
      signs: {
        answered: signs.answered,
        correct: signs.correct,
      },
      rules: {
        answered: rules.answered,
        correct: rules.correct,
      },
    },
  };

  return { valid: true, progress: validatedProgress };
};

export const recordTestResult = (result: TestResult): UserProgress => {
  const current = loadUserProgress();
  
  // Track incorrect IDs and per-question stats
  const updatedIncorrectIds = new Set(current.incorrectQuestionIds);
  const updatedQuestionStats = { ...current.questionStats };

  let countedSignsAns = 0;
  let countedSignsCorr = 0;
  let countedRulesAns = 0;
  let countedRulesCorr = 0;

  result.userAnswers.forEach((ans: UserAnswerRecord) => {
    const q = QUESTIONS.find(item => item.id === ans.questionId);
    const category = q?.category || (ans.questionId.startsWith('sign-') ? 'signs' : 'rules');

    if (category === 'signs') {
      countedSignsAns += 1;
      if (ans.isCorrect) countedSignsCorr += 1;
    } else {
      countedRulesAns += 1;
      if (ans.isCorrect) countedRulesCorr += 1;
    }

    const prevStat = updatedQuestionStats[ans.questionId] || { attempts: 0, correct: 0, lastAnswered: '' };
    updatedQuestionStats[ans.questionId] = {
      attempts: prevStat.attempts + 1,
      correct: ans.isCorrect ? prevStat.correct + 1 : prevStat.correct,
      lastAnswered: new Date().toISOString(),
    };

    if (!ans.isCorrect) {
      updatedIncorrectIds.add(ans.questionId);
    } else {
      // If answered correctly now, remove from missed list
      updatedIncorrectIds.delete(ans.questionId);
    }
  });

  // Category answered/correct counts: prefer authoritative section totals from result if available
  const signsAnsDelta = typeof result.signsTotal === 'number' ? result.signsTotal : countedSignsAns;
  const signsCorrDelta = typeof result.signsCorrect === 'number' ? result.signsCorrect : countedSignsCorr;
  const rulesAnsDelta = typeof result.rulesTotal === 'number' ? result.rulesTotal : countedRulesAns;
  const rulesCorrDelta = typeof result.rulesCorrect === 'number' ? result.rulesCorrect : countedRulesCorr;

  const updatedProgress: UserProgress = {
    totalTestsTaken: current.totalTestsTaken + 1,
    totalTestsPassed: (current.totalTestsPassed ?? 0) + (result.passed ? 1 : 0),
    totalQuestionsAnswered: current.totalQuestionsAnswered + result.totalQuestions,
    totalCorrect: current.totalCorrect + result.correctCount,
    totalIncorrect: current.totalIncorrect + result.incorrectCount,
    flaggedQuestionIds: current.flaggedQuestionIds,
    incorrectQuestionIds: Array.from(updatedIncorrectIds),
    questionStats: updatedQuestionStats,
    recentResults: [result, ...current.recentResults].slice(0, 20),
    categoryStats: {
      signs: {
        answered: current.categoryStats.signs.answered + signsAnsDelta,
        correct: current.categoryStats.signs.correct + signsCorrDelta,
      },
      rules: {
        answered: current.categoryStats.rules.answered + rulesAnsDelta,
        correct: current.categoryStats.rules.correct + rulesCorrDelta,
      },
    },
  };

  saveUserProgress(updatedProgress);
  return updatedProgress;
};

export const toggleFlagQuestion = (questionId: string): boolean => {
  const current = loadUserProgress();
  const exists = current.flaggedQuestionIds.includes(questionId);
  const newFlagged = exists
    ? current.flaggedQuestionIds.filter(id => id !== questionId)
    : [...current.flaggedQuestionIds, questionId];

  const updated: UserProgress = {
    ...current,
    flaggedQuestionIds: newFlagged,
  };
  saveUserProgress(updated);
  return !exists;
};

export const isQuestionFlagged = (questionId: string): boolean => {
  const current = loadUserProgress();
  return current.flaggedQuestionIds.includes(questionId);
};

export const clearIncorrectQuestions = (): void => {
  const current = loadUserProgress();
  saveUserProgress({ ...current, incorrectQuestionIds: [] });
};

export const resetAllProgress = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(REVIEWED_SIGNS_KEY);
};

const REVIEWED_SIGNS_KEY = 'g1_ready_ontario_reviewed_signs_v1';

export const loadReviewedSignIds = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(REVIEWED_SIGNS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
};

export const markSignAsReviewed = (signId: string): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const current = loadReviewedSignIds();
    if (!current.includes(signId)) {
      const updated = [...current, signId];
      localStorage.setItem(REVIEWED_SIGNS_KEY, JSON.stringify(updated));
      return updated;
    }
    return current;
  } catch {
    return [];
  }
};

export const resetReviewedSigns = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(REVIEWED_SIGNS_KEY);
};


export const getThemePreference = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const setThemePreference = (theme: 'light' | 'dark'): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_KEY, theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export interface TopicWeakness {
  topic: string;
  category: 'signs' | 'rules';
  answered: number;
  correct: number;
  accuracy: number;
}

export const computeTopicBreakdown = (progress: UserProgress): TopicWeakness[] => {
  const topicMap: Record<string, { topic: string; category: 'signs' | 'rules'; answered: number; correct: number }> = {};

  Object.entries(progress.questionStats).forEach(([qId, stat]) => {
    const q = QUESTIONS.find(item => item.id === qId);
    if (!q) return;
    if (!topicMap[q.topic]) {
      topicMap[q.topic] = { topic: q.topic, category: q.category, answered: 0, correct: 0 };
    }
    topicMap[q.topic].answered += stat.attempts;
    topicMap[q.topic].correct += stat.correct;
  });

  return Object.values(topicMap)
    .map(t => ({
      ...t,
      accuracy: t.answered > 0 ? Math.round((t.correct / t.answered) * 100) : 0,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);
};
