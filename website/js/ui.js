function start()
{
	DEBUG && console.log("UI INIT");

	connect();
}

function on_connect()
{
	DEBUG && console.log("UI CONNECTED");
	connected = true;

	random_shader();
}

function on_disconnect()
{
	DEBUG && console.log("UI DISCONNECTED");
	connected = false;

	while (timeout--) 
		window.clearTimeout(timeout); 

	timeout = setTimeout(connect, 1000);
}

function connect()
{
	if(!connected)
		websocket_connect("ws://"+webserver, on_connect, on_disconnect);
}

function random_shader()
{	
	var params = {};
	
	//pull these from control div
	params.shader       = shaders[Math.floor(Math.random()*shaders.length)];	
	params.width        = Math.floor(Math.random()*16+1);
	params.height       = Math.floor(Math.random()*16+1);
	params.producer_framerate = 10; 
 	params.consumer_framerate = 60; 
	params.alpha        = 10;  

    
	if (params.shader == "notifier"){
		params.image        = images[Math.floor(Math.random()*images.length)];
		params.producer_framerate = 10; 
	 	params.consumer_framerate = 60; 
		params.duration     = .3;
		params.alpha        = .2;
		params.width        = 16;
		params.height       = 16;
	}

	if (params.shader == "ambilight"){
		params.producer_framerate = 8; 
		params.consumer_framerate = 32; 
		params.alpha        = .25;
		params.width        = 32;
		params.height       = 18;
	}
	
	if (params.shader == "plasma"){
		params.producer_framerate = 30; 
		params.consumer_framerate = 60; 
		params.alpha        = .5;
		params.scale        =  (params.width+params.height)/3;
	}
	
	socket_send("set_shader", params);

	while (timeout--) 
		window.clearTimeout(timeout); 

	timeout = setTimeout(random_shader, 10000);
}

start();