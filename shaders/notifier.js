//Image notifier shader    
//User defined Shader() converts images, and morphs scaled frames to RGB device
//- Latest version of nodejs (tested with v8.9.3)
//- Latest sharp npm package (cross-platform)
//For Windows, Linux and Mac

module.exports = {
		start: function(params) {
			start(params); 
		},
		setParams: function(params) {
			this.params = params;
		},
		getName: function() {
			return "Notifer"; 
		},
		getOnFrame: function() {
			return notifier; 
		}
}

const  jimp           = require('jimp'); //Available at npmjs.com   
const  path           = require('path');
const  rgb_led_matrix = require("../rgb_led_matrix.js");                                                                                                                                                                                                                                                                                                        
const  rgb_util       = require("../utils/rgb.js");   

var    frame       = null;
var    num_frames  = 60; //Default one second.
var    params      = {};


//Stream scaled image (W x H) to BlinkStick
function notifier(){
	if (num_frames-- >= 0){
		rgb_led_matrix.setAlpha(params.alpha);	
		rgb_led_matrix.setFramerates(params.producer_framerate, params.consumer_framerate);
		rgb_led_matrix.produceFrame(frame);
	}
	else{
		rgb_led_matrix.restorePreviousShader();
	}
}

//Configure stream

function start(p){
	
	params = p;
	
	if (params.duration >= 0)
		num_frames = params.duration*60;

	if (params.image){
		console.log(params.image);
		jimp.read(params.image, function (err, image) {
			image.resize(params.width, params.height);
			frame = rgb_util.rgba2rgb(image.bitmap.data);
		});
	}
}
