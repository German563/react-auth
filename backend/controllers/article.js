const { ValidationError, CastError } = require('mongoose').Error;
const Card = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const AccessError = require('../errors/access-error');
const { SUCCESS_CREATED } = require('../utils/response');

const getCards = (req, res, next) => {
  Card.find({ owner: req.user._id })
    .then((cardList) => res.send(cardList))
    .catch(next);
};

const createCard = (req, res, next) => {
  Card.create({ owner: req.user._id, ...req.body })
    .then((card) => res.status(SUCCESS_CREATED).send({ data: card }))
    .catch((err) => {
      if (err instanceof ValidationError || err instanceof CastError) {
        next(new BadRequestError('Invalid Data'));
      } else {
        next(err);
      }
    });
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.articleId).lean();

    if (!card) {
      throw new NotFoundError('No card with such Id');
    }

    if (card.owner.toString() !== req.user._id.toString()) {
      throw new AccessError('You are not authorized to delete this card');
    }

    await Card.deleteOne({ _id: req.params.articleId });

    res.status(200).send({ message: 'Card was deleted' });
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError('Invalid Data'));
    } else {
      next(err);
    }
  }
};

const likeCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: owner } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('No card with such Id'));
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Invalid Data'));
      } else {
        next(err);
      }
    });
};

const disLikeCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: owner } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('No card with such Id'));
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Invalid Data'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  likeCard,
  disLikeCard,
  deleteCard,
};
