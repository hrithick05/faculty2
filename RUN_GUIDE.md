# 🚀 Faculty Dashboard - Complete Run Guide

## 📋 Project Overview

This is a **Faculty Achievement Management System** built with:
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express + Supabase
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage (for PDF uploads)

---

## 🎯 Quick Start (Recommended)

### ⚡ Fastest Way (One Command)
```bash
npm start
```
This smart startup script will:
- Check for .env file
- Verify environment variables
- Install dependencies if needed
- Start both frontend and backend

### Manual Setup

### Step 1: Install Dependencies
```bash
# Navigate to project directory
cd faculty_dashboard-3497af2ea4e55f8bc93094437a5fa56365207e49

# Install all dependencies
npm install
```

### Step 2: Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# Backend Configuration (optional)
PORT=5000
NODE_ENV=development
```

**Where to find these values:**
- Go to your Supabase Dashboard → Project Settings → API
- Copy the Project URL → `VITE_SUPABASE_URL`
- Copy the `anon` `public` key → `VITE_SUPABASE_ANON_KEY`
- Copy the `service_role` `secret` key → `VITE_SUPABASE_SERVICE_KEY`

### Step 3: Setup Database & Storage
```bash
# Option 1: Run migration script (recommended)
npm run migrate

# Option 2: Setup storage bucket
npm run setup:storage

# Option 3: Setup achievement system
npm run setup:achievements
```

### Step 4: Run the Application

**Option A: Run Frontend Only (Development)**
```bash
npm run dev
```
- Frontend will run on: `http://localhost:8080` (or `http://localhost:5173`)
- Backend API calls will fail unless backend is running separately

**Option B: Run Backend Only**
```bash
# With auto-reload (nodemon)
npm run backend

# Without auto-reload
npm run backend:start
```
- Backend will run on: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

**Option C: Run Both Frontend + Backend (Recommended)**
```bash
npm run dev:full
```
- Frontend: `http://localhost:8080`
- Backend: `http://localhost:5000`
- Both run simultaneously with auto-reload

---

## 📝 Available Scripts Explained

### Development Scripts
| Script | Description | Port |
|--------|-------------|------|
| `npm run dev` | Start Vite dev server (frontend only) | 8080 |
| `npm run backend` | Start Express server with nodemon | 5000 |
| `npm run backend:start` | Start Express server without nodemon | 5000 |
| `npm run dev:full` | **Run both frontend + backend together** | 8080 + 5000 |
| `npm run preview` | Preview production build | 4173 |

### Database & Setup Scripts
| Script | Description |
|--------|-------------|
| `npm run migrate` | Run database migrations |
| `npm run setup:storage` | Create Supabase storage bucket |
| `npm run setup:achievements` | Setup achievement system tables |
| `npm run check:achievements` | Check if achievement tables exist |
| `npm run create:achievements` | Create achievement tables with service role |
| `npm run create:everything` | Create all tables and storage |

### Production Scripts
| Script | Description |
|--------|-------------|
| `npm run build` | Build frontend for production |
| `npm run build:dev` | Build with development mode |
| `npm run start:prod` | Start with PM2 (production) |
| `npm run stop:prod` | Stop PM2 process |
| `npm run restart:prod` | Restart PM2 process |
| `npm run logs:prod` | View PM2 logs |

---

## 🗄️ Database Setup

### Manual Database Setup (If scripts fail)

1. **Go to Supabase Dashboard** → SQL Editor

2. **Run this SQL to create achievement_submissions table:**
```sql
CREATE TABLE IF NOT EXISTS achievement_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  faculty_id TEXT NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN (
    'research_dev',
    'publication',
    'innovation_patents',
    'student_engagement',
    'professional_dev',
    'industry_others'
  )),
  submission_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  pdf_url TEXT NOT NULL,
  submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by TEXT REFERENCES faculty(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_notes TEXT,
  achievement_value INTEGER NOT NULL DEFAULT 1,
  academic_year TEXT,
  semester TEXT
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_achievement_submissions_faculty_id ON achievement_submissions(faculty_id);
CREATE INDEX IF NOT EXISTS idx_achievement_submissions_category ON achievement_submissions(category);
CREATE INDEX IF NOT EXISTS idx_achievement_submissions_status ON achievement_submissions(status);
```

