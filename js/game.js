var canvas = null;
var context = null;
var elementsImage = null;
var levelImage = null;
var controls = null;
var pacman = null;
var running = null;

function run() {
	pacman.setNextStep();
};

function onSpriteLoaded() {
	if (elementsImage != null && levelImage != null) {
		pacman = new Pacman(context, elementsImage);
		level = new Level(context, levelImage)
		controls = new Controls(pacman);
		running = setInterval(run, 30);
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