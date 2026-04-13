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

-- Seed the 7 modules
INSERT INTO course_modules (slug, title, description, sort_order, is_published) VALUES
('vision', 'Vision', 'Nail down your vision — the North Star that drives every decision, hire, and dollar in your company.', 1, true),
('enterprise-code', 'The Enterprise Code', 'The proprietary framework behind every 7- and 8-figure service business we build — and exactly how to install it in yours.', 2, true),
('marketing', 'Marketing & Sales', 'How to build marketing and sales systems that drive predictable revenue growth — from lead generation to closing deals at scale.', 3, true),
('team-people', 'Team & People', 'How to recruit, train, and retain A-players who build the business alongside you — not drain it.', 4, true),
('leadership-system', 'Leadership System', 'How to lead your team, set the standard, and build a culture that scales — even when you step away.', 5, true),
('finance', 'Finance', 'How to read your numbers, protect your margins, and make financial decisions like a true enterprise operator.', 6, true),
('ai-enterprises', 'AI for Enterprises', 'How to deploy AI across your business to automate, accelerate, and gain an unfair advantage over your competition.', 7, true)
ON CONFLICT (slug) DO NOTHING;
