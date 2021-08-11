const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routers');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', router);

module.exports = app;
