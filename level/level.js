function Level(context, image) {

	var translateCounter = 0;
	var translateY = 0;
	
	draw();

	function draw() {
		console.log(translateY)
		context.clearRect(0, 0, 1024, 1024);
		context.translate(0, translateY);
		context.drawImage(image, 0, 0, 925, 1024, 0, 0, 925, 1024);
	};

	this.moveDown = function() {
		if (translateY > 0) {
			translateY = 0;
		}
		if (translateCounter <= 7) {
			translateCounter++;
			translateY -= 1;
			draw(translateY);
		}
	};

	this.moveUp = function() {
		if (translateY < 0) {
			translateY = 0;
		}
		if (translateCounter >= 0) {
			translateCounter--;
			translateY += 1;
			draw(translateY);
		}
	};


};