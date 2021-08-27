const express = require('express');

const {UserRouter} = require('./user.router');
const {PasswordResetRouter} = require('./password_reset.router');
const {CourseRouter} = require('./course.router');

const app = express();
app.use('/user', UserRouter);
app.use('/password_reset', PasswordResetRouter);
app.use('/course', CourseRouter);

module.exports = {
  routes: app
};