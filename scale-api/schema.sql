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

-- QBO OAuth2 tokens: singleton row for company's QuickBooks connection
CREATE TABLE qbo_tokens (
    id              SERIAL PRIMARY KEY,
    access_token    TEXT NOT NULL,
    refresh_token   TEXT NOT NULL,
    realm_id        VARCHAR(64) NOT NULL,
    token_type      VARCHAR(32) NOT NULL DEFAULT 'bearer',
    expires_at      TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Invoices: tracks procurement invoices through lifecycle
CREATE TABLE invoices (
    id                  SERIAL PRIMARY KEY,
    contact_id          INTEGER REFERENCES contacts(id),
    ghl_contact_id      VARCHAR(64),
    ghl_opportunity_id  VARCHAR(64),
    client_name         VARCHAR(255) NOT NULL,
    client_email        VARCHAR(255) NOT NULL,
    client_phone        VARCHAR(32),
    service_name        VARCHAR(255) NOT NULL,
    amount              DECIMAL(10,2) NOT NULL,
    notes               TEXT,
    qbo_customer_id     VARCHAR(64),
    qbo_invoice_id      VARCHAR(64),
    qbo_invoice_number  VARCHAR(64),
    cf_order_id         VARCHAR(64),
    cf_invoice_id       VARCHAR(64),
    status              VARCHAR(32) NOT NULL DEFAULT 'draft',
    paid_at             TIMESTAMPTZ,
    fbclid              VARCHAR(512),
    gclid               VARCHAR(512),
    ip_address          VARCHAR(45),
    user_agent          TEXT,
    submitted_by        VARCHAR(255),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_invoices_contact_id ON invoices(contact_id);
CREATE INDEX idx_invoices_qbo_invoice_id ON invoices(qbo_invoice_id);
CREATE INDEX idx_invoices_cf_order_id ON invoices(cf_order_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_client_email ON invoices(client_email);

-- Agreements: tracks PandaDoc documents through lifecycle
CREATE TABLE agreements (
    id                  SERIAL PRIMARY KEY,
    contact_id          INTEGER REFERENCES contacts(id),
    ghl_contact_id      VARCHAR(64),
    ghl_opportunity_id  VARCHAR(64),
    client_name         VARCHAR(255) NOT NULL,
    client_email        VARCHAR(255) NOT NULL,
    client_phone        VARCHAR(32),
    service_name        VARCHAR(255) NOT NULL,
    amount              DECIMAL(10,2) NOT NULL,
    pandadoc_id         VARCHAR(64),
    invoice_id          INTEGER REFERENCES invoices(id),
    status              VARCHAR(32) NOT NULL DEFAULT 'draft',
    signed_at           TIMESTAMPTZ,
    submitted_by        VARCHAR(255),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_agreements_pandadoc_id ON agreements(pandadoc_id);
CREATE INDEX idx_agreements_client_email ON agreements(client_email);
CREATE INDEX idx_agreements_status ON agreements(status);
