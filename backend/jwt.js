const jwt = require('jsonwebtoken');
const {validateFields} = require('./validator');

const options = {
  issuer: process.env.JWT_ISSUER,
  subject: process.env.JWT_SUBJECT,
  audience: process.env.JWT_AUDIENCE
};

/**
 * @param {Object} payload {id, role}
 * @returns {string} token
 */
function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
}

/**
 * Verify and decode the authorization token
 * Pass the payload to the next middleware
 * @throws {Error} if authorization header is not provided
 */
function extractPayload(req, res, next) {
  if (!req.headers.authorization) {
    const error = new Error('Authorization header required.');
    return next(error);
  }

  // request authorization header is 'Bearer <token>'
  const token = req.headers.authorization.split(" ")[1];
  try {
    const fields = [{value: token, type: 'jwt'}];
    validateFields(fields);
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY, options);
    req.state = {payload};
    next();
  } catch (error) {
    console.trace(error);
    next(error);
  }
}

module.exports = {
  createToken,
  extractPayload
};
