function Ghost(context, elementsImage) {

	this.setNextStep = setNextStep;

	var permittedDirections = {
		"y": [0, 22, 154, 250, 354, 450, 550, 650, 750, 846, 946],
		"x": [0, 22, 86, 186, 286, 386, 486, 582, 682, 782, 846]
	};	

	var geo = new Geo(permittedDirections, 846, 946, 56);
	geo.setDirection('left');

	function goLeft() {
		if (!geo.isColliding('left')) {
			geo.setDirection('left');
		}
	};

	function goRight() {
		if (!geo.isColliding('right')) {
			geo.setDirection('right');
		}
	};

	function goUp() {
		if (!geo.isColliding('up')) {
			geo.setDirection('up');
		}
	};

	function goDown() {
		if (!geo.isColliding('down')) {
			geo.setDirection('down');
		}
	};

	function setNextStep() {
		context.clearRect(geo.getX(), geo.getY(), 56, 56);
		var possibleDirectionFound = false;
		if (geo.isColliding(geo.getDirection())) {
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