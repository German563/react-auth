const { celebrate, Joi } = require('celebrate');

const validateUserAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUserRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30),
    title: Joi.string().required().min(2).max(1000),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().trim().required().regex(/^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/, 'URI')
      .error(() => 'Invalid link format'),
    image: Joi.string().trim().required().regex(/^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/, 'URI')
      .error(() => 'Invalid image URL format'),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().length(24).required().hex(),
  }),
});

module.exports = {
  validateUserAuth,
  validateUserRegister,
  validateCreateCard,
  validateCardId,
};
