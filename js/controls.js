function Controls(pacman) {

	/*
	 *	Keyboard controls
	 */
	window.addEventListener('keydown', handleKey);
	
	function handleKey(event) {
		if (event.keyCode == 38) {
			pacman.goUp();
		} else if (event.keyCode == 40) {
			pacman.goDown();
		} else if (event.keyCode == 37) {
			pacman.goLeft();
		} else if (event.keyCode == 39) {
			pacman.goRight();
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
	        	pacman.goLeft();
	        } else {
	        	pacman.goRight();
	        }                       
	    } else {
	        if (yDiff > 0) {
	        	pacman.goUp();
	        } else { 
	        	pacman.goDown();
	        }                                                                 
	    }
	    xDown = null;
	    yDown = null;                                             
	};

};