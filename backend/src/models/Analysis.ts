import { Schema, model } from 'mongoose';
import { PromptAnalysis } from '../types/index.js';

// Define the analysis schema
const analysisSchema = new Schema<PromptAnalysis>({
  id: { type: String, unique: true, required: true },
  originalPrompt: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  anatomyComponents: [
    {
      type: { type: String, required: true },
      content: { type: String },
      description: { type: String },
      suggestion: { type: String },
      confidence: { type: Number },
      color: { type: String },
    },
  ],
  scores: {
    clarity: Number,
    specificity: Number,
    completeness: Number,
    structure: Number,
    overall: Number,
  },
  improvements: [
    {
      id: String,
      title: String,
      description: String,
      improvedPrompt: String,
      score: Number,
    },
  ],
  comparison: {
    original: String,
    improved: String,
    additions: [String],
    removals: [String],
    modifications: [String],
  },
});

// Create and export the model
export const AnalysisModel = model<PromptAnalysis>('Analysis', analysisSchema);
