const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getUser,
  createUser,
  getUsers,
  updateUser,
  updateUseravatar,
  getMe,
  login,
} = require('../controllers/users');

const URLregex = /^http/;

router.get('/users/me', getMe);
router.get('/users', getUsers);
router.get('/users/:userId', getUser);
// router.post('/users', createUser);
router.patch(
  '/users/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().min(2).max(30).regex(URLregex),
    }),
  }),
  updateUser
);
router.patch(
  '/users/me/avatar',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().min(2).required(),
    }),
  }),
  updateUseravatar
);
router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;
