require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');
const compression=require('compression');
//npm i helmet
const helmet=require('helmet');

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

//helmet 
app.use(helmet());

//compress responses //npm i compression
app.use(compression());

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
//this for the new mongoose conenction
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

//setup mongoose connection
mongoose.connect(process.env.DB,options);
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
