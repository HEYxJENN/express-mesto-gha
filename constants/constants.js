const INTERNAL_SERVER_MESSAGE = 'На сервере произошла ошибка';
const NOT_FOUND_MESSAGE =
  'Карточка или пользователь не найден или был запрошен несуществующий роут';
const BAD_REQUEST_MESSAGE =
  'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя и профиля';
// const FORBIDDEN_MESSAGE = 'Нет доступа';

const OK = 200;
const CREATED = 201;
const BAD_REQUEST_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const INTERNAL_SERVER_ERROR = 500;
// const Forbidden = '403';

module.exports = {
  OK,
  CREATED,
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  INTERNAL_SERVER_MESSAGE,
  // Forbidden,
  // FORBIDDEN_MESSAGE,
};
