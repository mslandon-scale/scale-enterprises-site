const { createOrUpdateContact } = require('../lib/ghl');
const { setCors, handleCorsPreflightIfNeeded } = require('../lib/cors');

module.exports = async function handler(req, res) {
  if (handleCorsPreflightIfNeeded(req, res)) return;
  setCors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, revenue, industry, module: moduleName, moduleSlug, qualified } = req.body || {};

  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const tags = ['buildout-request', 'course-user'];
    if (moduleSlug) tags.push('buildout-' + moduleSlug);
    if (qualified) tags.push('qualified');
    if (!qualified) tags.push('not-qualified');

    await createOrUpdateContact({
      email,
      name,
      phone: phone || undefined,
      tags,
      customFields: {
        revenue: revenue || undefined
      },
      pipelineStage: qualified ? 'APPLIED_QUALIFIED' : 'APPLIED_NOT_QUALIFIED'
    });

    return res.status(200).json({ success: true, qualified });
  } catch (err) {
    console.error('Buildout request error:', err.message);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
