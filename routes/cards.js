const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getCards,
  createCard,
  likeCard,
  deleteCard,
  dislikeCard,
} = require('../controllers/cards');

const URLregex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

router.get('/cards', getCards);

router.post(
  '/cards',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().min(2).required().regex(URLregex),
    }),
  }),
  createCard
);

router.delete(
  '/cards/:cardId',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      _id: Joi.string().min(2).required(),
    }),
  }),
  deleteCard
);

router.put(
  '/cards/:cardId/likes',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      _id: Joi.string().min(2).required(),
    }),
  }),
  likeCard
);

router.delete(
  '/cards/:cardId/likes',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      _id: Joi.string().min(2).required(),
    }),
  }),
  dislikeCard
);

module.exports = router;
