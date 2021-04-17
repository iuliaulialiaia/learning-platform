const bcryptjs = require('bcryptjs');

/**
 * @param {string} plainPassword
 * @returns {string} hashed password
 */
async function hash(plainPassword) {
  const salt = await bcryptjs.genSalt();
  return await bcryptjs.hash(plainPassword, salt);
}

/**
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {boolean}
 */
async function compare(plainPassword, hashedPassword) {
  return await bcryptjs.compare(plainPassword, hashedPassword);
}

module.exports = {
  hash,
  compare
};