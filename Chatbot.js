// You can find your project ID in your Dialogflow agent settings
const projectId = 'booker-dfe8f'; //https://dialogflow.com/docs/agents#settings
const sessionId = '12345678990';
const query = "I know Spanish";
const languageCode = 'en-US';

process.env.GOOGLE_APPLICATION_CREDENTIALS="Booker-3796737b2d40.json";
// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);


const request ={
  session: sessionPath,
  queryInput: {
    text: {
      text: query,
      languageCode: languageCode,
    },
  },
};


var events=require('events')
var eventEmitter=new events.EventEmitter();

var myeventhandler=function(querry,device_form,res){

  var tosend={
      session: sessionPath,
      queryInput:{
        text:{
          text:querry,
          languageCode:languageCode,
        },
      },
  };


 


  sessionClient
  .detectIntent(tosend)
  .then(responses => {
    //console.log('Detected intent');
    const result = responses[0].queryResult;
    //console.log(`  Query: ${result.queryText}`);
    //console.log(`  Response: ${result.fulfillmentText}`);
    console.log(`Query:${result.queryText}`);
    //console.log(`Response:${result.fulfillmentText}`);  
    console.log(result.parameters);
    //console.log(`${result.action}`);

    console.log(result.fulfillmentText);
   // res.send();

 })
  .catch(err => {
    console.error('ERROR:', err);
    
  });
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
    var device_form={form_factor:null,
  processor:null,
  os:null,
  model:null
    };
    eventEmitter.on('REPLY',myeventhandler);
    eventEmitter.emit('REPLY',question,device_form,res);
        
});


var server = app.listen(8080, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
})



