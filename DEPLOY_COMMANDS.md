# Deployment Commands

## Frontend Deployment to Vercel

### Option 1: Deploy using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Or deploy to preview
vercel
```

### Option 2: Deploy using Git (Automatic)

1. Push your code to GitHub (already done)
2. Connect your GitHub repo to Vercel:
   - Go to https://vercel.com/dashboard
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite and deploy automatically

### Build Command (for Vercel)
```bash
npm run build
```

### Output Directory
```
dist
```

### Environment Variables (Set in Vercel Dashboard)
```
VITE_SUPABASE_URL=https://yfcukflinfinmjvllwin.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=https://faculty2.onrender.com
```

## Backend Deployment to Render

The backend is already deployed on Render and will auto-deploy when you push to GitHub.

### Manual Deployment Commands (if needed)

```bash
# Check Render deployment status
# Go to: https://dashboard.render.com

# To trigger manual redeploy:
# 1. Go to Render dashboard
# 2. Select your backend service
# 3. Click "Manual Deploy" → "Deploy latest commit"
```

### Backend Environment Variables (Set in Render Dashboard)
```
NODE_ENV=production
VITE_SUPABASE_URL=https://yfcukflinfinmjvllwin.supabase.co
VITE_SUPABASE_SERVICE_KEY=your_supabase_service_role_key
PORT=5000 (auto-set by Render)
```

## Quick Deploy Script

Create a file `deploy.sh` and run:

```bash
#!/bin/bash
echo "🚀 Deploying to Vercel..."

# Build frontend
npm run build

# Deploy to Vercel
vercel --prod

echo "✅ Deployment complete!"
```

## Verify Deployment

### Check Frontend
```bash
# Visit your Vercel deployment URL
# Example: https://faculty2-ui8l.vercel.app
```

### Check Backend
```bash
# Test backend health
curl https://faculty2.onrender.com/api/health

# Or visit in browser
# https://faculty2.onrender.com/api/health
```

## Troubleshooting

### If CORS errors persist:
1. Check Render logs to ensure backend deployed successfully
2. Verify backend is running: `https://faculty2.onrender.com/api/health`
3. Wait 2-5 minutes after pushing code for Render to deploy
4. Check Vercel deployment logs for any build errors

### If build fails:
```bash
# Install dependencies
npm install

# Build locally to test
npm run build

# Check for errors
npm run lint
```

