function resizeMatrix(){
	DEBUG && console.log("resizeMatrix");
	canvasWidth = window.innerWidth;
	canvasHeight = window.innerHeight; 

	xoffset = 0;
	yoffset = 0;

	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	canvas.style.width = canvasWidth;
	canvas.style.height = canvasHeight;	

	gridWidth    = canvasWidth/(height+1);
	gridHeight   = canvasHeight/(width+1);

	if (gridWidth>gridHeight)
		gridWidth=gridHeight;
	else
		gridHeight=gridWidth;

	yoffset=(canvasHeight-gridHeight*(width+1))/2;
	xoffset=(canvasWidth-gridWidth*(height+1))/2;	

	dotRadius = gridWidth * 0.4;
}

function drawMatrix(){

	resizeMatrix();

	DEBUG && console.log("drawMatrix");

	if (height*width*3 != colors.length)
		return;

	for(i = 0; i < width; i++) {
		for(j = 0; j < height; j++) {
			var 
			x = gridWidth*(j+1),
			y = gridHeight*(i+1);
			drawDot(x, y, dotRadius, getColor(i,j));
		}
	}
}

function getColor(row ,col){
	var 
	r   = colors[(row*height+col)*3+0],
	g   = colors[(row*height+col)*3+1],
	b   = colors[(row*height+col)*3+2];

	if (typeof r !== 'undefined' && g !== 'undefined' && b !== 'undefined' )
		return 'rgba(' + r + ',' + g + ','+ b  + ',1)';
	else
		return null;
}

function drawDot(x, y, radius, color) {
	DEBUG && console.log("drawDot: "+color);
	if (color)
	{
		context.beginPath();
		context.arc(x+xoffset, y+yoffset, radius, 0, 2 * Math.PI, false);
		context.fillStyle = color;
		context.fill();
		context.lineWidth = 1;
		context.strokeStyle = '#101010';
		context.stroke();	
	}
}

resizeMatrix();
drawMatrix();
document.getElementsByTagName("BODY")[0].onresize = drawMatrix;



