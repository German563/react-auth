const mainRouter = require('express').Router();

const { validateUserAuth, validateUserRegister } = require('../utils/data-validation');

const { createUser, login, getMe } = require('../controllers/users');
const authGuard = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./articles');
const NotFoundError = require('../errors/not-found-error');

mainRouter.post('/signup', validateUserRegister, createUser);
mainRouter.post('/signin', validateUserAuth, login);
mainRouter.post('/users/me', getMe);

mainRouter.use('/', authGuard, cardsRouter);
mainRouter.use('/', authGuard, usersRouter);

mainRouter.use('*', authGuard, (req, res, next) => {
  next(new NotFoundError('page not found'));
});

module.exports = mainRouter;
