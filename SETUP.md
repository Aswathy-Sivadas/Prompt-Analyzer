# Setup Instructions for Prompt Anatomy Visualizer

## Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org
   - Verify: `node --version` and `npm --version`

2. **MongoDB** (Choose one option)
   - **Local Installation**: Download from https://www.mongodb.com/try/download/community
   - **MongoDB Atlas** (Cloud): Create a free account at https://www.mongodb.com/cloud/atlas
   
3. **OpenRouter API Key**
   - Sign up at: https://openrouter.ai
   - Get your API key from your account settings

4. **Git** (optional, for version control)
   - Download from: https://git-scm.com

## Step-by-Step Setup

### 1. Extract the Project

```bash
# Navigate to the project directory
cd prompt-anatomy-visualizer
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file from template
copy .env.example .env
# On Mac/Linux: cp .env.example .env

# Edit .env with your configuration
# Open .env in your editor and update:
# - OPENROUTER_API_KEY: Your OpenRouter API key
# - MONGODB_URI: Your MongoDB connection string
# - CORS_ORIGIN: Should be http://localhost:5173

# Verify MongoDB is running
# - If using local MongoDB: run `mongod` in another terminal
# - If using MongoDB Atlas: ensure connection string is correct

# Start backend server
npm run dev
# Backend will run on http://localhost:5000
```

### 3. Setup Frontend (in a new terminal)

```bash
# From project root
cd frontend

# Install dependencies
npm install

# Create .env.local file from template
copy .env.example .env.local
# On Mac/Linux: cp .env.example .env.local

# Start frontend development server
npm run dev
# Frontend will run on http://localhost:5173
```

### 4. Open in Browser

Open your browser and go to: `http://localhost:5173`

## Configuration Details

### MongoDB Setup

**Option A: Local MongoDB**

1. Install MongoDB Community Edition from: https://www.mongodb.com/try/download/community
2. Start MongoDB server:
   - Windows: `mongod` command or MongoDB service
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`
3. In `.env`, use: `MONGODB_URI=mongodb://localhost:27017/prompt-visualizer`

**Option B: MongoDB Atlas (Cloud)**

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Create a database user
5. Get your connection string
6. In `.env`, update `MONGODB_URI` with your connection string
   - Replace `<username>` and `<password>` with your credentials

### OpenRouter API Key

1. Go to: https://openrouter.ai
2. Sign up for a free account
3. Navigate to "Keys" section
4. Create or copy your API key
5. In `backend/.env`, set: `OPENROUTER_API_KEY=your_key_here`

## Verification Checklist

Before you start using the app, verify:

```bash
# Backend should be running
curl http://localhost:5000/api/health
# Should return: {"success":true,"message":"API is running"}

# Frontend should be accessible
# Open http://localhost:5173 in browser
```

## Common Issues & Solutions

### Issue: "OPENROUTER_API_KEY is not set"
**Solution**: Add your OpenRouter API key to `backend/.env`

### Issue: "MongoDB connection failed"
**Solution**: 
- Ensure MongoDB is running (`mongod` command)
- Check connection string in `.env`
- For Atlas, verify IP whitelist includes your computer

### Issue: "CORS error" or "Cannot reach backend"
**Solution**:
- Verify backend is running on port 5000
- Check `CORS_ORIGIN` in `backend/.env` matches frontend URL
- Verify `VITE_API_URL` in `frontend/.env.local` is correct

### Issue: "Port already in use"
**Solution**: 
- Backend: Kill process on port 5000
- Frontend: Kill process on port 5173
- Or change port in config files

### Issue: "Module not found" or build errors
**Solution**:
- Delete `node_modules` folder
- Delete package-lock.json
- Run `npm install` again

## Development Workflow

### During Development

1. Keep backend server running: `npm run dev` (in backend folder)
2. Keep frontend server running: `npm run dev` (in frontend folder)
3. Make changes to code
4. Changes auto-reload in browser (frontend) and server (backend)

### Making Changes

**Frontend Changes**: Edit files in `frontend/src/`
- Components: `frontend/src/components/`
- Pages: `frontend/src/pages/`
- Services: `frontend/src/services/`

**Backend Changes**: Edit files in `backend/src/`
- Controllers: `backend/src/controllers/`
- Routes: `backend/src/routes/`
- Services: `backend/src/services/`

## Building for Production

### Frontend Build

```bash
cd frontend
npm run build
# Creates optimized files in dist/ folder
```

### Backend Build

```bash
cd backend
npm run build
# Creates compiled JavaScript in dist/ folder
```

## Running Production Build Locally

```bash
# Backend
cd backend
npm run build
npm start

# Frontend (in another terminal)
cd frontend
npm run build
npm run preview
```

## Deployment

### Deploy Frontend

**Vercel** (Easiest):
```bash
cd frontend
npm install -g vercel
vercel
```

**Netlify**:
```bash
cd frontend
npm run build
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy Backend

**Railway or Render**:
- Push to GitHub
- Connect repository to service
- Set environment variables
- Deploy automatically

**Heroku** (if available):
```bash
heroku create
git push heroku main
```

## Stopping the Servers

### Stop Backend
- In terminal: Press `Ctrl+C`

### Stop Frontend
- In terminal: Press `Ctrl+C`

## Next Steps

1. **Analyze Prompts**: Go to Analyzer page and enter a prompt
2. **Learn**: Check the Learning Center for tips
3. **View History**: See your previous analyses
4. **Export Results**: Download analyses as PDF, JSON, or TXT

## Need Help?

1. Check the main README.md for overview
2. Check frontend/README.md for frontend details
3. Check backend/README.md for backend details
4. Review error messages in browser console
5. Check server terminal output for backend errors

## Tips for Success

1. Start with simple prompts first
2. Check that API key is valid
3. Ensure MongoDB is running
4. Use incognito/private browser if caching issues
5. Keep browser developer tools open for debugging

## Performance Tips

- If app is slow, check network tab in browser DevTools
- Verify API response times are reasonable
- Check backend logs for slow queries
- Consider using MongoDB indexes for production

---

**You're all set!** 🎉

Now go analyze some prompts and improve your prompt engineering skills!
