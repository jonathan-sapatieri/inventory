class HttpError extends Error {
  constructor(message, httpStatusCode, httpStatusMessage) {
    super(message);
    this.httpStatusCode = httpStatusCode;
    this.httpStatusMessage = httpStatusMessage;
  }
}

module.exports = HttpError;
