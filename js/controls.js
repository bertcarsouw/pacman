function Controls(pacman) {

	var UP = 1,
		DOWN = 2,
		LEFT = 3,
		RIGHT = 4;

	window.addEventListener('keydown', handleKey);

	function handleKey(event) {
		if (event.keyCode == 38) {
			pacman.setRequestedDirection(UP);;
		} else if (event.keyCode == 40) {
			pacman.setRequestedDirection(DOWN);
		} else if (event.keyCode == 37) {
			pacman.setRequestedDirection(LEFT);
		} else if (event.keyCode == 39) {
			pacman.setRequestedDirection(RIGHT);
		}
	}

}