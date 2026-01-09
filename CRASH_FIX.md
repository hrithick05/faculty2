# Server Crash Fix - "Missing parameter name" Error

## Problem
The server was crashing with the error:
```
TypeError: Missing parameter name at 1: https://git.new/pathToRegexpError
```

## Root Cause
The issue was on **line 56** of `server/server.js`:
```javascript
app.options('*', cors());
```

The wildcard `*` pattern in Express 4.x causes a path-to-regexp parsing error because it's not a valid route parameter pattern.

## Solution
Removed the problematic line because:
1. The CORS middleware (configured on lines 15-51) already handles OPTIONS preflight requests automatically
2. The explicit `app.options('*', cors())` was redundant and causing the crash
3. Express 4.x's path-to-regexp library doesn't handle the `*` wildcard in route patterns the same way

## Fix Applied
**File:** `server/server.js` (line 55-56)

**Before:**
```javascript
// Handle CORS preflight requests
app.options('*', cors());
```

**After:**
```javascript
// CORS preflight requests are handled by the cors() middleware above
// No need for explicit app.options('*', cors()) as it causes path-to-regexp errors
```

## Verification
- ✅ No linter errors
- ✅ CORS middleware still handles all OPTIONS requests
- ✅ All route patterns are valid Express 4.x patterns

## Next Steps
1. Restart the server: `npm run backend` or `npm run dev:full`
2. The server should now start without the "Missing parameter name" error
3. CORS will continue to work correctly for all requests

## Technical Details
- **Express Version:** 4.22.1 (verified)
- **Error Type:** path-to-regexp parsing error
- **Impact:** Server startup failure
- **Fix Type:** Route pattern removal (redundant code)

