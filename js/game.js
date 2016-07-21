function Game(context, levelImage, elementsImage) {

	var pacmanRunning = null;
	
	var level = null;
	var pacman = null;
	var ghost = null;

	function runPacman() {
		pacman.setNextStep();
		ghost.setNextStep();
		level.removeConsumedDots(pacman.getGeo().getX(), pacman.getGeo().getY(), pacman.getGeo().getDirection());
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