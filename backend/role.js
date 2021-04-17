/**
 * @param {string[]} roles which are system authorized roles
 * @returns middleware that checks if the user is authorized
 * @throws {Error} if the user is not authorized
 */
function checkAuthorization(...roles) {
  return (req, res, next) => {
    for (const role of roles) {
      if (req.state.payload.role === role) {
        return next();
      }
    }
    throw new Error('Not Authorized');
  };
}

module.exports = {
  checkAuthorization
}