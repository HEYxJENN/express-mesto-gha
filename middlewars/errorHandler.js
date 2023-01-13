const {
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  INTERNAL_SERVER_MESSAGE,
  Forbidden,
  FORBIDDEN_MESSAGE,
} = require('../constants/constants');

module.exports = (err, req, res, next) => {
  console.log('BBB', err);

  console.log('CCC', err.status);

  if (err.status === 404) {
    res.status(NOT_FOUND_ERROR).json({ message: NOT_FOUND_MESSAGE });
  } else if (err.status === 403) {
    res.status(Forbidden).json({ message: FORBIDDEN_MESSAGE });
  } else if (err.name === 'CastError') {
    res.status(BAD_REQUEST_ERROR).json({ message: BAD_REQUEST_MESSAGE });
  } else {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: INTERNAL_SERVER_MESSAGE });
  }

  next();
};
