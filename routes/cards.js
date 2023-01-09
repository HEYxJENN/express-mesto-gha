const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getCards,
  createCard,
  likeCard,
  deleteCard,
  dislikeCard,
} = require('../controllers/cards');

const URLregex = /^http/;

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
      // name:
    }),
  }),
  deleteCard
);

router.put(
  '/cards/:cardId/likes',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      // name:
    }),
  }),
  likeCard
);

router.delete(
  '/cards/:cardId/likes',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      // name:
    }),
  }),
  dislikeCard
);

module.exports = router;
