const cardRouter = require('express').Router();

const {
  validateCreateCard,
  validateCardId,
} = require('../utils/data-validation');

const {
  getCards,
  createCard,
  deleteCard,
} = require('../controllers/article');

cardRouter.get('/articles', getCards);
cardRouter.post('/articles', validateCreateCard, createCard);
cardRouter.delete('/articles/:articleId', validateCardId, deleteCard);

module.exports = cardRouter;
