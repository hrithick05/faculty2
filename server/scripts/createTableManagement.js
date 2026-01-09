import { config } from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Load .env file from the project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
config({ path: resolve(__dirname, '../.env') });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ACCESS_TOKEN = 'sbp_9673d8f4878607ed7472370a913f478a3fababdf';

async function createFacultyTable() {
  console.log('Creating faculty table via Management API...');
  
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS faculty (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      designation TEXT NOT NULL,
      department TEXT NOT NULL,
      rdProposalsSangsation INTEGER,
      rdProposalsSubmition INTEGER,
      rdProposals INTEGER,
      rdFunding INTEGER,
      journalPublications INTEGER,
      journalsCoAuthor INTEGER,
      studentPublications INTEGER,
      bookPublications INTEGER,
      patents INTEGER,
      onlineCertifications INTEGER,
      studentProjects INTEGER,
      fdpWorks INTEGER,
      fdpWorps INTEGER,
      industryCollabs INTEGER,
      otherActivities INTEGER,
      academicPassPercentage TEXT,
      effectiveMentoring TEXT
    );
  `;

  try {
    const response = await fetch(`https://api.supabase.com/v1/projects/yfcukflinfinmjvllwin/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ACCESS_TOKEN}`
      },
      body: JSON.stringify({ 
        query: createTableSQL 
      })
    });

    if (response.ok) {
      console.log('Faculty table created successfully!');
      return true;
    } else {
      const error = await response.text();
      console.error('Error creating table:', error);
      return false;
    }
  } catch (err) {
    console.error('Exception creating table:', err);
    return false;
  }
}

async function seedFacultyData() {
  console.log('⚠️  Faculty data seeding is deprecated.');
  console.log('📝 All faculty data should be managed directly in Supabase.');
  console.log('💡 Use Supabase Dashboard or API endpoints to manage faculty data.');
  console.log('✅ No mock data files are used - all data comes from Supabase.');
  // Function kept for backward compatibility but does nothing
}

async function setupDatabase() {
  const tableCreated = await createFacultyTable();
  if (tableCreated) {
    await seedFacultyData();
  }
}

setupDatabase(); 