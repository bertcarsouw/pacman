function Ghost() {

	this.getX = getX;
	this.setX = setX;
	this.getY = getY;
	this.setY = setY;
	this.getDirection = getDirection;
	this.setDirection = setDirection;
	this.getSpeed = getSpeed;
	this.setSpeed = setSpeed;
	this.isOpen = isOpen;
	this.move = move;

	var x = 13 * 33 + 19,
		y = 11 * 33 + 1, 
		direction = LEFT,
		open = false,
		openCounter = 0,
		openSpeed = 10,
		speed = 20;

	function getX() {
		return x;
	}

	function setX(newX) {
		x = newX;
	}

	function getY() {
		return y;
	}

	function setY(newY) {
		y = newY;
	}

	function getDirection() {
		return direction;
	}

	function setDirection(newDirection) {
		direction = newDirection;
	}

	function getSpeed() {
		return speed;
	}

	function setSpeed(newSpeed) {
		speed = newSpeed;
	}

	function isOpen() {
		return open;
	}

	function move() {
		if (openCounter == openSpeed) {
			openCounter = 0;
			open = !open;
		} else {
			openCounter++;
		}
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