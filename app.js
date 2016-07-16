var canvas = null;
var context = null;
var image = null;

var frameRate = 1000 / 15;
var frame = 0;

var pacState = 'closed';

var onSpriteLoaded = function(sx, sy) {
	animate();
};

function animate() {
	setInterval(drawPacman, frameRate);
};

function drawPacman() {
	if (frame == 0) {
		pacState = 'closed';
	} else if (frame == 1) {
		pacState = 'half';
	} else if (frame == 2) {
		pacState = 'open';
	} else if (frame == 3) {
		pacState = 'half';
	} else {
		pacState = 'closed';
		frame = 0;
	}
	context.drawImage(image, spriteCoordinates.pacman[pacState].x, spriteCoordinates.pacman[pacState].y, 52, 52, 10, 10, 52, 52);
	frame++;
};

function setup() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	image = new Image();
	image.onload = onSpriteLoaded;
	image.src = "sprites/sprite.png";
};

setup();