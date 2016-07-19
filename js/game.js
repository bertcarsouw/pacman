var canvas = null;
var context = null;
var elementsImage = null;
var levelImage = null;
var controls = null;
var pacman = null;
var level = null;
var running = null;
var loadedSprites = 0;

function run() {
	pacman.setNextStep();
	level.removeConsumedDots(pacman.getX(), pacman.getY(), pacman.getDirection());
	if (level.isCleared()) {
		stopRunning();
	}
};

function stopRunning() {
	clearInterval(running);
};

function onSpriteLoaded() {
	loadedSprites++;
	if (loadedSprites == 2) {
		level = new Level(context, levelImage, elementsImage);
		pacman = new Pacman(context, elementsImage);
		controls = new Controls(pacman);
		running = setInterval(run, 20);
	}
};

function setupCanvas() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	canvas.height = 1024;
	canvas.width = 925;
	context.scale(0.8, 0.8);
	context.translate(0.1 * canvas.width, 100);
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