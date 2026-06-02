import { Request, Response, NextFunction } from 'express';

/**
 * Validate incoming request body
 */
export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Check for required fields based on route
  const route = req.path;

  if (route === '/analyze' || route === '/improvements') {
    if (!req.body.prompt) {
      res.status(400).json({
        success: false,
        error: 'Prompt field is required',
      });
      return;
    }

    if (typeof req.body.prompt !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Prompt must be a string',
      });
      return;
    }

    if (req.body.prompt.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Prompt cannot be empty',
      });
      return;
    }

    if (req.body.prompt.length > 5000) {
      res.status(400).json({
        success: false,
        error: 'Prompt cannot exceed 5000 characters',
      });
      return;
    }
  }

  next();
}

/**
 * Rate limiting middleware (simple implementation)
 */
const requestCounts = new Map<string, number[]>();
const WINDOW_TIME = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;

export function rateLimitMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const ip = req.ip || 'unknown';
  const now = Date.now();

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }

  const requests = requestCounts.get(ip)!;
  const recentRequests = requests.filter(time => now - time < WINDOW_TIME);

  if (recentRequests.length >= MAX_REQUESTS) {
    res.status(429).json({
      success: false,
      error: 'Too many requests. Please try again later.',
    });
    return;
  }

  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);

  next();
}
