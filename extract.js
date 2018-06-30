/*
Device Manager Chatbot Middleware Parameter Extraction & Operations
Ritam De || 28.06.2018 || TCS Onternship
Middleware Code ~ Dialogflow v1
*/

// Dependencies 
const express = require('express');
const bodyparser = require('body-parser');

// Configuration
const app = express();
app.use(bodyparser.json());

// Webhook route
app.post('/webhook', (req, res) => {

	// Data obtained from request
	const data = req.body;
	
	// Parameters
	const parameters = data.result.parameters.DeviceList;
	
	//Session ID
	const session_id = data.sessionId;
	console.log(data);

	//Response to Dialogflow
	const response = {
		speech: "Awesome! Your request for a "+parameters+" is generated",
		displayText: "Awesome! Your request for a "+parameters+" is generated"
	};
	res.json(response);
});

// HTTP local server
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})


