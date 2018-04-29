var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var firebase = require ("firebase");
var http = require('http');
var async = require('async');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var home = require('./routes/home');
var self_checkout = require('./routes/self_checkout');
var add_items = require('./routes/add_items');
var checkout = require('./routes/checkout');
var finalized_bill = require('./routes/finalized_bill');
var ir_ads = require('./routes/ir_ads');
var join_queue = require('./routes/join_queue');
var product = require('./routes/product');
var prodxprod = require('./routes/prodxprod');
var remove_items = require('./routes/remove_items');
var view_bill = require('./routes/view_bill');

var app = express();

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDiWj84GS73KW_R5qLTUpvTXVbIRUAuNsQ",
    authDomain: "supercart-f83c1.firebaseapp.com",
    databaseURL: "https://supercart-f83c1.firebaseio.com",
    projectId: "supercart-f83c1",
    storageBucket: "supercart-f83c1.appspot.com",
    messagingSenderId: "122025235969"
};
firebase.initializeApp(config);
var database = firebase.database();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/home', home);
app.use('/self_checkout', self_checkout);
app.use('/add_items', add_items);
app.use('/checkout', checkout);
app.use('/finalized_bill', finalized_bill);
app.use('/ir_ads', ir_ads);
app.use('/join_queue', join_queue);
app.use('/product', product);
app.use('/prodxprod', prodxprod);
app.use('/remove_items', remove_items);
app.use('/view_bill', view_bill);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
