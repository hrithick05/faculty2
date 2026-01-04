# 🔧 Quick Fix: "Failed to fetch" Upload Error

## Problem
You're seeing "Failed to upload PDF: Failed to fetch" when trying to upload achievements.

## Root Causes
1. **Backend not running** - Express 5.x compatibility issue (now fixed)
2. **CORS not allowing port 8081** - Frontend running on 8081 but backend only allowed 8080 (now fixed)

## ✅ Solution Steps

### Step 1: Stop Current Processes
Press `Ctrl+C` in your terminal to stop the current `npm run dev:full` process.

### Step 2: Reinstall Dependencies (Express 4 Fix)
```bash
# Remove old dependencies
rm -rf node_modules package-lock.json

# Reinstall with Express 4 (fixed version)
npm install
```

**Windows PowerShell:**
```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### Step 3: Restart Both Servers
```bash
npm run dev:full
```

### Step 4: Verify Backend is Running
You should see in the terminal:
```
🚀 Server running on port 5000
✅ Achievement System initialized successfully!
```

### Step 5: Test Upload Again
- Go to your dashboard: `http://localhost:8081` (or whatever port Vite shows)
- Try uploading a PDF again
- The error should be gone!

---

## 🔍 Verification Checklist

- [ ] Backend shows "Server running on port 5000"
- [ ] No Express 5 errors in terminal
- [ ] Frontend accessible (check browser console for errors)
- [ ] Can see backend health at: `http://localhost:5000/api/health`

---

## 🚨 If Still Not Working

### Check Backend Status
Open in browser: `http://localhost:5000/api/health`

Should return:
```json
{
  "status": "OK",
  "message": "Achievement System Backend is running"
}
```

### Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for CORS errors or network errors
4. Check Network tab to see if request reaches backend

### Check Terminal Logs
Look for:
- ✅ "CORS allowed for origin: http://localhost:8081"
- ✅ "PDF upload request received"
- ❌ Any error messages

---

## 📝 What Was Fixed

1. **Express Version**: Downgraded from 5.1.0 → 4.18.2 (stable)
2. **CORS Settings**: Added port 8081 to allowed origins
3. **Backend Route**: `/api/achievements/submit` is properly configured

---

## 💡 Alternative: Use Port 8080

If you prefer to use port 8080 (default), you can:

1. Stop any process using port 8080
2. The frontend will automatically use 8080 if available
3. CORS already allows 8080

---

**After following these steps, your uploads should work! 🎉**

