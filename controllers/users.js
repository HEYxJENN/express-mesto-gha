// const router = require("express").Router();
const Users = require("../models/user");

// GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res) => {
    Users
      .find({})
      .then((users) => res.send({ data: users }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
  };


// GET /users/:userId - возвращает пользователя по _id

module.exports.getUser = (req, res) => {
    Users
      .findById(req.params.userId)
      .then((user) => res.send({ data: user }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
  };


// POST /users — создаёт пользователя

module.exports.createUser = (req, res) => {
    const { name, about, avatar } = req.body;
    Users.create({ name, about, avatar })
      .then((user) => res.send({ data: user }, { new: true }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
  };


//апдейтЮзер

module.exports.updateUser = (req, res) => {
    const { name, about } = req.body;
    Users.findByIdAndUpdate(req.user._id,{ name, about})
      .then((user) => res.send({ data: user },{ new: true }))
      .catch((err) => {
      if (err.name==="Validation Error")
      { return res.status(400).send({ message: "Неверные данные" })
      }
       res.status(500).send({ message:`${req.body}, "Произошла ошибка" `})
      });
  };

//апдейтАватар

module.exports.updateUseravatar = (req, res) => {
    const {avatar } = req.body;
    Users.findByIdAndUpdate(req.user._id , {avatar} )
      .then((user) => res.send({ data: user },{ new: true }))
      .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
  };