3. **Create Storage Bucket:**
   - Go to Supabase Dashboard → Storage
   - Click "Create a new bucket"
   - Name: `achievement-pdfs`
   - Make it **Public**
   - Click "Create bucket"

---

## 🔧 Backend API Endpoints

### Health & Status
- `GET /api/health` - Health check
- `GET /api/health/comprehensive` - Detailed health status
- `GET /api/test-code-version` - Verify server code version

### Faculty Management
- `GET /api/faculty` - Get all faculty members
- `GET /api/faculty/:id` - Get specific faculty member
- `GET /api/faculty/list` - List all faculty (debug)
- `POST /api/faculty/auth` - Faculty authentication
- `POST /api/faculty/change-password` - Change password
- `POST /api/faculty/change-faculty-id` - Change faculty ID
- `POST /api/faculty/delete-details` - HOD: Reset faculty details

### Achievement Submissions
- `POST /api/achievements/submit` - Submit achievement with PDF
- `GET /api/achievements/all` - Get all submissions (HOD only)
- `GET /api/achievements/pending-count` - Get pending count
- `POST /api/achievements/review` - Approve/reject submission (HOD)

### Notifications
- `GET /api/notifications/:facultyId` - Get notifications
- `GET /api/notifications/:facultyId/unread-count` - Unread count
- `PUT /api/notifications/:notificationId/read` - Mark as read
- `PUT /api/notifications/:facultyId/read-all` - Mark all as read
- `DELETE /api/notifications/:notificationId` - Delete notification

### Debug Endpoints
- `GET /api/debug/rls-test` - Test RLS policies
- `GET /api/debug/database` - Database schema info
- `GET /api/debug/storage` - Storage bucket status
- `GET /api/submissions/count` - Count submissions
- `POST /api/test/upload-test` - Test upload system

---

## 🎮 Application Features

### User Roles
1. **Faculty Member**
   - Submit achievement PDFs
   - View own submissions
   - View notifications
   - Change password

2. **Head of Department (HOD)**
   - All faculty features +
   - Review/approve/reject submissions
   - View all faculty submissions
   - Add new faculty members
   - Reset faculty details

### Main Pages
- `/login` - Faculty login
- `/dashboard` - Main dashboard (protected)
- `/add-faculty` - Add faculty (HOD only)
- `/hod-review` - Review panel (HOD only)
- `/notifications` - View notifications
- `/top-performer` - Top performers list
- `/faculty-details/:id` - Individual faculty details

---

## 🔐 Authentication

### Default Login
- **Username**: Faculty ID (e.g., `CSE001`)
- **Password**: Faculty ID (same as username initially)

### Change Password
- Faculty can change password after login
- New password must be different from Faculty ID
- Password stored in `faculty_passwords` table

---

## 📦 Project Structure

```
faculty_dashboard/
├── src/
│   ├── components/        # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── LoginForm.jsx
│   │   ├── FacultyTable.jsx
│   │   ├── HODReviewPanel.jsx
│   │   └── ...
│   ├── pages/           # Page components
│   │   ├── Index.jsx   # Dashboard
│   │   ├── AddFaculty.jsx
│   │   └── ...
│   ├── contexts/        # React contexts
│   ├── utils/           # Utility functions
│   └── main.jsx         # Entry point
├── server/
│   ├── server.js        # Express backend
│   ├── scripts/         # Setup scripts
│   └── supabase/
│       └── migrations/  # SQL migrations
├── public/              # Static files
├── package.json         # Dependencies
└── vite.config.ts       # Vite configuration
```

---

## 🚨 Troubleshooting

