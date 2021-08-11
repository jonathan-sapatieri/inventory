const router = require('express').Router();
const providersRouter = require('./providers_router');

// CORS
router.use('/', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();  
});

// ROUTERS
router.use('/providers', providersRouter);

// ERRORS
router.use((error, req, res, next) => {
  console.log(`**ERROR**: ${error.message}`);
  error.httpStatusCode ? res.status(error.httpStatusCode) : res.status(500);
  res.json({
    message: error.message,
    httpStatusCode: error.httpStatusCode,
    httpStatusMessage: error.httpStatusMessage,
    date: new Date().toISOString(),
  });
});

module.exports = router;