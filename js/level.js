function Level() {

	this.getPointBlocks = getPointBlocks;
	this.isPoint = isPoint;
	this.removeDot = removeDot;
	this.finished = finished;
	this.getSurroundingPoints = getSurroundingPoints;
	this.dotsLeft = dotsLeft;

	var pointBlocks = [
		30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
		58, 63, 69, 72, 78, 83,
		86, 91, 97, 100, 106, 111, 
		114, 119, 125, 128, 134, 139, 
		142, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 
		170, 175, 178, 187, 190, 195,
		198, 203, 206, 215, 218, 223,
		226, 227, 228, 229, 230, 231, 234, 235, 236, 237, 240, 241, 242, 243, 246, 247, 248, 249, 250, 251,
		259, 274,
		287, 302,
		315, 330,
		343, 358, 
		371, 386, 
		399, 414,
		427, 442,
		455, 470,
		483, 498,
		511, 526, 
		539, 554,
		562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587,
		590, 595, 601, 604, 610, 615, 
		618, 623, 629, 632, 638, 643, 
		646, 647, 648, 651, 652, 653, 654, 655, 656, 657, 660, 661, 662, 663, 664, 665, 666, 669, 670, 671,
		676, 679, 682, 691, 694, 697,
		704, 707, 710, 719, 722, 725, 
		730, 731, 732, 733, 734, 735, 738, 739, 740, 741, 744, 745, 746, 747, 750, 751, 752, 753, 754, 755,
		758, 769, 772, 783, 
		786, 797, 800, 811, 
		814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839
	];

	function dotsLeft() {
		return pointBlocks.length;
	}

	function getSurroundingPoints(blockNumber) {
		var points = [];
		if (pointBlocks.indexOf(blockNumber + 1) != -1) {
			points.push(blockNumber + 1);
		}
		if (pointBlocks.indexOf(blockNumber - 1) != -1) {
			points.push(blockNumber - 1);
		}
		if (pointBlocks.indexOf(blockNumber + 28) != -1) {
			points.push(blockNumber + 28);
		}
		if (pointBlocks.indexOf(blockNumber - 28) != -1) {
			points.push(blockNumber - 28);
		}
		return points;
	}

	function isPoint(blockNumber) {
		return pointBlocks.indexOf(blockNumber) != -1;
	}

	function getPointBlocks() {
		return pointBlocks;
	}

	function removeDot(blockNumber) {
		var index = pointBlocks.indexOf(blockNumber);
		if (index != -1) {
			pointBlocks.splice(index, 1);
		}
	}

	function finished() {
		return pointBlocks.length == 0;
	}

}