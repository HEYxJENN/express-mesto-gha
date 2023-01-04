const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors, Segments } = require('celebrate');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewars/auth');
const errorHandler = require('./middlewars/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(
  '/signin',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(1),
      about: Joi.string().min(2).max(30),
    }),
  }),
  userRouter
);
app.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(1),
      about: Joi.string().min(2).max(30),
    }),
  }),
  userRouter
);
app.use(auth);
app.use('/', userRouter);
app.use('/', cardsRouter);
app.use('/*', (req, res) => {
  res.status(404).json({ message: 'Данный ресурс не найден' });
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// 409 повторный мэйл
// некорректный мейл ошибка 400
// некорректный ссылка аватар ошибка 400
// некорректный ссылка карточка ошибка 400
// нет поля мейл ошибка 400
// нет поля мейл ошибка 401

// удаление карточки работает но ошибка 500, а не успех 200?
// удаление карточки другого пользователя 403 вместо 500
