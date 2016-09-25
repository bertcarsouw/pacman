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
		pathfinder = new Pathfinder(physics),
		ghosts = [];

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
			printer.printGrid();
			setupPoints();
			printer.printGridNumbers();
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
		
		pinky.setX(13 * 33 + 19);
		pinky.setY(14 * 33 + 1);
		pinky.setDirection(UP);
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

		ghosts.push(blinky);
		ghosts.push(inky);
		ghosts.push(pinky);
		ghosts.push(clyde);

	}

	function setEdibleScatterMode() {
		ghosts.forEach(function(ghost) {
			ghost.setEdible(true);
			if (ghost.inScatterMode()) {
				ghost.resetScatter();
			} else {
				ghost.setFirstScatterMove(true);
			}
			ghost.setScatterTimer();
		});
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
				setEdibleScatterMode();
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
			clyde.setEdible(false);
		}

		if (physics.inTunnel(blockNumber)) {
			if (handleGhostInTunnel(clyde, blockNumber)) {
				// clyde handled
				return;
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
			blinky.setEdible(false);
			blinkyScatterMode = false;
		}

		if (physics.inTunnel(blockNumber)) {
			if (handleGhostInTunnel(blinky, blockNumber)) {
				// blinky handled
				return;
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

		if (physics.inGhostHouse(blockNumber)) {
			pinky.setDirection(UP);
 		}

 		if (pinky.getX() == (13 * 33 + 19) && pinky.getY() == (11 * 33 + 1) && pinky.getDirection() == UP) {
			var newDirection = pathfinder.findDirectionToBlock(blockNumber, 30, pinky.getDirection());		
			pinky.setDirection(newDirection);
			pinky.move();
			printer.printGhostHouse();
			printPacmanAndGhosts();
			return;
 		} 

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
			pinky.setEdible(false);
			pinkyScatterMode = false;
		}

		if (physics.inTunnel(blockNumber)) {
			if (handleGhostInTunnel(pinky, blockNumber)) {
				// pinky handled
				return;
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
			inky.setEdible(false);
			inkyScatterMode = false;
		}

		if (physics.inTunnel(blockNumber)) {
			if (handleGhostInTunnel(inky, blockNumber)) {
				// inky handled
				return;
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

	function handleGhostInTunnel(ghost, blockNumber) {
		if (ghost.getSpeed() !== GHOST_TUNNEL_SPEED) {
			ghost.setTunnelSpeed(true);
			if (ghost.getName() == 'inky') {
				clearInterval(inkyHandler);
				inkyHandler = setInterval(handleInky, GHOST_TUNNEL_SPEED);
			} else if (ghost.getName() == 'pinky') {
				clearInterval(pinkyHandler);
				pinkyHandler = setInterval(handlePinky, GHOST_TUNNEL_SPEED);
			} else if (ghost.getName() == 'blinky') {
				clearInterval(blinkyHandler);
				blinkyHandler = setInterval(handleBlinky, GHOST_TUNNEL_SPEED);
			} else {
				clearInterval(clydeHandler);
				clydeHandler = setInterval(handleClyde, GHOST_TUNNEL_SPEED);
			}
		}
		if (blockNumber == 393) {
			if (ghost.getDirection() == LEFT) {
				ghost.move();
				printPacmanAndGhosts();
				return true;
			}
		} else if (blockNumber == 420) {
			if (ghost.getDirection() == RIGHT) {
				ghost.move();
				printPacmanAndGhosts();
				return true;
			}
		} else if (physics.isNewBlock(ghost.getX(), ghost.getY()) && blockNumber == 392 && ghost.getDirection() == LEFT) {
			ghost.setX(28 * 33 + 4);
		} else if (physics.isNewBlock(ghost.getX(), ghost.getY()) && blockNumber == 421 && ghost.getDirection() == RIGHT) {
			ghost.setX(-1 * 33 + 4);
		}
		return false;
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
			printer.printDot(point);
		});
		var specialBlocks = level.getNonEatenSpecialBlocks();
		specialBlocks.forEach(function(specialBlock) {
			printer.printSpecialDot(specialBlock);
		});
	}

	// not used yet!
	function setNewSpeed(ghost, speed) {
		if (ghost.getName() == 'inky') {
			clearInterval(inkyHandler);
			inkyHandler = setInterval(handleInky, speed);
		} else if (ghost.getName() == 'pinky') {
			clearInterval(pinkyHandler);
			pinkyHandler = setInterval(handlePinky, speed);
		} else if (ghost.getName() == 'blinky') {
			clearInterval(blinkyHandler);
			blinkyHandler = setInterval(handleBlinky, speed);
		} else {
			clearInterval(clydeHandler);
			clydeHandler = setInterval(handleClyde, speed);
		}
	}

	function isGhostCollision() {
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