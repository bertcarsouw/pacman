function Run() {

	var setup = new Setup();
	
	document.addEventListener('setupDone', run, false);

	function run() {
		new Game(setup.getContext(), setup.getLevelImage(), setup.getElementsImage());
	};

};