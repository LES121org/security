const crypto = require('crypto');

function generatePasswordHash(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

function validatePassword(password, hash, salt) {
  const hashToCompare = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hashToCompare === hash;
}

// Example usage
const passwordHash = generatePasswordHash('my-secret-password');
console.log(passwordHash); // { salt: '...', hash: '...' }

const isPasswordValid = validatePassword('my-secret-password', passwordHash.hash, passwordHash.salt);
console.log(isPasswordValid); // true

//
