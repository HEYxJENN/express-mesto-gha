const INTERNAL_SERVER_MESSAGE = 'На сервере произошла ошибка';
const NOT_FOUND_MESSAGE =
  'Карточка или пользователь не найден или был запрошен несуществующий роут';
const BAD_REQUEST_MESSAGE =
  'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя и профиля';
const FORBIDDEN_MESSAGE = 'Нет доступа';
const UNAUTHORIZED_MESSAGE = 'Неправильные почта или пароль';

const OK = 200;
const CREATED = 201;
const BAD_REQUEST_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const NOT_FOUND_ERROR = 404;
const INTERNAL_SERVER_ERROR = 500;
const Forbidden = 403;

const URLregex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

module.exports = {
  OK,
  CREATED,
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  INTERNAL_SERVER_MESSAGE,
  Forbidden,
  FORBIDDEN_MESSAGE,
  UNAUTHORIZED_ERROR,
  UNAUTHORIZED_MESSAGE,
  URLregex,
};
