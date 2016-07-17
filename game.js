var canvas = null;
var context = null;
var elementsImage = null;

var pacman = null;

var loadedSpriteCounter = 0;

function onSpriteLoaded() {
	loadedSpriteCounter++;
	if (loadedSpriteCounter == 2) {
		pacman = new Pacman(context, elementsImage, new Level(context, levelImage));
		window.addEventListener('keydown', handleKey);
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
	elementsImage.src = "sprites/sprite.png";
	levelImage = new Image();
	levelImage.onload = onSpriteLoaded;
	levelImage.src = "sprites/level.png";
};

setup();