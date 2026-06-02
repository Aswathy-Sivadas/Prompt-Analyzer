import { useState, useEffect, useCallback } from 'react';
import { PromptAnalysis } from '../types';
import apiService from '../services/api';

interface UseHistoryResult {
  history: PromptAnalysis[];
  loading: boolean;
  error: Error | null;
  loadHistory: () => Promise<void>;
  deleteAnalysis: (id: string) => Promise<void>;
}

/**
 * Hook for managing analysis history
 */
export const useHistory = (): UseHistoryResult => {
  const [history, setHistory] = useState<PromptAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.getHistory();
      setHistory(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load history');
      setError(error);
      console.error('History error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAnalysis = useCallback(async (id: string) => {
    try {
      await apiService.deleteAnalysis(id);
      setHistory(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete analysis');
      setError(error);
      console.error('Delete error:', error);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return { history, loading, error, loadHistory, deleteAnalysis };
};
