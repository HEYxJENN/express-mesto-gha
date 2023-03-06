const Cards = require('../models/card');
const NotFound = require('../errors/NotFound');
const ForbidddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');
const {
  OK,
  BAD_REQUEST_ERROR,
  BAD_REQUEST_MESSAGE,
} = require('../constants/constants');

// Get получаем все карты

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(OK).send({ data: cards }))
    .catch(
      (err) => next(err)
      // res
      //   .status(INTERNAL_SERVER_ERROR)
      //   .send({ message: INTERNAL_SERVER_MESSAGE })
    );
};

// Post создание карточки

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError')
        res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
      else {
        // res.status(INTERNAL_SERVER_ERROR).send({
        //   message: INTERNAL_SERVER_MESSAGE,
        // });
        next(err);
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
    res.status(OK).send({ data: card });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError('Невалидный id'));
    } else {
      next(err);
    }
  }
};

// likedel

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFound('Карточка не найдена'))
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Невалидный id'));
      } else {
        next(err);
      }
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
      if (err.name === 'CastError') {
        next(new ValidationError('Невалидный id'));
      } else {
        next(err);
      }
    });
};
