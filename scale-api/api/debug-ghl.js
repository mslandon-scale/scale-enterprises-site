const { createOrUpdateContact } = require('../lib/ghl');

module.exports = async function handler(req, res) {
  // Temporary debug endpoint — delete after testing
  const envCheck = {
    GHL_API_KEY: process.env.GHL_API_KEY ? `${process.env.GHL_API_KEY.substring(0, 10)}...` : 'NOT SET',
    GHL_LOCATION_ID: process.env.GHL_LOCATION_ID || 'NOT SET',
    GHL_PIPELINE_ID: process.env.GHL_PIPELINE_ID || 'NOT SET',
    GHL_STAGE_APPLIED_QUALIFIED: process.env.GHL_STAGE_APPLIED_QUALIFIED || 'NOT SET',
    GHL_STAGE_APPLIED_NOT_QUALIFIED: process.env.GHL_STAGE_APPLIED_NOT_QUALIFIED || 'NOT SET'
  };

  let ghlResult = null;
  let ghlError = null;

  try {
    ghlResult = await createOrUpdateContact({
      email: 'debugtest@scaleenterprises.com',
      name: 'Debug Test',
      phone: '5550001111',
      tags: ['debug-test'],
      customFields: {
        revenue: '1m-plus',
        service_business: 'yes'
      },
      pipelineStage: 'APPLIED_QUALIFIED'
    });
  } catch (e) {
    ghlError = { message: e.message, stack: e.stack };
  }

  return res.status(200).json({
    envCheck,
    ghlResult,
    ghlError
  });
};
