# Prompt Anatomy Visualizer - Frontend

React/Vite frontend for the Prompt Anatomy Visualizer application.

## Features

- Modern, responsive UI with glassmorphism design
- Dark/Light mode support
- Real-time prompt analysis visualization
- Interactive anatomy component cards
- Detailed scoring system with progress bars
- Prompt improvement suggestions
- Prompt comparison with highlighting
- Learning center with tips and best practices
- Analysis history management
- Export functionality (PDF, JSON, TXT)
- Smooth animations and transitions

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Language**: TypeScript

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` file (copy from `.env.example`):

```bash
cp .env.example .env.local
```

3. Update `.env.local` with your configuration:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Prompt Anatomy Visualizer
VITE_APP_VERSION=1.0.0
```

## Development

Start development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

Build for production:

```bash
npm run build
```

## Preview

Preview production build locally:

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── context/          # Context and state management
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Available Pages

1. **Home** (`/`) - Landing page with feature overview
2. **Analyzer** (`/analyzer`) - Main prompt analysis interface
3. **History** (`/history`) - View and manage previous analyses
4. **Learning Center** (`/learning`) - Tips and best practices
5. **Settings** (`/settings`) - User preferences and configuration

## Components

### Navigation
- `Navbar` - Top navigation bar with theme toggle
- `Sidebar` - Side navigation menu

### Display Components
- `ScoreCard` - Individual score display with progress
- `AnatomyCard` - Prompt component card with details
- `PromptComparisonView` - Side-by-side prompt comparison

### Form Components
- `Input` - Text input field
- `Textarea` - Multi-line text input
- `Button` - Reusable button with variants
- `Modal` - Dialog/modal component
- `Tabs` - Tabbed interface

### Feedback Components
- `LoadingSpinner` - Loading indicator
- `LoadingSkeleton` - Content skeleton
- `ErrorMessage` - Error notification
- `SuccessMessage` - Success notification

## Hooks

- `useAnalysis()` - Prompt analysis logic
- `useHistory()` - Analysis history management

## Services

- `apiService` - Backend API communication
- `exportService` - Export functionality (PDF, JSON, TXT)

## State Management

Using Zustand for global state:
- `useThemeStore` - Dark/Light mode management

## API Integration

The frontend communicates with the backend via REST API:

```
Base URL: http://localhost:5000/api

Endpoints:
- POST /analyze - Analyze a prompt
- GET /history - Get analysis history
- GET /analysis/:id - Get specific analysis
- DELETE /analysis/:id - Delete analysis
- POST /improvements - Get improvements
- GET /learning-tips - Get learning tips
```

## Styling

The project uses Tailwind CSS with custom configuration:

- Glassmorphism design system
- Custom gradient colors
- Responsive breakpoints
- Dark mode support via `dark` class

## Animations

Framer Motion provides smooth animations:

- Page transitions
- Card animations
- Loading animations
- Button interactions

## Environment Variables

- `VITE_API_URL` - Backend API URL
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version

## Development Workflow

1. Create a new branch for features
2. Make changes and test locally
3. Ensure no TypeScript errors
4. Commit and push changes
5. Create pull request

## Building for Production

```bash
# Install dependencies
npm install

# Build
npm run build

# The dist/ folder contains production-ready files
```

## Deployment

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Docker

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build and run:

```bash
docker build -t prompt-visualizer-frontend .
docker run -p 3000:3000 prompt-visualizer-frontend
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Tree-shaking enabled
- Code splitting for routes
- Image optimization
- CSS minification
- JavaScript minification and compression

## Troubleshooting

### API Connection Issues

- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `.env.local`
- Check browser console for error messages

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`
- Check TypeScript errors: `npx tsc --noEmit`

### Theme Not Persisting

- Check localStorage permissions in browser
- Clear browser cache and cookies

## Contributing

Follow these guidelines:

- Use functional components with hooks
- Keep components small and focused
- Use TypeScript for type safety
- Add comments for complex logic
- Test on multiple screen sizes

## License

MIT
