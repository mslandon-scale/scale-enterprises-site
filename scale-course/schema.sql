-- Scale Enterprises Course Platform
-- Run against existing PostgreSQL database

CREATE TABLE IF NOT EXISTS course_users (
    id              SERIAL PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_course_users_email ON course_users(email);

CREATE TABLE IF NOT EXISTS course_modules (
    id              SERIAL PRIMARY KEY,
    slug            VARCHAR(64) NOT NULL UNIQUE,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    sort_order      INTEGER NOT NULL DEFAULT 0,
    video_url       TEXT,
    is_published    BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_progress (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES course_users(id) ON DELETE CASCADE,
    module_id       INTEGER NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
    completed       BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, module_id)
);

CREATE INDEX IF NOT EXISTS idx_course_progress_user_id ON course_progress(user_id);

-- Profile fields
ALTER TABLE course_users ADD COLUMN IF NOT EXISTS phone VARCHAR(30);
ALTER TABLE course_users ADD COLUMN IF NOT EXISTS company_name VARCHAR(255);
ALTER TABLE course_users ADD COLUMN IF NOT EXISTS employee_count VARCHAR(50);
ALTER TABLE course_users ADD COLUMN IF NOT EXISTS annual_revenue VARCHAR(50);
ALTER TABLE course_users ADD COLUMN IF NOT EXISTS industry VARCHAR(100);

-- Referral campaign columns on course_users
ALTER TABLE course_users ADD COLUMN IF NOT EXISTS email_consent BOOLEAN DEFAULT false;
ALTER TABLE course_users ADD COLUMN IF NOT EXISTS email_consent_at TIMESTAMPTZ;
ALTER TABLE course_users ADD COLUMN IF NOT EXISTS referral_code VARCHAR(12) UNIQUE;
ALTER TABLE course_users ADD COLUMN IF NOT EXISTS link_clicks INTEGER DEFAULT 0;

-- Referral tracking table
CREATE TABLE IF NOT EXISTS referrals (
    id              SERIAL PRIMARY KEY,
    referrer_id     INTEGER NOT NULL REFERENCES course_users(id),
    referred_id     INTEGER NOT NULL REFERENCES course_users(id),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(referred_id)
);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);

-- Seed the 10 modules (matches PDF chapter structure)
INSERT INTO course_modules (slug, title, description, sort_order, is_published) VALUES
('how-it-started', 'How It Started', 'Scraped knees, scar tissue, and the notes I wish I''d had.', 1, true),
('enterprise-framework', 'The Enterprise Framework', 'The five stages every nine-figure business moves through.', 2, true),
('enterprise-checklist', 'The Enterprise Checklist', 'The 56 elements I install into every business I own or operate.', 3, true),
('scaling-sequence', 'The Scaling Sequence', 'Why doing the right things in the wrong order kills businesses.', 4, true),
('stage-one-value-creation', 'Stage One — Value Creation', 'Revenue, offer, and customer acquisition — the foundation.', 5, true),
('stage-two-systems', 'Stage Two — Systems', 'Operations, team, and repeatable processes that scale.', 6, true),
('stage-three-enterprise-leadership', 'Stage Three — Enterprise Leadership', 'Leadership infrastructure, culture, and strategic planning.', 7, true),
('stage-four-platform', 'Stage Four — Platform', 'Brand authority, market position, and platform leverage.', 8, true),
('stage-five-private-equity', 'Stage Five — Private Equity', 'Valuation, exit strategy, and the endgame.', 9, true),
('real-results', 'Real Results', 'What happens when you actually install the elements.', 10, true)
ON CONFLICT (slug) DO NOTHING;
