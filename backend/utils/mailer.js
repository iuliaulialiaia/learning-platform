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

async function sendEmailConfirmationLink(token_payload, email) {
  const token_options = {
    ...options,
    subject: process.env.JWT_CONFIRM_EMAIL,
    expiresIn: '1d'
  };
  const token = jwt.sign(token_payload, process.env.JWT_MAILER_KEY, token_options);

  const url = process.env.FRONTEND + '/email-confirmation';
  const mail_data = {
    to: email,
    from: process.env.MAILER_USER,
    subject: 'Learning Platform: Email Confirmation',
    html: `<p>Click this <a href='${url}/${token}'>link</a> to confirm your email!</p>`
  };
  await transporter.sendMail(mail_data);
}

async function sendPasswordResetLink(token, email) {
  const url = process.env.FRONTEND + '/password-reset';
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