# 🔐 Environment Variables Setup Guide

## Quick Setup

1. **Copy the example file:**
   ```bash
   # Windows PowerShell
   Copy-Item .env.example .env
   
   # Or manually create .env file
   ```

2. **Edit `.env` file** and replace the placeholder values with your actual Supabase credentials

3. **Get your Supabase credentials:**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project
   - Go to **Settings** → **API**
   - Copy the values

## Required Environment Variables

### 1. VITE_SUPABASE_URL
- **What it is:** Your Supabase project URL
- **Example:** `https://abcdefghijklmnop.supabase.co`
- **Where to find:** Supabase Dashboard → Settings → API → Project URL

### 2. VITE_SUPABASE_ANON_KEY
- **What it is:** Supabase anonymous/public key (safe for frontend)
- **Example:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ...`
- **Where to find:** Supabase Dashboard → Settings → API → anon public key

### 3. VITE_SUPABASE_SERVICE_KEY
- **What it is:** Supabase service role key (SECRET - backend only!)
- **⚠️ WARNING:** Never expose this in frontend code!
- **Example:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE2MjM5MDIyLCJleHAiOjE5MzE4MTUwMjJ9...`
- **Where to find:** Supabase Dashboard → Settings → API → service_role secret key

## Optional Environment Variables

### PORT
- **Default:** `5000`
- **What it does:** Sets the backend server port
- **Change if:** Port 5000 is already in use

### NODE_ENV
- **Default:** `development`
- **Options:** `development` | `production`
- **What it does:** Sets the application environment

### VITE_API_URL
- **Default:** Not set (uses relative URLs)
- **What it does:** Sets the backend API URL for frontend
- **Use when:** Backend is deployed separately from frontend
- **Example:** `http://localhost:5000` (development) or `https://your-backend.com` (production)

## Example .env File

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Backend Configuration
PORT=5000
NODE_ENV=development

# Optional: Frontend API URL
# VITE_API_URL=http://localhost:5000
```

## Step-by-Step Setup

### Step 1: Get Supabase Credentials

1. Visit [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in or create an account
3. Create a new project or select an existing one
4. Wait for the project to finish setting up (takes 1-2 minutes)
5. Go to **Settings** (⚙️ icon in left sidebar)
6. Click on **API** in the settings menu
7. You'll see three important values:
   - **Project URL** → This is your `VITE_SUPABASE_URL`
   - **anon public** key → This is your `VITE_SUPABASE_ANON_KEY`
   - **service_role secret** key → This is your `VITE_SUPABASE_SERVICE_KEY`

### Step 2: Create .env File

**Option A: Copy from example (Recommended)**
```bash
# Windows
Copy-Item .env.example .env

# Mac/Linux
cp .env.example .env
```

**Option B: Create manually**
1. Create a new file named `.env` in the project root
2. Copy the content from `.env.example`
3. Replace all `your_...` values with your actual credentials

### Step 3: Fill in Your Credentials

Open `.env` file and replace:
- `your_supabase_project_url_here` → Your actual Supabase URL
- `your_supabase_anon_key_here` → Your actual anon key
- `your_supabase_service_role_key_here` → Your actual service role key

### Step 4: Verify Setup

Run the startup script to verify:
```bash
npm start
```

The script will check if all required environment variables are set correctly.

## Security Best Practices

✅ **DO:**
- Keep `.env` file local only
- Use `VITE_SUPABASE_ANON_KEY` in frontend (it's safe)
- Use `VITE_SUPABASE_SERVICE_KEY` only in backend
- Add `.env` to `.gitignore` (already done)

❌ **DON'T:**
- Commit `.env` file to git
- Share `service_role` key publicly
- Use `service_role` key in frontend code
- Hardcode credentials in source code
- Share your `.env` file with others

## Troubleshooting

### Error: "Missing environment variables"
- **Solution:** Make sure all three Supabase variables are set in `.env` file
- **Check:** No empty values or `your_...` placeholders

### Error: "Port 5000 is already in use"
- **Solution:** Change `PORT=5000` to a different port (e.g., `PORT=5001`)
- **Or:** Stop the process using port 5000

### Error: "Invalid Supabase URL"
- **Solution:** Make sure `VITE_SUPABASE_URL` starts with `https://` and ends with `.supabase.co`
- **Check:** No trailing slashes in the URL

### Frontend can't connect to backend
- **Solution:** Make sure `VITE_API_URL` is set correctly (if backend is on different domain)
- **Or:** Use relative URLs (leave `VITE_API_URL` commented out)

## Need Help?

If you're having trouble:
1. Check that all three Supabase variables are set
2. Verify the credentials are correct (no extra spaces)
3. Make sure `.env` file is in the project root directory
4. Restart the server after making changes

