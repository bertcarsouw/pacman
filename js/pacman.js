function Pacman(context, image) {

	/*
	 *	public accessable functions
	 */
	this.goLeft = goLeft;
	this.goRight = goRight;
	this.goUp = goUp;
	this.goDown = goDown;
	this.setNextStep = setNextStep;
	this.getGeo = getGeo;

	var requestedDirection = 'right';

	var permittedDirections = {
		"y": [0, 24, 156, 252, 356, 452, 552, 652, 752, 848, 948],
		"x": [0, 24, 88, 188, 288, 388, 488, 584, 684, 784, 848]
	};	

	var geo = new Geo(permittedDirections, 24, 24, 52);
	geo.setDirection('right');

	var frame = 0;
	var animationState = 'closed';

	var animationSpeed = 2;
	var animationSpeedCounter = 0;

	function goLeft() {
		requestedDirection = 'left';
		if (!geo.isColliding('left')) {
			geo.setDirection('left');
		}
	};

	function goRight() {
		requestedDirection = 'right';
		if (!geo.isColliding('right')) {
			geo.setDirection('right');
		}
	};

	function goUp() {
		requestedDirection = 'up';
		if (!geo.isColliding('up')) {
			geo.setDirection('up');
		}
	};

	function goDown() {
		requestedDirection = 'down';
		if (!geo.isColliding('down')) {
			geo.setDirection('down');
		}
	};

	function getGeo() {
		return geo;
	};

	function setNextStep() {
		context.clearRect(geo.getX(), geo.getY(), 52, 52);
		geo.move();
		if (requestedDirection && !geo.isColliding(requestedDirection)) {
			geo.setDirection(requestedDirection);
		} else {
			if (geo.isColliding(geo.getDirection())) {
				geo.stop();
			}
		}
		geo.setMovingCoordinates();
		setAnimationState();
		context.drawImage(image, spriteCoordinates[animationState].x, spriteCoordinates[animationState].y, 52, 52, geo.getX(), geo.getY(), 52, 52);
		if (animationSpeedCounter == animationSpeed) {
			frame++;
			animationSpeedCounter = 0;
		} else {
			animationSpeedCounter++;
		}
	}; 

	function setAnimationState() {
		var direction = geo.getDirection();
		if (!geo.isMoving()) {
			animationState = direction + 'Half';
		} else if (frame == 0) {
			animationState = 'closed';
		} else if (frame == 1) {
			animationState = direction + 'Half';
		} else if (frame == 2) {
			animationState = direction + 'Open';
		} else if (frame == 3) {
			animationState = direction + 'Half';
		} else {
			animationState = 'closed';
			frame = 0;
		}
	};

	var spriteCoordinates = {
		"closed": {
			"x": 584,
			"y": 8,
		},
		"leftHalf": {
			"x": 584,
			"y": 136,
		},
		"leftOpen": {
			"x": 584,
			"y": 72,
		},
		"rightHalf": {
			"x": 644,
			"y": 72,
		},
		"rightOpen": {
			"x": 644,
			"y": 136
		},
		"downHalf": {
			"x": 644,
			"y": 260,
		},
		"downOpen": {
			"x": 644,
			"y": 324
		},
		"upHalf": {
			"x": 580,
			"y": 328,
		},
		"upOpen": {
			"x": 580,
			"y": 264
		}
	};

};