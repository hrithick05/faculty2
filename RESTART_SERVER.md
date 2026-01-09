# 🔄 How to Restart the Server

## The Issue
The frontend dev server crashed because `tailwind.config.js` was using CommonJS syntax in an ES module project. **This has been fixed!**

## ✅ Solution: Restart the Server

### Step 1: Stop Current Processes
If you have a terminal running the dev server:
- Press `Ctrl+C` to stop it
- Wait for it to fully stop

### Step 2: Restart Everything
Run one of these commands:

**Option A: Smart Startup (Recommended)**
```bash
npm start
```

**Option B: Direct Start**
```bash
npm run dev:full
```

### Step 3: Wait for Success
You should see:
```
[FRONTEND] VITE ready in XXX ms
[FRONTEND] ➜  Local:   http://localhost:8080/

[BACKEND] 🚀 Server running on port 5000
```

### Step 4: Open Browser
- Go to: `http://localhost:8080` (or the port shown in terminal)
- The connection errors should be gone!

## 🔍 If Port 8080 is Busy
Vite will automatically try the next available port (8081, 8082, etc.)
- Check the terminal output for the actual port
- Use that port in your browser

## ❌ Still Getting Errors?

1. **Kill all Node processes:**
   ```powershell
   # Windows PowerShell
   Get-Process -Name node | Stop-Process -Force
   ```

2. **Clear cache and restart:**
   ```bash
   npm run dev:full
   ```

3. **Check if ports are free:**
   - Frontend should be on 8080 (or next available)
   - Backend should be on 5000

## ✅ What Was Fixed
- ✅ `tailwind.config.js` converted from CommonJS to ES modules
- ✅ Server should now start without `ReferenceError: module is not defined`

