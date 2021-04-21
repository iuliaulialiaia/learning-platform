const express = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const PasswordResetData = require('../data/password_reset.data');
const UserData = require('../data/user.data');
const Mailer = require('../utils/mailer');
const {validateFields} = require('../utils/validator');

const router = express.Router();

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const {email} = req.body;
    const fields = [{value: email, type: 'email'}];
    validateFields(fields);

    const queryResult = await UserData.getIdByEmail(email);
    if (queryResult.length === 0) {
      throw new Error('Email not found.');
    }
    const userId = queryResult[0].id;

    const payload = {id: userId};
    const options = {
      issuer: process.env.JWT_ISSUER,
      subject: process.env.JWT_FORGOT_PASSWORD,
      audience: process.env.JWT_AUDIENCE,
      expiresIn: '1h'
    };
    const token = jwt.sign(payload, process.env.JWT_MAILER_KEY, options);
    await PasswordResetData.add(token, userId);

    await Mailer.sendPasswordResetLink(token, email);
    res.status(201).end();
  })
);

router.get(
  '/:token',
  asyncHandler(async (req, res) => {
    const {token} = req.params;
    const fields = [{value: token, type: 'jwt'}];
    validateFields(fields);

    const payload = jwt.verify(token, process.env.JWT_MAILER_KEY);
    const {id} = payload;

    await PasswordResetData.deleteByUserId(id);
    res.json(id);
  })
);

module.exports = {
  PasswordResetRouter: router
};