const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getUser,
  getUsers,
  updateUser,
  updateUseravatar,
  getMe,
} = require('../controllers/users');

const URLregex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

router.get('/users/me', getMe);
router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.patch(
  '/users/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUser
);
router.patch(
  '/users/me/avatar',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().min(2).required().regex(URLregex),
    }),
  }),
  updateUseravatar
);

module.exports = router;
