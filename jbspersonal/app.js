var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/mydb' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});

const CommentsController = require('./controllers/CommentsController.js')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req,res,next){
  console.log("about to look for routes!!!")
  //console.dir(req.headers)
  next()
});


app.get('/', function(req, res, next) {
  res.render('index',{title:"Express Demo"});
});
app.get('/login', function(req, res, next) {
  res.render('login',{title:"login"});
});

app.get('/donation', function(req, res, next) {
  res.render('donation',{title:"donation"});
});
app.get('/ContactUs', function(req, res, next) {
  res.render('ContactUs',{title:"ContactUs"});
});



app.use(function(req,res,next){
  console.log("about to look for post routes!!!")
  next()
});

function processFormData(req,res,next){
  res.render('formdata',
     {title:"Form Data",Name:req.body.Name,Email:req.body.Email,Subject:req.body.Subject, Details:req.body.Details});
}

app.post('/processform',CommentsController.saveComments);

app.get('/showComments',CommentsController.getAllComments);

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
