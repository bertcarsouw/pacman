function Canvas() {

	var commonSprite,
		loadedSprites = 0,
		context = null, 
		levelImage;

	this.getContext = getContext;
	this.getLevelImage = getLevelImage;
	this.getCommonSprite = getCommonSprite;

	setup();

	function getContext() {
		return context;
	}

	function getLevelImage() {
		return levelImage;
	}

	function getCommonSprite() {
		return commonSprite;
	}

	function setup() {
		loadCanvas();
		loadElementsImage();
		loadLevelImage();
	}

	function loadCanvas() {
		var canvas = document.getElementsByTagName('canvas')[0];
		context = canvas.getContext('2d');
		canvas.height = 1024;
		canvas.width = 925;
		context.scale(0.8, 0.8);
		context.translate(0.1 * canvas.width, 100);
		canvas.style.width = canvas.width + 'px';
		canvas.style.height = canvas.height + 'px';
	}

	function onSpriteLoaded() {
		if (loadedSprites == 1) {
			sendSetupEvent();
		}
		loadedSprites++;
	}

	function loadElementsImage(callback) {
		commonSprite = new Image();
		commonSprite.onload = onSpriteLoaded;
		commonSprite.src = 'sprites/sprite.png';
	}

	function loadLevelImage(callback) {
		levelImage = new Image();
		levelImage.onload = onSpriteLoaded;
		levelImage.src = 'sprites/level.png';
	}

	function sendSetupEvent() {
		var event = document.createEvent('Event');
		event.initEvent('canvasLoaded', true, true);
		document.dispatchEvent(event);
	}

}