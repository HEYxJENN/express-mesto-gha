const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewars/auth');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   req.user = {
//     _id: '63988ccd1afea60949584fc9',
//     // айди из постмана
//   };
//   next();
// });

// app.post('/signin', login);
// app.post('/signup', createUser);

app.post('/signin', userRouter);
app.post('/signup', userRouter);
app.use(auth);
app.use('/', userRouter);
app.use('/', cardsRouter);
app.use('/*', (req, res) => {
  res.status(404).json({ message: 'Данный ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
