const Users = require('../models/user');
const {
  fiveH, fourH, fourHf, error, wrong, notfound,
} = require('./constants/constants');

// GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res) => {
  Users
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: fiveH }));
};

// GET /users/:userId - возвращает пользователя по _id

module.exports.getUser = (req, res) => {
  Users
    .findById(req.params.userId)
    .then((user) => {
      if (!user) { res.status(notfound).send({ message: fourHf }); } res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') { res.status(wrong).send({ message: fourH }); } else { res.status(error).send({ message: fiveH }); }
    });
};

// POST /users — создаёт пользователя

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') { res.status(wrong).send({ message: fourH }); } else { res.status(err).send({ message: fiveH }); }
    });
};

// апдейтЮзер

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) { res.status(notfound).send({ message: fourHf }); } res.send({ data: user });
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(wrong).send({ message: fourH });
      } else {
        res.status(error).send({ message: fiveH });
      }
    });
};

// апдейтАватар

module.exports.updateUseravatar = (req, res) => {
  const { avatar } = req.body;
  Users.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) { res.status(notfound).send({ message: fourHf }); } res.send({ data: user });
      res.send({ data: user });
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(wrong).send({ message: fourH });
      }
      res.status(error).send({ message: fiveH });
    });
};
