//Device driver for I2CBACKPACK compatible RGB LED controllers (500 LEDS per channel)
//Only the following methods are required to support any controller:
//turnOff()   - turns controller off
//setColors() - sends RGB data to controller
//getMaxSize()- Maximum number of LEDs supported
//TODO: node-pixel/johnny5 integration for specific devices

var device     = null;
var busy       = false;
var MAX_SIZE   = 500;

module.exports = {
		getName: function() {
			return "I2CBACKPACK";
		},		
		getMaxSize: function() {
			return MAX_SIZE;
		},
		turnOff: function(fn) {
			if (fn != null) fn();
		},
		setColors: function(name, w, h, rgb_buffer) {
		}
}


//Any controller specific initialization code here.
function start()
{
}

start();