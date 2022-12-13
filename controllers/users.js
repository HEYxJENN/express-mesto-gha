// const router = require("express").Router();
const Users = require("../models/user");
const NotFound = require ("../errors/NotFound")

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
      .catch((err) => {
      if (err.name === "CastError") {res.status(400).send({message:'Некорректный id'})}
      else if (err.name === "NotFound") {res.status(404).send({message:'Пользователь не найден'})}
      else {res.status(500).send({ message: "Произошла ошибка"}) }
})
  };


// POST /users — создаёт пользователя

module.exports.createUser = (req, res) => {

    const { name, about, avatar } = req.body;
    Users.create({ name, about, avatar })
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name==="ValidationError") {res.status(400).send({message:'Неверный формат данных'})}
        else {res.status(500).send({ message: "Произошла ошибка" }) }
       })
};




//апдейтЮзер

module.exports.updateUser = (req, res) => {
    const { name, about } = req.body;
    Users.findByIdAndUpdate(req.user._id,{ name, about},{new:true})
      .orFail (() => {new NotFound('Неверные данные')})
      .then((user) => res.send({ data: user }))
      .catch((err) => {
      if (err.name==="ValidationError")
      { res.status(400).send({ message: "Неверный формат данных" })
      } else {
       res.status(500).send({ message: "Произошла ошибка" }) }
      })
  };

//апдейтАватар

module.exports.updateUseravatar = (req, res) => {
    const {avatar } = req.body;
    Users.findByIdAndUpdate(req.user._id , {avatar},{new:true})
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name==="ValidationError")
        { return res.status(400).send({ message: "Неверный формат данных" })
        } else {
         res.status(500).send({ message: "Произошла ошибка" }) }
        })
    };
