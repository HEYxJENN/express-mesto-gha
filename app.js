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

const { createUser, login } = require('./controllers/users');

const URLregex = /^http/;
const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(cors());
app.use(cookieParser());
express.json();
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
      name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      about: Joi.string().min(2).max(30).default('Исследователь'),
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
app.use('/*', (req, res) => {
  res.status(404).json({ message: 'Данный ресурс не найден' });
});
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
