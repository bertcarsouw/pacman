function Game() {

	var canvas = new Canvas(),
		runner = null,
		runGhost = null, 
		painter,
		level,
		physics, 
		pacman,
		controls,
		pathfinder,
		blinky;

	document.addEventListener('canvasLoaded', loadGameObjects, false);

	function loadGameObjects() {
		painter = new Painter(canvas);
		physics = new Physics();
		pathfinder = new Pathfinder(physics);
		pacman = new Pacman();
		controls = new Controls(pacman);
		blinky = new Ghost();
		startGame();
	}

	function startGame() {
		painter.drawLevel();
		// painter.drawGrid();
		level = new Level(physics.getWalkableBlocks());
		painter.drawDots(level.getDots());
		painter.drawPacman(pacman.getX(), pacman.getY(), pacman.getDirection());
		runner = setInterval(generateFrame, 16);
		runGhost = setInterval(generateBlinky, 22);
	}

	var points = 0;

	function generateFrame() {
		
		painter.erasePacman(pacman.getX(), pacman.getY());

		var requestedDirection = pacman.getRequestedDirection();
		var oppositeDirection = physics.getOppositeDirection(pacman.getDirection());

		var wentInOppositeDirection = false;

		// opposite direction requested, always ok??
		if (requestedDirection && requestedDirection == oppositeDirection) {
			pacman.setRequestedDirection(null);
			pacman.setDirection(oppositeDirection);
			pacman.move();
			wentInOppositeDirection  = true;
		}

		var animate = true;
		var blockNumber = physics.getBlockNumber(pacman.getX(), pacman.getY());

		// check if pacman goes into tunnel
		if (blockNumber[1] == 15) {
			if (blockNumber[0] == -1) {
				pacman.setDirection(3);
				pacman.setX(28 * 33 + 4);
			} else if (blockNumber[0] == 29) {
				if (pacman.getDirection() != 3) {
					pacman.setDirection(4);
					pacman.setX(-1 * 33 + 4);
				}
			}
		}

		if (!wentInOppositeDirection) {
			var newBlock = physics.isNewBlock(pacman.getX(), pacman.getY());
			if (newBlock) {
				if (pacman.getRequestedDirection() && physics.isValidNewBlockDirection(blockNumber, pacman.getRequestedDirection())) {
					pacman.setDirection(pacman.getRequestedDirection());
					pacman.setRequestedDirection(null);
					pacman.move();
				} else if (physics.isValidNewBlockDirection(blockNumber, pacman.getDirection())) {
					pacman.move();
				} else {
					animate = false;
				}
			} else {
				pacman.move();
			}
		}

		var activeBlock = physics.getActiveBlockNumber(pacman.getX(), pacman.getY(), pacman.getDirection());
		if (level.removeDot(activeBlock)) {
			painter.eraseDot(activeBlock);
		}

		if (level.finished()) {
			alert('points');
		}
		
		drawMovingObjects(animate);

	}

	function generateBlinky() {
		painter.eraseGhost(blinky.getX(), blinky.getY());
		var newBlock = physics.isNewBlock(blinky.getX(), blinky.getY());
		var blockNumber = physics.getBlockNumber(blinky.getX(), blinky.getY());
		if (newBlock) {
			if (physics.isCrossroads(blockNumber)) {
				var pacmanPosition = physics.getBlockNumber(pacman.getX(), pacman.getY());
				var pathToPacman = pathfinder.find(blockNumber, pacmanPosition, blinky.getDirection());
				var directionToPacman = pathfinder.getPathDirection(pathToPacman);
				blinky.setDirection(directionToPacman);
				blinky.move();
			} else if (physics.isValidNewBlockDirection(blockNumber, blinky.getDirection())) {
				blinky.move();
			} else {
				var pacmanPosition = physics.getBlockNumber(pacman.getX(), pacman.getY());
				var pathToPacman = pathfinder.find(blockNumber, pacmanPosition, blinky.getDirection());
				var directionToPacman = pathfinder.getPathDirection(pathToPacman);
				blinky.setDirection(directionToPacman);
				blinky.move();
			}
		} else {
			blinky.move();
		}
		redrawGhostDots(blockNumber);
		drawMovingObjects(false);
	}

	function redrawGhostDots(blockNumber) {
		var neighbours = [];
		neighbours.push({ 'x': blockNumber[0] - 1, 'y': blockNumber[1] });
		neighbours.push({ 'x': blockNumber[0] + 1, 'y': blockNumber[1] });
		neighbours.push({ 'x': blockNumber[0], 'y': blockNumber[1] + 1 });
		neighbours.push({ 'x': blockNumber[0], 'y': blockNumber[1] - 1 });
		neighbours.forEach(function(neighbour) {
			if (level.isDot(neighbour)) {
				painter.drawDot(neighbour);
			}
		});		
	}

	function drawMovingObjects(animatePacman) {
		painter.drawPacman(pacman.getX(), pacman.getY(), pacman.getDirection(), animatePacman);
		painter.drawBlinky(blinky.getX(), blinky.getY(), blinky.getDirection(), blinky.isOpen());
		painter.drawTunnels();
	}

}

new Game();