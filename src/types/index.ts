/**
 * G1 Ready Ontario - Core TypeScript Type Definitions
 */

export type QuestionCategory = 'signs' | 'rules';

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export type VerificationStatus = 'needs-review' | 'source-cited' | 'verified';

export type RoadSignType = 
  | 'stop'
  | 'all_way_stop'
  | 'yield'
  | 'do_not_enter'
  | 'no_left_turn'
  | 'no_right_turn'
  | 'no_u_turn'
  | 'no_parking'
  | 'no_stopping'
  | 'no_standing'
  | 'maximum_50'
  | 'maximum_80'
  | 'maximum_100'
  | 'school_zone'
  | 'pedestrian_crossover'
  | 'railway_crossing'
  | 'railway_advance_warning'
  | 'traffic_signal_ahead'
  | 'stop_sign_ahead'
  | 'yield_ahead'
  | 'slippery_when_wet'
  | 'divided_highway_begins'
  | 'divided_highway_ends'
  | 'two_way_traffic'
  | 'keep_right'
  | 'slower_traffic_keep_right'
  | 'merge'
  | 'lane_ends'
  | 'roundabout_ahead'
  | 'winding_road'
  | 'sharp_curve_right'
  | 'deer_crossing'
  | 'playground_ahead'
  | 'hidden_intersection'
  | 'one_way_right'
  | 'hov_lane'
  | 'transit_priority_signal'
  | 'green_arrow_turn'
  | 'share_the_road'
  | 'pass_with_care'
  | 'do_not_pass'
  | 'construction_ahead'
  | 'flagperson_ahead'
  | 'construction_fines_doubled'
  | 'hospital'
  | 'no_bicycles'
  | 'no_pedestrians'
  | 'narrow_structure_ahead'
  | 'low_clearance'
  | 'steep_hill_downward'
  | 'emergency_detour_route'
  | 'ontario_400_highway';

export interface Question {
  id: string;
  category: QuestionCategory;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, or 3
  explanation: string;
  difficulty: QuestionDifficulty;
  sourceReference: string;
  verificationStatus: VerificationStatus;
  lastVerificationDate: string;
  signType?: RoadSignType;
}

export type TestMode = 'signs' | 'rules' | 'full' | 'incorrect' | 'flagged' | 'custom';

export interface TestConfig {
  mode: TestMode;
  questionCount: number;
  randomize: boolean;
  instantFeedback: boolean; // whether to show explanation right after answering or at the end
}

export interface UserAnswerRecord {
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
  timeSpentSeconds?: number;
}

export interface TestResult {
  id: string;
  date: string;
  mode: TestMode;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  scorePercentage: number;
  signsCorrect?: number;
  signsTotal?: number;
  rulesCorrect?: number;
  rulesTotal?: number;
  passed: boolean;
  userAnswers: UserAnswerRecord[];
}

export interface UserProgress {
  totalTestsTaken: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  totalIncorrect: number;
  flaggedQuestionIds: string[];
  incorrectQuestionIds: string[];
  questionStats: Record<string, { attempts: number; correct: number; lastAnswered: string }>;
  recentResults: TestResult[];
  totalTestsPassed?: number;
  categoryStats: {
    signs: { answered: number; correct: number };
    rules: { answered: number; correct: number };
  };
}

export interface StudyGuideSection {
  id: string;
  title: string;
  category: QuestionCategory;
  summary: string;
  officialReference: string;
  officialUrl: string;
  keyRules: string[];
  penaltiesOrFines?: string[];
  proTips: string[];
  relatedQuestionIds: string[];
}

export interface RoadSignCatalogItem {
  id: string;
  signType: RoadSignType;
  name: string;
  category: 'regulatory' | 'warning' | 'information' | 'temporary';
  code: string;
  meaning: string;
  driverAction: string;
  officialMtoRef: string;
  shapeAndColor: string;
  legalConsequence?: string;
  g1TestTip?: string;
}

