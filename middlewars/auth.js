// полагаю, что в комментариях к данному коду вы не совсем правы,
// сравнение токена и куки нужно для повышения уровня безопасности
// я оставил только куку, но по мнению нескольких моих знакомых senior разработчиков - такая практика хуже.
// так же на будущее для себя хотел бы оставить закомментированный код, как пример best practice
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const handleAuthError = (res, next) => {
  console.log('handleAuthErr');
  next(new Unauthorized('Требуется авторизация'));
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // кука из реквеста

  // console.log(req.cookies);
  // const { secureCookie } = req.cookies;

  // if (!secureCookie) {
  //   handleAuthError(res, next);
  //   return;
  // }

  if (!authorization || !authorization.startsWith('Bearer ')) {
    handleAuthError(res, next);
    return;
  }

  const token = extractBearerToken(authorization);

  // сравниваем токены
  // if (secureCookie !== token) {
  //   handleAuthError(res,next);
  //   return;
  // }

  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
    // payload = jwt.verify(secureCookie, 'super-strong-secret');
  } catch (err) {
    handleAuthError(res, next);
    console.log('WRONG2');
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
