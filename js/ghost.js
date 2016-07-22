function Ghost(context, elementsImage) {

	this.setNextStep = setNextStep;
	this.getX = getX;
	this.getY = getY;
	this.getDirection = getDirection;

	var oldDirection = 'left';

	var permittedDirections = {
		"y": [0, 22, 154, 250, 354, 450, 550, 650, 750, 846, 946],
		"x": [0, 22, 86, 186, 286, 386, 486, 582, 682, 782, 846]
	};	

	var geo = new Geo(permittedDirections, 846, 946, 56);
	geo.setDirection('left');

	function getX() {
		return geo.getX();
	};

	function getY() {
		return geo.getY();
	};

	function getDirection() {
		return geo.getDirection();
	};

	function setNextStep() {
		context.clearRect(geo.getX(), geo.getY(), 56, 56);
		var possibleDirectionFound = false;
		if (geo.isColliding(geo.getDirection())) {
			oldDirection = geo.getDirection();
			var oppositeDirection = getOppositeDirection(geo.getDirection());
			while(!possibleDirectionFound) {
				var randomDirection = getRandomDirection();
				if (!geo.isColliding(randomDirection) && randomDirection != oppositeDirection) {
					geo.setDirection(randomDirection);
					possibleDirectionFound = true;
				}
			}
		}
		geo.setMovingCoordinates();
		context.drawImage(elementsImage, 964, 4, 56, 56, geo.getX(), geo.getY(), 56, 56);	
	}; 

	function getOppositeDirection(direction) {
		if (direction == 'up') {
			return 'down';
		} else if (direction == 'down') {
			return 'up';
		} else if (direction == 'left') {
			return 'right';
		} else if (direction == 'right') {
			return 'left';
		}
	};

	function getRandomDirection() {
		var random = Math.floor(Math.random() * 4) + 1  ;
		if (random == 1) {
			return 'right';
		}
		if (random == 2) {
			return 'left';
		}
		if (random == 3) {
			return 'up';
		}
		if (random == 4) {
			return 'down';
		}
	};

};