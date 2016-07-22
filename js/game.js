function Game(context, levelImage, elementsImage) {

	var pacmanRunning = null;
	
	var level = null;
	var pacman = null;
	var ghost = null;

	function runPacman() {
		level.redrawGhostDots(ghost.getX(), ghost.getY(), ghost.getDirection());
		pacman.setNextStep();
		level.removeConsumedDots(pacman.getGeo().getX(), pacman.getGeo().getY(), pacman.getGeo().getDirection());
		ghost.setNextStep();
		if (pacman.getGeo().getX() < 0 || pacman.getGeo().getX() > 873) {
			level.drawTunnelBorders();
		}
		if (level.isCleared()) {
			stopRunning();
		}
	};

	function stopRunning() {
		clearInterval(pacmanRunning);
	};

	function setupElements() {
		level = new Level(context, levelImage, elementsImage);
		pacman = new Pacman(context, elementsImage);
	 	ghost = new Ghost(context, elementsImage);
		new Controls(pacman);
		pacmanRunning = setInterval(runPacman, 20);
	};
	
	setupElements();

}