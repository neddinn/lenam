// Types for Lenam application

export type QuestionType = 'multiple_choice' | 'short_answer';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  conceptExplanation?: string;
  codeExample?: string;
  interviewTip?: string;
  bridgeNote?: string;
}

export interface DrillSession {
  topic: string;
  goal: 'interview' | 'build' | 'concept';
  questions: Question[];
  currentIndex: number;
  answers: DrillAnswer[];
  startTime: number;
}

export interface DrillAnswer {
  questionId: string;
  userAnswer: string;
  confidence: number; // 0-100
  isCorrect: boolean;
  timeSpent: number;
}

export interface SkillNode {
  id: string;
  name: string;
  readinessScore: number;
  lastPracticed: Date;
  status: 'unexplored' | 'active' | 'mastered' | 'decaying';
  relatedTopics: string[];
  questionsAnswered: number;
  totalQuestions: number;
}

export interface UserProgress {
  totalScore: number;
  currentStreak: number;
  topicsExplored: number;
  skillNodes: SkillNode[];
}

// App screens now include marketing pages
export type AppScreen =
  | 'marketing'
  | 'login'
  | 'signup'
  | 'setup'
  | 'drill'
  | 'teach'
  | 'summary'
  | 'library'
  | 'dashboard';

export interface DrillResult {
  question: Question;
  userAnswer: string;
  confidence: number;
  isCorrect: boolean;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
}
