//Aurora Borealis ambience shader
//For Windows, Linux and Mac

module.exports = {
		start: function() {
			start(); 
		},
		getName: function() {
			return "Signature"; 
		},
		getOnFrame: function() {
			return signature; 
		}
}

const rgb_led_matrix = require("../rgb_led_matrix.js");

var pos = 0;
function signature() {       

	//Bounce particle off edges of LED strip
	if (pos++ >= rgb_led_matrix.getSize()+10) pos=0;       
	var frame = rgb_led_matrix.newFrame();
	if(pos < rgb_led_matrix.getSize()){
		frame[pos*3+0] = 255; //R
		frame[pos*3+1] = 255; //G
		frame[pos*3+2] = 255; //B
	}
	rgb_led_matrix.setAlpha(0.2);
	rgb_led_matrix.produceFrame(frame);

}

//Configure stream

function start(){
	rgb_led_matrix.setFramerates(20, 60);
}
