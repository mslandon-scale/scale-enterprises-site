const { sql } = require('../lib/db');
const { lookupContactByEmail, updateContactFields } = require('../lib/ghl');
const { normalizeAttribution } = require('../lib/attribution');

module.exports = async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { contact_email, answers, attribution } = req.body;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'Missing questionnaire answers' });
    }

    const attr = normalizeAttribution(attribution);

    // Store questionnaire answers in DB (linked to contact by email or visitor_id)
    if (contact_email) {
      // Try to link to existing contact
      const existing = await sql`
        SELECT id, ghl_contact_id FROM contacts
        WHERE email = ${contact_email}
        ORDER BY created_at DESC
        LIMIT 1
      `;

      if (existing.rows.length > 0) {
        const contact = existing.rows[0];

        // Update GHL contact with questionnaire answers
        if (contact.ghl_contact_id) {
          try {
            await updateContactFields(contact.ghl_contact_id, {
              dream_outcome: answers.dream_outcome,
              bottleneck: answers.bottleneck,
              why_now: answers.why_now,
              cost_of_inaction: answers.cost_of_inaction,
              why_you: answers.why_you,
              past_attempts: answers.past_attempts,
              objections: answers.objections
            });
          } catch (ghlError) {
            console.error('GHL questionnaire update failed:', ghlError.message);
          }
        }
      }
    }

    // Also try to update via visitor_id if available
    if (attr.visitor_id && !contact_email) {
      const byVisitor = await sql`
        SELECT id, ghl_contact_id, email FROM contacts
        WHERE visitor_id = ${attr.visitor_id}
        ORDER BY created_at DESC
        LIMIT 1
      `;

      if (byVisitor.rows.length > 0 && byVisitor.rows[0].ghl_contact_id) {
        try {
          await updateContactFields(byVisitor.rows[0].ghl_contact_id, {
            dream_outcome: answers.dream_outcome,
            bottleneck: answers.bottleneck,
            why_now: answers.why_now,
            cost_of_inaction: answers.cost_of_inaction,
            why_you: answers.why_you,
            past_attempts: answers.past_attempts,
            objections: answers.objections
          });
        } catch (ghlError) {
          console.error('GHL questionnaire update via visitor_id failed:', ghlError.message);
        }
      }
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Questionnaire endpoint error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
