function Pathfinder(physics) {

	this.find = find;
	this.getPathDirection = getPathDirection;

	var openList = [];
	var closedList = [];

	var UP = 1,
		DOWN = 2,
		LEFT = 3,
		RIGHT = 4;

	function getNeighbouringBlocks(activeBlock) {
		var result = [];
		var walkableBlocks = physics.getWalkableBlocks();
		var possibleNeighbours = [];
		possibleNeighbours.push({ 'x': activeBlock.x + 1, 'y': activeBlock.y });
		possibleNeighbours.push({ 'x': activeBlock.x - 1, 'y': activeBlock.y });
		possibleNeighbours.push({ 'x': activeBlock.x, 'y': activeBlock.y + 1 });
		possibleNeighbours.push({ 'x': activeBlock.x, 'y': activeBlock.y - 1});
		possibleNeighbours.forEach(function(possibleNeighbour) {
			walkableBlocks.forEach(function(walkableBlock) {
				if (equalBlocks(possibleNeighbour, walkableBlock)) {
					result.push(possibleNeighbour);
				}
			});
		});
		return result;
	}

	function find(currentBlock, endBlock, direction) {
		var currentNode = { 'x': currentBlock[0], 'y': currentBlock[1] };
		var end = { 'x': endBlock[0], 'y': endBlock[1] };
		currentNode.f = 0;
		currentNode.g = 0;
		currentNode.h = 0;
		openList.push(currentNode);
		var done = false;
		var finalPath = null;
		// var firstNode = true;
		while (openList.length != 0 && !done) {
			var currentBlockIndex = getLowestFIndex();
			var currentBlock = openList[currentBlockIndex];
			if (equalBlocks(currentBlock, end)) {
				finalPath = currentBlock;
				done = true;
			}
			closedList.push(currentBlock);
			openList.splice(currentBlockIndex, 1);
			var neighbours = null;
			/*
			 *	TODO: 	implement evil masterplan to remove the previously visited block
			 *			from becoming a neighbour so the ghost cannot move in opposite direction
			 */
			// if (firstNode) {
				// var unfilteredNeighbours = getNeighbouringBlocks(currentBlock);
				// if (direction == UP) {
				// 	unfilteredNeighbours.forEach(function(unfilteredNeighbour, index) {
				// 		if (currentBlock.y + 1 == unfilteredNeighbour.y) {
				// 			console.log('remving neighbour');
				// 			unfilteredNeighbours.splice(index, 1);
				// 		}
				// 	});				
				// } else if (direction == DOWN) {
				// 	unfilteredNeighbours.forEach(function(unfilteredNeighbour, index) {
				// 		if (currentBlock.y - 1 == unfilteredNeighbour.y) {
				// 			console.log('remving neighbour');
				// 			unfilteredNeighbours.splice(index, 1);
				// 		}
				// 	});
				// } else if (direction == LEFT) {
				// 	unfilteredNeighbours.forEach(function(unfilteredNeighbour, index) {
				// 		if (currentBlock.x + 1 == unfilteredNeighbour.x) {
				// 			console.log('remving neighbour');
				// 			unfilteredNeighbours.splice(index, 1);
				// 		}
				// 	});
				// } else if (direction == RIGHT) {
				// 	unfilteredNeighbours.forEach(function(unfilteredNeighbour, index) {
				// 		if (currentBlock.x - 1 == unfilteredNeighbour.x) {
				// 			console.log('remving neighbour');
				// 			unfilteredNeighbours.splice(index, 1);
				// 		}
				// 	});
				// }
				// neighbours = unfilteredNeighbours;
			// } else {
				// firstNode = false;
			neighbours = getNeighbouringBlocks(currentBlock);
			// }
			neighbours.forEach(function(neighbour) {
				if (!inOpenList(neighbour)) {
					neighbour.parent = currentBlock;
					neighbour.g = calculateG(neighbour);
					neighbour.h = calculteH(neighbour, end);
					neighbour.f = neighbour.g + neighbour.h;
					openList.push(neighbour);
				} else {
					updateIfBetterG(neighbour, currentBlock);
				}
			});
		}
		resetPathfinder();
		return finalPath;
	}

	function resetPathfinder() {
		openList = [];
		closedList = [];
	}

	function inOpenList(block) {
		var inList = false;
		openList.forEach(function(openBlock) {
			if (equalBlocks(block, openBlock)) {
				inList = true;
			}
		});
		return inList;
	}

	function equalBlocks(blockOne, blockTwo) {
		return blockOne.x == blockTwo.x && blockOne.y == blockTwo.y;
	}

	function getLowestFIndex() {
		var lowestF = 9999;
		var lowestBlockIndex = -1;
		openList.forEach(function(block, index) {
			if (block.f < lowestF) {
				lowestBlockIndex = index;
				lowestF = block.f;
			}
		});
		return lowestBlockIndex;
	}

	// Manhattan style
	function calculteH(block, end) {
		var xDistance = 0;
		var yDistance = 0;
		if (block.x > end.x) {
			xDistance = block.x - end.x;
		} else {
			xDistance = end.x - block.x;
		}
		if (block.y > end.y) {
			yDistance = block.y - end.y;
		} else {
			yDistance = end.y - block.y;
		}
		return xDistance +  yDistance;
	}

	function calculateG(block) {
		var stop = false;
		var g = 0;
		var currentBlock = block;
		while(!stop) {
			if (currentBlock.parent) {
				g += 10;
				currentBlock = currentBlock.parent;
			} else {
				stop = true;
			}
		}
		return g;
	}

	function updateIfBetterG(block, currentBlock) {
		openList.forEach(function(openBlock) {
			if (equalBlocks(block, openBlock)) {
				if (block.g < openBlock.g) {
					openBlock.g = block.g;
					openBlock.f = openBlock.h + openBlock.g;
					openBlock.parent = currentBlock;
				}
			}
		});
	}

	function getPathDirection(path) {
		var previousParent = null;
		var done = false;
		while(!done) {
			if (path.parent) {
				previousParent = path;
				path = path.parent;
			} else {
				done = true;
			}
		}
		// go to previousParent
		if (path.x == previousParent.x) {
			// vertical move
			if (previousParent.y > path.y) {
				return DOWN;
			} else {
				return UP;
			}
		} else {
			// horizontal move
			if (previousParent.x > path.x) {
				return RIGHT;
			} else {
				return LEFT;
			}
		}
	}
}