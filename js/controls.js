function Controls(pacman) {

	var UP = 1,
		DOWN = 2,
		LEFT = 3,
		RIGHT = 4;

	window.addEventListener('keydown', handleKey);

	function handleKey(event) {
		if (event.keyCode == 38) {
			pacman.setRequestedDirection(UP);
		} else if (event.keyCode == 40) {
			pacman.setRequestedDirection(DOWN);
		} else if (event.keyCode == 37) {
			pacman.setRequestedDirection(LEFT);
		} else if (event.keyCode == 39) {
			pacman.setRequestedDirection(RIGHT);
		}
	}

	/*
	 *	Mobile controls
	 */
	window.addEventListener('touchstart', handleTouchStart, false);        
	window.addEventListener('touchmove', handleTouchMove, false);
	
	var xDown = null;                                                        
	var yDown = null;                                                        

	function handleTouchStart(event) {                                         
	    xDown = event.touches[0].clientX;                                      
	    yDown = event.touches[0].clientY;                                      
	};                                                

	function handleTouchMove(event) {
	    if (!xDown || !yDown) {
	        return;
	    }
	    var xUp = event.touches[0].clientX;                                    
	    var yUp = event.touches[0].clientY;
	    var xDiff = xDown - xUp;
	    var yDiff = yDown - yUp;
	    if (Math.abs(xDiff) > Math.abs(yDiff)) {
	        if (xDiff > 0) {
	        	pacman.setRequestedDirection(LEFT);
	        } else {
	        	pacman.setRequestedDirection(RIGHT);
	        }                       
	    } else {
	        if (yDiff > 0) {
	        	pacman.setRequestedDirection(UP);
	        } else {
				pacman.setRequestedDirection(DOWN);	         
	        }                                                                 
	    }
	    xDown = null;
	    yDown = null;                                             
	};

}