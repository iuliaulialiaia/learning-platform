const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE,
  pool: true,
  secure: true,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  }
});

const options = {
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
};

const base_url = process.env.HOST + ':' + process.env.PORT;

async function sendEmailConfirmationLink(token_data, email) {
  const url = base_url + '/user/confirmation';
  const token_options = {
    ...options,
    subject: process.env.JWT_CONFIRM_EMAIL,
    expiresIn: '1d'
  };

  await jwt.sign(
    token_data,
    process.env.JWT_MAILER_KEY,
    token_options,
    async (error, token) => {
      const mail_data = {
        to: email,
        from: process.env.MAILER_USER,
        subject: 'Learning Platform: Email Confirmation',
        html: `<p>Click this <a href='${url}/${token}'>link</a> to confirm your email!</p>`
      };
      await transporter.sendMail(mail_data);
    }
  );
}

async function sendPasswordResetLink(token, email) {
  const url = base_url + '/password_reset';
  const mail_data = {
    to: email,
    from: process.env.MAILER_USER,
    subject: 'Learning Platform: Password Reset',
    html: `<p>Click this <a href='${url}/${token}'>link</a> to reset your password!</p>`
  };
  await transporter.sendMail(mail_data);
}

module.exports = {
  sendEmailConfirmationLink,
  sendPasswordResetLink
};

// const token_options = {
//   ...options,
//   subject: process.env.JWT_FORGOT_PASSWORD,
//   expiresIn: '1h'
// };
//
// await jwt.sign(
//   token_data,
//   process.env.JWT_MAILER_KEY,
//   token_options,
//   async (error, token) => {
//     const mail_data = {
//       to: email,
//       from: process.env.MAILER_USER,
//       subject: 'Learning Platform: Password Reset',
//       html: `<p>Click this <a href='${url}/${token}'>link</a> to reset your password!</p>`
//     };
//     await transporter.sendMail(mail_data);
//   }
// );