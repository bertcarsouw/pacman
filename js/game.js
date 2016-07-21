function Game(context, levelImage, elementsImage) {

	var pacman = null;
	var level = null;
	var pacmanRunning = null;
	var ghost = null;

	function runPacman() {
		// pacman.setNextStep();
		ghost.setNextStep();
		// level.removeConsumedDots(pacman.getX(), pacman.getY(), pacman.getDirection());
		if (level.isCleared()) {
			stopRunning();
		}
	};

	function stopRunning() {
		clearInterval(pacmanRunning);
	};

	function setupElements() {
		// pacman = new Pacman(context, elementsImage);
		level = new Level(context, levelImage, elementsImage);
	 	ghost = new Ghost(context, elementsImage);
		new Controls(ghost);
		pacmanRunning = setInterval(runPacman, 20);
	};
	
	setupElements();

}