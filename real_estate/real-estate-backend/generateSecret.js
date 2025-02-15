const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');  // Generates a 64-byte random secret key
console.log('Generated Secret Key:', secretKey);
