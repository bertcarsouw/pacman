function Pacman() {

	this.getX = getX;
	this.getY = getY;
	this.setX = setX;
	this.setY = setY;
	this.move = move;
	this.undoMove = undoMove;
	this.getDirection = getDirection;
	this.setDirection = setDirection;
	this.getRequestedDirection = getRequestedDirection;
	this.setRequestedDirection = setRequestedDirection;

	window.addEventListener('keydown', handleKey);

	var direction = 4,
		requestedDirection = 4,
		UP = 1,
		DOWN = 2,
		LEFT = 3,
		RIGHT = 4,
		x = 34,
		y = 34;

	function getDirection() {
		return direction;
	}

	function setDirection(newDirection) {
		direction = newDirection;
	}

	function getRequestedDirection() {
		return requestedDirection;
	}

	function setRequestedDirection(newRequestedDirection) {
		requestedDirection = newRequestedDirection;
	}

	function handleKey(event) {
		if (event.keyCode == 38) {
			requestedDirection = UP;
		} else if (event.keyCode == 40) {
			requestedDirection = DOWN;
		} else if (event.keyCode == 37) {
			requestedDirection = LEFT;
		} else if (event.keyCode == 39) {
			requestedDirection = RIGHT;
		}
	}

	function getX() {
		return x;
	}

	function getY() {
		return y;
	}
	
	function setX(newX) {
		x = newX;
	}

	function setY(newY) {
		y = newY;
	}

	function move() {
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

	function undoMove() {
		if (direction == UP) {
			y += 3;
		} else if (direction == DOWN) {
			y -= 3;
		} else if (direction == LEFT) {
			x += 3;
		} else if (direction == RIGHT) {
			x -= 3;
		}	
	}

}