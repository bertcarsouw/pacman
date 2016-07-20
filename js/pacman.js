function Pacman(context, image) {

	/*
	 *	public accessable functions
	 */
	this.getDirection = getDirection;
	this.goLeft = goLeft;
	this.goRight = goRight;
	this.goUp = goUp;
	this.goDown = goDown;
	this.setNextStep = setNextStep;
	this.getX = getX;
	this.getY = getY;
	
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

	function getX() {
		return x;
	};

	function getY() {
		return y;
	};

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
		trimTunnelEdges();
		if (animationSpeedCounter == animationSpeed) {
			frame++;
			animationSpeedCounter = 0;
		} else {
			animationSpeedCounter++;
		}
	}; 

	function trimTunnelEdges() {
		if (x < 0) {
			context.clearRect(-52, 452, 52, 52);
		} else if (x > 873) {
			context.clearRect(925, 452, 52, 52);
		}
	};

	function setMovingCoordinates() {
		if (stop) {
			return;
		}
		if (x < -52) {
			x = 924;
		}
		if (x > 924) {
			x = -52;
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
		if (direction == 'right') {
			return isCollidingRight()
		} else if (direction == 'left') {
			return isCollidingLeft();
		} else if (direction == 'up') {
			return isCollidingUp();
		} else if (direction == 'down') {
			return isCollidingDown();
		}
	};

	function isCollidingRight() {
		if (column.x[10] == x && column.y[5] != y) {
			return true;
		}
		if (column.y[1] == y) {
			if (column.x[5] == x) {
				return true;
			} 
			return false;
		} else if (column.y[2] == y) {
			return false;
		} else if (column.y[3] == y) {
			if (column.x[3] == x 
				|| column.x[5] == x
				|| column.x[5] == x
				|| column.x[7] == x) {
				return true;
			}
			return false;
		} else if (column.y[4] == y) {
			if (column.x[3] == x 
				|| column.x[7] == x
				|| column.x[8] == x) {
				return true;				
			}
			return false;
		} else if (column.y[5] == y) {
			if (column.x[4] == x) {
				return true;
			}
			return false;
		} else if (column.y[6] == y) {
			if (column.x[3] == x 
				|| column.x[7] == x
				|| column.x[8] == x) {
				return true;				
			}
			return false;
		} else if (column.y[7] == y) {
			if (column.x[5] == x) {
				return true;
			}
			return false;
		} else if (column.y[8] == y) {
			if (column.x[2] == x 
				|| column.x[8] == x) {
				return true;
			}
			return false;
		} else if (column.y[9] == y) {
			if (column.x[3] == x 
				|| column.x[5] == x
				|| column.x[7] == x) {
				return true;
			}
			return false;
		} else if (column.y[10] == y) {
			return false;
		}
		return true;
	};

	function isCollidingLeft() {
		if (column.x[1] == x && column.y[5] != y) {
			return true;
		} 
		if (column.y[1] == y) {
			if (column.x[6] == x) {
				return true;
			}
			return false;
		} else if (column.y[2] == y) {
			return false;
		} else if (column.y[3] == y) {
			if (column.x[4] == x
				|| column.x[6] == x
				|| column.x[8] == x) {
				return true;
			} 
			return false;
		} else if (column.y[4] == y) {
			if (column.x[3] == x
				|| column.x[4] == x
				|| column.x[8] == x) {
				return true;
			} 
			return false;
		} else if (column.y[5] == y) {
			if (column.x[7] == x) {
				return true;
			}
			return false;
		} else if (column.y[6] == y) {
			if (column.x[3] == x
				|| column.x[4] == x
				|| column.x[8] == x) {
				return true;
			} 
			return false;
		} else if (column.y[7] == y) {
			if (column.x[6] == x) {
				return true;
			}
			return false;
		} else if (column.y[8] == y) {
			if (column.x[3] == x
				|| column.x[9] == x) {
				return true;
			}
			return false;
		} else if (column.y[9] == y) {
			if (column.x[4] == x
				|| column.x[6] == x
				|| column.x[8] == x) {
				return true;
			}
			return false;
		} else if (column.y[10] == y) {
			return false;
		}
		return true;
	};

	function isCollidingUp() {
		if (column.y[1] == y) {
			return true;
		}
		if (column.x[1] == x) {
			if (column.y[5] == y
				|| column.y[7] == y
				|| column.y[9] == y) {
				return true;
			}
			return false;
		} else if (column.x[2] == x) {
			if (column.y[1] == y
				|| column.y[2] == y
				|| column.y[3] == y
				|| column.y[5] == y
				|| column.y[7] == y
				|| column.y[8] == y
				|| column.y[10] == y) {
				return true;
			}
			return false;
		} else if (column.x[3] == x) {
			if (column.y[10] == y) {
				return true;
			}
			return false;
		} else if (column.x[4] == x) {
			if (column.y[2] == y
				|| column.y[4] == y
				|| column.y[8] == y
				|| column.y[10] == y) {
				return true;
			}
			return false;
		} else if (column.x[5] == x) {
			if (column.y[3] == y
				|| column.y[6] == y
				|| column.y[7] == y
				|| column.y[9] == y) {
				return true;
			}
			return false;	
		} else if (column.x[6] == x) {
			if (column.y[3] == y
				|| column.y[6] == y
				|| column.y[7] == y
				|| column.y[9] == y) {
				return true;
			}
			return false;	
		} else if (column.x[7] == x) {
			if (column.y[2] == y
				|| column.y[4] == y
				|| column.y[8] == y
				|| column.y[10] == y) {
				return true;
			}
			return false;
		} else if (column.x[8] == x) {
			if (column.y[10] == y) {
				return true;
			}
			return false;
		} else if (column.x[9] == x) {
			if (column.y[1] == y
				|| column.y[2] == y
				|| column.y[3] == y
				|| column.y[5] == y
				|| column.y[7] == y
				|| column.y[8] == y
				|| column.y[10] == y) {
				return true;
			}
			return false;	
		} else if (column.x[10] == x) {
			if (column.y[5] == y
				|| column.y[7] == y
				|| column.y[9] == y) {
				return true;
			}
			return false;
		}
		return true;
	};

	function isCollidingDown() {
		if (column.y[10] == y) {
			return true;
		}
		if (column.x[1] == x) {
			if (column.y[3] == y
				|| column.y[5] == y
				|| column.y[8] == y) {
				return true;
			}
			return false;
		} else if (column.x[2] == x) {
			if (column.y[1] == y
				|| column.y[2] == y
				|| column.y[3] == y
				|| column.y[5] == y
				|| column.y[7] == y
				|| column.y[9] == y) {
				return true;
			}
			return false;
		} else if (column.x[3] == x) {
			if (column.y[9] == y) {
				return true;
			}
			return false;
		} else if (column.x[4] == x) {
			if (column.y[1] == y
				|| column.y[3] == y
				|| column.y[7] == y
				|| column.y[9] == y) {
				return true;
			}
			return false;
		} else if (column.x[5] == x) {
			if (column.y[2] == y
				|| column.y[4] == y
				|| column.y[6] == y
				|| column.y[8] == y) {
				return true;
			}
			return false;
		} else if (column.x[6] == x) {
			if (column.y[2] == y
				|| column.y[4] == y
				|| column.y[6] == y
				|| column.y[8] == y) {
				return true;
			}
			return false;
		} else if (column.x[7] == x) {
			if (column.y[1] == y
				|| column.y[3] == y
				|| column.y[7] == y
				|| column.y[9] == y) {
				return true;
			}
			return false;
		} else if (column.x[8] == x) {
			if (column.y[9] == y) {
				return true;
			}
			return false;
		} else if (column.x[9] == x) {
			if (column.y[1] == y
				|| column.y[2] == y
				|| column.y[3] == y
				|| column.y[5] == y
				|| column.y[7] == y
				|| column.y[9] == y) {
				return true;
			}
			return false;
		} else if (column.x[10] == x) {
			if (column.y[3] == y
				|| column.y[5] == y
				|| column.y[8] == y) {
				return true;
			}
			return false;
		}
		return true;
	};

};