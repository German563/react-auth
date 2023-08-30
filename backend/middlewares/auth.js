const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authorization is required for access'));
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return next(new UnauthorizedError('Authorization is required for access'));
  }
  return (null);
};
