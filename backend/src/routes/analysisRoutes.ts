import { Router } from 'express';
import {
  analyzePrompt,
  getHistory,
  getAnalysis,
  deleteAnalysis,
  getImprovements,
  getLearningTips,
  healthCheck,
} from '../controllers/analysisController.js';
import { validateRequest } from '../middleware/validation.js';

const router = Router();

// Health check
router.get('/health', healthCheck);

// Analysis routes
router.post('/analyze', validateRequest, analyzePrompt);
router.get('/history', getHistory);
router.get('/analysis/:id', getAnalysis);
router.delete('/analysis/:id', deleteAnalysis);

// Improvement routes
router.post('/improvements', validateRequest, getImprovements);

// Learning routes
router.get('/learning-tips', getLearningTips);

export default router;
