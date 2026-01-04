# 🚀 START HERE - Quick Setup Guide

## ⚡ Fastest Way to Run Everything

### Option 1: One Command (Recommended)
```bash
npm start
```
This will:
- ✅ Check if .env file exists
- ✅ Verify environment variables
- ✅ Install dependencies if needed
- ✅ Start both frontend and backend

### Option 2: Direct Start
```bash
npm run dev:full
```
Starts both servers directly (assumes everything is configured).

---

## 📋 Prerequisites Checklist

Before running, make sure you have:

- [ ] **Node.js 18+** installed
  ```bash
  node --version  # Should show v18.x.x or higher
  ```

- [ ] **.env file** with Supabase credentials
  ```bash
  # Create .env file in project root
  VITE_SUPABASE_URL=your_supabase_url
  VITE_SUPABASE_ANON_KEY=your_anon_key
  VITE_SUPABASE_SERVICE_KEY=your_service_key
  PORT=5000
  ```

- [ ] **Dependencies installed**
  ```bash
  npm install
  ```

---

## 🎯 Step-by-Step First Time Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_SUPABASE_SERVICE_KEY=your_service_role_key_here
PORT=5000
NODE_ENV=development
```

**Where to get these:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy the values

### Step 3: Setup Database (First Time Only)
```bash
# Run database migrations
npm run migrate

# Setup storage bucket
npm run setup:storage
```

### Step 4: Start Everything
```bash
npm start
```

Or:
```bash
npm run dev:full
```

---

## ✅ What You Should See

### Terminal Output:
```
🚀 Faculty Dashboard - Development Startup
==========================================

✅ .env file found
✅ All required environment variables are set
✅ Dependencies installed

🚀 Starting Frontend + Backend servers...

📝 Frontend: http://localhost:8080 (or next available port)
📝 Backend:  http://localhost:5000
📝 Press Ctrl+C to stop both servers

========================================

[FRONTEND] VITE v5.x.x ready in XXX ms
[FRONTEND] ➜  Local:   http://localhost:8080/

[BACKEND] 🚀 Server running on port 5000
[BACKEND] ✅ Achievement System initialized successfully!
```

### Browser:
- Open: `http://localhost:8080` (or the port shown in terminal)
- You should see the login page

---

## 🔧 Troubleshooting

### "Port already in use"
**Solution:**
- Kill the process using the port, or
- Change port in `vite.config.ts` (frontend) or `.env` (backend)

### "Missing environment variables"
**Solution:**
- Create `.env` file with all required variables
- See Step 2 above

### "Failed to fetch" when uploading
**Solution:**
1. Make sure backend is running (check terminal)
2. Verify backend health: `http://localhost:5000/api/health`
3. Check CORS settings in `server/server.js`

### Backend crashes with Express error
**Solution:**
```bash
# Reinstall dependencies (Express 4 is now used)
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Smart startup with checks |
| `npm run dev:full` | Start both servers |
| `npm run dev` | Frontend only |
| `npm run backend` | Backend only |
| `npm run migrate` | Setup database |
| `npm run setup:storage` | Setup storage bucket |

---

## 🎉 Success Indicators

✅ **Backend Running:**
- Terminal shows: `🚀 Server running on port 5000`
- Browser: `http://localhost:5000/api/health` returns JSON

✅ **Frontend Running:**
- Terminal shows: `VITE ready`
- Browser: `http://localhost:8080` shows login page

✅ **Both Working:**
- Can login to dashboard
- Can upload PDFs without "Failed to fetch" error

---

## 📖 More Help

- **Detailed Guide**: See `RUN_GUIDE.md`
- **Scripts Reference**: See `SCRIPTS_REFERENCE.md`
- **Upload Error Fix**: See `QUICK_FIX_UPLOAD_ERROR.md`

---

**Ready to go? Run `npm start` now! 🚀**

