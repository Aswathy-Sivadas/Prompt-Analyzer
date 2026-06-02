// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Request types
export interface AnalysisRequest {
  prompt: string;
}

export interface ImprovementRequest {
  prompt: string;
}

// Component types
export type ComponentType =
  | 'task'
  | 'context'
  | 'role'
  | 'audience'
  | 'tone'
  | 'output_format'
  | 'constraints'
  | 'length'
  | 'examples'
  | 'missing';

export interface AnatomyComponent {
  type: ComponentType;
  content: string;
  description: string;
  suggestion: string;
  confidence: number;
  color: string;
}

// Score types
export interface ScoreMetrics {
  clarity: number;
  specificity: number;
  completeness: number;
  structure: number;
  overall: number;
}

// Improvement types
export interface PromptImprovement {
  id: string;
  title: string;
  description: string;
  improvedPrompt: string;
  score: number;
}

// Comparison types
export interface PromptComparison {
  original: string;
  improved: string;
  additions: string[];
  removals: string[];
  modifications: string[];
}

// Analysis types
export interface PromptAnalysis {
  id: string;
  originalPrompt: string;
  timestamp: Date;
  anatomyComponents: AnatomyComponent[];
  scores: ScoreMetrics;
  improvements: PromptImprovement[];
  comparison?: PromptComparison;
}

// Learning tip types
export interface LearningTip {
  title: string;
  content: string;
  category: string;
}
