require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');

var indexRouter = require('./routes/index');


//For Sessions npm i express-session
const session=require('express-session');
//npm i connect-mongo
const MongoStore=require('connect-mongo')(session);


// npm i connect-flash 
//for flash messages
const flash=require('connect-flash');


// For passport.js
const User=require('./models/user');
const passport=require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middle ware for seassion

app.use(session({
secret:process.env.SECRET,
saveUninitialized:false,
resave:false,
store:new MongoStore({ mongooseConnection:mongoose.connection})

}));

//Configure passport middleware  //to initialize, then allow us to use session
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Flash messages
app.use(flash());
 
//function will run with every request,and we can access url variable in every template
app.use((req,res,next)=>{
res.locals.user=req.user;
res.locals.url=req.path;
res.locals.flash=req.flash(); //this will make flash available in all templates
next(); //or without next will freeze
});

//setup mongoose connection
mongoose.connect(process.env.DB);
mongoose.Promise=global.Promise;
//setup for error for moongose
mongoose.connection.on('error',(error)=> console.error(error.message));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


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
