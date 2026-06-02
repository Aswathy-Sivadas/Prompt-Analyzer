import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/prompt-visualizer',
  openrouterApiKey: process.env.OPENROUTER_API_KEY || '',
  openrouterApiUrl: process.env.OPENROUTER_API_URL || 'https://openrouter.ai/api/v1',
  model: process.env.MODEL || 'liquid/lfm-2.5-1.2b-thinking:free',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};

// Validate required environment variables
const requiredEnvVars = ['OPENROUTER_API_KEY'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.warn(`Warning: ${envVar} is not set`);
  }
}
