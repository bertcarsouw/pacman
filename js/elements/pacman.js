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

	var requestedDirection = null;

	/*
	 * 	is used to change pacman animation every two nextSteps
	 */
	var animationSpeed = 2;
	var animationSpeedCounter = 0;

	function goLeft() {
		requestedDirection = 'left';
		if (!isColliding('left')) {
			resetDirections();
			left = true;
		}
	};

	function goRight() {
		requestedDirection = 'right';
		if (!isColliding('right')) {
			resetDirections();
			right = true;
		}
	};

	function goUp() {
		requestedDirection = 'up';
		if (!isColliding('up')) {
			resetDirections();
			up = true;
		}
	};

	function goDown() {
		requestedDirection = 'down';
		if (!isColliding('down')) {
			resetDirections();
			down = true;
		}
	};

	function inMiddleLevel() {
		return y > 444 && y < 504; 
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

	function setRequestedDirection() {
		resetDirections();
		if (requestedDirection == 'left') {
			left = true;
		} else if (requestedDirection == 'right') {
			right = true;
		} else if (requestedDirection == 'down') {
			down = true;
		} else if (requestedDirection == 'up') {
			up = true;
		}
	};

	function setNextStep() {
		context.clearRect(x, y, 52, 52);
		stop = false;
		if (requestedDirection && !isColliding(requestedDirection)) {
			setRequestedDirection();
		} else {
			if (isColliding(getDirection())) {
				stop = true;
			}
		}
		setMovingCoordinates();
		setAnimationState();
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

	var column = {
		"y": [0, 24, 156, 252, 356, 452, 552, 652, 752, 848, 948],
		"x": [0, 24, 88, 188, 288, 388, 488, 584, 684, 784, 848]
	};	

	function isColliding(direction) {
		console.log(y)
		if (direction == 'right') {
			if (x == column.x[10]) {
				return true;
			}
			// 1st X-layer
			if (y == column.y[1]) {
				if (x == column.x[5]) {
					return true;
				}
			} 
			// 1.5st X-layer
			if (y > column.y[1] && y < column.y[2]) {
				return true;
			}
			// 2.5st X-layer
			if (y > column.y[2] && y < column.y[3]) {
				return true;
			}
			if (y == column.y[3]) {
				if (x == column.x[3] 
					|| x == column.x[5]
					|| x == column.x[7]) {
					return true;
				}
			}
		} else if (direction == 'left') {
			if (x == column.x[1]) {
				return true;
			}
			// 1st X-layer
			if (y == column.y[1]) {
				if (x == column.x[6]) {
					return true;
				}
			}
			// 1.5st X-layer
			if (y > column.y[1] && y < column.y[2]) {
				return true;
			}
			// 2.5st X-layer
			if (y > column.y[2] && y < column.y[3]) {
				return true;
			}
			if (y == column.y[3]) {
				if (x == column.x[4]
					|| x == column.x[6]
					|| x == column.x[8]) {
					return true;
				}
			}
		} else if (direction == 'up') {
			if (y == column.y[1]) {
				return true;
			}
			if (y == column.y[2]) {
				if (x != 24 
					&& x != 188
					&& x != 388
					&& x != 488
					&& x != 684
					&& x != 848) {
					return true;
				}
			}
			if (y == column.y[3]) {
				if (x != column.x[1]
					&& x != column.x[3]
					&& x != column.x[4]
					&& x != column.x[7]
					&& x != column.x[8]
					&& x != column.x[10]) {
					return true;
				}
			}
		} else if (direction == 'down') {
			// 1st X-layer
			if (y == column.y[1]) {
				if (x != column.x[1] 
					&& x != column.x[3]
					&& x != column.x[5]
					&& x != column.x[6]
					&& x != column.x[8]
					&& x != column.x[10]) {
					return true;
				}
			}
			if (y == column.y[2]) {
				if (x != column.x[1]
					&& x != column.x[3] 
					&& x != column.x[4]
					&& x != column.x[7]
					&& x != column.x[8]
					&& x != column.x[10]) {
					return true;					
				}
			}
			if (y == column.y[3]) {
				if (x != column.x[3]
					&& x != column.x[5]
					&& x != column.x[6]
					&& x != column.x[8]) {
					return true;
				}
			}
		}
		return false;
	};

};