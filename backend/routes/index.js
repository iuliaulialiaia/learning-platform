const express = require('express');
const {UserRouter} = require('./UserRouter');

const app = express();
app.use('/user', UserRouter);

module.exports = {
  routes: app
};