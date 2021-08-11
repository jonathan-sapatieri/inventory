const HttpError = require('./http_error');
class HttpError500 extends HttpError {
  constructor(message) {
    super(message, 500, 'Internal Server Error');
  }
}

module.exports = HttpError500;
