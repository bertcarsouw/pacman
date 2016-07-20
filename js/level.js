function Level(context, levelImage, elementsImage) {

	this.removeConsumedDots = removeConsumedDots;
	this.isCleared = isCleared;
	this.drawLevel  = drawLevel;
	this.drawDots = drawDots;

	var dotRows = [];

	var xPositionsDots = [46, 79, 112, 145, 178, 211, 244, 277, 310, 343, 376, 409, 442, 475, 508, 541, 574, 607, 640, 673, 706, 739, 772, 805, 838, 871];
	var yPositionsDots = [46, 79, 112, 145, 178, 211, 244, 277, 310, 343, 376, 409, 442, 475, 508, 541, 574, 607, 640, 673, 706, 739, 772, 805, 838, 871, 904, 937, 970];

	var dotsLeft = 246;

	var spriteCoordinates = {
		"smallDot": {
			"x": 876,
			"y": 588,
			"w": 8,
			"h": 8
		}
	};

	function removeConsumedDots(pacX, pacY) {
		var x2 = pacX + 52;
		var y2 = pacY + 52;
		dotRows.forEach(function(row, rowIndex) {
			if (row.y >= pacY && row.y <= y2) {
				for (var counter = 0; counter < row.x.length; counter++) {
					if (row.x[counter] >= pacX && row.x[counter] <= x2) {
						removeDot(rowIndex, counter);
					}
				}
			}
		});
	};

	function isCleared() {
		return dotsLeft == 0;
	};

	function removeDot(rowIndex, dotIndex) {
		dotsLeft--;
		context.clearRect(dotRows[rowIndex].x[dotIndex], dotRows[rowIndex].y, 8, 8);
		dotRows[rowIndex].x.splice(dotIndex, 1);
	};

	function drawLevel() {
		context.clearRect(0, 0, 1024, 1024);
		context.drawImage(levelImage, 0, 0, 925, 1024, 0, 0, 925, 1024);
	};

	function drawDot(x, y) {
		context.drawImage(
			elementsImage, 
			spriteCoordinates.smallDot.x, 
			spriteCoordinates.smallDot.y, 
			spriteCoordinates.smallDot.w, 
			spriteCoordinates.smallDot.h, 
			x, y, 
			spriteCoordinates.smallDot.w, 
			spriteCoordinates.smallDot.h);
	};

	function generateDotsForRow(rowNumber, chosenDots, except) {
		var result = { "y": yPositionsDots[rowNumber - 1], "x": [] };
		for (var counter = 0; counter < 26; counter++) {
			if (except) {
				if (chosenDots.indexOf(counter + 1) == -1) {
					result.x.push(xPositionsDots[counter]);
				}
			} else {
				if (chosenDots.indexOf(counter + 1) != -1) {
					result.x.push(xPositionsDots[counter]);
				}
			}
		}
		return result;
	};

	function drawDots() {

		dotRows.push(generateDotsForRow(1, [13, 14], true));
		dotRows.push(generateDotsForRow(2, [1, 6, 12, 15, 21, 26], false));
		dotRows.push(generateDotsForRow(3, [1, 6, 12, 15, 21, 26], false));
		dotRows.push(generateDotsForRow(4, [1, 6, 12, 15, 21, 26], false));
		dotRows.push(generateDotsForRow(5, [], true));
		dotRows.push(generateDotsForRow(6, [1, 6, 9, 18, 21, 26], false));
		dotRows.push(generateDotsForRow(7, [1, 6, 9, 18, 21, 26], false));
		dotRows.push(generateDotsForRow(8, [7, 8, 13, 14, 19, 20], true));
		dotRows.push(generateDotsForRow(9, [6, 21], false));
		dotRows.push(generateDotsForRow(10, [6, 21], false));
		dotRows.push(generateDotsForRow(11, [6, 21], false));
		dotRows.push(generateDotsForRow(12, [6, 21], false));
		dotRows.push(generateDotsForRow(13, [6, 21], false));
		dotRows.push(generateDotsForRow(14, [6, 21], false));
		dotRows.push(generateDotsForRow(15, [6, 21], false));
		dotRows.push(generateDotsForRow(16, [6, 21], false));
		dotRows.push(generateDotsForRow(17, [6, 21], false));
		dotRows.push(generateDotsForRow(18, [6, 21], false));
		dotRows.push(generateDotsForRow(19, [6, 21], false));
		dotRows.push(generateDotsForRow(20, [13, 14], true));
		dotRows.push(generateDotsForRow(21, [1, 6, 12, 15, 21, 26], false));
		dotRows.push(generateDotsForRow(22, [1, 6, 12, 15, 21, 26], false));
		dotRows.push(generateDotsForRow(23, [4, 5, 22, 23], true));
		dotRows.push(generateDotsForRow(24, [3, 6, 9, 18, 21, 24], false));
		dotRows.push(generateDotsForRow(25, [3, 6, 9, 18, 21, 24], false));
		dotRows.push(generateDotsForRow(26, [7, 8, 13, 14, 19, 20], true));
		dotRows.push(generateDotsForRow(27, [1, 12, 15, 26], false));
		dotRows.push(generateDotsForRow(28, [1, 12, 15, 26], false));
		dotRows.push(generateDotsForRow(29, [], true));

		for (var yCounter = 0; yCounter < dotRows.length; yCounter++) {
			var y = dotRows[yCounter].y;
			for (xCounter = 0; xCounter < dotRows[yCounter].x.length; xCounter++) {
				var x = dotRows[yCounter].x[xCounter];
				drawDot(x, y);
			}
		}

	};

	drawLevel();
	drawDots();

};