const express = require('express');
const UserData = require('../data/UserData');
const {validateFields} = require('../validator');

const router = express.Router();

router.get('/',
  async (req, res, next) => {
    try {
      const users = await UserData.getAll();
      res.json(users);
    } catch(error) {
      next(error);
    }
  }
);

router.get('/:id',
  async (req, res, next) => {
    const {id} = req.params;
    try {
      const fields = [{value: id, type: 'int'}];
      validateFields(fields);
      const book = await UserData.getById(parseInt(id));
      res.json(book);
    } catch(error) {
      next(error);
    }
  }
);

router.post('/',
  async (req, res, next) => {
    const {username, email, password, role} = req.body;
    try {
      const fields = [
        {value: username, type: 'username'},
        {value: email, type: 'email'},
        {value: password, type: 'password'},
        {value: role, type: 'role'}
      ];
      validateFields(fields);
      await UserData.add(username, email, password, role);
      res.status(200).end();
    } catch(error) {
      next(error);
    }
  }
);

router.post('/login',
  async (req, res, next) => {
    const {
      email,
      password
    } = req.body;
    let fields = [
      {value: email, type: 'email'},
      {value: password, type: 'password'}  // TODO
    ];
    try {
      validateFields(fields);
      const token = await UserData.login(email, password);
      res.status(200).json(token);
    } catch(error) {
      next(error);
    }
  }
);

router.put('/:id',
  async (req, res, next) => {
    const {id} = req.params;
    const {username, email, password, role} = req.body;
    try {
      const fields = [
        {value: username, type: 'username'},
        {value: email, type: 'email'},
        {value: password, type: 'password'},
        {value: role, type: 'role'}
      ];
      validateFields(fields);
      await UserData.updateById(parseInt(id), username, email, password, role);
      res.status(200).end();
    } catch(error) {
      next(error);
    }
  }
);

router.delete('/:id',
  async (req, res, next) => {
    const {id} = req.params;
    try {
      const fields = [{value: id, type: 'int'}];
      validateFields(fields);
      await UserData.deleteById(id);
      res.status(204).end();
    } catch(err) {
      next(err);
    }
  }
);

module.exports = {
  UserRouter: router
};