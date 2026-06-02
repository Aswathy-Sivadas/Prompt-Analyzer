import axios from 'axios';
import { config } from '../config/env.js';
import {
  AnatomyComponent,
  ComponentType,
  PromptAnalysis,
  ScoreMetrics,
  PromptImprovement,
  PromptComparison,
} from '../types/index.js';

/**
 * Service for analyzing prompts using OpenRouter API
 */
export class PromptAnalysisService {
  private apiKey: string;
  private apiUrl: string;
  private model: string;

  constructor() {
    this.apiKey = config.openrouterApiKey;
    this.apiUrl = config.openrouterApiUrl;
    this.model = config.model;
  }

  /**
   * Analyze a prompt and extract its components
   */
  async analyzePrompt(prompt: string): Promise<PromptAnalysis> {
    try {
      // Get anatomy components
      const components = await this.extractComponents(prompt);

      // Calculate scores
      const scores = this.calculateScores(prompt, components);

      // Generate improvements
      const improvements = await this.generateImprovements(prompt);

      // Generate comparison
      const comparison = this.generateComparison(
        prompt,
        improvements[0]?.improvedPrompt || prompt
      );

      return {
        id: this.generateId(),
        originalPrompt: prompt,
        timestamp: new Date(),
        anatomyComponents: components,
        scores,
        improvements,
        comparison,
      };
    } catch (error) {
      console.error('Error analyzing prompt:', error);
      throw new Error('Failed to analyze prompt');
    }
  }

  /**
   * Helper to parse JSON from markdown-formatted responses
   */
  private parseJsonFromResponse(content: string): any {
    if (!content) throw new Error('Empty response content');
    
    let jsonString = content.trim();
    
    // Remove markdown code block formatting if present
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonString.startsWith('```')) {
      jsonString = jsonString.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    jsonString = jsonString.trim();
    
    try {
      // Try direct JSON parse first
      return JSON.parse(jsonString);
    } catch (e) {
      // If that fails, try to convert single quotes to double quotes
      // This handles JavaScript object literals from some models
      try {
        const converted = jsonString
          .replace(/'/g, '"')  // Replace single quotes with double quotes
          .replace(/,\s*}/g, '}')  // Remove trailing commas before closing braces
          .replace(/,\s*]/g, ']');  // Remove trailing commas before closing brackets
        return JSON.parse(converted);
      } catch (e2) {
        console.error('Failed to parse response:', jsonString);
        throw new Error('Invalid JSON response from API');
      }
    }
  }

  /**
   * Extract anatomy components from a prompt
   */
  private async extractComponents(
    prompt: string
  ): Promise<AnatomyComponent[]> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/chat/completions`,
        {
          model: this.model,
          messages: [
            {
              role: 'system',
              content: `You are an expert prompt engineer. Analyze the following prompt and identify its key components. For each component, provide:
1. The type (task, context, role, audience, tone, output_format, constraints, length, examples, missing)
2. The exact content from the prompt
3. Why it's important
4. A suggestion for improvement

Respond in JSON format with an array of objects containing: type, content, description, suggestion, confidence (0-1).`,
            },
            {
              role: 'user',
              content: `Analyze this prompt:\n\n${prompt}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content;
      const parsed = this.parseJsonFromResponse(content);

      // Ensure parsed is an array
      const components = Array.isArray(parsed) ? parsed : [parsed];

      // Map to AnatomyComponent and add colors
      return components.map((comp: any) => ({
        type: (comp.type || 'task') as ComponentType,
        content: comp.content || '',
        description: comp.description || '',
        suggestion: comp.suggestion || '',
        confidence: typeof comp.confidence === 'number' ? comp.confidence : 0.8,
        color: this.getComponentColor((comp.type || 'task') as ComponentType),
      }));
    } catch (error) {
      console.error('Error extracting components:', error);
      // Return default components if extraction fails
      return this.getDefaultComponents(prompt);
    }
  }

  /**
   * Generate improved versions of the prompt
   */
  private async generateImprovements(
    prompt: string
  ): Promise<PromptImprovement[]> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/chat/completions`,
        {
          model: this.model,
          messages: [
            {
              role: 'system',
              content: `You are an expert prompt engineer. Given a prompt, generate 3 improved versions:
1. Professional Version - formal and structured
2. Beginner-Friendly Version - simpler and more accessible
3. Advanced AI Version - optimized for complex reasoning

