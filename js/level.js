function Level(context, image) {

	draw();

	function draw() {
		context.clearRect(0, 0, 1024, 1024);
		context.drawImage(image, 0, 0, 925, 1024, 0, 0, 925, 1024);
	};

};