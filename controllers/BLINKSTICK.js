//Device driver for BlinkStick RGB LED controller (64 LEDS per channel)
//Only the following methods are required to support any controller:
//turnOff()   - turns controller off
//setColors() - sends RGB data to controller
//getMaxSize()- maximum number of LEDs supported
//getName( )-   Device name

const blinkstick = require('./api/blinkstick.js');
const jimp       = require('jimp');
const rgb_util   = require('../utils/rgb.js');
var name       = null;
var device     = null;
var busy       = false;
var MAX_SIZE   = 64;  
var colors     = null;
var timeout    = 1;
var connected  = false;
var params     = {};


module.exports = {
		setParams: function(params) {
			this.params = params;
		},
		getName: function() {
			return "BlinkStick";
		},		
		getMaxSize: function() {
			return MAX_SIZE;
		},
		turnOff: function(fn) {
			colors = new Buffer(colors.length) 
			if (device)
				device.setColors(0, colors, function(err, colors) { 
					device.turnOff(); // close(fn) also supported
					if (fn != null) fn();
				});
		},
		setColors: function(name, w, h, rgb_buffer) {		
			if (device && !busy){
				    var image = new jimp(w, h, function (err, image) {
					image.bitmap.data = rgb_util.rgb2rgba(rgb_buffer);
					image.resize(params.width, params.height);
					colors = convert_grb(rgb_util.rgba2rgb(image.bitmap.data));
					device.setColors(0, colors, function(err, colors) { 
						busy = false;
					});
				});
			}
		}
}


//Convert to internal BlinkStick color format (RGB ==> GRB)
function convert_grb(rgb){
	var grb = new Buffer(rgb.length);
	for (var i = 0; i<rgb.length; i++) {
		grb[i*3+1] = rgb[i*3+0]; // G
		grb[i*3+0] = rgb[i*3+1]; // R
		grb[i*3+2] = rgb[i*3+2]; // B
	}
	return grb;
}

//Any controller specific initialization code here.
function start(p)
{
	if (p)
		params = p;
	else{  
		params = {};
		params.width = 8;
		params.height = 1;
	}


	device = blinkstick.findFirst();

	if (device){
		if (!connected)
		{
			connected = true;
			device.getDescription(function(err, data) {
				name = data;
				console.log(name+" connected");
			});
		}
	}
	else{
		if (connected)
			console.log(name+" disconnected")
			connected = false;
	}
}

function connect(params)
{
	while (timeout--) 
		clearTimeout(timeout); 	
	start(params);
	timeout = setTimeout(connect, 1000);	
}

connect();

