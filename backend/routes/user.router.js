const express = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const UserData = require('../data/user.data');
const Mailer = require('../utils/mailer');
const {validateFields} = require('../utils/validator');
const {hash, compare} = require('../security/password');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await UserData.getAll();
    res.json(users);
  })
);

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

router.get(
  '/confirmation/:token',
  asyncHandler(async (req, res) => {
    const {token} = req.params;
    const fields = [{value: token, type: 'jwt'}];
    validateFields(fields);

    const payload = jwt.verify(token, process.env.JWT_MAILER_KEY);
    const {id: [{id}]} = payload;  // TODO ????

    await UserData.confirmEmail(id);
    res.status(200).end();
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const {username, email, password, role} = req.body;
    const fields = [
      {value: username, type: 'username'},
      {value: email, type: 'email'},
      {value: password, type: 'password'},
      {value: role, type: 'role'}
    ];
    validateFields(fields);

    let id = await UserData.getIdByEmail(email);
    if (id.length !== 0) {
      throw new Error(`This email address is already being used`);
    }
    id = await UserData.getIdByUsername(username);
    if (id.length !== 0) {
      throw new Error(`This username is already taken`);
    }

    const hashedPassword = await hash(password);
    await UserData.add(username, email, hashedPassword, role);

    id = await UserData.getIdByEmail(email);
    await Mailer.sendEmailConfirmationLink({id}, email);
    res.status(201).end();
  })
);

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const {usernameOrEmail, password} = req.body;
    let fields = [{value: usernameOrEmail, type: 'usernameOrEmail'}];
    validateFields(fields);

    let user = await UserData.getByEmailOrUsername(usernameOrEmail);
    if (user.length === 0) {
      throw new Error('Username or email not found');
    }
    user = user[0];

    const matched = await compare(password, user.password);
    if(!matched) {
      throw new Error(`Wrong password.`);
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
  })
);

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

router.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const {password, confirmed} = req.body;  // TODO pune mai multe campuri

    if (password !== undefined) {  // password reset request
      const fields = [
        {value: id, type: 'id'},
        {value: password, type: 'password'}
      ];
      validateFields(fields);

      const hashedPassword = await hash(password);
      await UserData.resetPassword(parseInt(id), hashedPassword);
      res.status(200).end();
    } else if (confirmed === 'true') {  // email confirmation
      const fields = [{value: id, type: 'id'}];
      validateFields(fields);

      await UserData.confirmEmail(id);
      res.status(200).end();
    } else {
      const error = new Error('Wrong request');
      next(error);
    }
  })
);

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

module.exports = {
  UserRouter: router
};