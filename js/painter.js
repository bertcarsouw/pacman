function Painter(canvas) {

	this.drawLevel = drawLevel;
	this.drawPacman = drawPacman;
	this.drawBlinky = drawBlinky;
	this.erasePacman = erasePacman;
	this.eraseGhost = eraseGhost;
	this.drawGrid = drawGrid;
	this.drawTunnels = drawTunnels;
	this.drawDots = drawDots;
	this.eraseDot = eraseDot;

	var context,
		levelImage,
		commonSprite,
		PACMAN_OPEN = 1,
		PACMAN_CLOSED = 3,
		pacmanAnimationState = PACMAN_OPEN,
		speedCounter = 0,
		animationSpeed = 3;

	var UP = 1,
		DOWN = 2,
		LEFT = 3,
		RIGHT = 4;

	loadPainter();

	function drawTunnels() {
		context.clearRect(-100, 444, 100, 70);
		context.clearRect(925, 444, 100, 70);
	}

	function setNextPacmanAnimationState() {
		speedCounter++;
		if (speedCounter == animationSpeed) {
			if (pacmanAnimationState == 4) {
				pacmanAnimationState = 0;
			}
			pacmanAnimationState++;
			speedCounter = 0;
		}
	}

	function loadPainter() {
		context = canvas.getContext();
		levelImage = canvas.getLevelImage();
		commonSprite = canvas.getCommonSprite();
	}

	function drawLevel() {
		context.drawImage(levelImage, 0, 0, 925, 1024, 0, 0, 925, 1024);
	}

	function drawPacman(x, y, direction, animate) {
		if (animate) {
			setNextPacmanAnimationState();
		} else {
			pacmanAnimationState = 4;
		}
		var pacImage = getPacmanImage(direction, pacmanAnimationState);
		context.drawImage(
			commonSprite, 
			pacImage[0], 
			pacImage[1], 
			52, 52, 
			x - 11.5, 
			y - 11.5, 
			52, 52
		);
	}

	function erasePacman(x, y) {
		context.clearRect(x - 11.5, y - 11.5, 52, 52);
	}

	function eraseGhost(x, y) {
		context.clearRect(x - 13.5, y - 13.5, 56, 56);
	}

	function getPacmanImage(direction, status) {
		if (status == PACMAN_OPEN) {
			return [584, 8];
		} else if (direction == LEFT) {
			if (status == PACMAN_CLOSED) {
				return [584, 72];
			} else {
				return [584, 136];
			}
		} else if (direction == RIGHT) {
			if (status == PACMAN_CLOSED) {
				return [644, 136];
			} else {
				return [644, 72];
			}
		} else if (direction == UP) {
			if (status == PACMAN_CLOSED) {
				return [580, 264];				
			} else {
				return [580, 328];
			}
		} else if (direction == DOWN) {
			if (status == PACMAN_CLOSED) {
				return [644, 324];
			} else {
				return [644, 260];
			}
		}
	}

	function drawBlinky(x, y, direction) {
		var blinkyImage = getBlinkyImage(x, y, direction);
		context.drawImage(
			commonSprite, 
			blinkyImage[0], 
			blinkyImage[1], 
			56, 56, 
			x - 13.5, 
			y - 13.5, 
			56, 56
		);
	}

	function getBlinkyImage(direction) {
		return [964, 4];
	}

	/*
	 *	Used for dev purposes
	 */
	function drawGrid() {
		var x = 1;
		var y = 33 * 31;
		context.strokeStyle = "#FFFFFF";
		for (var counter = 0; counter < 29; counter++) {
			context.beginPath();
			context.moveTo(x, 0);
			context.lineTo(x, y);
			context.stroke();
			x += 33;
		}
		y = 1;
		x = 33 * 28;
		for (var counter = 0; counter < 32; counter++) {
			context.beginPath();
			context.moveTo(0, y);
			context.lineTo(x, y);
			context.stroke();
			y += 33;	
		}
	}

	function drawDots(walkableDots) {
		context.fillStyle = "#FFFFFF";
		walkableDots.forEach(function(dot) {
			if ((dot.x <= 0 || dot.x == 29) && dot.y <= 15) {
				return;	
			} 
			var x = (dot.x - 1) * 33 + 13.5;
			var y = (dot.y - 1) * 33 + 13.5;
			context.fillRect(x, y, 8, 8);
		});
	}

	function eraseDot(activeBlock) {
		context.clearRect((activeBlock[0] - 1) * 33 + 1, (activeBlock[1] - 1) * 33 + 1, 33, 33);
	}

}