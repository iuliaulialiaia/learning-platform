const express = require('express');
const {UserRouter} = require('./user.router');
const {PasswordResetRouter} = require('./password_reset.router');

const app = express();
app.use('/user', UserRouter);
app.use('/password_reset', PasswordResetRouter);

module.exports = {
  routes: app
};