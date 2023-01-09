const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getUser,
  getUsers,
  updateUser,
  updateUseravatar,
  getMe,
} = require('../controllers/users');

const URLregex = /^http/;

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

// router.post('/signup', createUser);
// router.post('/signin', login);
// в основном коде была ссылка на этот рут, а так приходится делать еще один импорт методов в апп

module.exports = router;
