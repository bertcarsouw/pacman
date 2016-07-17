var canvas = null;
var context = null;
var image = null;

var pacman = null;

function onSpriteLoaded() {
	pacman = new Pacman(context, image);
	window.addEventListener('keydown', handleKey);
};

function handleKey(event) {
	if (event.keyCode == 38) {
		pacman.goUp();
	} else if (event.keyCode == 40) {
		pacman.goDown();
	} else if (event.keyCode == 37) {
		pacman.goLeft();
	} else if (event.keyCode == 39) {
		pacman.goRight();
	}
}

function setup() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	canvas.style.width = canvas.width + 'px';
	canvas.style.height = canvas.height + 'px';
	image = new Image();
	image.onload = onSpriteLoaded;
	image.src = "sprites/sprite.png";
};

setup();