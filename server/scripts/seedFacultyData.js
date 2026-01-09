import { config } from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Load .env file from the project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
config({ path: resolve(__dirname, '../.env') });

/**
 * DEPRECATED: This script is no longer used.
 * All faculty data is now managed directly in Supabase.
 * 
 * To add/update faculty data:
 * 1. Use Supabase Dashboard → Table Editor → faculty table
 * 2. Or use the MCP Supabase tools
 * 3. Or use the API endpoints in server.js
 * 
 * This script is kept for reference only.
 */

console.log('⚠️  This script is deprecated.');
console.log('📝 All faculty data should be managed directly in Supabase.');
console.log('💡 Use Supabase Dashboard or API endpoints to manage faculty data.');
console.log('✅ No mock data files are used - all data comes from Supabase.');
