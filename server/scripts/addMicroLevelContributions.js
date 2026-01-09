import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read .env file manually
const envPath = join(__dirname, '..', '.env');
const envContent = readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
        const cleanKey = key.trim().replace(/\x00/g, '').replace(/[^\x20-\x7E]/g, '');
        const cleanValue = valueParts.join('=').trim().replace(/\x00/g, '').replace(/[^\x20-\x7E]/g, '');

        if (cleanKey && cleanValue) {
            envVars[cleanKey] = cleanValue;
        }
    }
});

// Supabase configuration
const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseServiceKey = envVars.VITE_SUPABASE_SERVICE_ROLE_KEY || envVars.VITE_SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing environment variables');
    console.error('You need VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_ROLE_KEY in your .env file');
    process.exit(1);
}

console.log('✅ Environment variables loaded');
console.log('🔗 Supabase URL:', supabaseUrl);

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function addMicroLevelContributions() {
    try {
        console.log('\n🚀 ADDING MICRO-LEVEL CONTRIBUTION COLUMNS...');
        console.log('===========================================');

        // List of columns to add
        const columns = [
            { name: 'reducing_fee_defaulters', description: 'Reducing Fee defaulters' },
            { name: 'reducing_dress_code_defaulters', description: 'Reducing dress code defaulters and late comers' },
            { name: 'timely_completion_work', description: 'Timely completion of work' },
            { name: 'punctuality_class_lab', description: 'Punctuality to the class and Lab' },
            { name: 'classroom_teaching', description: 'Class room teaching' },
            { name: 'volunteering_behavior', description: 'Volunteering behavior' },
            { name: 'timely_mentor_report', description: 'Timely Mentor report submission' },
            { name: 'timely_course_file', description: 'Timely submission of course file' },
            { name: 'microteaching', description: 'Microteaching' },
            { name: 'floor_duty', description: 'Floor duty' },
            { name: 'innovative_lab_conduct', description: 'Innovative Conduct of laboratories' },
            { name: 'qp_setting_blooms', description: 'QP setting as per Blooms and evaluation' },
            { name: 'nba_contribution', description: 'NBA Contribution' },
            { name: 'placement_contribution', description: 'Placement contribution' }
        ];

        console.log(`\n📝 Adding ${columns.length} new columns to faculty table...`);

        // Test if we can access the faculty table
        const { data: testData, error: testError } = await supabase
            .from('faculty')
            .select('id')
            .limit(1);

        if (testError) {
            console.error('❌ Cannot access faculty table:', testError.message);
            throw new Error('Faculty table access failed');
        }

        console.log('✅ Faculty table is accessible');

        // Note: Direct SQL execution via RPC might not be available
        // We'll try to add a test record to verify the columns exist
        console.log('\n🔍 Checking if columns already exist...');

        const { data: sampleData, error: sampleError } = await supabase
            .from('faculty')
            .select('*')
            .limit(1);

        if (sampleError) {
            console.error('❌ Error checking columns:', sampleError.message);
        } else if (sampleData && sampleData.length > 0) {
            const existingColumns = Object.keys(sampleData[0]);
            const missingColumns = columns.filter(col => !existingColumns.includes(col.name));

            if (missingColumns.length === 0) {
                console.log('✅ All micro-level contribution columns already exist!');
                console.log('\n📊 Existing columns verified:');
                columns.forEach(col => {
                    console.log(`   ✓ ${col.name}`);
                });
            } else {
                console.log(`\n⚠️  ${missingColumns.length} columns need to be added manually:`);
                missingColumns.forEach(col => {
                    console.log(`   ✗ ${col.name} - ${col.description}`);
                });

                console.log('\n📋 MANUAL MIGRATION REQUIRED:');
                console.log('Please run the following SQL in Supabase SQL Editor:');
                console.log('\n' + '='.repeat(60));

                missingColumns.forEach(col => {
                    console.log(`ALTER TABLE faculty ADD COLUMN IF NOT EXISTS ${col.name} INTEGER DEFAULT 0;`);
                });

                console.log('='.repeat(60));
                console.log('\nOr run the migration file:');
                console.log('  server/supabase/migrations/05_add_micro_level_contributions.sql');
            }
        }

        console.log('\n✅ MIGRATION CHECK COMPLETE!');
        console.log('===========================================');

    } catch (error) {
        console.error('\n❌ MIGRATION FAILED:', error.message);
        console.log('\n📋 Please run the SQL migration manually:');
        console.log('  File: server/supabase/migrations/05_add_micro_level_contributions.sql');
        process.exit(1);
    }
}

// Run the migration
addMicroLevelContributions();
