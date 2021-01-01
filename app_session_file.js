var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var fileStoreOptions = {};
var bodyParser = require('body-parser'); //bodyParser 사용법1
const { send } = require('process');
var app = express();

app.use(bodyParser.urlencoded({ extended: false})); // bodyParser 사용법2

app.use(session({
    secret: '32Sdt@23SDwaSFRw',
    resave: false,  // session id를 접속할때마다 새로 발급하는것을 하지 않는다.
    saveUninitialized: true, // session을 실제로 사용하기 전까지는 발급하지 말아라.
    store: new FileStore(fileStoreOptions)
  })); 

app.get('/count', function(req, res){
    if(req.session.count){
      req.session.count++;
    } else {
      req.session.count = 1;
    }
    res.send("count : "+req.session.count)
});
app.get('/auth/logout', function(req,res){
  delete req.session.displayName; // javascript 명령어 delete // session 데이터를 삭제시킴
  res.redirect('/welcome');
});
app.get('/welcome', function(req,res){
  if(req.session.displayName){
    res.send(`
      <h1>Hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">logout</a>
    `);
  } else {
    res.send(`
      <h1>Welcome</h1>
      <a href="/auth/login">Login</a>
    `)
  }
});
app.post('/auth/login',function(req,res){
  var user = {
    username:'amarans',
    password:'111',
    displayName:'Amarans'
  };
  var uname = req.body.username;
  var pwd = req.body.password;
  if(uname === user.username && pwd === user.password){
    req.session.displayName = user.displayName;
    res.redirect('/welcome');
  }else{
    res.send('Who are you? <a href="/auth/login">login</a>');
  }
});
app.get('/auth/login', function(req,res){
  var ourput = `
  <h1>Login</h1>
  <form action="/auth/login" method="post">
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
  `;
  res.send(ourput);
});
app.listen(3003, function(){
    console.log('Connected 3003 port!!!');
});