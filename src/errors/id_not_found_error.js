const HttpError404 = require('./http_error_404');

class IdNotFoundError extends HttpError404 {
  constructor(id) {
    super(`Id ${id} not found in the database.`);
  }
}

module.exports = IdNotFoundError;
