const Cards = require("../models/card.js");
const NotFound = require("../errors/NotFound.js");

//Get получаем все карты

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

//Post создание карточки

module.exports.createCard = (req, res) => {
  Cards.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

//Delete удаление
module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndDelete(req.params.cardId)
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

//likedel

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  );

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  );
