const Cards = require('../models/card');
const NotFound = require('../errors/NotFound');
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
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(400).send({ message: 'переданы некорректные данные' });
      else {
        res.status(500).send({
          message: ' Произошла ошибка',
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
      if (err.status === 404) {
        res.status(err.status).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный айди', err });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
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
        res.status(404).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный айди' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
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
        res.status(404).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный айди' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
