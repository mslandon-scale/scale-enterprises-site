const { query } = require('../lib/db');
const { lookupContactByEmail, updateContactFields } = require('../lib/ghl');
const { normalizeAttribution } = require('../lib/attribution');
const { setCors } = require('../lib/cors');

module.exports = async function handler(req, res) {
  setCors(req, res);
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
    const questionnaireFields = {
      dream_outcome: answers.dream_outcome,
      bottleneck: answers.bottleneck,
      why_now: answers.why_now,
      cost_of_inaction: answers.cost_of_inaction,
      why_you: answers.why_you,
      past_attempts: answers.past_attempts,
      objections: answers.objections
    };

    // Try to link to existing contact by email
    if (contact_email) {
      const existing = await query(
        `SELECT id, ghl_contact_id FROM contacts WHERE email = $1 ORDER BY created_at DESC LIMIT 1`,
        [contact_email]
      );

      if (existing.rows.length > 0 && existing.rows[0].ghl_contact_id) {
        try {
          await updateContactFields(existing.rows[0].ghl_contact_id, questionnaireFields);
        } catch (ghlError) {
          console.error('GHL questionnaire update failed:', ghlError.message);
        }
      }
    }

    // Fallback: try to update via visitor_id
    if (attr.visitor_id && !contact_email) {
      const byVisitor = await query(
        `SELECT id, ghl_contact_id FROM contacts WHERE visitor_id = $1 ORDER BY created_at DESC LIMIT 1`,
        [attr.visitor_id]
      );

      if (byVisitor.rows.length > 0 && byVisitor.rows[0].ghl_contact_id) {
        try {
          await updateContactFields(byVisitor.rows[0].ghl_contact_id, questionnaireFields);
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
