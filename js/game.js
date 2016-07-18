var canvas = null;
var context = null;
var elementsImage = null;
var levelImage = null;

var pacman = null;

var running = null;

function run() {
	if (pacman.inMiddleLevel()) {
		if (pacman.getDirection() == 'up') {
			level.moveUp();
		} else if (pacman.getDirection() == 'down') {
			level.moveDown();
		}
	}
	pacman.setNextStep();
};

function onSpriteLoaded() {
	if (elementsImage != null && levelImage != null) {
		pacman = new Pacman(context, elementsImage);
		level = new Level(context, levelImage)
		window.addEventListener('keydown', handleKey);
		running = setInterval(run, 30);
	}
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

function setupCanvas() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	canvas.height = 1024;
	canvas.width = 1024;
	canvas.style.width = canvas.width + 'px';
	canvas.style.height = canvas.height + 'px';
};

function setup() {
	setupCanvas();
	elementsImage = new Image();
	elementsImage.onload = onSpriteLoaded;
	elementsImage.src = "images/sprite.png";
	levelImage = new Image();
	levelImage.onload = onSpriteLoaded;
	levelImage.src = "images/level.png";
};