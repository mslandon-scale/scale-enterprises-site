const { setCors, handleCorsPreflightIfNeeded } = require('../lib/cors');
const { lookupContactByEmail, ghlFetch } = require('../lib/ghl');

module.exports = async function handler(req, res) {
  if (handleCorsPreflightIfNeeded(req, res)) return;
  setCors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify internal API key
  const apiKey = req.headers['x-internal-key'] || '';
  const expectedKey = (process.env.INTERNAL_API_KEY || '').trim();
  if (!expectedKey || apiKey !== expectedKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { email, firstName, resetUrl } = req.body || {};

  if (!email || !resetUrl) {
    return res.status(400).json({ error: 'email and resetUrl are required' });
  }

  try {
    // Look up contact in GHL
    const contact = await lookupContactByEmail(email);

    if (!contact) {
      // No GHL contact — can't send via GHL, but don't reveal this
      console.warn('No GHL contact found for password reset:', email);
      return res.status(200).json({ sent: false, reason: 'no_contact' });
    }

    // Send email via GHL
    await ghlFetch('/conversations/messages', 'POST', {
      type: 'Email',
      contactId: contact.id,
      subject: 'Reset Your Password — Scale Enterprises',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 2rem; color: #333;">
          <h2 style="color: #111; margin-bottom: 0.5rem;">Reset Your Password</h2>
          <p>Hi ${firstName || 'there'},</p>
          <p>We received a request to reset your password for your Enterprise Masterclass account. Click the button below to set a new password:</p>
          <div style="text-align: center; margin: 2rem 0;">
            <a href="${resetUrl}" style="display: inline-block; background: #F6D43F; color: #000; font-weight: 700; padding: 0.85rem 2rem; border-radius: 4px; text-decoration: none; font-size: 1rem;">Reset Password</a>
          </div>
          <p style="font-size: 0.85rem; color: #666;">This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 1.5rem 0;">
          <p style="font-size: 0.75rem; color: #999;">Scale Enterprises — Enterprise Masterclass</p>
        </div>
      `
    });

    return res.status(200).json({ sent: true });
  } catch (err) {
    console.error('Send reset email error:', err.message);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
