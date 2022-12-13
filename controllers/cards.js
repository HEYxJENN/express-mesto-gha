/* eslint-disable no-unused-vars */
const Cards = require('../models/card.js');
const NotFound = require('../errors/NotFound.js');
const ValidationError = require ('../errors/ValidationError')

// Get получаем все карты

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// Post создание карточки

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) =>
    res.status(200).send({ data: card }))
    .catch((err) => {
    if (err.name='ValidationError') res.status(400).send ({message:'переданы некорректные данные'});
    else {
    res.status(500).send({
      message: " Произошла ошибка",
    })}});
};

// Delete удаление
module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndDelete(req.params.cardId,{new:true})
  .orFail(()=> new NotFound('Айди не найден') )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name="CastError") {
        res.status (400).send({message:'Карточка не найдена'})}
      else if (err.name==="BadRequest")
      { return res.status(404).send({ message: "Несуществующий айди" })
      }
      else {
       res.status(500).send({ message: "Произошла ошибка" }) }
    })
    }

// likedel

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
.orFail(()=> new ValidationError('Переданы некорректные данные ') )
.then((card) => res.status(200).send({ data: card }))
.catch((err) => {
  if (err.name="CastError") {
    res.status (400).send({message:'Карточка не найдена'})}
    else if (err.name==="BadRequest")
      { return res.status(400).send({ message: "Несуществующий айди" })
      }  else {
   res.status(500).send({ message: "Произошла ошибка" }) }
})
}


module.exports.dislikeCard = (req, res) =>{ Cards.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
.orFail(()=> new ValidationError('Переданы некорректные данные ') )
.then((card) => res.status(200).send({ data: card }))
.catch((err) => {
  if (err.name="CastError") {
    res.status (400).send({message:'Карточка не найдена'})}
   else if (err.name==="ValidationError")
  { return res.status(400).send({ message: "Некорректный тип данных" })
  } else {
   res.status(500).send({ message: "Произошла ошибка" }) }
})
}


