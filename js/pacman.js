function Pacman() {

	this.getX = getX;
	this.setX = setX;
	this.getY = getY;
	this.getSpeed = getSpeed;
	this.setSpeed = setSpeed;
	this.setDirection = setDirection;
	this.getDirection = getDirection;
	this.setRequestedDirection = setRequestedDirection;
	this.getRequestedDirection = getRequestedDirection;
	this.move = move;
	this.getAnimationState = getAnimationState;

	var x = 13 * 33 + 19,
		y = 23 * 33 + 1,
		speed = 16,
		requestedDirection = LEFT,
		direction = LEFT,
		animationState = 1;

	function getX() {
		return x;
	}

	function setX(newX) {
		x = newX;
	}

	function getY() {
		return y;
	}

	function setSpeed(newSpeed) {
		speed = newSpeed;
	}

	function getSpeed() {
		return speed;
	}
	
	function getDirection() {
		return direction;
	}

	function setDirection(newDirection) {
		direction = newDirection;
	}

	function setRequestedDirection(newRequestedDirection) {
		requestedDirection = newRequestedDirection;
	}

	function getRequestedDirection() {
		return requestedDirection;
	}

	var animationCounter = 0;
	function setAnimationState() {
		animationCounter++;
		if (animationCounter == 4) {
			animationCounter = 0;
			if (animationState == 4) {
				animationState = 1;
			} else {
				animationState++;
			}
		}
	}

	function getAnimationState()  {
		return animationState;
	}

	function move() {
		setAnimationState();
		if (direction == UP) {
			y -= 3;
		} else if (direction == DOWN) {
			y += 3;
		} else if (direction == LEFT) {
			x -= 3;
		} else if (direction == RIGHT) { 
			x += 3;
		}
	}

}