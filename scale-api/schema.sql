-- Visitors: stores attribution data per unique visitor
CREATE TABLE visitors (
    id              SERIAL PRIMARY KEY,
    visitor_id      VARCHAR(64) NOT NULL UNIQUE,
    first_touch     JSONB NOT NULL DEFAULT '{}',
    last_touch      JSONB NOT NULL DEFAULT '{}',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_visitors_visitor_id ON visitors(visitor_id);

-- Contacts: stores form submissions linked to visitors and GHL
CREATE TABLE contacts (
    id              SERIAL PRIMARY KEY,
    visitor_id      VARCHAR(64) REFERENCES visitors(visitor_id),
    ghl_contact_id  VARCHAR(64),
    email           VARCHAR(255) NOT NULL,
    name            VARCHAR(255),
    phone           VARCHAR(32),
    revenue         VARCHAR(32),
    service_business BOOLEAN,
    qualified       BOOLEAN NOT NULL DEFAULT FALSE,
    consent         BOOLEAN NOT NULL DEFAULT FALSE,
    fbclid          VARCHAR(512),
    gclid           VARCHAR(512),
    ip_address      VARCHAR(45),
    user_agent      TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_ghl_contact_id ON contacts(ghl_contact_id);
CREATE INDEX idx_contacts_visitor_id ON contacts(visitor_id);

-- Conversions: logs every conversion event fired
CREATE TABLE conversions (
    id              SERIAL PRIMARY KEY,
    contact_id      INTEGER REFERENCES contacts(id),
    event_name      VARCHAR(64) NOT NULL,
    source          VARCHAR(32) NOT NULL,
    status          VARCHAR(32) NOT NULL DEFAULT 'sent',
    request_payload JSONB,
    response_payload JSONB,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_conversions_contact_id ON conversions(contact_id);
CREATE INDEX idx_conversions_event_name ON conversions(event_name);
