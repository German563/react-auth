const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = process.env;
const { ValidationError, CastError } = mongoose.Error;
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const { SUCCESS_CREATED, DUPLICATE_OBJECT } = require('../utils/response');

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      next(new NotFoundError('User not found'));
    } else {
      res.status(200).send({ data: user });
    }
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError('Invalid Data'));
    } else {
      next(err);
    }
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
    });

    res.status(SUCCESS_CREATED).send({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    if (err instanceof ValidationError || err instanceof CastError) {
      next(new BadRequestError('Invalid Data'));
    } else if (err.code === DUPLICATE_OBJECT) {
      next(new ConflictError('Can\'t use this email'));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    // Generate a JWT token using jwt.sign
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.send({ jwt: token });
  } catch (err) {
    next(new UnauthorizedError('Failed to authorize'));
  }
};

module.exports = {
  getMe,
  createUser,
  login,
};
