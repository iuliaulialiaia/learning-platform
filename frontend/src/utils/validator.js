import validator from 'validator';
import {ADMIN_EMAIL, ADMIN_USERNAME} from "./settings";

/**
 * @param {Object[]} fields
 * @param {int|string} fields[].value to validate
 * @param {string} fields[].type of value
 * @param {string} fields[].reference of value if type is 'confirm'
 * @returns {string[]} errors if there is any
 */
function validateFields(fields) {
  let errors = [];
  for (let i = 0; i < fields.length; i++) {
    const {value, type} = fields[i];
    errors.push('');

    if (!value) {
      errors[i] = 'Câmp necesar';
      continue;
    }

    switch (type) {
      case 'usernameOrEmail':
        if (!validator.matches(value, /[a-zA-Z][a-zA-Z ]+[a-zA-Z]/g) &&
          !validator.isEmail(value)) {
          errors[i] = 'Nume de utilizator sau email invalid';
        }
        break;
      case 'login_password':
        if (!validator.isStrongPassword(value) && !(value === ADMIN_USERNAME || value === ADMIN_EMAIL)) {
          errors[i] = 'Parolă incorectă';
        }
        break;
      case 'new_password':
        if (!validator.isStrongPassword(value)) {
          errors[i] = 'Parola trebuie să fie formată din cel putin 8 caractere: minim o litera mare, minim o litera mica, minim o cifra si minim un simbol';
        }
        break;
      case 'username':
        if (!validator.matches(value, /[a-zA-Z][a-zA-Z ]+[a-zA-Z]/g)) {
          errors[i] = 'Numele de utilizator trebuie să contină doar litere și spații';
        }
        break;
      case 'email':
        if (!validator.isEmail(value)) {
          errors[i] = 'Email invalid';
        }
        break;
      case 'confirm':
        if (value !== fields[i].reference) {
          errors[i] = 'Parolele nu coincid';
        }
        break;
      case 'jwt':
        if (!validator.isJWT(value)) {
          errors[i] = 'Nu aveți acces la pagina curenta!';
        }
        break;
      default:
        errors[i] = 'Ne pare rău, a aparut o problemă. Vă rog să reveniți mai târziu.';
    }
  }
  return errors;
}

export default validateFields;