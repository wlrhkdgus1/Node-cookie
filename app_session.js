var express = require('express');
var session = require('express-session')
var app = express();

app.use(session({
    secret: '32Sdt@23SDwaSFRw',
    resave: false,  // session id를 접속할때마다 새로 발급하는것을 하지 않는다.
    saveUninitialized: true, // session을 실제로 사용하기 전까지는 발급하지 말아라.
    
  })); 

app.get('/count', function(req, res){
    if(req.session.count){
      req.session.count++;
    } else {
      req.session.count = 1;
    }
    res.send("count : "+req.session.count)
});
app.listen(3003, function(){
    console.log('Connected 3003 port!!!');
});