function Ghost(context, elementsImage) {

	this.setNextStep = setNextStep;

	this.goUp = goUp;
	this.goDown = goDown;
	this.goLeft = goLeft;
	this.goRight = goRight;

	var permittedDirections = {
		"y": [0, 22, 154, 250, 354, 450, 550, 650, 750, 846, 946],
		"x": [0, 22, 86, 186, 286, 386, 486, 582, 682, 782, 846]
	};	

	var geo = new Geo(permittedDirections, 22, 22);

	function goLeft() {
		geo.setRequestedDirection('left');
		if (!geo.isColliding('left')) {
			geo.setDirection('left');
		}
	};

	function goRight() {
		geo.setRequestedDirection('right');
		if (!geo.isColliding('right')) {
			geo.setDirection('right');
		}
	};

	function goUp() {
		geo.setRequestedDirection('up');
		if (!geo.isColliding('up')) {
			geo.setDirection('up');
		}
	};

	function goDown() {
		geo.setRequestedDirection('down');
		if (!geo.isColliding('down')) {
			geo.setDirection('down');
		}
	};

	function setNextStep() {
		context.clearRect(geo.getX(), geo.getY(), 56, 56);
		geo.move();
		if (geo.getRequestedDirection() && !geo.isColliding(geo.getRequestedDirection())) {
			geo.executeRequestedDirection();
		} else {
			if (geo.isColliding(geo.getDirection())) {
				geo.stop();
			}
		}
		geo.setMovingCoordinates();
		context.drawImage(elementsImage, 964, 4, 56, 56, geo.getX(), geo.getY(), 56, 56);	
	}; 

};