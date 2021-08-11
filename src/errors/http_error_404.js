const HttpError = require('./http_error');
class HttpError404 extends HttpError {
  constructor(message) {
    super(message, 404, 'Not Found');
  }
}

module.exports = HttpError404;
