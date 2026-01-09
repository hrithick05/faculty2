// Micro-level contribution types for Department Achievement Overview
// These represent 40% weightage in faculty performance evaluation

export const microLevelContributions = [
    {
        key: 'reducing_fee_defaulters',
        label: 'Reducing Fee Defaulters',
        description: 'Efforts to reduce fee payment defaults'
    },
    {
        key: 'reducing_dress_code_defaulters',
        label: 'Reducing Dress Code Defaulters & Late Comers',
        description: 'Maintaining discipline and punctuality'
    },
    {
        key: 'timely_completion_work',
        label: 'Timely Completion of Work',
        description: 'Completing assigned tasks on time'
    },
    {
        key: 'punctuality_class_lab',
        label: 'Punctuality to Class & Lab',
        description: 'Being on time for classes and lab sessions'
    },
    {
        key: 'classroom_teaching',
        label: 'Classroom Teaching',
        description: 'Quality of classroom instruction'
    },
    {
        key: 'volunteering_behavior',
        label: 'Volunteering Behavior',
        description: 'Willingness to take on additional responsibilities'
    },
    {
        key: 'timely_mentor_report',
        label: 'Timely Mentor Report Submission',
        description: 'Submitting mentorship reports on schedule'
    },
    {
        key: 'timely_course_file',
        label: 'Timely Submission of Course File',
        description: 'Submitting course documentation on time'
    },
    {
        key: 'microteaching',
        label: 'Microteaching',
        description: 'Participation in microteaching sessions'
    },
    {
        key: 'floor_duty',
        label: 'Floor Duty',
        description: 'Fulfilling floor duty responsibilities'
    },
    {
        key: 'innovative_lab_conduct',
        label: 'Innovative Conduct of Laboratories',
        description: 'Innovation in laboratory teaching methods'
    },
    {
        key: 'qp_setting_blooms',
        label: 'QP Setting as per Blooms & Evaluation',
        description: 'Question paper design following Bloom\'s taxonomy'
    },
    {
        key: 'nba_contribution',
        label: 'NBA Contribution',
        description: 'Contribution to NBA accreditation activities'
    },
    {
        key: 'placement_contribution',
        label: 'Placement Contribution',
        description: 'Support for student placement activities'
    }
];

// Helper function to get label by key
export const getMicroContributionLabel = (key) => {
    const contribution = microLevelContributions.find(c => c.key === key);
    return contribution ? contribution.label : key;
};

// Helper function to calculate total micro-level score
export const calculateMicroLevelTotal = (faculty) => {
    return microLevelContributions.reduce((total, contribution) => {
        return total + (faculty[contribution.key] || 0);
    }, 0);
};
