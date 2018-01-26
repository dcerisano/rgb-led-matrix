function websocket_connect(ws, connect, disconnect){
	DEBUG && console.log("WEBSOCKET: CONNECT");
	try{
		onConnect         = connect;
		onDisconnect      = disconnect;
		socket            = new WebSocket(ws);
		socket.onopen     = socket_onopen;
		socket.onclose    = socket_onclose;
		socket.onerror    = socket_onerror;
		socket.onmessage  = function(event){socket_onmessage(event);};
	}
	catch(e)
	{
		DEBUG && console.log("WEBSOCKET: CONNECT ERROR");
		DEBUG && console.log(e.message);
	}
}

function socket_onopen () {
	DEBUG && console.log("WEBSOCKET: OPEN");
	socket = this;
	onConnect();
}


//MESSAGES FROM SERVER
function socket_onmessage(event) {	
	
	DEBUG && console.log("WEBSOCKET: GOT MESSAGE FROM SERVER: "+event.data.toString());
	
	var json    = JSON.parse(event.data.toString());
	var method  = json.method;
	var params  = json.params;

	switch(method)
	{
	case "setColors":
		height = params.width;
		width = params.height;
		colors  = params.colors.data;
		drawMatrix();
	default:
	}
}

function socket_onclose(e) {
	DEBUG && console.log("WEBSOCKET: ONCLOSE");
	websocket = null;
	onDisconnect();
}

function socket_onerror(e) {
	DEBUG && console.log("WEBSOCKET: ONERROR");
}

function socket_send(method, params)
{
	DEBUG && console.log("WEBSOCKET: SENT MESSAGE TO SERVER: "+ json(method, params));

	if (socket.readyState === socket.OPEN)
		socket.send(json(method, params));	
}

function json(method, params) {
	var message = { "method": method, "params": params};
	return JSON.stringify(message);
}
