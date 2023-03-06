const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors, Segments } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewars/auth');
const errorHandler = require('./middlewars/errorHandler');
const NotFound = require('./errors/NotFound');
const { URLregex } = require('./constants/constants');

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
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);

app.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string()
        .min(2)
        .max(30)
        .default(
          'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
        )
        .regex(URLregex),
    }),
  }),
  createUser
);

app.use(auth);
app.use('/', userRouter);
app.use('/', cardsRouter);
app.use('/*', (req, res, next) => {
  next(new NotFound('Данный ресурс не найден'));
});
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
