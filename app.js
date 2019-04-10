var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.all("*",function(req,res,next){
//   //设置允许跨域的域名，*代表允许任意域名跨域
//   res.header("Access-Control-Allow-Origin","*");
//   //允许的header类型
//   res.header("Access-Control-Allow-Headers","content-type");
//   //跨域允许的请求方式 
//   res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
//   next();
// })
const whiteListUrl = {
  get: [],
  post: [
    '/login',
  ]
}
const hasOneOf = (str, arr) => {
  return arr.some(item => item.includes(str))
}

app.all("*", function(req, res, next){
  let method = req.method.toLowerCase()
  let path = req.path
  //不需要校验token
  if(whiteListUrl[method] && hasOneOf(path, whiteListUrl[method])) next()
  else {
    const token = req.headers.authorization
    if(!token) res.status(401).send('there is no token , please login')
    else {
      jwt.verify(token,'abcd', (error, decode) =>{
        if(error) res.send({
          code: 401,
          mes: 'token error',
          data: {}
        })
        else {
          req.userName = decode.name
          next()
        }
      })
    }
  }
})
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
