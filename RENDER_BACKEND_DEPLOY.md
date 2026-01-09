# 🚀 Deploy Backend to Render - Step by Step Guide

## Quick Steps

### Step 1: Prepare Your Repository
✅ Your code is already on GitHub: `https://github.com/hrithick05/faculty2.git`

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up/Login (you can use GitHub to sign in)

### Step 3: Deploy Backend

1. **Click "New +" → "Web Service"**

2. **Connect Repository:**
   - Select "Public Git repository"
   - Connect to: `hrithick05/faculty2`
   - Or paste: `https://github.com/hrithick05/faculty2`

3. **Configure Service:**
   - **Name**: `faculty-dashboard-backend` (or any name you prefer)
   - **Region**: Choose closest to you (e.g., Singapore, US East)
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or `faculty_dashboard-3497af2ea4e55f8bc93094437a5fa56365207e49/faculty_dashboard-3497af2ea4e55f8bc93094437a5fa56365207e49` if your code is in a subfolder)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run backend:start`
   - **Plan**: Free (or choose paid for better performance)

4. **Set Environment Variables:**
   Click "Advanced" → "Add Environment Variable" and add:
   
   ```
   NODE_ENV = production
   VITE_SUPABASE_URL = https://yfcukflinfinmjvllwin.supabase.co
   VITE_SUPABASE_SERVICE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmY3VrZmxpbmZpbm1qdmxsd2luIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDM2NjM3MiwiZXhwIjoyMDY5OTQyMzcyfQ.i8KN0rAkbLXo7a1U7jecwwIhEoM1s9u0h2onKwkqDTA
   ```
   
   **Note:** 
   - `PORT` is automatically set by Render (don't add it manually)
   - Keep your service key secret - never share it publicly

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for build to complete (5-10 minutes first time)
   - Your backend will be live at: `https://faculty-dashboard-backend.onrender.com`

### Step 4: Update CORS (Important!)

After deployment, update your backend CORS settings:

1. Go to your Render service dashboard
2. Copy your backend URL (e.g., `https://faculty-dashboard-backend.onrender.com`)
3. Update `server/server.js` CORS configuration:

```javascript
const allowedOrigins = NODE_ENV === 'production' 
  ? [
      'https://your-frontend-domain.com',  // Add your frontend URL here
      'https://faculty-dashboard-backend.onrender.com',  // Your backend URL
      // ... other production origins
    ]
  : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8080', 'http://localhost:8081'];
```

4. Commit and push the changes:
```bash
git add server/server.js
git commit -m "Update CORS for Render deployment"
git push origin main
```

Render will automatically redeploy.

### Step 5: Test Your Backend

1. **Health Check:**
   ```
   https://faculty-dashboard-backend.onrender.com/api/health
   ```
   Should return: `{"status":"OK","message":"Achievement System Backend is running"}`

2. **Test Code Version:**
   ```
   https://faculty-dashboard-backend.onrender.com/api/test-code-version
   ```

## Environment Variables Reference

| Variable | Value | Required |
|----------|-------|----------|
| `NODE_ENV` | `production` | Yes |
| `VITE_SUPABASE_URL` | Your Supabase URL | Yes |
| `VITE_SUPABASE_SERVICE_KEY` | Your Supabase service key | Yes |
| `PORT` | Auto-set by Render | No (don't set manually) |

## Important Notes

### Free Tier Limitations:
- ⚠️ **Spins down after 15 minutes of inactivity**
- ⚠️ **First request after spin-down takes 30-60 seconds** (cold start)
- ⚠️ **Limited to 750 hours/month** (enough for most use cases)

### To Keep Service Active:
- Use a monitoring service (UptimeRobot, etc.) to ping your backend every 10 minutes
- Or upgrade to paid plan ($7/month) for always-on service

### Troubleshooting:

**Build Fails:**
- Check build logs in Render dashboard
- Ensure `package.json` has correct scripts
- Verify Node.js version (Render uses latest LTS)

**Service Won't Start:**
- Check start command: `npm run backend:start`
- Verify environment variables are set
- Check logs in Render dashboard

**CORS Errors:**
- Make sure frontend URL is in CORS allowed origins
- Update `server/server.js` CORS configuration
- Redeploy after changes

## Quick Commands Reference

```bash
# View logs
# Go to Render dashboard → Your service → Logs

# Manual deploy
# Push to GitHub → Render auto-deploys

# Update environment variables
# Render dashboard → Environment → Edit
```

## Next Steps

After backend is deployed:
1. ✅ Test all API endpoints
2. ✅ Update frontend to use backend URL
3. ✅ Deploy frontend (Vercel/Netlify/Render Static)
4. ✅ Update CORS with frontend URL

## Support

- Render Docs: https://render.com/docs
- Render Status: https://status.render.com
- Your Backend URL: Check Render dashboard after deployment

