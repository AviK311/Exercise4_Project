var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var branchRouter = require('./routes/branch');
var flowerRouter = require('./routes/flowers');
var orderRouter = require('./routes/orders');
var cartRouter = require('./routes/cart');



const session = require("express-session");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "poo" }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/branches', branchRouter);
app.use('/flowers', flowerRouter);
app.use('/orders', orderRouter);
app.use('/cart', cartRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
app.use(function(req, res, next) {
    setTimeout(next, 1000);
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

const currentSessions = {}; //key - sessionID. val - userID
const lockedSessions = {}; //key - sessionID. val - object(key - userID. val - lock time)
const passwordattempts = {}; //key - sessionID. val - object(key - userID. val - attempts)