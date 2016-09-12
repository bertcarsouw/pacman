function Printer(canvas) {

	this.printLevel = printLevel;
	this.printGrid = printGrid; 
	this.printGridNumbers = printGridNumbers; 
	this.printPacman = printPacman;
	this.erasePacman = erasePacman;	
	this.printExcessTunnels = printExcessTunnels;
	this.printDot = printDot;
	this.eraseDot = eraseDot;
	this.eraseGhost = eraseGhost;
	this.printBlinky = printBlinky;

	var context = canvas.getContext(),
		levelImage = canvas.getLevelImage(),
		sprite =  canvas.getSprite();

	function printLevel() {
		context.drawImage(levelImage, 0, 0, 925, 1024, 0, 0, 925, 1024);
	}

	function printGrid() {
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

	function printGridNumbers() {
		context.font = '13px Courier New';
      	context.fillStyle = 'white';
      	var x = 5; 
      	var y = 22;
      	for (var counter = 1; counter <= 868; counter++) {
	      	context.fillText(counter, x, y);
      		x += 33;
      		if (counter % 28 == 0) {
      			y += 33;
      			x = 5;
      		}
      	}
	}

	function printPacman(x, y, direction, pacmanAnimationState) {
		var pacImage = getPacmanImage(direction, pacmanAnimationState);
		context.drawImage(
			sprite, 
			pacImage[0], 
			pacImage[1], 
			52, 52, 
			x - 11.5, 
			y - 11.5, 
			52, 52
		);
	}

	/*
	 *	Status
	 *	1: open
	 *	3: closed
	 *	rest: half-open
	 */
	function getPacmanImage(direction, status) {
		if (status == 1) {
			return [584, 8];
		} else if (direction == LEFT) {
			if (status == 3) {
				return [584, 72];
			} else {
				return [584, 136];
			}
		} else if (direction == RIGHT) {
			if (status == 3) {
				return [644, 136];
			} else {
				return [644, 72];
			}
		} else if (direction == UP) {
			if (status == 3) {
				return [580, 264];				
			} else {
				return [580, 328];
			}
		} else if (direction == DOWN) {
			if (status == 3) {
				return [644, 324];
			} else {
				return [644, 260];
			}
		}
	}

	function erasePacman(x, y) {
		context.clearRect(x - 11.5, y - 11.5, 52, 52);
	}

	function eraseGhost(x, y) {
		context.clearRect(x - 13.5, y - 13.5, 56, 56);
	}

	function printExcessTunnels() {
		context.clearRect(-100, 444, 100, 70);
		context.clearRect(925, 444, 100, 70);
	}

	function printDot(blockNumber) {
		var vertical = Math.ceil(blockNumber / 28) - 1;
		var horizontal = blockNumber % 28 - 1;
		context.fillStyle = "#FFFFFF";
		context.fillRect(horizontal * 33 + 13.5, vertical * 33 + 13.5, 8, 8);
	}

	function eraseDot(blockNumber) {
		var vertical = Math.ceil(blockNumber / 28) - 1;
		var horizontal = blockNumber % 28 - 1;
		context.clearRect(horizontal * 33 + 12.5, vertical * 33 + 12.5, 10, 10);
	}

	function printBlinky(x, y, direction, open) {
		var blinkyImage = getBlinkyImage(direction, open);
		context.drawImage(
			sprite, 
			blinkyImage[0], 
			blinkyImage[1], 
			56, 56, 
			x - 13.5, 
			y - 13.5, 
			56, 56
		);
	}

	function getBlinkyImage(direction, open) {
		if (direction == RIGHT) {
			if (open) {
				return [964, 4];
			}
			return [964, 68];
		} 
		if (direction == DOWN) {
			if (open) {
				return [964, 132];
			}
			return [964, 196];
		}
		if (direction == LEFT) {
			if (open) {
				return [964, 260];
			}
			return [964, 324];
		}
		if (direction == UP) {
			if (open) {
				return [964, 388];
			}
			return [964, 452];
		}
	}

}