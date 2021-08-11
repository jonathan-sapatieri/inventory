const HttpError400 = require('./http_error_400');

class InvalidFieldError extends HttpError400 {
  constructor(field, value) {
    super(`Invalid value ${value} for the field ${field}.`);
  }
}

module.exports = InvalidFieldError;
