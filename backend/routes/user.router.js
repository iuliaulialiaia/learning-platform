const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const {unlink} = require('fs/promises');
const fs = require('fs');

const UserData = require('../data/user.data');
const PasswordResetData = require('../data/password_reset.data');
const Mailer = require('../utils/mailer');
const {validateFields} = require('../utils/validator');
const {hash, compare} = require('../security/password');

const router = express.Router();

const pathToProfilePictures = __dirname + '/../profile_pictures/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, pathToProfilePictures),
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({
  storage: storage,
  limits: {
    fields: 0,
    fileSize: 1000000,
    files: 1,
    parts: 1
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
    cb(null, allowedTypes.includes(file.mimetype));
  }
});
const type = upload.single('userPicture');

router.post(
  '/',
  async (req, res, next) => {
    const {username, email, password} = req.body;

    try {
      validateFields([
        {value: username, type: 'username'},
        {value: email, type: 'email'},
        {value: password, type: 'password'}
      ]);

      let [id] = await UserData.getIdByEmail(email);
      if (id) {
        next(new Error(`This email address is already being used`));
        return;
      }
      [id] = await UserData.getIdByUsername(username);
      if (id) {
        next(new Error(`This username is already taken`));
        return;
      }

      const hashedPassword = await hash(password);
      await UserData.add(username, email, hashedPassword);

      [{id}] = await UserData.getIdByEmail(email);
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

      const [user] = await UserData.getByUsernameOrEmail(usernameOrEmail);
      if (!user) {
        next(new Error('Username or email not found'));
        return;
      }

      const matched = await compare(password, user.password);
      if(!matched) {
        next(new Error(`Wrong password.`));
        return;
      }

      const payload = {
        id: user.id,
        confirmed: user.confirmed
      };
      const options = {
        issuer: process.env.JWT_ISSUER,
        subject: process.env.JWT_SUBJECT,
        audience: process.env.JWT_AUDIENCE
      };
      const token =  jwt.sign(payload, process.env.JWT_SECRET_KEY, options);

      const response = {
        token: token,
        username: user.username,
        email: user.email,
        confirmed: user.confirmed,
        uploadedPic: user.image_type !== null,
        title: user.title,
        description: user.description,
        contact: user.contact,
        work: user.work,
        education: user.education,
        award: user.award,
        book: user.book
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

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
        await UserData.updateConfirmed(id);
        res.status(200).end();
        return;
      }
      // password reset request
      validateFields([{value: password, type: 'password'}]);

      const [passwordReset] = await PasswordResetData.getByUserId(id);
      if (!passwordReset) {
        next(new Error('Trying to reset password, but no token found in database.'));
        return;
      }
      if (passwordReset.token !== token) {
        next(new Error('Trying to reset password, but the provided token does not correspond to the original one.'));
        return;
      }
      await PasswordResetData.deleteByUserId(id);

      const hashedPassword = await hash(password);
      await UserData.updatePassword(id, hashedPassword);

      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/profile_picture/:token',
  type,
  async function (req, res, next) {
    const {token} = req.params;

    try {
      if (req.file === undefined) {
        next(new Error('Imagine incompatibila'));
        return;
      }

      validateFields([{value: token, type: 'jwt'}]);
      const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY);
      validateFields([{value: id, type: 'id'}]);

      const [user] = await UserData.get(id);
      if (!user) {
        next(new Error('User not found'));
        return;
      }

      const [username, imageType] = req.file.originalname.split('.');
      await UserData.updateImageType(id, imageType);

      const extensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
      const filenames = extensions
        .filter(extension => extension !== imageType)
        .map(extension => username + '.' + extension);
      for (let filename of filenames) {
        unlink(pathToProfilePictures + filename)
          .catch(error => { }); // no such file or directory
      }

      res.status(200).json({uploadedPic: true});
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/profile_picture/:token',
  async function (req, res, next) {
    const {token} = req.params;

    try {
      validateFields([{value: token, type: 'jwt'}]);
      const {id} = jwt.verify(token, process.env.JWT_SECRET_KEY);
      validateFields([{value: id, type: 'id'}]);

      const [user] = await UserData.get(id);
      if (!user) {
        next(new Error('User not found'));
        return;
      }
      if (!user.image_type) {
        res.status(404).end();
        return;
      }

      const filename = user.username + '.' + user.image_type;
      let readStream = fs.createReadStream(pathToProfilePictures + filename);
      readStream.pipe(res);
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