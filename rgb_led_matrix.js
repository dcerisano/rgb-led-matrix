//Producer pushes frames to the stream as simple RGB arrays at a set rate
//Consumer pulls frames from the stream and renders them to devices at a set rate
//When consumer rate is faster than production rate, alpha (opacity) allows frame morphing 
//For Windows, Linux and Mac

var DEBUG = false;

const emulator    = require('./controllers/EMULATOR.js');
const blinkstick  = require('./controllers/BLINKSTICK.js');
const firmata     = require('./controllers/FIRMATA.js');
const I2Cbackpack = require('./controllers/I2CBACKPACK.js');


var devices = [];
devices.push(blinkstick);
devices.push(emulator);
devices.push(firmata);
devices.push(I2Cbackpack);

module.exports = {
		start: function() {
			start(); 
		},
		setShader: function(shader, params) {
			setShader(shader, params)
		},
		savePreviousShader: function() {
			savePreviousShader(); 
		},
		restorePreviousShader: function() {
			restorePreviousShader(); 
		},
		newFrame: function() {
			return newFrame(); 
		},
		clearFrame: function(frame)
		{
			clearFrame(frame);
		},
		setAlpha: function(a)
		{
			setAlpha(a);
		},
		getAlpha: function()
		{
			return getAlpha();
		},
		produceFrame: function(frame)
		{
			produceFrame(frame);
		},
		setFramerates: function(producer_fps, consumer_fps)
		{
			setFramerates(producer_fps, consumer_fps);
		},
		getProducerFramerate: function()
		{
			return getProducerFramerate();
		},
		getConsumerFramerate: function()
		{
			return getConsumerFramerate();
		},
		setSize: function(w, h)
		{
			setSize(w, h);
		},
		getSize: function()
		{
			return getSize();
		},
		getWidth: function()
		{
			return width;
		},
		getHeight: function()
		{
			return height;
		},
		start: function()
		{
			start();
		},
		stop: function()
		{
			stop();
		},
		isStreaming: function()
		{
			return streaming;
		}
}

var shader             = null;
var params             = null;
var onFrame            = null;
var width              = 8;     //Default 8 LEDs in a
var height             = 1;     //single row.
var producer_framerate = 20;    //Default low frame production for morphing
var consumer_framerate = 60;    //Default high frame rendering for morphing
var alpha              = 0.1;   //Default is transparent frames for morphing
var stream             = [];    //Stream for frames
var composite          = null;  //Composite frame for morphing
var currentFrame       = null;  //Latest frame from stream
var streaming          = false; //Pause
var producer_timer     = null;
var consumer_timer     = null;

var prevShader             = null;
var prevParams             = null;
var prevConsumerFramerate  = 0;
var prevProducerFramerate  = 0;
var prevAlpha              = 0;

//Stream Producer 
function producer(){
	if (streaming)
		onFrame(); //Call user defined function
	producer_timer = setTimeout(producer, 1000/producer_framerate); 
}

//Stream Consumer
function consumer(){
	if (streaming)
		consumeFrame(); //Render frame to BlinkStick
	consumer_timer = setTimeout(consumer, 1000/consumer_framerate);
}

//Create an empty frame
function newFrame(){
	return new Buffer(getSize()*3);
}

//Clear a frame
function clearFrame(frame){
	if (frame != null)
		for (i=0; i<getSize()*3; i++)
			frame[i] =0;
}


//Produce frame on stream - called from user-defined Shader()
function produceFrame(frame)
{
	if (stream.length<=0) //Skip frame if consumer is falling behind
		stream.push(frame);
}

//Consume frame from stream - called from consumer
function consumeFrame()
{
	if (stream.length>0) //Check if new frame available
		currentFrame = stream.shift();

	if (currentFrame != null)
		morphFrame(currentFrame); //Morph to the current frame
}

//Morph current frame over composite frame (skip stream transition edge cases)
function morphFrame(current)
{
	if (current.length == composite.length){
		for (var i = 0; i<getSize(); i++) {
			composite[i*3+0] = Math.floor(current[i*3+0]*alpha + composite[i*3+0]*(1-alpha)); // R
			composite[i*3+1] = Math.floor(current[i*3+1]*alpha + composite[i*3+1]*(1-alpha)); // G
			composite[i*3+2] = Math.floor(current[i*3+2]*alpha + composite[i*3+2]*(1-alpha)); // B
		}

		for (i=0; i<devices.length; i++)
			devices[i].setColors(shader.getName(), width, height, composite);
	}
}


//Shader() to stream user-defined shaders

function setShader(s, p)
{
	DEBUG && console.log("setShader: "+p);
	stop();
	savePreviousShader();
	shader        = s;
	params        = p;
	onFrame       = shader.getOnFrame();
	setSize(params.width, params.height);
	s.start(params);
	start();
}

function savePreviousShader(){
	DEBUG && console.log("save");
	prevShader            = shader;
	prevParams            = params;
	prevConsumerFramerate = consumer_framerate;
	prevProducerFramerate = producer_framerate;
	prevAlpha             = alpha;
}

function restorePreviousShader(){
	DEBUG && console.log("restore");
	consumer_framerate = prevConsumerFramerate;
	producer_framerate = prevProducerFramerate;
	alpha              = prevAlpha;
	setShader(prevShader, prevParams);
}

function setFramerates(producer_fps, consumer_fps)
{
	consumer_framerate = Math.max(1, Math.min(consumer_fps, 60));	
	producer_framerate = Math.max(1, Math.min(producer_fps, consumer_fps));		
}

function getProducerFramerate()
{
	return producer_framerate;
}

function getConsumerFramerate()
{
	return consumer_framerate;
}

function setSize(w,h)
{	
	if (width!=w || height != h){
		width  = w;   
		height = h; 
		composite = newFrame();
	}
	
	if (composite == null)
		composite = newFrame();
	
	stream = [];
}

function getSize()
{
	return width*height;
}

function setAlpha(a)
{
	alpha = Math.max(0, Math.min(a, 1));	//Clamp between 0 (invisible) and 1 (opaque)
}

function getAlpha()
{
	return alpha;
}

function start()
{
	streaming = true;
}

function stop()
{
	streaming = false;
}



//Clean exit
process.on('SIGTERM', onExit);
process.on('SIGINT',  onExit);

function onExit(){
	stop(); //Disable streaming to ensure no pending frames are set after LEDs are turned off
	for (i=1; i<devices.length; i++)
		devices[i].turnOff(null); 
	devices[0].turnOff(process.exit);
}

producer();
consumer();
