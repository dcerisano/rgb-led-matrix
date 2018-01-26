//Aurora Borealis ambience shader
//For Windows, Linux and Mac

module.exports = {
		start: function() {
			start(); 
		},
		getName: function() {
			return "Fade Out"; 
		},
		getOnFrame: function() {
			return fade_out; 
		}
}

const rgb_led_matrix = require("../rgb_led_matrix.js");

function fade_out() {       
	var frame = newFrame();
	
	rgb_led_matrix.setAlpha(0.01);
	produceFrame(frame);
}

function start(){
	setFramerates(20, 60);
}
