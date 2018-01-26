//Device driver for Emulator (arbitrary number LEDS per channel)
//Only the following methods are required to support any controller:
//turnOff()   - turns controller off
//setColors() - sends RGB data to controller
//getMaxSize()- Maximum number of LEDs supported
//TODO: node-pixel/johnny5 integration for specific devices

const server    = require('../webserver/server.js');
var   device    = null;
var   busy      = false;
var   MAX_SIZE  = Number.MAX_SAFE_INTEGER;  
var   power     = false;

module.exports = {
		getName: function() {
			return "Emulator";
		},		
		getMaxSize: function() {
			return MAX_SIZE;
		},
		turnOff: function(fn) {
			power = false;
			if (fn != null) fn();
		},
		setColors: function(name, width, height, colors) {
			var frame={};
			frame.name   =  name;
			frame.width  =  width;
			frame.height =  height;
		    frame.colors =  colors;	
			if (server)
				server.send("setColors",frame);
		}
}


//Any controller specific initialization code here.
function start()
{
	power = true;
}

start();