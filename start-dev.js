#!/usr/bin/env node

/**
 * Development Startup Script
 * Ensures environment is properly configured before starting servers
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Faculty Dashboard - Development Startup');
console.log('==========================================\n');

// Check if .env file exists
const envPath = join(__dirname, '.env');
if (!existsSync(envPath)) {
  console.log('⚠️  WARNING: .env file not found!');
  console.log('📝 Creating .env from .env.example...\n');
  
  const envExamplePath = join(__dirname, '.env.example');
  if (existsSync(envExamplePath)) {
    try {
      const envExample = readFileSync(envExamplePath, 'utf-8');
      // Create basic .env file
      const basicEnv = envExample
        .split('\n')
        .filter(line => !line.trim().startsWith('#'))
        .filter(line => line.trim() !== '')
        .map(line => {
          if (line.includes('your_')) {
            return line.split('=')[0] + '=';
          }
          return line;
        })
        .join('\n');
      
      writeFileSync(envPath, basicEnv);
      console.log('✅ Created .env file');
      console.log('⚠️  Please fill in your Supabase credentials in .env file!\n');
    } catch (error) {
      console.log('❌ Could not create .env file:', error.message);
      console.log('📝 Please create .env manually from .env.example\n');
    }
  } else {
    console.log('❌ .env.example not found');
    console.log('📝 Please create .env file manually\n');
  }
} else {
  console.log('✅ .env file found\n');
}

// Check for required environment variables
try {
  const envContent = readFileSync(envPath, 'utf-8');
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_SUPABASE_SERVICE_KEY'
  ];
  
  const missing = requiredVars.filter(varName => {
    const regex = new RegExp(`^${varName}=`, 'm');
    const match = envContent.match(regex);
    if (!match) return true;
    const value = envContent.split(regex)[1]?.split('\n')[0]?.trim();
    return !value || value.includes('your_') || value === '';
  });
  
  if (missing.length > 0) {
    console.log('⚠️  WARNING: Missing or incomplete environment variables:');
    missing.forEach(v => console.log(`   - ${v}`));
    console.log('\n📝 Please update your .env file with valid Supabase credentials\n');
  } else {
    console.log('✅ All required environment variables are set\n');
  }
} catch (error) {
  console.log('⚠️  Could not verify environment variables\n');
}

// Check if node_modules exists
const nodeModulesPath = join(__dirname, 'node_modules');
if (!existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...\n');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: __dirname });
    console.log('\n✅ Dependencies installed\n');
  } catch (error) {
    console.log('\n❌ Failed to install dependencies');
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies installed\n');
}

// Start servers
console.log('🚀 Starting Frontend + Backend servers...\n');
console.log('📝 Frontend: http://localhost:8080 (or next available port)');
console.log('📝 Backend:  http://localhost:5000');
console.log('📝 Press Ctrl+C to stop both servers\n');
console.log('========================================\n');

try {
  execSync('npm run dev:full', { stdio: 'inherit', cwd: __dirname });
} catch (error) {
  // User pressed Ctrl+C or process exited
  console.log('\n\n👋 Servers stopped');
  process.exit(0);
}

