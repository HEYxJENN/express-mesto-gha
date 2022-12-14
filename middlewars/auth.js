// полагаю, что в комментариях к данному коду вы не совсем правы,
// сравнение токена и куки нужно для повышения уровня безопасности
// я оставил только куку, но по мнению нескольких моих знакомых senior разработчиков - такая практика хуже.
// так же на будущее для себя хотел бы оставить закомментированный код

const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // кука из реквеста
  const { secureCookie } = req.cookies;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    handleAuthError(res);
    return;
  }

  const token = extractBearerToken(authorization);

  // сравниваем токены
  if (secureCookie !== token) {
    handleAuthError(res);
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    handleAuthError(res);
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
