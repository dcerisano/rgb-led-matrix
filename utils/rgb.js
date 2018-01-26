module.exports = {
		rgba2rgb: function(rgba)
		{
			return rgba2rgb(rgba);
		},
		rgb2rgba: function(rgb)
		{
			return rgb2rgba(rgb);
		}
}

function rgb2rgba(rgb)
{
	var rgba = new Buffer((rgb.length/3)*4);

	for (i=0; i<rgba.length/4; i++)
	{
		rgba[i*4+0] = rgb[i*3+0];
		rgba[i*4+1] = rgb[i*3+1];
		rgba[i*4+2] = rgb[i*3+2];
		rgba[i*4+3] = 255;
	}
	return rgba;
}

function rgba2rgb(rgba)
{
	var rgb = new Buffer((rgba.length/4)*3);

	for (i=0; i<rgb.length/3; i++)
	{
		rgb[i*3+0] = rgba[i*4+0];
		rgb[i*3+1] = rgba[i*4+1];
		rgb[i*3+2] = rgba[i*4+2];
	}
	return rgb;
}