const HttpError = require('./http_error');
class HttpError400 extends HttpError {
  constructor(message) {
    super(message, 400, 'Bad Request');
  }
}

module.exports = HttpError400;
