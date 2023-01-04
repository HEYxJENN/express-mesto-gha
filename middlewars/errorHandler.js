const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message = 'Ошибка Сервера' } = err;
  if (isCelebrateError(err)) {
    res.status = statusCode.json(err);
  } else {
    res
      .status(statusCode)
      .json({ message: statusCode === 500 ? 'Ошибка Сервера' : message });
  }
  next();
};