### Issue: "Missing environment variables"
**Solution**: Create `.env` file with all required Supabase keys

### Issue: "Table does not exist"
**Solution**: 
```bash
npm run migrate
# OR run SQL manually in Supabase SQL Editor
```

### Issue: "Storage bucket not found"
**Solution**:
```bash
npm run setup:storage
# OR create bucket manually in Supabase Dashboard
```

### Issue: "CORS errors"
**Solution**: 
- Check backend is running on port 5000
- Verify CORS settings in `server/server.js`
- Add your frontend URL to allowed origins

### Issue: "Port already in use"
**Solution**: 
- Change port in `vite.config.ts` (frontend)
- Change `PORT` in `.env` or `server/server.js` (backend)

### Issue: "TypeError: Missing parameter name" (Express 5 error)
**Solution**: 
- Express 5.x has compatibility issues
- Downgrade to Express 4.x: `npm install express@^4.18.2`
- Then reinstall: `npm install`

### Issue: "Faculty not found"
**Solution**:
- Verify faculty table has data
- Check faculty ID matches exactly (case-sensitive)
- Use `GET /api/faculty/list` to see all faculty

---

## 🧪 Testing the Application

### 1. Test Backend Health
```bash
curl http://localhost:5000/api/health
```

### 2. Test Database Connection
```bash
curl http://localhost:5000/api/faculty/test
```

### 3. Test Storage
```bash
curl http://localhost:5000/api/debug/storage
```

### 4. Test Frontend
- Open browser: `http://localhost:8080`
- Should redirect to `/login`
- Login with faculty ID

---

## 📊 Development Workflow

### Typical Development Session:
```bash
# 1. Start both frontend and backend
npm run dev:full

# 2. Make changes to code
# - Frontend: src/components/, src/pages/
# - Backend: server/server.js

# 3. Changes auto-reload (nodemon + Vite HMR)

# 4. Test in browser
# - Frontend: http://localhost:8080
# - Backend API: http://localhost:5000/api/health
```

### Before Committing:
```bash
# Build to check for errors
npm run build

# Lint code
npm run lint
```

---

## 🌐 Production Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the `dist` folder
```

### Backend (PM2/Railway/Render)
```bash
npm run deploy:backend
# OR
pm2 start server/ecosystem.config.js --env production
```

See `DEPLOYMENT.md` for detailed deployment instructions.

---

## 📚 Additional Resources

- **Setup Guide**: `SETUP_GUIDE.md`
- **Backend README**: `BACKEND_README.md`
- **Deployment Guide**: `DEPLOYMENT.md`
- **Achievement System**: `ACHIEVEMENT_SYSTEM_README.md`

---

## ✅ Checklist Before Running

- [ ] Node.js 18+ installed
- [ ] `.env` file created with Supabase credentials
- [ ] Dependencies installed (`npm install`)
- [ ] Database tables created (`npm run migrate`)
- [ ] Storage bucket created (`npm run setup:storage`)
- [ ] Backend running (`npm run backend`)
- [ ] Frontend running (`npm run dev`)
- [ ] Can access `http://localhost:8080`
- [ ] Can access `http://localhost:5000/api/health`

---

## 🎉 Success Indicators

When everything is working, you should see:

1. **Backend Console:**
```
🚀 Server running on port 5000
✅ Achievement System initialized successfully!
```

2. **Frontend Browser:**
- Login page loads at `http://localhost:8080/login`
- Can login with faculty ID
- Dashboard loads after login

3. **API Health Check:**
```json
{
  "status": "OK",
  "message": "Achievement System Backend is running"
}
```

---

## 💡 Tips

1. **Use `npm run dev:full`** for development - runs both servers
2. **Check browser console** for frontend errors
3. **Check terminal** for backend logs
4. **Use `/api/debug/*` endpoints** to troubleshoot
5. **Check Supabase Dashboard** for database/storage issues

---

**Happy Coding! 🚀**

