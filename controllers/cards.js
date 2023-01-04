const Cards = require('../models/card');
const NotFound = require('../errors/NotFound');
const {
  OK,
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  INTERNAL_SERVER_MESSAGE,
} = require('../constants/constants');

// Get получаем все карты

module.exports.getCards = (req, res) => {
  Cards.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(OK).send({ data: cards }))
    .catch(() =>
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: INTERNAL_SERVER_MESSAGE })
    );
};

// Post создание карточки

module.exports.createCard = (req, res) => {
  // req.name.joi()
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError')
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
      else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: INTERNAL_SERVER_MESSAGE,
        });
      }
    });
};

// Delete удаление
module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndDelete(req.params.cardId, { new: true })
    .orFail(new NotFound())
    .then((card) => {
      if (req.owner._id === req.user._id) {
        res.status(OK).send({ data: card });
      } else {
        throw Error('Вы не являетесь владельцем данной карточки');
      }
    })
    .catch((err) => {
      if (err.status === 404) {
        res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: INTERNAL_SERVER_MESSAGE });
      }
    });
};

// likedel

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFound('Пользователь не найден'))
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err.message === 'Пользователь не найден') {
        res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: INTERNAL_SERVER_MESSAGE });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFound('Пользователь не найден'))
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err.message === 'Пользователь не найден') {
        res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: INTERNAL_SERVER_MESSAGE });
      }
    });
};
