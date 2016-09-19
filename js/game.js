function Game() {

	var pacmanHandler = null,
		blinkyHandler = null,
		pinkyHandler = null,
		clydeHandler = null,
		inkyHandler = null;

	var canvas = new Canvas(),
		physics = new Physics(),
		printer = new Printer(canvas),
		level = new Level(),
		pacman = new Pacman(),
		controls = new Controls(pacman),
		blinky = new Ghost(),
		pinky = new Ghost(),
		clyde = new Ghost(),
		inky = new Ghost(),
		pathfinder = new Pathfinder(physics);

	document.addEventListener('canvasLoaded', loadGameObjects, false);

	function loadGameObjects() {
		// bam var for dev purposes
		var bam = true;
		if (bam) {
			printer.printLevel();
			setupPoints();
			start();
		} else {
			printer.printLevel();
			// printer.printGrid();
			setupPoints();
			// printer.printGridNumbers();
		}
	}

	function start() {
	
		blinky.setName('blinky');
		inky.setName('inky');
		clyde.setName('clyde');
		pinky.setName('pinky');
		
		pacmanHandler = setInterval(handlePacman, pacman.getSpeed());
		
		blinkyHandler = setInterval(handleBlinky, blinky.getSpeed());
		blinky.setScatterTimer();
		blinky.setFirstScatterMove(false);
		
		pinky.setX(6 * 33 + 1);
		pinky.setY(10 * 33 + 1);
		pinkyHandler = setInterval(handlePinky, pinky.getSpeed());
		pinky.setScatterTimer();
		pinky.setFirstScatterMove(false);
		

		clyde.setX(12 * 33 + 1);
		clyde.setY(17 * 33 + 1);
		clydeHandler = setInterval(handleClyde, clyde.getSpeed());
		clyde.setScatterTimer();
		clyde.setFirstScatterMove(false);
		

		inky.setX(6 * 33 + 1);
		inky.setY(24 * 33 + 1);
		inkyHandler = setInterval(handleInky, inky.getSpeed());
		inky.setScatterTimer();
		inky.setFirstScatterMove(false);

	}

	function setupPoints() {
		var pointBlocks = level.getPointBlocks();
		pointBlocks.forEach(function(pointBlock) {
			if (level.isSpecialBlock(pointBlock)) {
				printer.printSpecialDot(pointBlock);
			} else {
				printer.printDot(pointBlock);
			}
		});
	}

	function handlePacman() {

		printer.erasePacman(pacman.getX(), pacman.getY());
		var currentDirection = pacman.getDirection();
		var oppositeDirection = physics.getOppositeDirection(pacman.getDirection());
		var requestedDirection = pacman.getRequestedDirection();

		// opposite direction requested, no need to be on new block
		if (requestedDirection && requestedDirection == oppositeDirection) {
			pacman.setDirection(oppositeDirection);
		}

		var pacX = pacman.getX();
		var pacY = pacman.getY();
		var currentBlock = physics.getBlockNumber(pacX, pacY);

		if (physics.inTunnel(currentBlock)) {
			if (currentBlock == 393) {
				if (pacman.getDirection() == LEFT) {
					pacman.move();
					printPacmanAndGhosts();
					return;
				}
			} else if (currentBlock == 420) {
				if (pacman.getDirection() == RIGHT) {
					pacman.move();
					printPacmanAndGhosts();
					return;
				}
			} else if (physics.isNewBlock(pacX, pacY) && currentBlock == 392 && pacman.getDirection() == LEFT) {
				pacman.setX(28 * 33 + 4);
			} else if (physics.isNewBlock(pacX, pacY) && currentBlock == 421 && pacman.getDirection() == RIGHT) {
				pacman.setX(-1 * 33 + 4);
			}
		}

		var nextCurrentBlock = physics.getNextBlockNumber(currentBlock, currentDirection);
		if (physics.isNewBlock(pacX, pacY)) {
			// is requested direction requested and is valid requested direction
			if (requestedDirection) {
				var nextRequestedBlock = physics.getNextBlockNumber(currentBlock, requestedDirection);
				if (physics.isWalkableBlock(nextRequestedBlock)) {
					pacman.setDirection(requestedDirection);
					pacman.setRequestedDirection(null);
					pacman.move();
				} else if (physics.isWalkableBlock(nextCurrentBlock)) {
					pacman.move();
				} else {
					// do not move
				}
			} else {
				if (physics.isWalkableBlock(nextCurrentBlock)) {
					pacman.move();
				} 
			}
		} else {
			pacman.move();
		}

		var invadingBlockNumber = physics.getInvadingBlockNumber(pacX, pacY, pacman.getDirection());
		if (level.isPoint(invadingBlockNumber)) {
			level.removeDot(invadingBlockNumber);
			if (level.isSpecialBlock(invadingBlockNumber)) {
				// SPECIAL DOT EATEN -> set ghosts scatter mode + edible
				printer.eraseSpecialDot(invadingBlockNumber);
			} else {
				printer.eraseDot(invadingBlockNumber);
			}
			if (level.dotsLeft() == 600) {
				setCruiseElroy();
			}
 		}

 		var ghostsEaten = isGhostCollision();
 		if (ghostsEaten.length > 0) {
 			console.log('you died! killed by ' + ghostsEaten[0]);
		}

		if (level.finished()) {
			alert('done');
		}

		printPacmanAndGhosts();

	}

	var clydeScatterMode = true;
	function handleClyde() {
		printer.eraseGhost(clyde.getX(), clyde.getY());
		var blockNumber = physics.getBlockNumber(clyde.getX(), clyde.getY());

		if (clyde.inScatterMode()) {
			clydeScatterMode = true;
			if (physics.isNewBlock(clyde.getX(), clyde.getY())) {
				if (clyde.isFirstScatterMove()) {
					clyde.setDirection(physics.getOppositeDirection(clyde.getDirection()));
					clyde.setFirstScatterMove(false);
				} else {
					if (physics.onCrossroads(blockNumber)) {
						var newDirection = pathfinder.findDirectionToBlock(blockNumber, 814, clyde.getDirection());
						clyde.setDirection(newDirection);
					} else if (!physics.isWalkableBlock(physics.getNextBlockNumber(blockNumber, clyde.getDirection()))) {
						var newDirection = pathfinder.findNewGhostDirection(blockNumber, clyde.getDirection());
						clyde.setDirection(newDirection);
					}
				} 
			}

			redrawPoints(blockNumber);
			
			clyde.move();
			printPacmanAndGhosts();
			return;

		} else if (clydeScatterMode) {
			// at this point clyde just got out of scattermode
			clydeScatterMode = false;
			clyde.setDirection(physics.getOppositeDirection(clyde.getDirection()));
			clyde.move();
			printPacmanAndGhosts();
			return;
		}

		if (physics.inTunnel(blockNumber)) {
			if (clyde.getSpeed() !== GHOST_TUNNEL_SPEED) {
				clyde.setTunnelSpeed(true);
				clearInterval(clydeHandler);
				clydeHandler = setInterval(handleClyde, GHOST_TUNNEL_SPEED);
			}
			if (blockNumber == 393) {
				if (clyde.getDirection() == LEFT) {
					clyde.move();
					printPacmanAndGhosts();
					return;
				}
			} else if (blockNumber == 420) {
				if (clyde.getDirection() == RIGHT) {
					clyde.move();
					printPacmanAndGhosts();
					return;
				}
			} else if (physics.isNewBlock(clyde.getX(), clyde.getY()) && blockNumber == 392 && clyde.getDirection() == LEFT) {
				clyde.setX(28 * 33 + 4);
			} else if (physics.isNewBlock(clyde.getX(), clyde.getY()) && blockNumber == 421 && clyde.getDirection() == RIGHT) {
				clyde.setX(-1 * 33 + 4);
			}
		} else {
			if (clyde.getSpeed() == GHOST_TUNNEL_SPEED) {
				clyde.setTunnelSpeed(false);
				clearInterval(clydeHandler);
				clydeHandler = setInterval(handleClyde, clyde.getSpeed());
			}
		}

		if (physics.isNewBlock(clyde.getX(), clyde.getY())) {
			if (physics.onCrossroads(blockNumber)) {
				var pacmanBlockNumber = physics.getBlockNumber(pacman.getX(), pacman.getY());
				var newDirection = null;
				if (physics.isAtLeastEightTilesAway(clyde.getX(), clyde.getY(), pacman.getX(), pacman.getY())) {
					newDirection = pathfinder.findDirectionToBlock(blockNumber, pacmanBlockNumber, clyde.getDirection());
				} else {
					// go in scatter mode (left corner)
					newDirection = pathfinder.findDirectionToBlock(blockNumber, 814, clyde.getDirection());
				}
				clyde.setDirection(newDirection);
			} else if (!physics.isWalkableBlock(physics.getNextBlockNumber(blockNumber, clyde.getDirection()))) {
				var newDirection = pathfinder.findNewGhostDirection(blockNumber, clyde.getDirection());
				clyde.setDirection(newDirection);
			}
			redrawPoints(blockNumber);
		}

		clyde.move();

		printPacmanAndGhosts();

	}

	var blinkyScatterMode = true;
	function handleBlinky() {

		printer.eraseGhost(blinky.getX(), blinky.getY());
		var blockNumber = physics.getBlockNumber(blinky.getX(), blinky.getY());

		if (blinky.inScatterMode()) {
			blinkyScatterMode = true;
			if (physics.isNewBlock(blinky.getX(), blinky.getY())) {
				if (blinky.isFirstScatterMove()) {
					blinky.setDirection(physics.getOppositeDirection(blinky.getDirection()));
					blinky.setFirstScatterMove(false);
				} else {
					if (physics.onCrossroads(blockNumber)) {
						var newDirection = pathfinder.findDirectionToBlock(blockNumber, 55, blinky.getDirection());
						blinky.setDirection(newDirection);
					} else if (!physics.isWalkableBlock(physics.getNextBlockNumber(blockNumber, blinky.getDirection()))) {
						var newDirection = pathfinder.findNewGhostDirection(blockNumber, blinky.getDirection());
						blinky.setDirection(newDirection);
					}
				} 
			}

			redrawPoints(blockNumber);
			
			blinky.move();
			printPacmanAndGhosts();
			return;

		} else if (blinkyScatterMode) {
			// at this point Blinky just got out of scattermode
			blinkyScatterMode = false;
			blinky.setDirection(physics.getOppositeDirection(blinky.getDirection()));
			blinky.move();
			printPacmanAndGhosts();
			return;
		}

		if (physics.inTunnel(blockNumber)) {
			if (blinky.getSpeed() !== GHOST_TUNNEL_SPEED) {
				blinky.setTunnelSpeed(true);
				clearInterval(blinkyHandler);
				blinkyHandler = setInterval(handleBlinky, GHOST_TUNNEL_SPEED);
			}
			if (blockNumber == 393) {
				if (blinky.getDirection() == LEFT) {
					blinky.move();
					printPacmanAndGhosts();
					return;
				}
			} else if (blockNumber == 420) {
				if (blinky.getDirection() == RIGHT) {
					blinky.move();
					printPacmanAndGhosts();
					return;
				}
			} else if (physics.isNewBlock(blinky.getX(), blinky.getY()) && blockNumber == 392 && blinky.getDirection() == LEFT) {
				blinky.setX(28 * 33 + 4);
			} else if (physics.isNewBlock(blinky.getX(), blinky.getY()) && blockNumber == 421 && blinky.getDirection() == RIGHT) {
				blinky.setX(-1 * 33 + 4);
			}
		} else {
			if (blinky.getSpeed() == GHOST_TUNNEL_SPEED) {
				blinky.setTunnelSpeed(false);
				clearInterval(blinkyHandler);
				blinkyHandler = setInterval(handleBlinky, blinky.getSpeed());
			}
		}
		
		if (physics.isNewBlock(blinky.getX(), blinky.getY())) {
			if (physics.onCrossroads(blockNumber)) {
				var pacmanBlockNumber = physics.getBlockNumber(pacman.getX(), pacman.getY());	
				var newDirection = pathfinder.findDirectionToBlock(blockNumber, pacmanBlockNumber, blinky.getDirection());
				blinky.setDirection(newDirection);
			} else if (!physics.isWalkableBlock(physics.getNextBlockNumber(blockNumber, blinky.getDirection()))) {
				var newDirection = pathfinder.findNewGhostDirection(blockNumber, blinky.getDirection());
				blinky.setDirection(newDirection);
			}
			redrawPoints(blockNumber);
		}

		blinky.move();

		printPacmanAndGhosts();

	}

	var pinkyScatterMode = true;
	function handlePinky() {

		printer.eraseGhost(pinky.getX(), pinky.getY());
		var blockNumber = physics.getBlockNumber(pinky.getX(), pinky.getY());

		if (pinky.inScatterMode()) {
			pinkyScatterMode = true;
			if (physics.isNewBlock(pinky.getX(), pinky.getY())) {
				if (pinky.isFirstScatterMove()) {
					pinky.setDirection(physics.getOppositeDirection(pinky.getDirection()));
					pinky.setFirstScatterMove(false);
				} else {
					if (physics.onCrossroads(blockNumber)) {
						var newDirection = pathfinder.findDirectionToBlock(blockNumber, 30, pinky.getDirection());
						pinky.setDirection(newDirection);
					} else if (!physics.isWalkableBlock(physics.getNextBlockNumber(blockNumber, pinky.getDirection()))) {
						var newDirection = pathfinder.findNewGhostDirection(blockNumber, pinky.getDirection());
						pinky.setDirection(newDirection);
					}
				} 
			}

			redrawPoints(blockNumber);
			
			pinky.move();
			printPacmanAndGhosts();
			return;

		} else if (pinkyScatterMode) {
			// at this point pinky just got out of scattermode
			pinkyScatterMode = false;
			pinky.setDirection(physics.getOppositeDirection(pinky.getDirection()));
			pinky.move();
			printPacmanAndGhosts();
			return;
		}

		if (physics.inTunnel(blockNumber)) {
			if (pinky.getSpeed() !== GHOST_TUNNEL_SPEED) {
				pinky.setTunnelSpeed(true);
				clearInterval(pinkyHandler);
				pinkyHandler = setInterval(handlePinky, GHOST_TUNNEL_SPEED);
			}
			if (blockNumber == 393) {
				if (pinky.getDirection() == LEFT) {
					pinky.move();
					printPacmanAndGhosts();
					return;
				}
			} else if (blockNumber == 420) {
				if (pinky.getDirection() == RIGHT) {
					pinky.move();
					printPacmanAndGhosts();
					return;
				}
			} else if (physics.isNewBlock(pinky.getX(), pinky.getY()) && blockNumber == 392 && pinky.getDirection() == LEFT) {
				pinky.setX(28 * 33 + 4);
			} else if (physics.isNewBlock(pinky.getX(), pinky.getY()) && blockNumber == 421 && pinky.getDirection() == RIGHT) {
				pinky.setX(-1 * 33 + 4);
			}
		} else {
			if (pinky.getSpeed() == GHOST_TUNNEL_SPEED) {
				pinky.setTunnelSpeed(false);
				clearInterval(pinkyHandler);
				pinkyHandler = setInterval(handlePinky, pinky.getSpeed());
			}
		}

		if (physics.isNewBlock(pinky.getX(), pinky.getY())) {
			if (physics.onCrossroads(blockNumber)) {
				var pacmanBlockNumber = physics.getBlockNumber(pacman.getX(), pacman.getY());	
				var endBlock = pathfinder.findFourBlocksInDirection(pacmanBlockNumber, pacman.getDirection());
				var newDirection = pathfinder.findDirectionToBlock(blockNumber, endBlock, pinky.getDirection());
				pinky.setDirection(newDirection);
			} else if (!physics.isWalkableBlock(physics.getNextBlockNumber(blockNumber, pinky.getDirection()))) {
				var newDirection = pathfinder.findNewGhostDirection(blockNumber, pinky.getDirection());
				pinky.setDirection(newDirection);
			}
			redrawPoints(blockNumber);
		}

		pinky.move();
		printPacmanAndGhosts();

	}

	var inkyScatterMode = true;
	function handleInky() {

		printer.eraseGhost(inky.getX(), inky.getY());
		var blockNumber = physics.getBlockNumber(inky.getX(), inky.getY());

		if (inky.inScatterMode()) {
			inkyScatterMode = true;
			if (physics.isNewBlock(inky.getX(), inky.getY())) {
				if (inky.isFirstScatterMove()) {
					inky.setDirection(physics.getOppositeDirection(inky.getDirection()));
					inky.setFirstScatterMove(false);
				} else {
					if (physics.onCrossroads(blockNumber)) {
						var newDirection = pathfinder.findDirectionToBlock(blockNumber, 839, inky.getDirection());
						inky.setDirection(newDirection);
					} else if (!physics.isWalkableBlock(physics.getNextBlockNumber(blockNumber, inky.getDirection()))) {
						var newDirection = pathfinder.findNewGhostDirection(blockNumber, inky.getDirection());
						inky.setDirection(newDirection);
					}
				} 
			}

			redrawPoints(blockNumber);
			
			inky.move();
			printPacmanAndGhosts();
			return;

		} else if (inkyScatterMode) {
			// at this point inky just got out of scattermode
			inkyScatterMode = false;
			inky.setDirection(physics.getOppositeDirection(inky.getDirection()));
			inky.move();
			printPacmanAndGhosts();
			return;
		}

		if (physics.inTunnel(blockNumber)) {
			if (inky.getSpeed() !== GHOST_TUNNEL_SPEED) {
				inky.setTunnelSpeed(true);
				clearInterval(inkyHandler);
				inkyHandler = setInterval(handleInky, GHOST_TUNNEL_SPEED);
			}
			if (blockNumber == 393) {
				if (inky.getDirection() == LEFT) {
					inky.move();
					printPacmanAndGhosts();
					return;
				}
			} else if (blockNumber == 420) {
				if (inky.getDirection() == RIGHT) {
					inky.move();
					printPacmanAndGhosts();
					return;
				}
			} else if (physics.isNewBlock(inky.getX(), inky.getY()) && blockNumber == 392 && inky.getDirection() == LEFT) {
				inky.setX(28 * 33 + 4);
			} else if (physics.isNewBlock(inky.getX(), inky.getY()) && blockNumber == 421 && inky.getDirection() == RIGHT) {
				inky.setX(-1 * 33 + 4);
			}
		} else {
			if (inky.getSpeed() == GHOST_TUNNEL_SPEED) {
				inky.setTunnelSpeed(false);
				clearInterval(inkyHandler);
				inkyHandler = setInterval(handleInky, inky.getSpeed());
			}
		}

		if (physics.isNewBlock(inky.getX(), inky.getY())) {
			if (physics.onCrossroads(blockNumber)) {
				var twoBlocksFurtherPacman = pathfinder.findTwoBlocksInFrontPosition(pacman.getX(), pacman.getY(), pacman.getDirection());
				var blinkyPosition = [blinky.getX(), blinky.getY()];
				var requiredInkyPosition = pathfinder.getRequiredInkyPosition(blinkyPosition, twoBlocksFurtherPacman);
				var inkyBlockNumber = physics.getBlockNumber(requiredInkyPosition[0], requiredInkyPosition[1]);
				var newDirection = pathfinder.findDirectionToBlock(blockNumber, inkyBlockNumber, inky.getDirection());
				inky.setDirection(newDirection);
			} else if (!physics.isWalkableBlock(physics.getNextBlockNumber(blockNumber, inky.getDirection()))) {
				var newDirection = pathfinder.findNewGhostDirection(blockNumber, inky.getDirection());
				inky.setDirection(newDirection);
			}
			redrawPoints(blockNumber);
		}

		inky.move();
		printPacmanAndGhosts();
	}

	function setCruiseElroy() {
		blinky.setSpeed(blinky.getSpeed() - 2);
		clearInterval(blinkyHandler);
		blinkyHandler = setInterval(handleBlinky, blinky.getSpeed());
	}

	function printPacmanAndGhosts() {
		printer.printPacman(pacman.getX(), pacman.getY(), pacman.getDirection(), pacman.getAnimationState());
		printer.printPinky(pinky.getX(), pinky.getY(), pinky.getDirection(), pinky.isOpen(), pinky.isEdible());
		printer.printClyde(clyde.getX(), clyde.getY(), clyde.getDirection(), clyde.isOpen(), clyde.isEdible());
		printer.printBlinky(blinky.getX(), blinky.getY(), blinky.getDirection(), blinky.isOpen(), blinky.isEdible());
		printer.printInky(inky.getX(), inky.getY(), inky.getDirection(), inky.isOpen(), inky.isEdible());
		printer.printExcessTunnels();
	}

	function redrawPoints(blockNumber) {
		var pointsToRedraw = level.getSurroundingPoints(blockNumber);
		pointsToRedraw.forEach(function(point) {
			if (level.isSpecialBlock(point)) {
				printer.printSpecialDot(point);
			} else {
				printer.printDot(point);
			}
		});
	}

	function isGhostCollision() {

		var ghosts = [];
		ghosts.push(blinky);
		ghosts.push(inky);
		ghosts.push(pinky);
		ghosts.push(clyde);

		var ghostsEaten = [];
		var limit = 20;
		ghosts.forEach(function(ghost) {
			if (Math.abs(ghost.getX() - pacman.getX()) < limit && Math.abs(ghost.getY() - pacman.getY()) < limit) {
				ghostsEaten.push(ghost.getName());
			}
		});

		return ghostsEaten;

	}

}