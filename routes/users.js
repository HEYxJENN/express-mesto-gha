const router = require('express').Router();
const {
  getUser,
  createUser,
  getUsers,
  updateUser,
  updateUseravatar,
  getMe,
  login,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
// router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUseravatar);
router.get('/users/me', getMe);
router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;
