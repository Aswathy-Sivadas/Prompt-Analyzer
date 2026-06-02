# Prompt Anatomy Visualizer - Project Guidelines

## Project Overview
Full-stack AI prompt analysis application with React frontend and Node.js/Express backend.

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Recharts
- **Backend**: Node.js, Express.js, MongoDB
- **AI Integration**: OpenAI API (with OpenRouter fallback)
- **Styling**: Glassmorphism design with dark/light mode

## Key Features
1. Prompt input and analysis
2. Visual anatomy breakdown with colored cards
3. Scoring system (Clarity, Specificity, Completeness, Structure)
4. Prompt improvement suggestions (3 versions)
5. Prompt comparison with highlighting
6. Educational content and tips
7. History management and storage
8. Export to PDF, JSON, TXT
9. Responsive design (desktop, tablet, mobile)

## Development Setup
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

## Environment Variables
Create `.env` files:
- `frontend/.env.local`
- `backend/.env`

## Running the Project
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

## Code Standards
- Use TypeScript for type safety
- Reusable React components
- MVC architecture in backend
- Proper error handling
- Loading states on all async operations
- Form validation before submission
- Comments for complex logic