For each version, provide: title, description, improvedPrompt, and estimatedScore (0-100).
Respond in valid JSON format as an array.`,
            },
            {
              role: 'user',
              content: `Improve this prompt:\n\n${prompt}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 2500,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content;
      const parsed = this.parseJsonFromResponse(content);

      // Ensure parsed is an array
      const improvements = Array.isArray(parsed) ? parsed : [parsed];

      return improvements.map((imp: any, idx: number) => ({
        id: `improvement-${idx}`,
        title: imp.title || `Improvement ${idx + 1}`,
        description: imp.description || '',
        improvedPrompt: imp.improvedPrompt || prompt,
        score: (imp.estimatedScore || 75 + idx * 5) as number,
      }));
    } catch (error) {
      console.error('Error generating improvements:', error);
      return this.getDefaultImprovements(prompt);
    }
  }

  /**
   * Calculate scores for the prompt
   */
  private calculateScores(
    prompt: string,
    components: AnatomyComponent[]
  ): ScoreMetrics {
    const componentTypes = new Set(components.map(c => c.type));
    const avgConfidence =
      components.length > 0
        ? components.reduce((sum, c) => sum + c.confidence, 0) /
          components.length
        : 0;

    const clarity = this.scoreClarity(prompt, components);
    const specificity = this.scoreSpecificity(prompt, components);
    const completeness = Math.min(
      100,
      Math.round((componentTypes.size / 10) * 100)
    );
    const structure = Math.min(100, Math.round(avgConfidence * 100));
    const overall = Math.round(
      (clarity + specificity + completeness + structure) / 4
    );

    return {
      clarity,
      specificity,
      completeness,
      structure,
      overall,
    };
  }

  /**
   * Score clarity of the prompt
   */
  private scoreClarity(
    prompt: string,
    components: AnatomyComponent[]
  ): number {
    let score = 60;

    // Check for clear language
    if (prompt.length > 50 && prompt.length < 500) score += 15;
    if (prompt.includes('please') || prompt.includes('help')) score += 5;

    // Check for task component
    if (components.find(c => c.type === 'task')) score += 20;

    return Math.min(100, score);
  }

  /**
   * Score specificity of the prompt
   */
  private scoreSpecificity(
    prompt: string,
    components: AnatomyComponent[]
  ): number {
    let score = 50;

    // Check for specific details
    if (prompt.includes('example') || prompt.includes('like')) score += 15;
    if (components.find(c => c.type === 'output_format')) score += 20;
    if (components.find(c => c.type === 'constraints')) score += 15;

    return Math.min(100, score);
  }

  /**
   * Generate comparison between original and improved prompt
   */
  private generateComparison(
    original: string,
    improved: string
  ): PromptComparison {
    // Simple word-based comparison
    const originalWords = new Set(original.toLowerCase().split(/\s+/));
    const improvedWords = new Set(improved.toLowerCase().split(/\s+/));

    const additions = Array.from(improvedWords).filter(
      w => !originalWords.has(w)
    );
    const removals = Array.from(originalWords).filter(
      w => !improvedWords.has(w)
    );
    const modifications = [];

    return {
      original,
      improved,
      additions: additions.slice(0, 3),
      removals: removals.slice(0, 3),
      modifications,
    };
  }

  /**
   * Get color for component type
   */
  private getComponentColor(type: ComponentType): string {
    const colorMap: Record<ComponentType, string> = {
      task: '#3b82f6',
      context: '#a855f7',
      role: '#ec4899',
      audience: '#10b981',
      tone: '#f59e0b',
      output_format: '#f97316',
      constraints: '#ef4444',
      length: '#6366f1',
      examples: '#14b8a6',
      missing: '#6b7280',
    };

    return colorMap[type] || '#6b7280';
  }

  /**
   * Generate default components if API fails
   */
  private getDefaultComponents(prompt: string): AnatomyComponent[] {
    const components: AnatomyComponent[] = [];

    // Task - usually the first element or main action
    components.push({
      type: 'task',
      content: prompt.substring(0, Math.min(100, prompt.length)),
      description: 'The main task or instruction',
      suggestion: 'Be specific about what output you need',
      confidence: 0.9,
      color: '#3b82f6',
    });

    // Context - look for background information
    if (prompt.toLowerCase().includes('background') || prompt.length > 200) {
      components.push({
        type: 'context',
        content: 'Additional context provided',
        description: 'Background information to understand the task',
        suggestion: 'Provide more specific context if needed',
        confidence: 0.7,
        color: '#a855f7',
      });
    }

    // Role - if mentioned
    if (
      prompt.toLowerCase().includes('you are') ||
      prompt.toLowerCase().includes('as a') ||
      prompt.toLowerCase().includes('act as')
    ) {
      components.push({
        type: 'role',
        content: 'Specific role specified',
        description: 'The role or perspective to take',
        suggestion: 'Define the role more clearly if needed',
        confidence: 0.85,
        color: '#ec4899',
      });
    }

    // Output format - if mentioned
    if (
      prompt.toLowerCase().includes('format') ||
      prompt.toLowerCase().includes('json') ||
      prompt.toLowerCase().includes('list') ||
      prompt.toLowerCase().includes('table')
    ) {
      components.push({
        type: 'output_format',
        content: 'Output format specified',
        description: 'How the response should be formatted',
        suggestion: 'Be more specific about the desired format',
        confidence: 0.8,
        color: '#f97316',
      });
    }

    // Constraints - if mentioned
    if (
      prompt.toLowerCase().includes('must') ||
      prompt.toLowerCase().includes('only') ||
      prompt.toLowerCase().includes('do not')
    ) {
      components.push({
        type: 'constraints',
        content: 'Constraints or limitations specified',
        description: 'Rules and limitations for the response',
        suggestion: 'Add more constraints if needed',
        confidence: 0.75,
        color: '#ef4444',
      });
    }

    return components.length > 0
      ? components
      : [
          {
            type: 'task',
            content: prompt.substring(0, Math.min(100, prompt.length)),
            description: 'User prompt',
            suggestion: 'Add more details for better results',
            confidence: 0.7,
            color: '#3b82f6',
          },
        ];
  }

  /**
   * Generate default improvements if API fails
   */
  private getDefaultImprovements(prompt: string): PromptImprovement[] {
    return [
      {
        id: 'improvement-0',
        title: 'Professional Version',
        description:
          'Formal and structured version with clear requirements',
        improvedPrompt: prompt + '\n\nPlease ensure the response is well-structured and formatted.',
        score: 75,
      },
      {
        id: 'improvement-1',
        title: 'Beginner-Friendly Version',
        description: 'Simpler version that is easier to understand',
        improvedPrompt: prompt + '\n\nMake it simple and easy to understand.',
        score: 72,
      },
      {
        id: 'improvement-2',
        title: 'Advanced AI Version',
        description: 'Optimized for advanced reasoning and analysis',
        improvedPrompt:
          prompt + '\n\nProvide detailed analysis and reasoning for your response.',
        score: 80,
      },
    ];
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Export singleton instance
export const promptAnalysisService = new PromptAnalysisService();
