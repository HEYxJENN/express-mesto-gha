const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { isCelebrateError } = require('celebrate');
const Users = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const {
  CREATED,
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  INTERNAL_SERVER_MESSAGE,
} = require('../constants/constants');
const NotFound = require('../errors/NotFound');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', {
        expiresIn: '7d',
      });

      res.cookie('secureCookie', token, {
        secure: false,
        httpOnly: true,
        expires: new Date(Date.now() + 9000000),
        sameSite: 'Lax',
      });

      res.send({
        token,
      });
    })
    .catch((err) => {
      // res.status(401).send({ message: err.message });
      next(err);
    });
};

module.exports.getMe = (req, res, next) => {
  Users.findById(req.user._id)
    .then((user) => {
      if (!user) {
        // res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
        throw new NotFound();
      }
      res.send({ data: user });
    })
    .catch(next);
};

// GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res, next) => {
  Users.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) =>
      // res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: INTERNAL_SERVER_MESSAGE })
      next(err)
    );
};

// GET /users/:userId - возвращает пользователя по _id

module.exports.getUser = (req, res, next) => {
  Users.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        // res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
        next(new NotFound('Не найдено'));
      }
      res.send({ data: user });
    })
    .catch((err) => {
      // if (err.name === 'CastError') {
      //   // res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
      //   next(new ValidationError('Ошибка валидации'));
      // } else {
      next(err);
    });
  //   }
  // });
};

// POST /users — создаёт пользователя

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    if (!password) {
      throw new ValidationError('Необходимо ввести пароль');
    }

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
    // if (err.name === 'ValidationError') {
    //   res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE, err });
    // } else if (err.code === 11000) {
    //   res.status(409).send({ message: 'email уже существует' });
    // } else {
    next(err);
    // }
  }
};
// };

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
        res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
        return;
      }
      // res.send({ data: user });
      res.send({ data: user });
    })
    .catch((err) => {
      //   if (err.name === 'ValidationError') {
      //     res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
      //   } else {
      //     res
      //       .status(INTERNAL_SERVER_ERROR)
      //       .send({ message: INTERNAL_SERVER_MESSAGE });
      //   }
      // });
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
        // res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
        // return;
        throw new NotFound();
      }
      // res.send({ data: user });
      res.send({ data: user });
    })
    .catch((err) => {
      // if (err.name === 'ValidationError') {
      //   res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
      // }
      // res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: INTERNAL_SERVER_MESSAGE });
      next(err);
    });
};
