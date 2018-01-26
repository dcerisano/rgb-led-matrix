//Fireplace ambience shader
//For Windows, Linux and Mac

module.exports = {
		start: function() {
			start(); 
		},
		getName: function() {
			return "Fireplace"; 
		},
		getOnFrame: function() {
			return fireplace; 
		}
}

const rgb_led_matrix = require("../rgb_led_matrix.js");

function fireplace() {   
	var frame = rgb_led_matrix.newFrame();
    
	for (i=0; i<rgb_led_matrix.getSize(); i++)
	{
		if (Math.random()<.5)
		{
			//Red to yellow spectrum
			var r = Math.random()*230+25;
			var g = r*Math.random()*.75;
			frame[i*3+0] = Math.floor(r);  //R
			frame[i*3+1] = Math.floor(g);  //G
			frame[i*3+2] = 0;              //B
		}
	}
	//Flickering flames
	f = Math.random();
	rgb_led_matrix.setFramerates(f*10+2, 60);
	rgb_led_matrix.setAlpha(.01+(f/100));
	rgb_led_matrix.produceFrame(frame);     
}

//Configure stream

function start(){
	rgb_led_matrix.setFramerates(15, 60);
}

