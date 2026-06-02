import { useState, useCallback } from 'react';
import { PromptAnalysis } from '../types';
import apiService from '../services/api';

interface UseAnalysisResult {
  analysis: PromptAnalysis | null;
  loading: boolean;
  error: Error | null;
  analyze: (prompt: string) => Promise<void>;
  clearAnalysis: () => void;
}

/**
 * Hook for analyzing prompts
 */
export const useAnalysis = (): UseAnalysisResult => {
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const analyze = useCallback(async (prompt: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.analyzePrompt({ prompt });
      setAnalysis(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Analysis failed');
      setError(error);
      console.error('Analysis error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearAnalysis = useCallback(() => {
    setAnalysis(null);
    setError(null);
  }, []);

  return { analysis, loading, error, analyze, clearAnalysis };
};
