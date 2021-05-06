const validator = require('validator');

/**
 * @param {Object[]} fields
 * @param {int|string} fields[].value to validate
 * @param {string} fields[].type of value
 * @throws {Error} if type of `value` is not `type`
 */
function validateFields(fields) {
  for (let {value, type} of fields) {
    if (!value) {
      throw new Error(`Empty field.`);
    }

    // ;  // convert to string
    switch(type) {
      case 'usernameOrEmail':  // TODO schimba pattern ul pentru username
        if(!validator.matches(value, /[a-zA-Z][a-zA-Z0-9 .\-_]+[a-zA-Z0-9]/g) &&
           !validator.isEmail(value)) {
          throw new Error(`Invalid username or email.`);
        }
        break;
      case 'id':
        value = value + '';  // convert to string
        const options = {min: 1};
        if(!validator.isInt(value, options)) {
          throw new Error(`Field ${value} is not a natural number.`);
        }
        break;
      case 'username':  // TODO schimba pattern ul pentru username
        if(!validator.matches(value, /[a-zA-Z][a-zA-Z0-9 .\-_]+[a-zA-Z0-9]/g)) {
          throw new Error(`Invalid username.`);
        }
        break;
      case 'email':
        if(!validator.isEmail(value)) {
          throw new Error(`Invalid email.`);
        }
        break;
      case 'password':
        if(!validator.isStrongPassword(value)) {
          throw new Error(`Weak password.`);
        }
        break;
      case 'role':
        const roles = ['teacher', 'student'];
        if(roles.indexOf(value) === -1) {
          throw new Error(`Field ${value} is not a system role.`);
        }
        break;
      case 'jwt':
        if(!validator.isJWT(value)) {
          throw new Error(`Field ${value} is not a JWT.`);
        }
        break;
      default:
        throw new Error(`Unknown type to validate.`);
    }
  }
}

module.exports = {
  validateFields
};