function Physics() {

	this.getBlockNumber = getBlockNumber;
	this.isWalkableBlock = isWalkableBlock;
	this.getOppositeDirection = getOppositeDirection;
	this.isValidNewBlockDirection = isValidNewBlockDirection;
	this.isNewBlock = isNewBlock;

	var UP = 1,
		DOWN = 2,
		LEFT = 3,
		RIGHT = 4;

	function getBlockNumber(x, y, direction) {
		var number = [];
		number.push(Math.floor(x / 33) + 1);
		number.push(Math.floor(y / 33) + 1);
		return number;
	}

	function isNewBlock(x, y) {
		return (x - 1) % 33 == 0 && (y - 1) % 33 == 0;
	}

	function isValidNewBlockDirection(currentBlockNumber, direction) {
		var blockNumber = [];
		blockNumber.push(currentBlockNumber[0]); 
		blockNumber.push(currentBlockNumber[1]); 
		if (direction == UP) {
			blockNumber[1] -= 1;
		} else if (direction == DOWN) {
			blockNumber[1] += 1;
		} else if (direction == LEFT) {
			blockNumber[0] -= 1;
		} else if (direction == RIGHT) {
			blockNumber[0] += 1;
		}
		return isWalkableBlock(blockNumber);
	}

	function isWalkableBlock(block) {
		var blockX = block[0];
		var blockY = block[1];
		for (var counter = 0; counter < walkableBlocks.length; counter++) {
			if (blockX == walkableBlocks[counter].x && blockY == walkableBlocks[counter].y) {
				return true;
			}
		}
		return false;
	}

	function getOppositeDirection(direction) {
		if (direction == RIGHT) {
			return LEFT;
		} else if (direction == LEFT) {
			return RIGHT;
		} else if (direction == UP) {
			return DOWN;
		} else if (direction == DOWN) {
			return UP;
		} else {
			alert('fail');
		}
	}

	var walkableBlocks = [
		// 1st row
		{ 'x': 2,  'y': 2 },
		{ 'x': 3,  'y': 2 },
		{ 'x': 4,  'y': 2 },
		{ 'x': 5,  'y': 2 },
		{ 'x': 6,  'y': 2 },
		{ 'x': 7,  'y': 2 },
		{ 'x': 8,  'y': 2 },
		{ 'x': 9,  'y': 2 },
		{ 'x': 10, 'y': 2 },
		{ 'x': 11, 'y': 2 },
		{ 'x': 12, 'y': 2 },
		{ 'x': 13, 'y': 2 },
		{ 'x': 16, 'y': 2 },
		{ 'x': 17, 'y': 2 },
		{ 'x': 18, 'y': 2 },
		{ 'x': 19, 'y': 2 },
		{ 'x': 20, 'y': 2 },
		{ 'x': 21, 'y': 2 },
		{ 'x': 22, 'y': 2 },
		{ 'x': 23, 'y': 2 },
		{ 'x': 24, 'y': 2 },
		{ 'x': 25, 'y': 2 },
		{ 'x': 26, 'y': 2 },
		{ 'x': 27, 'y': 2 },
		// 2nd row
		{ 'x': 2,  'y': 3 },
		{ 'x': 7,  'y': 3 },
		{ 'x': 13, 'y': 3 },
		{ 'x': 16, 'y': 3 },
		{ 'x': 22, 'y': 3 },
		{ 'x': 27, 'y': 3 },
		// 3th row
		{ 'x': 2,  'y': 4 },
		{ 'x': 7,  'y': 4 },
		{ 'x': 13, 'y': 4 },
		{ 'x': 16, 'y': 4 },
		{ 'x': 22, 'y': 4 },
		{ 'x': 27, 'y': 4 },
		// 4th row
		{ 'x': 2,  'y': 5 },
		{ 'x': 7,  'y': 5 },
		{ 'x': 13, 'y': 5 },
		{ 'x': 16, 'y': 5 },
		{ 'x': 22, 'y': 5 },
		{ 'x': 27, 'y': 5 },
		// 5th
		{ 'x': 2,  'y': 6 }, 
		{ 'x': 3,  'y': 6 }, 
		{ 'x': 4,  'y': 6 }, 
		{ 'x': 5,  'y': 6 }, 
		{ 'x': 6,  'y': 6 }, 
		{ 'x': 7,  'y': 6 }, 
		{ 'x': 8,  'y': 6 }, 
		{ 'x': 9,  'y': 6 }, 
		{ 'x': 10, 'y': 6 }, 
		{ 'x': 11, 'y': 6 }, 
		{ 'x': 12, 'y': 6 }, 
		{ 'x': 13, 'y': 6 }, 
		{ 'x': 14, 'y': 6 }, 
		{ 'x': 15, 'y': 6 }, 
		{ 'x': 16, 'y': 6 }, 
		{ 'x': 17, 'y': 6 },
		{ 'x': 18, 'y': 6 }, 
		{ 'x': 19, 'y': 6 }, 
		{ 'x': 20, 'y': 6 }, 
		{ 'x': 21, 'y': 6 }, 
		{ 'x': 22, 'y': 6 }, 
		{ 'x': 23, 'y': 6 }, 
		{ 'x': 24, 'y': 6 }, 
		{ 'x': 25, 'y': 6 }, 
		{ 'x': 26, 'y': 6 }, 
		{ 'x': 27, 'y': 6 }, 
		// 6th row
		{ 'x': 2,  'y': 7 },
		{ 'x': 7,  'y': 7 },
		{ 'x': 10, 'y': 7 },
		{ 'x': 19, 'y': 7 },
		{ 'x': 22, 'y': 7 },
		{ 'x': 27, 'y': 7 },
		// 7th row
		{ 'x': 2,  'y': 8 },
		{ 'x': 7,  'y': 8 },
		{ 'x': 10, 'y': 8 },
		{ 'x': 19, 'y': 8 },
		{ 'x': 22, 'y': 8 },
		{ 'x': 27, 'y': 8 },
		//  8th row
		{ 'x': 2,  'y': 9 },
		{ 'x': 3,  'y': 9 },
		{ 'x': 4,  'y': 9 },
		{ 'x': 5,  'y': 9 },
		{ 'x': 6,  'y': 9 },
		{ 'x': 7,  'y': 9 },
		{ 'x': 10, 'y': 9 },
		{ 'x': 11, 'y': 9 },
		{ 'x': 12, 'y': 9 },
		{ 'x': 13, 'y': 9 },
		{ 'x': 16, 'y': 9 },
		{ 'x': 17, 'y': 9 },
		{ 'x': 18, 'y': 9 },
		{ 'x': 19, 'y': 9 },
		{ 'x': 22, 'y': 9 },
		{ 'x': 23, 'y': 9 },
		{ 'x': 24, 'y': 9 },
		{ 'x': 25, 'y': 9 },
		{ 'x': 26, 'y': 9 },
		{ 'x': 27, 'y': 9 },
		// 9th row
		{ 'x': 7,  'y': 10 },
		{ 'x': 13, 'y': 10 },
		{ 'x': 16, 'y': 10 },
		{ 'x': 22, 'y': 10 },
		// 10th row
		{ 'x': 7,  'y': 11 },
		{ 'x': 13, 'y': 11 },
		{ 'x': 16, 'y': 11 },
		{ 'x': 22, 'y': 11 },
		// 12th row
		{ 'x': 7,  'y': 12 },
		{ 'x': 10, 'y': 12 },
		{ 'x': 11, 'y': 12 },
		{ 'x': 12, 'y': 12 },
		{ 'x': 13, 'y': 12 },
		{ 'x': 14, 'y': 12 },
		{ 'x': 15, 'y': 12 },
		{ 'x': 16, 'y': 12 },
		{ 'x': 17, 'y': 12 },
		{ 'x': 18, 'y': 12 },
		{ 'x': 19, 'y': 12 },
		{ 'x': 22, 'y': 12 },
		// 13th row
		{ 'x':  7, 'y': 13 },
		{ 'x': 10, 'y': 13 },
		{ 'x': 19, 'y': 13 },
		{ 'x': 22, 'y': 13 },
		// 14th row
		{ 'x':  7, 'y': 14 },
		{ 'x': 10, 'y': 14 },
		{ 'x': 19, 'y': 14 },
		{ 'x': 22, 'y': 14 },
		// 15th row
		{ 'x': -1, 'y': 15 },
		{ 'x':  0, 'y': 15 },
		{ 'x':  1, 'y': 15 },
		{ 'x':  2, 'y': 15 },
		{ 'x':  3, 'y': 15 },
		{ 'x':  4, 'y': 15 },
		{ 'x':  5, 'y': 15 },
		{ 'x':  6, 'y': 15 },
		{ 'x':  7, 'y': 15 },
		{ 'x':  8, 'y': 15 },
		{ 'x':  9, 'y': 15 },
		{ 'x': 10, 'y': 15 },
		{ 'x': 19, 'y': 15 },
		{ 'x': 20, 'y': 15 },
		{ 'x': 21, 'y': 15 },
		{ 'x': 22, 'y': 15 },
		{ 'x': 23, 'y': 15 },
		{ 'x': 24, 'y': 15 },
		{ 'x': 25, 'y': 15 },
		{ 'x': 26, 'y': 15 },
		{ 'x': 27, 'y': 15 },
		{ 'x': 28, 'y': 15 },
		{ 'x': 29, 'y': 15 },

	]

}