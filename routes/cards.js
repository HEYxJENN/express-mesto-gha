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

router.delete('/cards/:cardId', deleteCard);

router.put(
  '/cards/:cardId/likes',
  // celebrate({
  //   [Segments.BODY]: Joi.object().keys({
  //     cardId: Joi.string().min(2).required(),
  //   }),
  // }),
  likeCard
);

router.delete(
  '/cards/:cardId/likes',
  // celebrate({
  //   [Segments.BODY]: Joi.object().keys({
  //     cardId: Joi.string().min(2).required(),
  //   }),
  // }),
  dislikeCard
);

module.exports = router;
