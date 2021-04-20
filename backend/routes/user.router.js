const express = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const UserData = require('../data/user.data');
const {validateFields} = require('../validator');
const Mailer = require('../mailer');

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
    const {id: [{id}]} = payload;

    await UserData.confirmEmail(id);
    res.status(200);
  })
);

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const {username, email, password, role} = req.body;

    const fields = [
      {value: username, type: 'username'},
      {value: email, type: 'email'},
      {value: password, type: 'password'},
      {value: role, type: 'role'}
    ];
    validateFields(fields);

    await UserData.add(username, email, password, role);
    const id = await UserData.getIdByEmail(email);
    await Mailer.sendEmailConfirmationLink({id}, email);
    res.status(201).end();
  })
);

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    let fields = [
      {value: email, type: 'email'},
      {value: password, type: 'password'}  // TODO
    ];
    validateFields(fields);

    const token = await UserData.login(email, password);
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

      await UserData.resetPassword(parseInt(id), password);
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