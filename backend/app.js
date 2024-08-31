const createError = require('http-errors');
const express = require('express');

const indexRouter = require('./routes/index');
const ramRouter = require('./routes/ram');

const initDatabase = require("./db/init");

const app = express();

// view engine setup
app.set('view engine', 'hbs'); //could comment out/remove but it will produce warnings

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//fill db with mock data
initDatabase();

// define routes
app.use('/', indexRouter);
app.use('/ram', ramRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
