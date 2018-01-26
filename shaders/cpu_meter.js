//CPU load metering shader
//User defined Shader() is a particle trail emitter to indicate CPU load. 
//For Windows, Linux and Mac

module.exports = {
		start: function() {
			start(); 
		},
		getName: function() {
			return "CPU Meter"; 
		},
		getOnFrame: function() {
			return cpuMeter; 
		}
}

const os          = require("os");
const rgb_led_matrix = require("../rgb_led_matrix.js");

var framerate = 30;  // Varies with CPU load   

var startMeasure  = cpuLoad();
var percentageCPU = 0;
var cpu_avg       = 0;
var pos           = 0;
var speed         = 1;

function cpuMeter() {       
	var endMeasure      = cpuLoad(); 
	var idleDifference  = endMeasure.idle - startMeasure.idle;
	var totalDifference = endMeasure.total - startMeasure.total;

	startMeasure = endMeasure;

	if (totalDifference != 0)
		percentageCPU = 100 - (100 * idleDifference / totalDifference);

	cpu_avg = (cpu_avg+percentageCPU)/2;

	//Vary the producer framerate by percentage CPU load (1 to 30 fps)
	framerate = cpu_avg*0.26+4;

	//Bounce particle off edges of LED strip
	if (pos<0 || pos>rgb_led_matrix.getSize()-1)
		speed =-speed;         
	pos += speed;

	var frame = rgb_led_matrix.newFrame();
	//Vary particle colour by CPU load (green to amber to red)        
	frame[pos*3+0] = Math.floor(cpu_avg*2.5)+5; //R
	frame[pos*3+1] = 130-Math.floor(cpu_avg*1.3);   //G
	frame[pos*3+2] = 0;                         //B

	rgb_led_matrix.setFramerates(framerate, 60);
	rgb_led_matrix.setAlpha(.03+cpu_avg/1000);
	rgb_led_matrix.produceFrame(frame);     
}

//CPU load 
function cpuLoad() {
	var totalIdle = 0;
	var totalTick = 0;
	var cpus      = os.cpus();

	for(var i = 0, len = cpus.length; i < len; i++) {
		var cpu = cpus[i];
		for(type in cpu.times) {
			totalTick += cpu.times[type];
		}     
		totalIdle += cpu.times.idle;
	}
	return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

//Configure stream

function start(){
	pos = 0;
	rgb_led_matrix.setFramerates(30, 60);
}


