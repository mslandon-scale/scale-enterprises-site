const crypto = require('crypto');

function hashSha256(value) {
  if (!value) return null;
  return crypto.createHash('sha256').update(value.toString().toLowerCase().trim()).digest('hex');
}

module.exports = { hashSha256 };
