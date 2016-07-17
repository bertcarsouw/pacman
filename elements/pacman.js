function Pacman(context, image, level) {

	var x = 24;
	var y = 24;

	var frame = 0;
	var animationState = 'closed';
	var frameRatio = 1000 / 50;

	var moveScreen = false;

	var left = false;
	var right = true;
	var up = false;
	var down = false;
	var stop = false;

	var rotationAngle = 0;

	setInterval(animate, frameRatio);

	this.goLeft = function() {
		resetDirections();
		left = true;
	};

	this.goRight = function() {
		resetDirections();
		right = true;
	};

	this.goUp = function() {
		resetDirections();
		up = true;
	};

	this.goDown = function() {
		resetDirections();
		down = true;
	};

	function resetDirections() {
		left = false;
		right = false;
		up = false;
		down = false;
	};

	var animationSpeed = 1;
	var animationSpeedCounter = 0;

	function animate() {
		context.clearRect(x, y, 52, 52);
		if (y > 456 && y < 492) {
			moveScreen = true;
		} else {
			moveScreen = false;
		}
		stop = false;
		if (isColliding()) {
			stop = true;
		}
		setAnimationState();
		setMovingCoordinates();		
		context.drawImage(image, spriteCoordinates[animationState].x, spriteCoordinates[animationState].y, 52, 52, x, y, 52, 52);
		if (animationSpeed == animationSpeedCounter) {
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
		if (moveScreen) {
			if (down) {
				level.moveDown();
			} else if (up) {
				level.moveUp();
			}
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

	function setAnimationState() {
		direction = getDirection();
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

	function isColliding() {
		if (right) {
			if (x == 852) {
				return true;
			}
			if (y == 24) {
				if (x == 388) {
					return true;
				}
			}			
		} else if (left) {
			if (x == 24) {
				return true;
			}
			if (y == 24 && x == 488) {
				return true;
			}			
		} else if (up) {
			if (y == 24) {
				return true;
			}
		}
		return false;
	};

};