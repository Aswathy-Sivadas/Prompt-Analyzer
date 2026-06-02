// Core types for the application

export interface PromptAnalysis {
  id: string;
  originalPrompt: string;
  timestamp: Date;
  anatomyComponents: AnatomyComponent[];
  scores: ScoreMetrics;
  improvements: PromptImprovement[];
  comparison?: PromptComparison;
}

export interface AnatomyComponent {
  type: ComponentType;
  content: string;
  description: string;
  suggestion: string;
  confidence: number;
  color: string;
}

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

export interface ScoreMetrics {
  clarity: number;
  specificity: number;
  completeness: number;
  structure: number;
  overall: number;
}

export interface PromptImprovement {
  id: string;
  title: string;
  description: string;
  improvedPrompt: string;
  score: number;
}

export interface PromptComparison {
  original: string;
  improved: string;
  additions: string[];
  removals: string[];
  modifications: string[];
}

export interface User {
  id: string;
  email: string;
  theme: 'light' | 'dark';
  language: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AnalysisRequest {
  prompt: string;
}

export interface AnalysisResponse extends ApiResponse<PromptAnalysis> {}
