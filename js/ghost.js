function Ghost() {

	this.getX = getX;
	this.getY = getY;
	this.getDirection = getDirection;
	this.move = move;
	
	var x = 33 * 26 + 1,
		y = 33 * 29 + 1;

	var	UP = 1,
		DOWN = 2,
		LEFT = 3,
		RIGHT = 4;

	var direction = LEFT;

	function getX() {
		return x;
	}

	function getY() {
		return y;
	}

	function getDirection() {
		return direction;
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

}