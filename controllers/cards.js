const Cards = require('../models/card');
const NotFound = require('../errors/NotFound');
const ForbidddenError = require('../errors/ForbiddenError');
// const ValidationError = require('../errors/ValidationError');
const {
  OK,
  // NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  // NOT_FOUND_MESSAGE,
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
module.exports.deleteCard = async (req, res, next) => {
  try {
    console.log(req);
    const card = await Cards.findById(req.params.cardId);
    if (!card) {
      throw new NotFound('Card не найден');
    }
    if (card.owner.toString() !== req.user._id) {
      throw new ForbidddenError('Нет Доступа');
    }
    await Cards.findByIdAndDelete(req.params.cardId);
    // Cards.remove(card);
    res.status(OK).send({ data: card });
  } catch (err) {
    // if (err.status === 403) {
    //   res.status(err.status).send({ message: err.message });
    // }
    // if (err.status === 404) {
    //   res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
    // } else if (err.name === 'CastError') {
    //   res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
    // } else {
    //   res
    //     .status(INTERNAL_SERVER_ERROR)
    //     .send({ message: INTERNAL_SERVER_MESSAGE });
    // }
    next(err);
  }
};

// likedel

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFound('Пользователь не найден'))
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      console.log('AAA', err);
      // if (err.message === 'Пользователь не найден') {
      //   next(NotFound);
      // }
      // //   res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
      // else if (err.name === 'CastError') {
      //   next(new ValidationError(BAD_REQUEST_MESSAGE));
      //   //   res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
      // } else {
      next(err);
      // }
      //   res
      //     .status(INTERNAL_SERVER_ERROR)
      //     .send({ message: INTERNAL_SERVER_MESSAGE });
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFound('Пользователь не найден'))
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      // if (err.message === 'Пользователь не найден') {
      //   res.status(NOT_FOUND_ERROR).send({ message: NOT_FOUND_MESSAGE });
      // }
      // if (err.name === 'CastError') {
      //   res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
      // } else {
      //   res
      //     .status(INTERNAL_SERVER_ERROR)
      //     .send({ message: INTERNAL_SERVER_MESSAGE });
      // }
      next(err);
    });
};
