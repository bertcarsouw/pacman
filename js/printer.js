function Printer(canvas) {

	this.printLevel = printLevel;
	this.printGrid = printGrid; 
	this.printGridNumbers = printGridNumbers; 
	this.printPacman = printPacman;
	this.erasePacman = erasePacman;	
	this.printExcessTunnels = printExcessTunnels;
	this.printDot = printDot;
	this.printSpecialDot = printSpecialDot;
	this.eraseDot = eraseDot;
	this.eraseSpecialDot = eraseSpecialDot; 
	this.eraseGhost = eraseGhost;
	this.printBlinky = printBlinky;
	this.printPinky = printPinky;
	this.printClyde = printClyde;
	this.printInky = printInky;
	this.printGhostHouse = printGhostHouse;

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

	function printSpecialDot(blockNumber) {
		var vertical = Math.ceil(blockNumber / 28) - 1;
		var horizontal = blockNumber % 28 - 1;
		context.beginPath();
	    context.arc(horizontal * 33 + 16.5, vertical * 33 + 16.5, 14, 0, 2 * Math.PI, false);
	    context.fillStyle = '#FFFFFF';
	    context.fill();
	    context.lineWidth = 5;
	    context.strokeStyle = '#FFFFFF';
	    context.stroke();
	}

	function eraseDot(blockNumber) {
		var vertical = Math.ceil(blockNumber / 28) - 1;
		var horizontal = blockNumber % 28 - 1;
		context.clearRect(horizontal * 33 + 12.5, vertical * 33 + 12.5, 10, 10);
	}

	function eraseSpecialDot(blockNumber) {
		var vertical = Math.ceil(blockNumber / 28) - 1;
		var horizontal = blockNumber % 28 - 1;
		context.clearRect(horizontal * 33 - 1, vertical * 33 - 1, 35, 35);
	}

	function printGhostHouse() {
		context.drawImage(levelImage, 425, 415, 75, 15, 425, 415, 75, 15);
	}

	function printBlinky(x, y, direction, open, scatterMode) {
		if (scatterMode) {
			printScatterGhost(x, y, open);
		} else {
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
	}

	function printScatterGhost(x, y, open) {
		var scatterImage = getScatterGhostImage(open);
		context.drawImage(
			sprite, 
			scatterImage[0], 
			scatterImage[1], 
			56, 56, 
			x - 13.5, 
			y - 13.5, 
			56, 56
		);
	}

	function printClyde(x, y, direction, open, scatterMode) {
		if (scatterMode) {
			printScatterGhost(x, y, open);
		} else {
	 		var clydeImage = getClydeImage(direction, open);
			context.drawImage(
				sprite, 
				clydeImage[0], 
				clydeImage[1], 
				56, 56, 
				x - 13.5, 
				y - 13.5, 
				56, 56
			);
		}
	}

	function printInky(x, y, direction, open, scatterMode) {
		if (scatterMode) {
			printScatterGhost(x, y, open);
		} else {
	 		var inkyImage = getInkyImage(direction, open);
			context.drawImage(
				sprite, 
				inkyImage[0], 
				inkyImage[1], 
				56, 56, 
				x - 13.5, 
				y - 13.5, 
				56, 56
			);
		}	
	}

	function printPinky(x, y, direction, open, scatterMode) {
		if (scatterMode) {
			printScatterGhost(x, y, open);
		} else {
	 		var pinkyImage = getPinkyImage(direction, open);
			context.drawImage(
				sprite, 
				pinkyImage[0], 
				pinkyImage[1], 
				56, 56, 
				x - 13.5, 
				y - 13.5, 
				56, 56
			);
		}
	}

	function getPinkyImage(direction, open) {
		if (direction == RIGHT) {
			if (open) {
				return [836, 4];
			}
			return [836, 68];
		} 
		if (direction == DOWN) {
			if (open) {
				return [836, 132];
			}
			return [836, 196];
		}
		if (direction == LEFT) {
			if (open) {
				return [836, 260];
			}
			return [836, 324];
		}
		if (direction == UP) {
			if (open) {
				return [836, 388];
			}
			return [836, 452];
		}
	}

	function getClydeImage(direction, open) {
		if (direction == RIGHT) {
			if (open) {
				return [772, 4];
			}
			return [772, 68];
		} 
		if (direction == DOWN) {
			if (open) {
				return [772, 132];
			}
			return [772, 196];
		}
		if (direction == LEFT) {
			if (open) {
				return [772, 260];
			}
			return [772, 324];
		}
		if (direction == UP) {
			if (open) {
				return [772, 388];
			}
			return [772, 452];
		}
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

	function getInkyImage(direction, open) {
		if (direction == RIGHT) {
			if (open) {
				return [900, 4];
			}
			return [900, 68];
		} 
		if (direction == DOWN) {
			if (open) {
				return [900, 132];
			}
			return [900, 196];
		}
		if (direction == LEFT) {
			if (open) {
				return [900, 260];
			}
			return [900, 324];
		}
		if (direction == UP) {
			if (open) {
				return [900, 388];
			}
			return [900, 452];
		}
	}

	function getScatterGhostImage(open) {
		if (open) {
			return [196, 132];
		} else {
			return [196, 196];
		}
	}

}