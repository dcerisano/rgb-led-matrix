//Aurora Borealis ambience shader
//For Windows, Linux and Mac

module.exports = {
		start: function() {
			start(params); 
		},
		getName: function() {
			return "Aurora"; 
		},
		getOnFrame: function() {
			return aurora; 
		}
}

const rgb_led_matrix = require("../rgb_led_matrix.js");

params = {};

function aurora() {      
	
	var frame = rgb_led_matrix.newFrame();
	//Aurora
	a = Math.random();
	//Borealis
	for (i=0; i<rgb_led_matrix.getSize(); i++)
	{    	
		var r = Math.random()*150;
		var g = (1-Math.random()*.85)*150;
		var b = (1-Math.random()*.85)*200;   

		if (Math.random()>.75)
		{
			r=0; g=0; b=0;
		}

		if (Math.random()>.5)
		{
			frame[i*3+0] = Math.floor(r);  //R
			frame[i*3+1] = Math.floor(g);  //G
			frame[i*3+2] = Math.floor(b);  //B
		}
	}	
	
	rgb_led_matrix.setFramerates(a*4+4, 60);	
	rgb_led_matrix.setAlpha(.01+(a/200));
	rgb_led_matrix.produceFrame(frame);     
}

//Configure stream

function start(params){
	this.params= params;
}

