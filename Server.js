
var Chatbot=require('./Chatbot_V1.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
var sesId=12343426789;
var fs=require('fs');
//app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.raw());
app.use(bodyParser.json());

app.get('/', function (req, res) {
    fs.readFile("CHATBOT.html",function(err,data) {
      if(err)
        {res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");}
      else
      {
        res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
      }
      // body
    })  

});

app.post('/process_get',function(req,res)
{
    //console.log("GOT REQUEST");
    //console.log(req.body.querry);
    var question=req.body.querry;
    Chatbot(sesId,question,function(reply){
      //console.log(1)
      console.log(reply.answer);
      res.write(reply.answer);
    });
    
        
});


var server = app.listen(8090, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
})