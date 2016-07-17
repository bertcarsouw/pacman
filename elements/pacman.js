function Pacman(context, image) {

	var x = 100;
	var y = 100;

	var frame = 0;
	var animationState = 'rightClosed';
	var speed = 1000 / 20;

	var left = false;
	var right = true;
	var up = false;
	var down = false;

	var rotationAngle = 0;

	setInterval(animate, speed);

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

	function animate() {
		setAnimationState();
		context.clearRect(0, 0, canvas.width, canvas.height);
		setMovingCoordinates();		
		context.drawImage(image, spriteCoordinates[animationState].x, spriteCoordinates[animationState].y, 52, 52, x, y, 52, 52);
		frame++;
	};

	function setMovingCoordinates() {
		if (left) {
			x -= 12;
		} else if (right) {
			x += 12;
		} else if (down) {
			y += 12;
		} else if (up) {
			y -= 12;
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
		if (frame == 0) {
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