const router = require('express').Router();
// const user = require("../models/user");
const { getUser, createUser, getUsers,updateUser,updateUseravatar } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
router.patch('/users/:userId',updateUser);
router.patch('/users/:userId/avatar',updateUseravatar);


module.exports = router;
