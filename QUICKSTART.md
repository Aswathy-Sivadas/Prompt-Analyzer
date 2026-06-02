# 🚀 Prompt Anatomy Visualizer - Quick Start Guide

## ✅ Project Setup Complete!

Your full-stack **Prompt Anatomy Visualizer** application is now ready to use. This guide will help you get started immediately.

## 📋 What's Been Created

### Frontend (React + Vite)
- ✓ Modern UI with Tailwind CSS
- ✓ Dark/Light mode support
- ✓ 5 main pages (Home, Analyzer, History, Learning Center, Settings)
- ✓ Reusable components library
- ✓ API integration
- ✓ Export functionality (PDF, JSON, TXT)
- ✓ Responsive design
- ✓ Smooth animations (Framer Motion)

### Backend (Node.js + Express)
- ✓ RESTful API
- ✓ MongoDB integration
- ✓ OpenRouter AI integration
- ✓ Prompt analysis service
- ✓ Middleware (validation, error handling, CORS, rate limiting)
- ✓ Learning tips endpoint
- ✓ History management

### Database
- ✓ MongoDB models configured
- ✓ Ready for local or cloud connection

## 🎯 Before You Start

### 1. Get Your API Key

**OpenRouter API Key** (Required)
- Go to: https://openrouter.ai
- Sign up (free account available)
- Get your API key from account settings
- You'll need this in the next step

### 2. Prepare MongoDB

Choose one:

**Option A: Local MongoDB**
- Download: https://www.mongodb.com/try/download/community
- Install and start MongoDB server
- Connection string: `mongodb://localhost:27017/prompt-visualizer`

**Option B: MongoDB Atlas (Cloud)**
- Go to: https://www.mongodb.com/cloud/atlas
- Create free account and cluster
- Get connection string
- Use format: `mongodb+srv://user:password@cluster.mongodb.net/prompt-visualizer`

## 🚀 Getting Started (5 Minutes)

### Step 1: Configure Backend

```bash
cd backend

# Open .env file and update these values:
# 1. OPENROUTER_API_KEY=your_key_here
# 2. MONGODB_URI=your_mongodb_connection_string
# 3. CORS_ORIGIN=http://localhost:5173 (leave as is)

# Then start backend:
npm run dev
```

✅ Backend running on: `http://localhost:5000`

### Step 2: Configure Frontend (in a NEW terminal)

```bash
cd frontend

# Frontend config is mostly ready
# The .env.local already points to backend correctly

# Start frontend:
npm run dev
```

✅ Frontend running on: `http://localhost:5173`

### Step 3: Open Application

- Open browser: `http://localhost:5173`
- Click "Get Started" or go to Analyzer
- Paste a prompt and analyze!

## 📝 Configuration Files

### Backend Configuration (backend/.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/prompt-visualizer
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxx
OPENROUTER_API_URL=https://openrouter.ai/api/v1
MODEL=liquid/lfm-2.5-1.2b-thinking:free
CORS_ORIGIN=http://localhost:5173
```

### Frontend Configuration (frontend/.env.local)

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Prompt Anatomy Visualizer
VITE_APP_VERSION=1.0.0
```

## 📱 Features to Try

1. **Analyzer Page**
   - Enter any AI prompt
   - Get instant anatomy breakdown
   - See detailed scores
   - Get improvement suggestions

2. **Comparison View**
   - See original vs improved prompt
   - Highlight additions, removals, modifications

3. **Export Results**
   - Download as PDF
   - Download as JSON
   - Download as TXT

4. **Learning Center**
   - Best practices for prompts
   - Common mistakes to avoid
   - Tips by category

5. **History**
   - All your analyses saved
   - View, reanalyze, or delete

6. **Settings**
   - Toggle dark/light mode
   - Change language (extensible)

## 🔧 Available Commands

### Frontend
```bash
cd frontend

npm run dev       # Start dev server (port 5173)
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run linter
```

