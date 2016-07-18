function Pacman(context, image) {

	/*
	 *	public accessable functions
	 */
	this.getDirection = getDirection;
	this.goLeft = goLeft;
	this.goRight = goRight;
	this.goUp = goUp;
	this.goDown = goDown;
	this.inMiddleLevel = inMiddleLevel;
	this.setNextStep = setNextStep;
	
	var x = 24;
	var y = 24;

	var frame = 0;
	var animationState = 'closed';

	var left = false;
	var right = true;
	var up = false;
	var down = false;
	var stop = false;

	/*
	 * 	is used to change pacman animation every two nextSteps
	 */
	var animationSpeed = 2;
	var animationSpeedCounter = 0;

	var running = null;

	function goLeft() {
		if (!isColliding('left')) {
			resetDirections();
			left = true;
		}
	};

	function goRight() {
		if (!isColliding('right')) {
			resetDirections();
			right = true;
		}
	};

	function goUp() {
		if (!isColliding('up')) {
			resetDirections();
			up = true;
		}
	};

	function goDown() {
		if (!isColliding('down')) {
			resetDirections();
			down = true;
		}
	};

	function inMiddleLevel() {
		return y > 456 && y < 492; 
	};

	function getDirection() {
		if (up) {
			return 'up';
		} else if (down) {
			return 'down';
		} else if (left) {
			return 'left';
		} else if (right) {
			return 'right';
		}
	};

	function resetDirections() {
		left = false;
		right = false;
		up = false;
		down = false;
	};

	function setNextStep() {
		context.clearRect(x, y, 52, 52);
		stop = false;
		if (isColliding(getDirection())) {
			stop = true;
		}
		setAnimationState();
		setMovingCoordinates();		
		context.drawImage(image, spriteCoordinates[animationState].x, spriteCoordinates[animationState].y, 52, 52, x, y, 52, 52);
		if (animationSpeedCounter == animationSpeed) {
			frame++;
			animationSpeedCounter = 0;
		} else {
			animationSpeedCounter++;
		}
	}; 

	function setMovingCoordinates() {
		if (stop) {
			return;
		}
		if (left) {
			x -= 4;
		} else if (right) {
			x += 4;
		} else if (down) {
			y += 4;
		} else if (up) {
			y -= 4;
		}
	};

	function setAnimationState() {
		var direction = getDirection();
		if (stop) {
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

	function isColliding(direction) {
		if (direction == 'right') {
			if (x == 852) {
				return true;
			}
			if (y == 24) {
				if (x == 388) {
					return true;
				}
			}			
		} else if (direction == 'left') {
			if (x == 24) {
				return true;
			}
			if (y == 24 && x == 488) {
				return true;
			}			
		} else if (direction == 'up') {
			if (y == 24) {
				return true;
			}
		}
		return false;
	};

};