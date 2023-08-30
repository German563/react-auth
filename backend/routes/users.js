const userRouter = require('express').Router();

const {
  getMe,
} = require('../controllers/users');

userRouter.get('/users/me', getMe);

module.exports = userRouter;
