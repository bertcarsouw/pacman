function Game() {

	var canvas = new Canvas(),
		runner = null, 
		painter,
		physics, 
		pacman;

	document.addEventListener('canvasLoaded', loadGameObjects, false);

	function loadGameObjects() {
		painter = new Painter(canvas);
		physics = new Physics();
		pacman = new Pacman();
		startGame();
	}

	function startGame() {
		painter.drawLevel();
		// painter.drawGrid();
		painter.drawPacman(pacman.getX(), pacman.getY(), pacman.getDirection());
		runner = setInterval(generateFrame, 12);
	}

	function generateFrame() {
		
		painter.erasePacman(pacman.getX(), pacman.getY());

		var requestedDirection = pacman.getRequestedDirection();
		var oppositeDirection = physics.getOppositeDirection(pacman.getDirection());

		// opposite direction requested, always ok??
		if (requestedDirection && requestedDirection == oppositeDirection) {
			pacman.setRequestedDirection(null);
			pacman.setDirection(oppositeDirection);
			pacman.move();
			painter.drawPacman(pacman.getX(), pacman.getY(), pacman.getDirection());
			return;
		}

		var animate = true;
		var blockNumber = physics.getBlockNumber(pacman.getX(), pacman.getY());

		// check if pacman goes into tunnel
		var paintTunnels = false;
		if (blockNumber[1] == 15) {
			paintTunnels = true;
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

		painter.drawPacman(pacman.getX(), pacman.getY(), pacman.getDirection(), animate);
		if (paintTunnels) {
			painter.drawTunnels();
		}

	}

}

new Game();