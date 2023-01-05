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

router.get('/users/me', getMe);
router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.patch(
  '/users/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).default('Жак-Ив-Кусто'),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(1),
      about: Joi.string().min(2).max(30).default('Исследователь'),
      avatar: Joi.string()
        .min(2)
        .max(30)
        .default(
          'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
        ),
    }),
  }),
  updateUser
);
router.patch(
  '/users/me/avatar',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).default('Жак-Ив-Кусто'),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(1),
      about: Joi.string().min(2).max(30).default('Исследователь'),
      avatar: Joi.string()
        .min(2)
        .max(30)
        .default(
          'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
        ),
    }),
  }),
  updateUseravatar
);
router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;
