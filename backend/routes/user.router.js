const express = require('express');
const jwt = require('jsonwebtoken');
const UserData = require('../data/user.data');
const PasswordResetData = require('../data/password_reset.data');
const Mailer = require('../utils/mailer');
const {validateFields} = require('../utils/validator');
const {hash, compare} = require('../security/password');

const router = express.Router();

/*
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await UserData.getAll();
    res.json(users);
  })
);
*/

/*
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    const fields = [{value: id, type: 'id'}];
    validateFields(fields);

    const user = await UserData.getById(parseInt(id));
    res.json(user);
  })
);
*/

router.post(
  '/',
  async (req, res, next) => {
    const {username, email, password, role} = req.body;

    try {
      validateFields([
        {value: username, type: 'username'},
        {value: email, type: 'email'},
        {value: password, type: 'password'},
        {value: role, type: 'role'}
      ]);

      let queryResult = await UserData.getIdByEmail(email);
      if (queryResult.length !== 0) {
        next(new Error(`This email address is already being used`));
        return;
      }
      queryResult = await UserData.getIdByUsername(username);
      if (queryResult.length !== 0) {
        next(new Error(`This username is already taken`));
        return;
      }

      const hashedPassword = await hash(password);
      await UserData.add(username, email, hashedPassword, role);

      queryResult = await UserData.getIdByEmail(email);
      const {id} = queryResult[0];
      await Mailer.sendEmailConfirmationLink({id}, email);

      res.status(201).end();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/login',
  async (req, res, next) => {
    const {usernameOrEmail, password} = req.body;

    try {
      validateFields([{value: usernameOrEmail, type: 'usernameOrEmail'}]);

      const queryResult = await UserData.getByEmailOrUsername(usernameOrEmail);
      if (queryResult.length === 0) {
        next(new Error('Username or email not found'));
      }
      const user = queryResult[0];

      const matched = await compare(password, user.password);
      if(!matched) {
        next(new Error(`Wrong password.`));
      }

      const payload = {
        id: user.id,
        role: user.role
      };
      const options = {
        issuer: process.env.JWT_ISSUER,
        subject: process.env.JWT_SUBJECT,
        audience: process.env.JWT_AUDIENCE
      };
      const token =  jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
);

/*
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {username, email, password, role} = req.body;
    const fields = [
      {value: id, type: 'id'},
      {value: username, type: 'username'},
      {value: email, type: 'email'},
      {value: password, type: 'password'},
      {value: role, type: 'role'}
    ];
    validateFields(fields);

    await UserData.updateById(parseInt(id), username, email, password, role);
    res.status(200).end();
  })
);
*/

router.patch(
  '/:token',
  async (req, res, next) => {
    const {token} = req.params;
    const {emailConfirmation, password} = req.body;

    try {
      validateFields([{value: token, type: 'jwt'}]);
      const {id} = jwt.verify(token, process.env.JWT_MAILER_KEY);
      validateFields([{value: id, type: 'id'}]);

      if (emailConfirmation !== undefined) {  // email confirmation request
        await UserData.confirmEmail(id);
        res.status(200).end();
        return;
      }
      // password reset request
      validateFields([{value: password, type: 'password'}]);

      const queryResult = await PasswordResetData.getByUserId(id);
      if (queryResult.length === 0) {
        next(new Error('Trying to reset password, but no token found in database.'));
        return;
      }
      const dbToken = queryResult[0].token;
      if (dbToken !== token) {
        next(new Error('Trying to reset password, but the provided token does not correspond to the original one.'));
        return;
      }
      await PasswordResetData.deleteByUserId(id);

      const hashedPassword = await hash(password);
      await UserData.resetPassword(id, hashedPassword);

      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
);

/*
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const {id} = req.params;
    const fields = [{value: id, type: 'id'}];
    validateFields(fields);

    await UserData.deleteById(id);
    res.status(204).end();
  })
);
*/

module.exports = {
  UserRouter: router
};