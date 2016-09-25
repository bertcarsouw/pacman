function Physics() {
	
	this.isNewBlock = isNewBlock;
	this.getBlockNumber = getBlockNumber;
	this.getNextBlockNumber = getNextBlockNumber;
	this.isWalkableBlock = isWalkableBlock;
	this.getOppositeDirection = getOppositeDirection;
	this.inTunnel = inTunnel;
	this.getInvadingBlockNumber = getInvadingBlockNumber;
	this.onCrossroads = onCrossroads;
	this.isAtLeastEightTilesAway = isAtLeastEightTilesAway;
	this.inGhostHouse = inGhostHouse;

	var walkableBlocks = [
		30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
		58, 63, 69, 72, 78, 83,
		86, 91, 97, 100, 106, 111, 
		114, 119, 125, 128, 134, 139, 
		142, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 
		170, 175, 178, 187, 190, 195,
		198, 203, 206, 215, 218, 223,
		226, 227, 228, 229, 230, 231, 234, 235, 236, 237, 240, 241, 242, 243, 246, 247, 248, 249, 250, 251,
		259, 265, 268, 274,
		287, 293, 296, 302,
		315, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 330,
		343, 346, 355, 358, 
		371, 374, 383, 386, 
		393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420,
		427, 430, 439, 442,
		455, 458, 467, 470,
		483, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 498,
		511, 514, 523, 526, 
		539, 542, 551, 554,
		562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587,
		590, 595, 601, 604, 610, 615, 
		618, 623, 629, 632, 638, 643, 
		646, 647, 648, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 669, 670, 671,
		676, 679, 682, 691, 694, 697,
		704, 707, 710, 719, 722, 725, 
		730, 731, 732, 733, 734, 735, 738, 739, 740, 741, 744, 745, 746, 747, 750, 751, 752, 753, 754, 755,
		758, 769, 772, 783, 
		786, 797, 800, 811, 
		814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839
	];

	var crossroads = [
		35, 50, 142, 147, 150, 153, 156, 159, 162, 167, 231, 246, 321, 324, 399, 402, 411, 414, 486, 495, 
		567, 570, 579, 582, 651, 654, 657, 660, 663, 666, 732, 753, 825, 828
	];

	/*
	 *	returns true is position is a left upper corner
	 * 	of a new grid block
	 */
	function isNewBlock(x, y) {
		return (x - 1) % 33 == 0 && (y - 1) % 33 == 0;
	}

	function inTunnel(blockNumber) {
		return [392, 393, 394, 395, 396, 397, 398, 415, 416, 417, 418, 419, 420, 421].indexOf(blockNumber) != -1;
	}

	function onCrossroads(blockNumber) {
		return crossroads.indexOf(blockNumber) != -1;
	}

	function getOppositeDirection(direction) {
		if (direction == UP) {
			return DOWN;
		} else if (direction == DOWN) {
			return UP;
		} else if (direction == LEFT) {
			return RIGHT;
		} else if (direction == RIGHT) {
			return LEFT;
		}
	}

	function getBlockNumber(x, y) {
		var horizontalNumber = Math.floor(x / 33) + 1;
		var verticalNumber = Math.floor(y / 33) + 1;
		var result = (verticalNumber - 1) * 28;
		return result + horizontalNumber;			
	}

	function getInvadingBlockNumber(x, y, direction) {
		var horizontalNumber = Math.floor(x / 33) + 1;
		var verticalNumber = Math.floor(y / 33) + 1;
		if (direction == RIGHT) {
			horizontalNumber += 1;
		} else if (direction == DOWN) {
			verticalNumber += 1;
		}
		var result = (verticalNumber - 1) * 28;
		return result + horizontalNumber;
	}

	function getNextBlockNumber(currentBlockNumber, direction) {
		if (direction == UP) {
			return currentBlockNumber - 28;
		} else if (direction == DOWN) {
			return currentBlockNumber + 28;
		} else if (direction == RIGHT) {
			return currentBlockNumber + 1;
		} else if (direction == LEFT) {
			return currentBlockNumber - 1;
		}
	}

	function inGhostHouse(blockNumber) {
		return [376, 377, 378, 379, 380, 381,
		404, 405, 406, 407, 408, 409,
		432, 433, 434, 435, 436, 437].indexOf(blockNumber) !== -1;
	}

	function isWalkableBlock(blockNumber) {
		return walkableBlocks.indexOf(blockNumber) != -1;
	}

	function isAtLeastEightTilesAway(ghostX, ghostY, pacX, pacY) {
		var horizontal = Math.abs(ghostX - pacX);
		var vertical = Math.abs(ghostY - pacY);
		horizontal = horizontal * horizontal;
		vertical = vertical * vertical;
		var distance = Math.sqrt(horizontal + vertical);
		return distance >= (8 * 33);
	}

}