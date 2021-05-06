const express = require('express');
const jwt = require('jsonwebtoken');
const PasswordResetData = require('../data/password_reset.data');
const UserData = require('../data/user.data');
const Mailer = require('../utils/mailer');
const {validateFields} = require('../utils/validator');

const router = express.Router();

router.post(
  '/',
  async (req, res, next) => {
    const {email} = req.body;

    try {
      validateFields([{value: email, type: 'email'}]);

      const queryResult = await UserData.getIdByEmail(email);
      if (queryResult.length === 0) {
        next(new Error('Email not found.'));
        return;
      }
      const {id} = queryResult[0];

      const payload = {id};
      const options = {
        issuer: process.env.JWT_ISSUER,
        subject: process.env.JWT_FORGOT_PASSWORD,
        audience: process.env.JWT_AUDIENCE,
        expiresIn: process.env.JWT_EXPIRE
      };
      const token = jwt.sign(payload, process.env.JWT_MAILER_KEY, options);
      await PasswordResetData.add(token, id);

      await Mailer.sendPasswordResetLink(token, email);

      res.status(201).end();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = {
  PasswordResetRouter: router
};