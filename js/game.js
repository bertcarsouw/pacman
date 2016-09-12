function Game() {

	var pacmanHandler = null,
		blinkyHandler = null;

	var canvas = new Canvas(),
		physics = new Physics(),
		printer = new Printer(canvas),
		level = new Level(),
		pacman = new Pacman(),
		controls = new Controls(pacman),
		blinky = new Ghost(),
		pathfinder = new Pathfinder(physics);

	document.addEventListener('canvasLoaded', loadGameObjects, false);

	function loadGameObjects() {
		printer.printLevel();
		// printer.printGrid();
		// printer.printGridNumbers();
		setupPoints();
		start();
	}

	function setupPoints() {
		var pointBlocks = level.getPointBlocks();
		pointBlocks.forEach(function(pointBlock) {
			printer.printDot(pointBlock);
		});
	}

	function start() {
		pacmanHandler = setInterval(handlePacman, pacman.getSpeed());
		blinkyHandler = setInterval(handleBlinky, blinky.getSpeed());
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
					printer.printPacman(pacman.getX(), pacman.getY(), pacman.getDirection(), pacman.getAnimationState());
					printer.printExcessTunnels();
					return;
				}
			} else if (currentBlock == 420) {
				if (pacman.getDirection() == RIGHT) {
					pacman.move();
					printer.printPacman(pacman.getX(), pacman.getY(), pacman.getDirection(), pacman.getAnimationState());
					printer.printExcessTunnels();
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

		printer.printPacman(pacman.getX(), pacman.getY(), pacman.getDirection(), pacman.getAnimationState());
		if (physics.inTunnel(currentBlock)) {
			printer.printExcessTunnels();
		}

	}

	function handleBlinky() {
		printer.eraseGhost(blinky.getX(), blinky.getY());
		if (physics.isNewBlock(blinky.getX(), blinky.getY())) {
			var blockNumber = physics.getBlockNumber(blinky.getX(), blinky.getY());
			if (physics.onCrossroads(blockNumber)) {
				var pacmanBlockNumber = physics.getBlockNumber(pacman.getX(), pacman.getY());	
				var newDirection = pathfinder.findDirectionToPacman(blockNumber, pacmanBlockNumber, blinky.getDirection());
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
		printer.printBlinky(blinky.getX(), blinky.getY(), blinky.getDirection(), blinky.isOpen());
	}

}