### Backend
```bash
cd backend

npm run dev       # Start dev server with hot reload (port 5000)
npm run build     # Compile TypeScript to JavaScript
npm start         # Start production server
npm run lint      # Run linter
```

## 🌐 API Endpoints

All endpoints start with: `http://localhost:5000/api`

```
POST   /analyze              - Analyze a prompt
GET    /history              - Get analysis history
GET    /analysis/:id         - Get specific analysis
DELETE /analysis/:id         - Delete analysis
POST   /improvements         - Get improvement suggestions
GET    /learning-tips        - Get learning tips
GET    /health               - Health check
```

## 📚 Project Structure

```
prompt-anatomy-visualizer/
├── frontend/                 # React app
│   ├── src/components/      # Reusable UI components
│   ├── src/pages/           # 5 main pages
│   ├── src/hooks/           # Custom React hooks
│   ├── src/services/        # API communication
│   ├── src/context/         # Theme management
│   ├── src/utils/           # Helper functions
│   └── src/types/           # TypeScript types
│
├── backend/                  # Node.js API
│   ├── src/controllers/     # Route handlers
│   ├── src/routes/          # API routes
│   ├── src/services/        # Business logic
│   ├── src/models/          # MongoDB models
│   ├── src/middleware/      # Express middleware
│   ├── src/config/          # Configuration
│   ├── src/types/           # TypeScript types
│   └── src/utils/           # Helper functions
│
├── README.md                 # Main documentation
└── SETUP.md                  # Setup instructions
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000

# MongoDB not connected?
# Ensure MongoDB is running and connection string is correct
```

### Frontend won't load
```bash
# Check backend is running
curl http://localhost:5000/api/health

# Clear browser cache: Ctrl+Shift+Delete (or Cmd+Shift+Delete)
# Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R)
```

### API errors
- Check browser DevTools (F12) → Network tab
- Look for error messages
- Verify API key is valid
- Check backend terminal for logs

## 📖 Documentation

- **Main README**: `README.md` - Project overview
- **Frontend README**: `frontend/README.md` - Frontend details
- **Backend README**: `backend/README.md` - Backend details
- **Setup Guide**: `SETUP.md` - Detailed setup instructions

## 🎓 Learning Path

1. **Explore the UI** - Get familiar with the interface
2. **Analyze Prompts** - Try the main feature
3. **Check History** - See saved analyses
4. **Read Learning Center** - Understand best practices
5. **Try Exports** - Download your results
6. **Explore Code** - Review the implementation

## 🚀 Next Steps

### Immediate
- [ ] Get OpenRouter API key
- [ ] Set up MongoDB
- [ ] Configure backend .env
- [ ] Start both servers
- [ ] Open application

### Short Term
- [ ] Analyze some prompts
- [ ] Export results
- [ ] Review learning center
- [ ] Customize theme

### Long Term
- [ ] Deploy to production
- [ ] Add user authentication
- [ ] Extend with more features
- [ ] Optimize performance

## 💡 Pro Tips

1. **Keyboard Shortcuts**
   - `Ctrl+Shift+R` - Hard refresh frontend
   - `F12` - Open developer tools

2. **Better Prompts**
   - Use the Learning Center tips
   - Try analyzing your own prompts
   - Check improvement suggestions

3. **Debugging**
   - Check browser console (F12)
   - Check backend terminal output
   - Look at Network tab for API errors

4. **Performance**
   - Backend analysis might take a few seconds
   - API calls depend on OpenRouter speed
   - Monitor network in DevTools

## 📞 Support Resources

1. **Browser Console** - Check for errors (F12)
2. **Backend Terminal** - See server logs
3. **README Files** - Comprehensive documentation
4. **Code Comments** - Inline explanations

## 🎉 You're All Set!

Everything is configured and ready to go. Just:

1. Configure backend `.env` with your API key and MongoDB connection
2. Run `npm run dev` in both directories
3. Open `http://localhost:5173`
4. Start analyzing prompts!

---

**Happy Prompt Engineering!** 🚀

For detailed information, see the documentation files in the project root.
