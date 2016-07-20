function Setup() {

	var canvas = null;
	var context = null;
	var elementsImage = null;
	var levelImage = null;
	var spritesLoaded = 0;

	this.getContext = getContext;
	this.getElementsImage = getElementsImage;
	this.getLevelImage = getLevelImage;

	function getContext() {
		return context;
	};

	function getElementsImage() {
		return elementsImage;
	};

	function getLevelImage() {
		return levelImage;
	};

	function onSpriteLoaded() {
		if (spritesLoaded == 1) {
			sendSetupEvent();
		}
		spritesLoaded++;
	};

	function sendSetupEvent() {
		var event = document.createEvent("Event");
		event.initEvent("setupDone", true, true);
		document.dispatchEvent(event);
	}

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

	function loadElementsImage(callback) {
		elementsImage = new Image();
		elementsImage.onload = onSpriteLoaded;
		elementsImage.src = "images/sprite.png";
	};

	function loadLevelImage(callback) {
		levelImage = new Image();
		levelImage.onload = onSpriteLoaded;
		levelImage.src = "images/level.png";
	};

	function load() {
		setupCanvas();
		loadLevelImage();
		loadElementsImage();
	};

	load();

};