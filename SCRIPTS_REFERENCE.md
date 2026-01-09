# 📜 NPM Scripts Reference Guide

This document explains all available npm scripts in the project.

## 🎯 Quick Start Commands

### ⭐ **RECOMMENDED: Run Everything**
```bash
npm run dev:full
```
- Runs both frontend (port 8080) and backend (port 5000) simultaneously
- Auto-reloads on file changes
- Best for development

---

## 📱 Frontend Development Scripts

### `npm run dev`
- **What it does**: Starts Vite development server
- **Port**: 8080 (configured in `vite.config.ts`)
- **Features**: Hot Module Replacement (HMR), fast refresh
- **Use when**: You only need to work on frontend

### `npm run build`
- **What it does**: Builds frontend for production
- **Output**: `dist/` folder
- **Use when**: Preparing for deployment

### `npm run build:dev`
- **What it does**: Builds with development mode
- **Use when**: Testing production build locally

### `npm run preview`
- **What it does**: Preview the production build locally
- **Use when**: Testing built files before deployment

### `npm run lint`
- **What it does**: Runs ESLint to check code quality
- **Use when**: Before committing code

---

## 🔧 Backend Development Scripts

### `npm run backend`
- **What it does**: Starts Express backend with nodemon (auto-reload)
- **Port**: 5000 (or PORT from .env)
- **Features**: Auto-restarts on file changes
- **Use when**: Working on backend only

### `npm run backend:start`
- **What it does**: Starts Express backend without auto-reload
- **Use when**: Production-like testing without nodemon

### `npm run dev:full` ⭐ **RECOMMENDED**
- **What it does**: Runs both frontend AND backend together
- **Frontend**: Port 8080
- **Backend**: Port 5000
- **Features**: Both auto-reload on changes
- **Use when**: Full-stack development

---

## 🗄️ Database & Storage Setup Scripts

### `npm run migrate`
- **What it does**: Runs database migrations
- **Creates**: Achievement tables in Supabase
- **Use when**: First time setup or after pulling new migrations
- **Note**: Requires `VITE_SUPABASE_SERVICE_KEY` in .env

### `npm run setup:storage`
- **What it does**: Creates Supabase storage bucket for PDFs
- **Bucket name**: `achievement-pdfs`
- **Use when**: First time setup
- **Note**: Requires `VITE_SUPABASE_SERVICE_KEY` in .env

### `npm run setup:achievements`
- **What it does**: Sets up complete achievement system
- **Includes**: Tables + storage bucket
- **Use when**: Complete first-time setup
- **Note**: Most comprehensive setup script

### `npm run check:achievements`
- **What it does**: Checks if achievement tables exist
- **Use when**: Verifying setup status

### `npm run create:achievements`
- **What it does**: Creates achievement tables using service role
- **Use when**: Other setup methods fail

### `npm run create:everything`
- **What it does**: Creates all tables and storage buckets
- **Use when**: Complete fresh setup

---

## 🚀 Production Scripts (PM2)

### `npm run start:prod`
- **What it does**: Starts backend with PM2 in production mode
- **Requires**: PM2 installed globally (`npm install -g pm2`)
- **Use when**: Deploying to production server

### `npm run stop:prod`
- **What it does**: Stops PM2 process
- **Use when**: Stopping production server

### `npm run restart:prod`
- **What it does**: Restarts PM2 process
- **Use when**: After code updates in production

### `npm run logs:prod`
- **What it does**: Views PM2 logs
- **Use when**: Debugging production issues

---

## 📦 Deployment Scripts

### `npm run deploy:frontend`
- **What it does**: Builds frontend for deployment
- **Output**: `dist/` folder ready for Vercel/Netlify
- **Use when**: Deploying frontend

### `npm run deploy:backend`
- **What it does**: Deploys backend with PM2
- **Use when**: Deploying backend to server

---

## 🎮 Special Scripts

### `npm run start:achievements`
- **What it does**: Sets up achievement system then starts backend
- **Use when**: First time running the backend
- **Note**: Combines setup + start in one command

---

## 📋 Typical Workflow

### First Time Setup:
```bash
# 1. Install dependencies
npm install

# 2. Create .env file with Supabase credentials

# 3. Setup database and storage
npm run migrate
npm run setup:storage

# 4. Start development
npm run dev:full
```

### Daily Development:
```bash
# Just run this one command
npm run dev:full
```

### Before Committing:
```bash
# Check code quality
npm run lint

# Build to verify no errors
npm run build
```

### Production Deployment:
```bash
# Frontend
npm run deploy:frontend
# Then upload dist/ folder to Vercel/Netlify

# Backend
npm run deploy:backend
# Or use PM2 directly
```

---

## 🔍 Script Dependencies

### Required Environment Variables:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_SUPABASE_SERVICE_KEY` - Supabase service role key (for backend)

### Required Global Packages:
- `pm2` - For production scripts (`npm install -g pm2`)

---

## 💡 Tips

1. **Use `npm run dev:full`** for development - it's the easiest
2. **Check `.env` file** if scripts fail with "missing environment variables"
3. **Run `npm run migrate`** after pulling new code that includes migrations
4. **Use `npm run lint`** before committing to catch errors early
5. **Check `RUN_GUIDE.md`** for detailed setup instructions

---

## 🚨 Common Issues

### "Port already in use"
- Change port in `vite.config.ts` (frontend) or `.env` (backend)

### "Missing environment variables"
- Create `.env` file with required Supabase keys

### "Table does not exist"
- Run `npm run migrate` to create tables

### "Storage bucket not found"
- Run `npm run setup:storage` to create bucket

---

**For more details, see `RUN_GUIDE.md`**

