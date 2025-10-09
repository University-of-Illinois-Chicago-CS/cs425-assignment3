var gl = null;
var vao = null;
var program = null;
var vertexCount = 0;
var indexCount = 0;

var LIGHT_DIR = [1, 2, 0];
var BASE_COLOR = [.7, .7, .7];


function buildHeightMap(data, rows, cols, minmax=[0, 1]) 
{

	var vertices = [], indices = [], normals = [];

	// TODO: fill in vertices, normals, indices
	// then set renderReady
	//renderReady = true;

}

function processImage(img)
{
	// draw the image into an off-screen canvas
	var off = document.createElement('canvas');
	
	var sw = img.width, sh = img.height;
	off.width = sw; off.height = sh;
	
	var ctx = off.getContext('2d');
	ctx.drawImage(img, 0, 0, sw, sh);
	
	// read back the image pixel data
	var imgd = ctx.getImageData(0,0,sw,sh);
	var px = imgd.data;
	
	// create a an array will hold the height value
	var heightArray = new Float32Array(sw * sh);
	
	// loop through the image, rows then columns
	for (var y=0;y<sh;y++) 
	{
		for (var x=0;x<sw;x++) 
		{
			// offset in the image buffer
			var i = (y*sw + x)*4;
			
			// read the RGB pixel value
			var r = px[i+0], g = px[i+1], b = px[i+2];
			
			// convert to greyscale value between 0 and 1
			var lum = (0.2126*r + 0.7152*g + 0.0722*b) / 255.0;

			// store in array
			heightArray[y*sw + x] = lum;
		}
	}

	return {
		data: heightArray,
		width: sw,
		height: sw
	};
}

window.loadImageFile = function(event)
{

	var f = event.target.files && event.target.files[0];
	if (!f) return;

	// create a FileReader to read the image file
	var reader = new FileReader();

	if (f.name.toLowerCase().endsWith(".bsq")) 
	{
		reader.onload = (e) => {
 			var arrayBuffer = e.target.result;
 			var floatArray = new Float32Array(arrayBuffer);
 			var len = floatArray.length;
 			var sqrtLen = Math.sqrt(len);
 			if (Number.isInteger(sqrtLen)) 
 			{
 				// find min/max
 				var minD = Number.MAX_VALUE;
 				var maxD = -Number.MAX_VALUE;
 				for (var i=0; i<floatArray.length; i++) {
 					var x = floatArray[i];
 					if (minD > x) {
 						minD = x;
 					} else if (maxD < x) {
 						maxD = x;
 					}
 				}
 				heightmapData = {
 					data: floatArray,
					width: sqrtLen,
					height: sqrtLen,
					minmax: [minD, maxD]
				};
				buildHeightMap(
					heightmapData.data, 
					heightmapData.width, 
					heightmapData.height,
					heightmapData.minmax || [0, 1]
				);
 			}
 			else {
 				alert("The selected file has a Float32 size of " + len + ", which does not add up to a square image.");
 			}
		};
    	reader.readAsArrayBuffer(f);
	}
	else {
		reader.onload = function() 
		{
			// create an internal Image object to hold the image into memory
			var img = new Image();
			img.onload = function() 
			{
				// heightmapData is globally defined
				heightmapData = processImage(img);
				
				buildHeightMap(
					heightmapData.data, 
					heightmapData.width, 
					heightmapData.height
				);

				// flip the wireframe checkbox off
				document.querySelector("#wireframe").checked=false;
			};
			img.onerror = function() 
			{
				console.error("Invalid image file.");
				alert("The selected file could not be loaded as an image.");
			};

			// the source of the image is the data load from the file
			img.src = reader.result;
		};
		reader.readAsDataURL(f);
	}
}


function setupViewMatrix(eye, target)
{
    var forward = normalize(subtract(target, eye));
    var upHint  = [0, 1, 0];

    var right = normalize(cross(forward, upHint));
    var up    = cross(right, forward);

    var view = lookAt(eye, target, up);
    return view;

}


function draw()
{
	// TODO: add render code
	if (renderReady) {
		gl.drawElements(primitiveType, indexCount, gl.UNSIGNED_INT,0);
	}

	requestAnimationFrame(draw);

}


function initialize() 
{
	var canvas = document.querySelector("#glcanvas");
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	gl = canvas.getContext("webgl2");

	// TODO: add initialization

	window.requestAnimationFrame(draw);
}

window.onload = initialize();