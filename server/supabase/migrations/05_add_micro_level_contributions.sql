-- Migration: Add micro-level contribution columns to faculty table
-- These columns track department-level achievements (40% weightage)

-- Add micro-level contribution columns
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS reducing_fee_defaulters INTEGER DEFAULT 0;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS reducing_dress_code_defaulters INTEGER DEFAULT 0;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS timely_completion_work INTEGER DEFAULT 0;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS punctuality_class_lab INTEGER DEFAULT 0;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS classroom_teaching INTEGER DEFAULT 0;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS volunteering_behavior INTEGER DEFAULT 0;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS timely_mentor_report INTEGER DEFAULT 0;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS timely_course_file INTEGER DEFAULT 0;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS microteaching INTEGER DEFAULT 0;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS floor_duty INTEGER DEFAULT 0;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS innovative_lab_conduct INTEGER DEFAULT 0;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS qp_setting_blooms INTEGER DEFAULT 0;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS nba_contribution INTEGER DEFAULT 0;
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS placement_contribution INTEGER DEFAULT 0;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_faculty_micro_contributions ON faculty(
  reducing_fee_defaulters,
  reducing_dress_code_defaulters,
  timely_completion_work,
  punctuality_class_lab
);

-- Add comment to document the purpose
COMMENT ON COLUMN faculty.reducing_fee_defaulters IS 'Micro-level contribution: Reducing Fee defaulters (40% weightage)';
COMMENT ON COLUMN faculty.reducing_dress_code_defaulters IS 'Micro-level contribution: Reducing dress code defaulters and late comers (40% weightage)';
COMMENT ON COLUMN faculty.timely_completion_work IS 'Micro-level contribution: Timely completion of work (40% weightage)';
COMMENT ON COLUMN faculty.punctuality_class_lab IS 'Micro-level contribution: Punctuality to the class and Lab (40% weightage)';
COMMENT ON COLUMN faculty.classroom_teaching IS 'Micro-level contribution: Class room teaching (40% weightage)';
COMMENT ON COLUMN faculty.volunteering_behavior IS 'Micro-level contribution: Volunteering behavior (40% weightage)';
COMMENT ON COLUMN faculty.timely_mentor_report IS 'Micro-level contribution: Timely Mentor report submission (40% weightage)';
COMMENT ON COLUMN faculty.timely_course_file IS 'Micro-level contribution: Timely submission of course file (40% weightage)';
COMMENT ON COLUMN faculty.microteaching IS 'Micro-level contribution: Microteaching (40% weightage)';
COMMENT ON COLUMN faculty.floor_duty IS 'Micro-level contribution: Floor duty (40% weightage)';
COMMENT ON COLUMN faculty.innovative_lab_conduct IS 'Micro-level contribution: Innovative Conduct of laboratories (40% weightage)';
COMMENT ON COLUMN faculty.qp_setting_blooms IS 'Micro-level contribution: QP setting as per Blooms and evaluation (40% weightage)';
COMMENT ON COLUMN faculty.nba_contribution IS 'Micro-level contribution: NBA Contribution (40% weightage)';
COMMENT ON COLUMN faculty.placement_contribution IS 'Micro-level contribution: Placement contribution (40% weightage)';
