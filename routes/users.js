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
// router.post('/users', createUser);
router.patch(
  '/users/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().min(2).required(),
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
