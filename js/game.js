function Game() {

	var pacmanHandler = null,
		blinkyHandler = null,
		pinkyHandler = null,
		clydeHandler = null;

	var canvas = new Canvas(),
		physics = new Physics(),
		printer = new Printer(canvas),
		level = new Level(),
		pacman = new Pacman(),
		controls = new Controls(pacman),
		blinky = new Ghost(),
		pinky = new Ghost(),
		clyde = new Ghost(),
		pathfinder = new Pathfinder(physics);

	document.addEventListener('canvasLoaded', loadGameObjects, false);

	function loadGameObjects() {
		printer.printLevel();
		// printer.printGrid();
		// printer.printGridNumbers();
		setupPoints();
		start();
	}

	function start() {
	
		pacmanHandler = setInterval(handlePacman, pacman.getSpeed());
		
		blinkyHandler = setInterval(handleBlinky, blinky.getSpeed());
		blinky.setScatterTimer();
		blinky.setFirstScatterMove(false);
		
		pinky.setX(6 * 33 + 1);
		pinky.setY(10 * 33 + 1);
		pinkyHandler = setInterval(handlePinky, pinky.getSpeed());
		
		clyde.setX(12 * 33 + 1);
		clyde.setY(17 * 33 + 1);
		clydeHandler = setInterval(handleClyde, clyde.getSpeed());
	
	}

	function setupPoints() {
		var pointBlocks = level.getPointBlocks();
		pointBlocks.forEach(function(pointBlock) {
			printer.printDot(pointBlock);
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
			printer.eraseDot(invadingBlockNumber);
			level.removeDot(invadingBlockNumber);
		}

		if (level.finished()) {
			alert('done');
		}

		printPacmanAndGhosts();

	}

	function handleClyde() {
		printer.eraseGhost(clyde.getX(), clyde.getY());
		var blockNumber = physics.getBlockNumber(clyde.getX(), clyde.getY());

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
			var pointsToRedraw = level.getSurroundingPoints(blockNumber);
			pointsToRedraw.forEach(function(point) {
				printer.printDot(point);
			});
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

			var pointsToRedraw = level.getSurroundingPoints(blockNumber);
			pointsToRedraw.forEach(function(point) {
				printer.printDot(point);
			});
			
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
			var pointsToRedraw = level.getSurroundingPoints(blockNumber);
			pointsToRedraw.forEach(function(point) {
				printer.printDot(point);
			});
		}

		blinky.move();

		printPacmanAndGhosts();

	}

	function handlePinky() {

		printer.eraseGhost(pinky.getX(), pinky.getY());
		var blockNumber = physics.getBlockNumber(pinky.getX(), pinky.getY());

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
			var pointsToRedraw = level.getSurroundingPoints(blockNumber);
			pointsToRedraw.forEach(function(point) {
				printer.printDot(point);
			});
		}

		pinky.move();
		printPacmanAndGhosts();

	}

	function printPacmanAndGhosts() {
		printer.printPacman(pacman.getX(), pacman.getY(), pacman.getDirection(), pacman.getAnimationState());
		printer.printPinky(pinky.getX(), pinky.getY(), pinky.getDirection(), pinky.isOpen(), pinky.isEdible());
		printer.printClyde(clyde.getX(), clyde.getY(), clyde.getDirection(), clyde.isOpen(), clyde.isEdible());
		printer.printBlinky(blinky.getX(), blinky.getY(), blinky.getDirection(), blinky.isOpen(), blinky.isEdible());
		printer.printExcessTunnels();
	}

}