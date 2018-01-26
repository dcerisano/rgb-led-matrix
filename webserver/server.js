//Very simple websocket server to switch between shaders
//eg. http://localhost:5000 for the client UI
//eg. http://localhost:5000/?shader=ambilight for a specific shader

var DEBUG = true;

module.exports = {
		send: function(method,params) {
			send(method, params);
		}
}

const rgb_led_matrix = require('../rgb_led_matrix.js');
const express        = require('express');
const http           = require('http');
const url            = require('url');
const path           = require('path');
const WebSocket      = require('ws');

const ambilight   = require("../shaders/ambilight.js");
const notifier    = require("../shaders/notifier.js");
const unicorn     = require("../shaders/unicorn.js");
const fireplace   = require("../shaders/fireplace.js");
const aurora      = require("../shaders/aurora.js");
const timesquare  = require("../shaders/timesquare.js");
const cpu_meter   = require("../shaders/cpu_meter.js"); 
const signature   = require("../shaders/signature.js"); 
const fade_out    = require("../shaders/signature.js"); 
const plasma      = require("../shaders/plasma.js"); 

var app    =  express();
var server = http.createServer(app);
var socket = null;

//REST API

app.get('/', function (req, res) {

	params = {};
	params.width=8;
	params.height=1;

	if(req.query.image)
		params.image=req.query.image;
	
	params.name=req.query.shader;
	params.shader=req.query.shader;
	set_shader(params);
	res.end();
});


//WEBSOCKET API

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
	socket = ws;

	//GOT MESSAGE FROM CLIENT
	socket.on('message', function incoming(message) {
		DEBUG && console.log("WEBSOCKET: GOT MESSAGE FROM CLIENT: "+message.toString());
		interpret(message.toString());
	});

	//ERRORS FROM WEBSOCKET
	socket.on('error', function () {
		DEBUG && console.log("WEBSOCKET: ERROR");
	});
});

function send(method, params)
{   
	//SEND MESSAGE TO CLIENT
	DEBUG && console.log("WEBSOCKET: SENT MESSAGE TO CLIENT: "+json(method, params));
	if (socket && socket.readyState === WebSocket.OPEN)
		socket.send(json(method, params));
}

function set_shader(params)
{
	switch(params.shader) {
	case "cpu_meter":
		rgb_led_matrix.setShader(cpu_meter, params);
		break;
	case "notifier":
		params.image = path.join(__dirname + "/img/" + params.image);
		rgb_led_matrix.setShader(notifier, params);
		break;
	case "aurora":
		rgb_led_matrix.setShader(aurora, params);
		break;
	case "unicorn":
		rgb_led_matrix.setShader(unicorn, params);
		break;
	case "fireplace":
		rgb_led_matrix.setShader(fireplace, params);
		break;
	case "ambilight":
		rgb_led_matrix.setShader(ambilight, params);
		break;
	case "timesquare":
		rgb_led_matrix.setShader(timesquare, params);
		break;
	case "signature":
		rgb_led_matrix.setShader(signature, params);
		break;
	case "plasma":
		rgb_led_matrix.setShader(plasma, params);
		break;
	case "fade_out":
		rgb_led_matrix.setShader(fade_out, params);
	case "stop":
		rgb_led_matrix.stop();
		break;
	case "start":
		rgb_led_matrix.start();
		break;
		break;
	default:
	}
}

function interpret(message)
{
	var json    = JSON.parse(message);
	var method  = json.method;
	var params  = json.params;

	switch(method) {
	case "set_shader":
		set_shader(params);
		break;
	default:
	}
}

function json(method, params) {
	var message = {"method": method, "params": params};
	return JSON.stringify(message);
}

rgb_led_matrix.setShader(signature, {"width": 8, "height": 1});

server.listen(8080, function listening() {
	console.log('Listening on %d', server.address().port);
});	
