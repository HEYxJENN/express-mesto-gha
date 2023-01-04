const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  // console.log('middleware', isCelebrateError(err));
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
