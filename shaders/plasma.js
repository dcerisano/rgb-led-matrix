//Old School Plasma
//In memory of Gilbert Rankin
//For Windows, Linux and Mac

module.exports = {
		start: function(params) {
			start(params); 
		},
		getName: function() {
			return "Plasma"; 
		},
		getOnFrame: function() {
			return plasma; 
		}
}

const rgb_led_matrix = require("../rgb_led_matrix.js");

var params = {};

function plasma() {      

	var frame = rgb_led_matrix.newFrame();
	var time = Date.now()*.0005;   
    
	for (u = 0; u<params.width; u++){
		for (v = 0; v<params.height; v++){
           var  cx=0, cy=0, x=0, y=0, z=0, length=0, r=0, g=0, b=0, k=params.scale;

			x = u/params.width;
			y = v/params.height;

			cx  = x * k - k/2.0;
			cy  = y * k - k/2.0;

			z += Math.sin((cx+time));
			z += Math.sin((cy+time)/2.0);
			z += Math.sin((cx+cy+time)/2.0);
			cx += k/2.0 * Math.sin(time/3.0);
			cy += k/2.0 * Math.cos(time/2.0);
			z += Math.sin(Math.sqrt(cx*cx+cy*cy+1.0)+time);
			z = z/2.0;

			r = 1;
			g = Math.sin(Math.PI*z);
			b = Math.cos(Math.PI*z);

			frame[(v*params.width+u)*3+0] = (r*.5+.5)*128;
			frame[(v*params.width+u)*3+1] = (g*.5+.5)*128;
			frame[(v*params.width+u)*3+2] = (b*.5+.5)*128;
		}
	}

	rgb_led_matrix.setFramerates(params.producer_framerate, params.consumer_framerate);	
	rgb_led_matrix.setAlpha(params.alpha);
	rgb_led_matrix.produceFrame(frame);    

}

//Configure stream

function start(p){
	params= p;
}

