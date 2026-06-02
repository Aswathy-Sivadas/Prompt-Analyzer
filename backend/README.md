# Prompt Anatomy Visualizer - Backend

Node.js/Express backend server for the Prompt Anatomy Visualizer application.

## Features

- RESTful API for prompt analysis
- MongoDB integration for data persistence
- OpenRouter AI integration for intelligent analysis
- Real-time prompt anatomy extraction
- Automatic scoring and improvement suggestions
- Request validation and error handling
- CORS support for frontend integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Language**: TypeScript
- **AI API**: OpenRouter (LFM 2.5 model)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file with required variables (copy from `.env.example`):

```bash
cp .env.example .env
```

3. Update `.env` with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/prompt-visualizer
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_API_URL=https://openrouter.ai/api/v1
MODEL=liquid/lfm-2.5-1.2b-thinking:free
CORS_ORIGIN=http://localhost:5173
```

## Development

Start development server with hot reload:

```bash
npm run dev
```

## Build

Build TypeScript to JavaScript:

```bash
npm run build
```

## Production

Start production server:

```bash
npm start
```

## API Endpoints

### Analysis

- **POST** `/api/analyze` - Analyze a prompt
  - Body: `{ prompt: string }`
  - Returns: Detailed analysis with components and scores

- **GET** `/api/history` - Get analysis history
  - Returns: Array of previous analyses

- **GET** `/api/analysis/:id` - Get specific analysis
  - Returns: Analysis by ID

- **DELETE** `/api/analysis/:id` - Delete analysis
  - Returns: Success message

### Improvements

- **POST** `/api/improvements` - Get improvement suggestions
  - Body: `{ prompt: string }`
  - Returns: Array of improved versions

### Learning

- **GET** `/api/learning-tips` - Get learning tips
  - Returns: Array of tips and best practices

### Health

- **GET** `/api/health` - Health check
  - Returns: Server status

## Environment Variables

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `MONGODB_URI`: MongoDB connection string
- `OPENROUTER_API_KEY`: OpenRouter API key (required)
- `OPENROUTER_API_URL`: OpenRouter API URL
- `MODEL`: AI model to use
- `CORS_ORIGIN`: Frontend URL for CORS

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Rate Limiting

Rate limiting is enabled: 10 requests per minute per IP address.

## Middleware

- **CORS**: Cross-Origin Resource Sharing
- **Validation**: Input validation and sanitization
- **Error Handler**: Global error handling
- **Logger**: Request logging
- **Rate Limit**: Request rate limiting

## Database Schema

### Analysis Collection

```typescript
{
  id: string,
  originalPrompt: string,
  timestamp: Date,
  anatomyComponents: [{
    type: string,
    content: string,
    description: string,
    suggestion: string,
    confidence: number,
    color: string
  }],
  scores: {
    clarity: number,
    specificity: number,
    completeness: number,
    structure: number,
    overall: number
  },
  improvements: [{
    id: string,
    title: string,
    description: string,
    improvedPrompt: string,
    score: number
  }],
  comparison: {
    original: string,
    improved: string,
    additions: string[],
    removals: string[],
    modifications: string[]
  }
}
```

## Deployment

### On Linux/Mac

```bash
# Build
npm run build

# Start
npm start
```

### With PM2

```bash
npm install -g pm2
pm2 start dist/index.js --name "prompt-visualizer"
```

### With Docker

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t prompt-visualizer .
docker run -p 5000:5000 --env-file .env prompt-visualizer
```

## Troubleshooting

### MongoDB Connection Failed

- Ensure MongoDB is running locally or URI is correct
- Check firewall settings
- Verify connection string format

### OpenRouter API Errors

- Verify API key is valid
- Check rate limits
- Ensure model name is correct

### CORS Issues

- Check `CORS_ORIGIN` matches frontend URL
- Verify frontend is making requests to correct API URL

## Contributing

Follow these guidelines:

- Use TypeScript for type safety
- Follow ESLint rules
- Add comments for complex logic
- Write error-safe code
- Test API endpoints before committing

## License

MIT
