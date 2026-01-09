-- Migration: Add micro-level contribution fields to faculty table
-- These fields represent 40% weightage in faculty performance evaluation

-- Add micro-level contribution columns if they don't exist
DO $$ 
BEGIN
    -- Reducing Fee Defaulters
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'faculty' AND column_name = 'reducing_fee_defaulters') THEN
        ALTER TABLE faculty ADD COLUMN reducing_fee_defaulters INTEGER DEFAULT 0;
    END IF;

    -- Reducing Dress Code Defaulters and Late Comers
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'faculty' AND column_name = 'reducing_dress_code_defaulters') THEN
        ALTER TABLE faculty ADD COLUMN reducing_dress_code_defaulters INTEGER DEFAULT 0;
    END IF;

    -- Timely Completion of Work
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'faculty' AND column_name = 'timely_completion_work') THEN
        ALTER TABLE faculty ADD COLUMN timely_completion_work INTEGER DEFAULT 0;
    END IF;

    -- Punctuality to the Class and Lab
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'faculty' AND column_name = 'punctuality_class_lab') THEN
        ALTER TABLE faculty ADD COLUMN punctuality_class_lab INTEGER DEFAULT 0;
    END IF;

    -- Classroom Teaching
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'faculty' AND column_name = 'classroom_teaching') THEN
        ALTER TABLE faculty ADD COLUMN classroom_teaching INTEGER DEFAULT 0;
    END IF;

    -- Volunteering Behavior
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'faculty' AND column_name = 'volunteering_behavior') THEN
        ALTER TABLE faculty ADD COLUMN volunteering_behavior INTEGER DEFAULT 0;
    END IF;

    -- Timely Mentor Report Submission
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'faculty' AND column_name = 'timely_mentor_report') THEN
        ALTER TABLE faculty ADD COLUMN timely_mentor_report INTEGER DEFAULT 0;
    END IF;

    -- Timely Submission of Course File
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'faculty' AND column_name = 'timely_course_file') THEN
        ALTER TABLE faculty ADD COLUMN timely_course_file INTEGER DEFAULT 0;
    END IF;

    -- Microteaching
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'faculty' AND column_name = 'microteaching') THEN
        ALTER TABLE faculty ADD COLUMN microteaching INTEGER DEFAULT 0;
    END IF;

    -- Floor Duty
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'faculty' AND column_name = 'floor_duty') THEN
        ALTER TABLE faculty ADD COLUMN floor_duty INTEGER DEFAULT 0;
    END IF;

    -- Innovative Conduct of Laboratories
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'faculty' AND column_name = 'innovative_lab_conduct') THEN
        ALTER TABLE faculty ADD COLUMN innovative_lab_conduct INTEGER DEFAULT 0;
    END IF;

    -- QP Setting as per Blooms and Evaluation
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'faculty' AND column_name = 'qp_setting_blooms') THEN
        ALTER TABLE faculty ADD COLUMN qp_setting_blooms INTEGER DEFAULT 0;
    END IF;

    -- NBA Contribution
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'faculty' AND column_name = 'nba_contribution') THEN
        ALTER TABLE faculty ADD COLUMN nba_contribution INTEGER DEFAULT 0;
    END IF;

    -- Placement Contribution
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'faculty' AND column_name = 'placement_contribution') THEN
        ALTER TABLE faculty ADD COLUMN placement_contribution INTEGER DEFAULT 0;
    END IF;
END $$;

-- Add comments to columns for documentation
COMMENT ON COLUMN faculty.reducing_fee_defaulters IS 'Efforts to reduce fee payment defaults';
COMMENT ON COLUMN faculty.reducing_dress_code_defaulters IS 'Maintaining discipline and punctuality - reducing dress code defaulters and late comers';
COMMENT ON COLUMN faculty.timely_completion_work IS 'Completing assigned tasks on time';
COMMENT ON COLUMN faculty.punctuality_class_lab IS 'Being on time for classes and lab sessions';
COMMENT ON COLUMN faculty.classroom_teaching IS 'Quality of classroom instruction';
COMMENT ON COLUMN faculty.volunteering_behavior IS 'Willingness to take on additional responsibilities';
COMMENT ON COLUMN faculty.timely_mentor_report IS 'Submitting mentorship reports on schedule';
COMMENT ON COLUMN faculty.timely_course_file IS 'Submitting course documentation on time';
COMMENT ON COLUMN faculty.microteaching IS 'Participation in microteaching sessions';
COMMENT ON COLUMN faculty.floor_duty IS 'Fulfilling floor duty responsibilities';
COMMENT ON COLUMN faculty.innovative_lab_conduct IS 'Innovation in laboratory teaching methods';
COMMENT ON COLUMN faculty.qp_setting_blooms IS 'Question paper design following Bloom''s taxonomy';
COMMENT ON COLUMN faculty.nba_contribution IS 'Contribution to NBA accreditation activities';
COMMENT ON COLUMN faculty.placement_contribution IS 'Support for student placement activities';

