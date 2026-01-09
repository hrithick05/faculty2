// Test script to verify the award-micro-level-points endpoint
const testAwardPoints = async () => {
    try {
        console.log('🧪 Testing award-micro-level-points endpoint...');

        const testData = {
            facultyId: 'TEST_FACULTY_ID', // Replace with actual faculty ID
            points: {
                reducing_fee_defaulters: 2,
                reducing_dress_code_defaulters: 0,
                timely_completion_work: 0,
                punctuality_class_lab: 0,
                classroom_teaching: 0,
                volunteering_behavior: 0,
                timely_mentor_report: 0,
                timely_course_file: 0,
                microteaching: 0,
                floor_duty: 0,
                innovative_lab_conduct: 0,
                qp_setting_blooms: 0,
                nba_contribution: 0,
                placement_contribution: 0
            },
            awardedBy: 'TEST_HOD',
            awardedByName: 'Test HOD'
        };

        console.log('📤 Sending request:', testData);

        const response = await fetch('http://localhost:5000/api/faculty/award-micro-level-points', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        console.log('📥 Response status:', response.status);
        const data = await response.json();
        console.log('📥 Response data:', data);

        if (response.ok && data.success) {
            console.log('✅ Test successful!');
        } else {
            console.error('❌ Test failed:', data.message);
        }

    } catch (error) {
        console.error('❌ Test error:', error);
    }
};

// Run the test
testAwardPoints();
