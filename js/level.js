function Level(walkableBlocks) {

	var dots = [];

	this.removeDot = removeDot;
	this.finished = finished;
	this.getDots = getDots;
	this.isDot = isDot;

	var UP = 1,
		DOWN = 2,
		LEFT = 3,
		RIGHT = 4;

	createDots(walkableBlocks);

	function getDots() {
		return dots;
	}

	function finished() {
		return dots.length == 0;
	}

	function createDots() {
		walkableBlocks.forEach(function(dot) {
			if ((dot.x <= 0 || dot.x == 29) && dot.y <= 15) {
				return;
			}
			if ((dot.y == 10 || dot.y == 11) && (dot.x == 13 || dot.x == 16)) {
				return;
			} 
			if (dot.y == 12 && (dot.x >= 10 && dot.x <= 19)) {
				return;
			}
			if ((dot.y == 13 || dot.y == 14) && (dot.x == 10 || dot.x == 19)) {
				return;
			}
			if (dot.y == 15 && ((dot.x >= 8 && dot.x <= 10) || (dot.x >= 19 && dot.x <= 21))) {
				return;
			}
			if (dot.y == 18 && (dot.x >= 10 && dot.x <= 19)) {
				return;
			}
			if ((dot.y == 16 || dot.y == 17 || dot.y == 19 || dot.y == 20) && (dot.x >= 10 && dot.x <= 19)) {
				return;
			}
			dots.push(dot);
		});
	}

	function removeDot(blockNumber) {
		for (var counter = 0; counter < dots.length; counter++) {
			if (dots[counter].x == blockNumber[0] && dots[counter].y == blockNumber[1]) {
				dots.splice(counter, 1);
				return true;
			}
		}
		return false;
	}

	function isDot(blockNumber) {
		var dotFound = false;
		for (var counter = 0; counter < dots.length; counter++) {
			if (dots[counter].x == blockNumber.x && dots[counter].y == blockNumber.y) {
				dotFound = true;
				counter = 9999;
			}
		}
		return dotFound;
	}

}