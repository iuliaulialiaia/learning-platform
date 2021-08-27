const express = require('express');
const jwt = require("jsonwebtoken");

const CourseData = require('../data/course.data');
const UserData = require('../data/user.data');
const {validateFields} = require("../utils/validator");
const {ADMIN_USERNAME} = require("../utils/settings");

const router = express.Router();

router.post(
  '/:token',
  async (req, res, next) => {
    const {token} = req.params;
    const {title, subtitle, category, description} = req.body;  // TODO validate

    console.log('--------------', token);

    try {
      validateFields([{value: token, type: 'jwt'}]);
      const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY);
      validateFields([{value: id, type: 'id'}]);

      const [user] = await UserData.get(id);
      if (!user || user.username !== ADMIN_USERNAME) {
        next(new Error(`Permission denied`));
      }

      await CourseData.add(title, subtitle, category, description);
      res.status(201).end();
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/category/:token',
  async (req, res, next) => {
    const {token} = req.params;

    try {
      validateFields([{value: token, type: 'jwt'}]);
      const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY);
      validateFields([{value: id, type: 'id'}]);

      const categories = await CourseData.getCategories();
      const array = categories.map(category => category.unnest);
      res.json(array);
    } catch (error) {
      next(error);
    }
  }
);

// GET /course/token?search=value
// GET /course/token?category=value
// GET /course/token
router.get(
  '/:token',
  async (req, res, next) => {
    const {search, category} = req.query;
    const {token} = req.params;

    try {
      validateFields([{value: token, type: 'jwt'}]);
      const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY);
      validateFields([{value: id, type: 'id'}]);

      let courses;
      if (search) {  // GET /course/token?search=value
        // TODO validate search
        courses = await CourseData.getBySearch(search);
      } else if (category) {  // GET /course/token?category=value
        // TODO validare categorie
        courses = await CourseData.getByCategory(category);
      } else {  // GET /course/token
        courses = await CourseData.getAll();
      }

      res.json(courses);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = {
  CourseRouter: router
};