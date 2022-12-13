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
  Cards.create({ name, link, owner: ownerId },{runValidators:true})
    .then((card) =>
    res.status(200).send({ data: card }))
    .catch(() => {
    if (err.name='ValidationError') res.status(400).send ({message:'переданы некорректные данные'});
    else {
    res.status(500).send({
      message: " Произошла ошибка",
    })}});
};

// Delete удаление
module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndDelete(req.params.cardId,{new:true})
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => {
      if (err.name="CastError") {
        res.status (400).send({message:'Карточка не найдена'})
      } else
      res.status(500).send({ message: 'Произошла ошибка' })});
};

// likedel

module.exports.likeCard = (req, res) => {Cards.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
.orFail(()=> new ValidationError('Переданы некорректные данные ') )
.catch((err) => {
  if (err.name==="ValidationError")
  { return res.status(404).send({ message: "Не найдено" })
  } else {
   res.status(500).send({ message: "Произошла ошибка" }) }
  })
}


module.exports.dislikeCard = (req, res) =>{ Cards.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
.orFail(()=> new ValidationError('Переданы некорректные данные ') )
.catch((err) => {
  if (err.name==="ValidationError")
  { return res.status(404).send({ message: "Не найдено" })
  } else {
   res.status(500).send({ message: "Произошла ошибка" }) }
  })
}


