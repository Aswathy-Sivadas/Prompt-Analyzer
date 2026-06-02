# Prompt Anatomy Visualizer

A full-stack AI-powered application that helps users understand how AI prompts are structured by automatically analyzing prompts and visually breaking them into their components.

## Project Overview

This is a complete, production-ready full-stack application with a modern React frontend and Node.js/Express backend.

## Features

✨ **Core Features**

- AI-powered prompt analysis using OpenRouter API
- Visual breakdown of prompt anatomy (task, context, role, tone, etc.)
- Intelligent scoring system (Clarity, Specificity, Completeness, Structure)
- Automatic prompt improvement suggestions (3 versions)
- Prompt comparison with highlighting
- Analysis history and storage
- Export functionality (PDF, JSON, TXT)
- Responsive design (desktop, tablet, mobile)
- Dark/Light mode support
- Learning center with best practices

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast builds
- Tailwind CSS for styling
- Framer Motion for animations
- Recharts for visualizations
- Zustand for state management
- Axios for HTTP requests

### Backend
- Node.js with Express.js
- MongoDB for data persistence
- TypeScript for type safety
- OpenRouter API for AI analysis
- CORS and validation middleware

## Project Structure

```
prompt-anatomy-visualizer/
├── .github/
│   └── copilot-instructions.md
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   ├── context/       # State management
│   │   ├── utils/         # Utilities
│   │   ├── types/         # TypeScript types
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── README.md
├── backend/
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── models/        # MongoDB models
│   │   ├── controllers/   # Route handlers
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   ├── utils/         # Utilities
│   │   ├── types/         # TypeScript types
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud)
- OpenRouter API key

### Installation

**1. Clone/Extract the project**

```bash
cd prompt-anatomy-visualizer
```

**2. Backend Setup**

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# - Add your OpenRouter API key
# - Update MongoDB URI if needed
# - Set frontend CORS origin

# Start backend (runs on port 5000)
npm run dev
```

**3. Frontend Setup**

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Update if backend is on different port/host
# Default: http://localhost:5000/api

# Start frontend (runs on port 5173)
npm run dev
```

**4. Access the Application**

Open your browser and navigate to: `http://localhost:5173`

## Environment Configuration

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/prompt-visualizer
OPENROUTER_API_KEY=your_key_here
OPENROUTER_API_URL=https://openrouter.ai/api/v1
MODEL=liquid/lfm-2.5-1.2b-thinking:free
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Prompt Anatomy Visualizer
VITE_APP_VERSION=1.0.0
```

## Available Scripts

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript
npm start        # Start production server
npm run lint     # Run ESLint
```

## API Documentation

See [Backend README](./backend/README.md#api-endpoints) for detailed API documentation.

## Pages

1. **Home** - Landing page with feature overview
2. **Analyzer** - Main analysis interface
3. **History** - View and manage analyses
4. **Learning Center** - Tips and best practices
5. **Settings** - User preferences

## Component Architecture

### Smart Components (Connected)
- Pages with data fetching and business logic
- Connected to services and stores

### Presentational Components
- Reusable UI components
- No direct API calls
- Props-based configuration

## State Management

- **Theme**: Zustand store (`useThemeStore`)
- **Local State**: React hooks for component state
- **API State**: Custom hooks (`useAnalysis`, `useHistory`)

## Error Handling

- Request validation on both client and server
- Graceful error messages
- Error boundaries in React
- Fallback UI for failed states

## Security

- Input validation and sanitization
- Rate limiting (10 req/min per IP)
- CORS protection
- MongoDB injection prevention
- XSS protection via React

## Performance

- Code splitting with Vite
- Lazy loading for routes
- Image optimization
- CSS minification
- Request debouncing
- Efficient re-renders with React.memo

## Deployment

### Frontend Deployment

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Backend Deployment

**Heroku:**
```bash
heroku create
git push heroku main
```

**Railway/Render:**
Follow platform-specific guides

**Docker:**
See individual README files for Docker setup

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string format
- Verify firewall settings

### API Connection Errors
- Verify backend is running on correct port
- Check `VITE_API_URL` environment variable
- Review browser console for errors

### Build Errors
- Clear `node_modules`: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist .vite`
- Check TypeScript: `npx tsc --noEmit`

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Commit with clear messages
5. Create a pull request

## Code Standards

- Use TypeScript for type safety
- Write descriptive comments
- Follow ESLint rules
- Keep components focused
- Maintain consistent naming

## Performance Tips

- Analyze bundle size: `npm run build -- --analyze`
- Use React DevTools Profiler
- Monitor API response times
- Test on slow networks

## Future Enhancements

- User authentication
- Saved prompt templates
- Collaborative analysis
- More export formats
- Advanced analytics
- Multilingual support
- Mobile app

## Support

For issues and questions:
1. Check the README files in each directory
2. Review code comments
3. Check browser console for errors
4. Enable debug logging in services

## License

MIT License - See LICENSE file for details

## Version

**1.0.0** - Initial Release (June 2024)

---

**Happy Prompting!** 🚀

For more details, see [Frontend README](./frontend/README.md) and [Backend README](./backend/README.md)
