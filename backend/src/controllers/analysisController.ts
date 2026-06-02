import { Request, Response } from 'express';
import { AnalysisModel } from '../models/Analysis.js';
import { promptAnalysisService } from '../services/PromptAnalysisService.js';
import { AnalysisRequest, LearningTip } from '../types/index.js';
import { ApiResponse } from '../types/index.js';

/**
 * Analyze a prompt
 */
export async function analyzePrompt(req: Request, res: Response): Promise<void> {
  try {
    const { prompt } = req.body as AnalysisRequest;

    if (!prompt || prompt.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Prompt is required',
      } as ApiResponse<null>);
      return;
    }

    // Analyze the prompt
    const analysis = await promptAnalysisService.analyzePrompt(prompt);

    // Save to database
    await AnalysisModel.create(analysis);

    res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error('Error in analyzePrompt:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze prompt',
    } as ApiResponse<null>);
  }
}

/**
 * Get analysis history
 */
export async function getHistory(req: Request, res: Response): Promise<void> {
  try {
    const analyses = await AnalysisModel.find().sort({ timestamp: -1 }).limit(50);

    res.status(200).json({
      success: true,
      data: analyses,
    });
  } catch (error) {
    console.error('Error in getHistory:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch history',
    } as ApiResponse<null>);
  }
}

/**
 * Get specific analysis by ID
 */
export async function getAnalysis(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const analysis = await AnalysisModel.findOne({ id });

    if (!analysis) {
      res.status(404).json({
        success: false,
        error: 'Analysis not found',
      } as ApiResponse<null>);
      return;
    }

    res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error('Error in getAnalysis:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analysis',
    } as ApiResponse<null>);
  }
}

/**
 * Delete analysis
 */
export async function deleteAnalysis(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const result = await AnalysisModel.deleteOne({ id });

    if (result.deletedCount === 0) {
      res.status(404).json({
        success: false,
        error: 'Analysis not found',
      } as ApiResponse<null>);
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Analysis deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteAnalysis:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete analysis',
    } as ApiResponse<null>);
  }
}

/**
 * Get improvement suggestions
 */
export async function getImprovements(req: Request, res: Response): Promise<void> {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Prompt is required',
      } as ApiResponse<null>);
      return;
    }

    const improvements = await promptAnalysisService.generateImprovements(prompt);

    res.status(200).json({
      success: true,
      data: improvements,
    });
  } catch (error) {
    console.error('Error in getImprovements:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate improvements',
    } as ApiResponse<null>);
  }
}

/**
 * Get learning tips
 */
export async function getLearningTips(req: Request, res: Response): Promise<void> {
  try {
    // Provide hardcoded learning tips (can be moved to database later)
    const tips: LearningTip[] = [
      {
        title: 'Define Clear Task',
        content: 'Start your prompt with a clear, specific task. Tell the AI exactly what you want it to do.',
        category: 'Best Practices',
      },
      {
        title: 'Provide Context',
        content: 'Give the AI background information about what the prompt is for and why you need it.',
        category: 'Structure',
      },
      {
        title: 'Specify Output Format',
        content: 'Tell the AI how you want the output formatted (JSON, bullet points, paragraphs, etc.)',
        category: 'Best Practices',
      },
      {
        title: 'Give Examples',
        content: 'Provide examples of what good output looks like to guide the AI.',
        category: 'Examples',
      },
      {
        title: 'Set Constraints',
        content: 'Specify any constraints like length, tone, or specific requirements.',
        category: 'Best Practices',
      },
      {
        title: 'Use Persona/Role',
        content: 'Tell the AI what role it should take (expert, teacher, consultant, etc.)',
        category: 'Structure',
      },
      {
        title: 'Specify Tone',
        content: 'Indicate the tone you want (professional, casual, creative, etc.)',
        category: 'Best Practices',
      },
      {
        title: 'Avoid Ambiguity',
        content: 'Be specific and avoid vague language that could be misinterpreted.',
        category: 'Common Mistakes',
      },
      {
        title: 'Use Step-by-Step',
        content: 'Break complex tasks into steps for clearer instructions.',
        category: 'Best Practices',
      },
      {
        title: 'Mention Target Audience',
        content: 'Specify who the output is for so the AI can adjust complexity and tone accordingly.',
        category: 'Structure',
      },
    ];

    res.status(200).json({
      success: true,
      data: tips,
    });
  } catch (error) {
    console.error('Error in getLearningTips:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch learning tips',
    } as ApiResponse<null>);
  }
}

/**
 * Health check endpoint
 */
export async function healthCheck(req: Request, res: Response): Promise<void> {
  res.status(200).json({
    success: true,
    message: 'API is running',
  });
}
