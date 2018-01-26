//Times Square ambience shader
//For Windows, Linux and Mac

module.exports = {
		start: function() {
			start(); 
		},
		getName: function() {
			return "Times Square"; 
		},
		getOnFrame: function() {
			return timesquare; 
		}
}

const rgb_led_matrix = require("../rgb_led_matrix.js");

var frame = rgb_led_matrix.newFrame();  
function timesquare() {   
  
	// Scrolling random patterns
	var off = 20;
	var amp = 150;
	var r = Math.random()*amp+off;
	var g = Math.random()*amp+off;
	var b = Math.random()*amp+off;


	//Shift() not supported for Buffers, so ..
	for (i=rgb_led_matrix.getSize()-1;i>0; i--){
		frame[i*3+0] = frame[(i-1)*3+0];
		frame[i*3+1] = frame[(i-1)*3+1];
		frame[i*3+2] = frame[(i-1)*3+2];
	}

	// Random separators
	if (Math.random()>.8){
		r = 0; g = 0; b = 0;
	}	

	//Push() not supported for Buffers, so ..
	frame[0] = Math.floor(r);  //R
	frame[1] = Math.floor(g);  //G
	frame[2] = Math.floor(b);  //B

	rgb_led_matrix.setAlpha(.01);
	rgb_led_matrix.produceFrame(frame);     
}

//Configure stream

function start(){
	frame = rgb_led_matrix.newFrame();  
	rgb_led_matrix.setFramerates(2, 60);

}

