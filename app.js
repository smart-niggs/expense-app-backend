'use strict'    // this cascades to the whole app as they are added as modules here
const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
// const expressValidator = require('express-validator')
const cors = require('cors');

// user modules
const { errorHandler } = require('./_helpers/myFunctions');
const { jwtAuth } = require('./_helpers/libFunctions');
const { port, envMode } = require('./_helpers/myFunctions/config');

// user variables and constants
const baseRoute = '/';


// middleware usage
// app.use(logger(envMode == 'production' ? 'tiny' : 'dev'));
app.use(logger('dev')); //  log all for now to monitor activities on the server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors()) // include before other routes
// Authentication::: !!! MUST be used before any route
app.use(jwtAuth());
// app.use(expressValidator())


app.use(baseRoute + 'expense', require('./controllers/expense.controller'));
app.use(baseRoute + 'users', require('./controllers/user.controller'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(new Error('Not Found'));
});

// error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Ledger App listening on port: ${port} Go to http://localhost:${port}${baseRoute}`);
});