const Cards = require('../models/card');
const NotFound = require('../errors/NotFound');
const {
  fiveH, fourH, fourHf, error, wrong, notfound,
} = require('./constants/constants');

// Get получаем все карты

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(error).send({ message: fiveH }));
};

// Post создание карточки

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(wrong).send({ message: fourH });
      else {
        res.status(error).send({
          message: fiveH,
        });
      }
    });
};

// Delete удаление
module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndDelete(req.params.cardId, { new: true })
    .orFail(new NotFound())
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.status === notfound) {
        res.status(err.status).send({ message: fourHf });
      }
      if (err.name === 'CastError') {
        res.status(wrong).send({ message: fourH });
      } else {
        res.status(error).send({ message: fiveH });
      }
    });
};

// likedel

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFound('Пользователь не найден'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.message === 'Пользователь не найден') {
        res.status(notfound).send({ message: fourHf });
      }
      if (err.name === 'CastError') {
        res.status(wrong).send({ message: fourH });
      } else {
        res.status(error).send({ message: fiveH });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFound('Пользователь не найден'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.message === 'Пользователь не найден') {
        res.status(notfound).send({ fourHf });
      }
      if (err.name === 'CastError') {
        res.status(wrong).send({ message: fourH });
      } else {
        res.status(error).send({ message: fiveH });
      }
    });
};
