// тут так же для нагляднности хотел бы оставить себе вариант с токеном в закомментированном виде
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
// const ValidationError = require('../errors/ValidationError');
const { CREATED } = require('../constants/constants');
const NotFound = require('../errors/NotFound');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', {
        expiresIn: '7d',
      });

      // res.cookie(
      //   'secureCookie',
      // token,
      // user._id,
      //   {
      //     secure: false,
      //     httpOnly: true,
      //     expires: new Date(Date.now() + 9000000),
      //     sameSite: 'Lax',
      //   }
      // );

      res.send({
        token,
        // user,
      });
    })
    .catch((err) => {
      next(err);
    });
};

// castError
module.exports.getMe = (req, res, next) => {
  Users.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch(() => {
      next();
    });
};

// GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res, next) => {
  Users.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

// GET /users/:userId - возвращает пользователя по _id

module.exports.getUser = (req, res, next) => {
  Users.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFound('Не найдено'));
      }
      res.send({ data: user });
    })
    .catch((err) => {
      // console.log('AAAAAAAAA', err);
      // if (err.name === 'CastError') {
      //   console.log('невалидный ID');
      // } else {
      next(err);
      // }
    });
};

// POST /users — создаёт пользователя

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    // if (!password) {
    //   throw new ValidationError('Необходимо ввести пароль');
    // }

    const hash = await bcrypt.hash(password, 10);
    const user = await Users.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    user.password = undefined;
    res.status(CREATED).send({ data: user });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).send({ message: 'email уже существует' });
    } else {
      next(err);
    }
  }
};

// апдейтЮзер

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        // throw new NotFound('Пользователь не найден');
        next(new NotFound('Пользователь не найден'));
      }
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

// апдейтАватар

module.exports.updateUseravatar = (req, res, next) => {
  const { avatar } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};
