import express, { Express } from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { connectDB } from './config/database.js';
import {
  errorHandler,
  notFoundHandler,
  requestLogger,
} from './middleware/errorHandler.js';
import { rateLimitMiddleware } from './middleware/validation.js';
import analysisRoutes from './routes/analysisRoutes.js';

const app: Express = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({ origin: config.corsOrigin }));
app.use(requestLogger);
app.use(rateLimitMiddleware);

// Routes
app.use('/api', analysisRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

// Start server
async function startServer(): Promise<void> {
  try {
    // Connect to database
    await connectDB();

    // Start listening
    app.listen(config.port, () => {
      console.log(`✓ Server running on http://localhost:${config.port}`);
      console.log(`✓ Environment: ${config.nodeEnv}`);
      console.log(`✓ Database: ${config.mongodbUri}`);
      console.log(`✓ Model: ${config.model}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n✓ Shutting down gracefully...');
  process.exit(0);
});

// Start the server
startServer().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

export default app;
