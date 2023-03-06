module.exports = (err, req, res, next) => {
  // console.log('BBB', err);
  // console.log('CCC', err.status);
  // console.log('DDDD', err.message);
  const statusCode = err.status || 500;
  const { message } = err;
  // console.log(statusCode, message);
  res
    .status(statusCode)
    .json({ message: statusCode === 500 ? 'Ошибка Сервера' : message });
  next();
};
