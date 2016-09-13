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
	this.setTunnelSpeed = setTunnelSpeed;
	this.setScatterTimer = setScatterTimer;
	this.inScatterMode = inScatterMode;

	var x = 13 * 33 + 19,
		y = 11 * 33 + 1, 
		direction = LEFT,
		open = false,
		openCounter = 0,
		openSpeed = 10,
		speed = 20,
		beforeTunnelSpeed = 0,
		scatterMode,
		scatterTimer = null;

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

	function inScatterMode() {
		return scatterMode;
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

	function setTunnelSpeed(on) {
		if (on) {
		 	beforeTunnelSpeed = speed;
			speed = GHOST_TUNNEL_SPEED;
		} else {
			speed = beforeTunnelSpeed;
			beforeTunnelSpeed = 0;
		}
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

	function setScatterTimer() {
		scatterMode = true;
		scatterTimer = setInterval(cancelScatterTimer, 7000);
	}

	function cancelScatterTimer() {
		scatterMode = false;
		clearInterval(scatterTimer);
	}

}