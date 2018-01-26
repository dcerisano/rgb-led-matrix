//Aurora Borealis ambience shader
//For Windows, Linux and Mac

module.exports = {
		start: function() {
			start(); 
		},
		getName: function() {
			return "Unicorn"; 
		},
		getOnFrame: function() {
			return unicorn; 
		}
}

const rgb_led_matrix = require("../rgb_led_matrix.js");

function unicorn() {
	var frame = rgb_led_matrix.newFrame();      
	// Unicorn rainbow happy joy 
	var off = 0;
	var amp = 150;
    
	for (i=0; i<rgb_led_matrix.getSize(); i++)
	{   
		var r = Math.random()*amp+off;
		var g = Math.random()*amp+off;
		var b = Math.random()*amp+off;

		frame[i*3+0] = Math.floor(r);  //R
		frame[i*3+1] = Math.floor(g);  //G
		frame[i*3+2] = Math.floor(b);  //B
	}
	rgb_led_matrix.setAlpha(.01);
	rgb_led_matrix.produceFrame(frame);     
}

//Configure stream

function start(){
	rgb_led_matrix.setFramerates(2, 60);
}

