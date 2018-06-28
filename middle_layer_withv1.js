'use strict';

var events=require('events')
var eventEmitter=new events.EventEmitter();
// var apiai = require("../module/apiai");


var myeventhandler=function(querry){

 var apiai = require("apiai");

var app = apiai("01603c3ab08e4618bb6ba146d14b4641");


  var options = {
    sessionId: '12345'};

var request = app.textRequest(querry, options);

request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();


};



var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 

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
    console.log("GOT REQUEST");
    console.log(req.body.querry);
    var question=req.body.querry;
    eventEmitter.on('REPLY',myeventhandler);
    eventEmitter.emit('REPLY',question);
        
});


var server = app.listen(8080, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
})