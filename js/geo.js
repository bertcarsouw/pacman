function Geo(permittedDirections, startX, startY, width) {

	this.getDirection = getDirection;
	this.isColliding = isColliding;
	this.setDirection = setDirection;
	this.setMovingCoordinates = setMovingCoordinates;
	this.getX = getX;
	this.getY = getY;
	this.stop = stop;
	this.move = move;
	this.isMoving = isMoving;

	var x = startX;
	var y = startY;

	var moving = true;

	var direction = null;

	function getX() {
		return x;
	};

	function getY() {
		return y;
	};

	function stop() {
		moving = false;
	};

	function move() {
		moving = true;
	};

	function isMoving() {
		return moving;
	};
	
	function getDirection() {
		return direction;
	};

	function setDirection(newDirection) {
		direction = newDirection;
	};
	
	function setMovingCoordinates() {
		if (!moving) {
			return;
		}
		if (x < -width) {
			x = 924;
		}
		if (x > 924) {
			x = -width;
		}
		if (direction == 'left') {
			x -= 4;
		} else if (direction == 'right') {
			x += 4;
		} else if (direction == 'down') {
			y += 4;
		} else if (direction == 'up') {
			y -= 4;
		}
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
		if (permittedDirections.x[10] == x && permittedDirections.y[5] != y) {
			return true;
		}
		if (permittedDirections.y[1] == y) {
			if (permittedDirections.x[5] == x) {
				return true;
			} 
			return false;
		} else if (permittedDirections.y[2] == y) {
			return false;
		} else if (permittedDirections.y[3] == y) {
			if (permittedDirections.x[3] == x 
				|| permittedDirections.x[5] == x
				|| permittedDirections.x[5] == x
				|| permittedDirections.x[7] == x) {
				return true;
			}
			return false;
		} else if (permittedDirections.y[4] == y) {
			if (permittedDirections.x[3] == x 
				|| permittedDirections.x[7] == x
				|| permittedDirections.x[8] == x) {
				return true;				
			}
			return false;
		} else if (permittedDirections.y[5] == y) {
			if (permittedDirections.x[4] == x) {
				return true;
			}
			return false;
		} else if (permittedDirections.y[6] == y) {
			if (permittedDirections.x[3] == x 
				|| permittedDirections.x[7] == x
				|| permittedDirections.x[8] == x) {
				return true;				
			}
			return false;
		} else if (permittedDirections.y[7] == y) {
			if (permittedDirections.x[5] == x) {
				return true;
			}
			return false;
		} else if (permittedDirections.y[8] == y) {
			if (permittedDirections.x[2] == x 
				|| permittedDirections.x[8] == x) {
				return true;
			}
			return false;
		} else if (permittedDirections.y[9] == y) {
			if (permittedDirections.x[3] == x 
				|| permittedDirections.x[5] == x
				|| permittedDirections.x[7] == x) {
				return true;
			}
			return false;
		} else if (permittedDirections.y[10] == y) {
			return false;
		}
		return true;
	};

	function isCollidingLeft() {
		if (permittedDirections.x[1] == x && permittedDirections.y[5] != y) {
			return true;
		} 
		if (permittedDirections.y[1] == y) {
			if (permittedDirections.x[6] == x) {
				return true;
			}
			return false;
		} else if (permittedDirections.y[2] == y) {
			return false;
		} else if (permittedDirections.y[3] == y) {
			if (permittedDirections.x[4] == x
				|| permittedDirections.x[6] == x
				|| permittedDirections.x[8] == x) {
				return true;
			} 
			return false;
		} else if (permittedDirections.y[4] == y) {
			if (permittedDirections.x[3] == x
				|| permittedDirections.x[4] == x
				|| permittedDirections.x[8] == x) {
				return true;
			} 
			return false;
		} else if (permittedDirections.y[5] == y) {
			if (permittedDirections.x[7] == x) {
				return true;
			}
			return false;
		} else if (permittedDirections.y[6] == y) {
			if (permittedDirections.x[3] == x
				|| permittedDirections.x[4] == x
				|| permittedDirections.x[8] == x) {
				return true;
			} 
			return false;
		} else if (permittedDirections.y[7] == y) {
			if (permittedDirections.x[6] == x) {
				return true;
			}
			return false;
		} else if (permittedDirections.y[8] == y) {
			if (permittedDirections.x[3] == x
				|| permittedDirections.x[9] == x) {
				return true;
			}
			return false;
		} else if (permittedDirections.y[9] == y) {
			if (permittedDirections.x[4] == x
				|| permittedDirections.x[6] == x
				|| permittedDirections.x[8] == x) {
				return true;
			}
			return false;
		} else if (permittedDirections.y[10] == y) {
			return false;
		}
		return true;
	};

	function isCollidingUp() {
		if (permittedDirections.y[1] == y) {
			return true;
		}
		if (permittedDirections.x[1] == x) {
			if (permittedDirections.y[5] == y
				|| permittedDirections.y[7] == y
				|| permittedDirections.y[9] == y) {
				return true;
			}
			return false;
		} else if (permittedDirections.x[2] == x) {
			if (permittedDirections.y[1] == y
				|| permittedDirections.y[2] == y
				|| permittedDirections.y[3] == y
				|| permittedDirections.y[5] == y
				|| permittedDirections.y[7] == y
				|| permittedDirections.y[8] == y
				|| permittedDirections.y[10] == y) {
				return true;
			}
			return false;
		} else if (permittedDirections.x[3] == x) {
			if (permittedDirections.y[10] == y) {
				return true;
			}
			return false;
		} else if (permittedDirections.x[4] == x) {
			if (permittedDirections.y[2] == y
				|| permittedDirections.y[4] == y
				|| permittedDirections.y[8] == y
				|| permittedDirections.y[10] == y) {
				return true;
			}
			return false;
		} else if (permittedDirections.x[5] == x) {
			if (permittedDirections.y[3] == y
				|| permittedDirections.y[6] == y
				|| permittedDirections.y[7] == y
				|| permittedDirections.y[9] == y) {
				return true;
			}
			return false;	
		} else if (permittedDirections.x[6] == x) {
			if (permittedDirections.y[3] == y
				|| permittedDirections.y[6] == y
				|| permittedDirections.y[7] == y
				|| permittedDirections.y[9] == y) {
				return true;
			}
			return false;	
		} else if (permittedDirections.x[7] == x) {
			if (permittedDirections.y[2] == y
				|| permittedDirections.y[4] == y
				|| permittedDirections.y[8] == y
				|| permittedDirections.y[10] == y) {
				return true;
			}
			return false;
		} else if (permittedDirections.x[8] == x) {
			if (permittedDirections.y[10] == y) {
				return true;
			}
			return false;
		} else if (permittedDirections.x[9] == x) {
			if (permittedDirections.y[1] == y
				|| permittedDirections.y[2] == y
				|| permittedDirections.y[3] == y
				|| permittedDirections.y[5] == y
				|| permittedDirections.y[7] == y
				|| permittedDirections.y[8] == y
				|| permittedDirections.y[10] == y) {
				return true;
			}
			return false;	
		} else if (permittedDirections.x[10] == x) {
			if (permittedDirections.y[5] == y
				|| permittedDirections.y[7] == y
				|| permittedDirections.y[9] == y) {
				return true;
			}
			return false;
		}
		return true;
	};

	function isCollidingDown() {
		if (permittedDirections.y[10] == y) {
			return true;
		}
		if (permittedDirections.x[1] == x) {
			if (permittedDirections.y[3] == y
				|| permittedDirections.y[5] == y
				|| permittedDirections.y[8] == y) {
				return true;
			}
			return false;
		} else if (permittedDirections.x[2] == x) {
			if (permittedDirections.y[1] == y
				|| permittedDirections.y[2] == y
				|| permittedDirections.y[3] == y
				|| permittedDirections.y[5] == y
				|| permittedDirections.y[7] == y
				|| permittedDirections.y[9] == y) {
				return true;
			}
			return false;
		} else if (permittedDirections.x[3] == x) {
			if (permittedDirections.y[9] == y) {
				return true;
			}
			return false;
		} else if (permittedDirections.x[4] == x) {
			if (permittedDirections.y[1] == y
				|| permittedDirections.y[3] == y
				|| permittedDirections.y[7] == y
				|| permittedDirections.y[9] == y) {
				return true;
			}
			return false;
		} else if (permittedDirections.x[5] == x) {
			if (permittedDirections.y[2] == y
				|| permittedDirections.y[4] == y
				|| permittedDirections.y[6] == y
				|| permittedDirections.y[8] == y) {
				return true;
			}
			return false;
		} else if (permittedDirections.x[6] == x) {
			if (permittedDirections.y[2] == y
				|| permittedDirections.y[4] == y
				|| permittedDirections.y[6] == y
				|| permittedDirections.y[8] == y) {
				return true;
			}
			return false;
		} else if (permittedDirections.x[7] == x) {
			if (permittedDirections.y[1] == y
				|| permittedDirections.y[3] == y
				|| permittedDirections.y[7] == y
				|| permittedDirections.y[9] == y) {
				return true;
			}
			return false;
		} else if (permittedDirections.x[8] == x) {
			if (permittedDirections.y[9] == y) {
				return true;
			}
			return false;
		} else if (permittedDirections.x[9] == x) {
			if (permittedDirections.y[1] == y
				|| permittedDirections.y[2] == y
				|| permittedDirections.y[3] == y
				|| permittedDirections.y[5] == y
				|| permittedDirections.y[7] == y
				|| permittedDirections.y[9] == y) {
				return true;
			}
			return false;
		} else if (permittedDirections.x[10] == x) {
			if (permittedDirections.y[3] == y
				|| permittedDirections.y[5] == y
				|| permittedDirections.y[8] == y) {
				return true;
			}
			return false;
		}
		return true;
	};

};