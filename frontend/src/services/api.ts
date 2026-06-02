import axios, { AxiosInstance } from 'axios';
import { AnalysisRequest, ApiResponse, PromptAnalysis } from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    const baseURL = (import.meta.env as any).VITE_API_URL || 'http://localhost:5000/api';
    
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      response => response,
      error => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Analyze a prompt and get its components
   */
  async analyzePrompt(request: AnalysisRequest): Promise<PromptAnalysis> {
    try {
      const response = await this.api.post<ApiResponse<PromptAnalysis>>(
        '/analyze',
        request
      );
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Analysis failed');
      }
      
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get analysis history
   */
  async getHistory(): Promise<PromptAnalysis[]> {
    try {
      const response = await this.api.get<ApiResponse<PromptAnalysis[]>>('/history');
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch history');
      }
      
      return response.data.data || [];
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a specific analysis by ID
   */
  async getAnalysis(id: string): Promise<PromptAnalysis> {
    try {
      const response = await this.api.get<ApiResponse<PromptAnalysis>>(
        `/analysis/${id}`
      );
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch analysis');
      }
      
      return response.data.data!;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete an analysis
   */
  async deleteAnalysis(id: string): Promise<void> {
    try {
      const response = await this.api.delete<ApiResponse<void>>(
        `/analysis/${id}`
      );
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to delete analysis');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get improvement suggestions for a prompt
   */
  async getImprovements(prompt: string): Promise<PromptAnalysis['improvements']> {
    try {
      const response = await this.api.post<ApiResponse<PromptAnalysis['improvements']>>(
        '/improvements',
        { prompt }
      );
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to get improvements');
      }
      
      return response.data.data || [];
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get learning tips
   */
  async getLearningTips(): Promise<Array<{ title: string; content: string; category: string }>> {
    try {
      const response = await this.api.get<ApiResponse<Array<{ title: string; content: string; category: string }>>>(
        '/learning-tips'
      );
      
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch tips');
      }
      
      return response.data.data || [];
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle errors consistently
   */
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message;
      return new Error(message);
    }
    
    if (error instanceof Error) {
      return error;
    }
    
    return new Error('An unknown error occurred');
  }
}

export default new ApiService();
