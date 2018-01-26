//Ambient display (ambilight) shader  
//Real-time streaming of desktop to RGB devices
//User defined Shader() samples the desktop, and morphs scaled frames to device
//Minimum Requirements: 
//- Latest version of nodejs (tested with v8.9.3)
//- Latest screenshot-desktop and sharp npm packages (all cross-platform)
//For Windows, Linux and Mac

module.exports = {
		start: function(p) {
			start(p); 
		},
		getName: function() {
			return "Ambilight"; 
		},
		getOnFrame: function() {
			return ambilight; 
		}
}

const  rgb_led_matrix = require("../rgb_led_matrix.js");   
const  jimp           = require('jimp'); //Available at npmjs.com  
const  rgb_util       = require("../utils/rgb.js");                                                                                                                                                                     
const  screenshot     = require('../utils/screenshot'); //Available at npmjs.com                                                                                                                                                                                                                                                                                

var params = {};

//Stream scaled desktop (matrix WxH) to device via async futures pipeline
function ambilight(){
	screenshot().then((data) => {
		    jimp.read(data, function (err, image) {
		    image.crop(0,0, image.bitmap.width/1.8, image.bitmap.height);
			image.resize(params.width, params.height);
			frame = rgb_util.rgba2rgb(image.bitmap.data);
			rgb_led_matrix.setFramerates(params.producer_framerate, params.consumer_framerate);
			rgb_led_matrix.setAlpha(params.alpha);
			rgb_led_matrix.produceFrame(frame);
		})
	});
}

//Configure stream

function start(p){
	params = p;
}

