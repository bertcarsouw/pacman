function Pathfinder(physics) {

	// superfancy a* pathfinding algorithm which is no longer needed :(
	this.find = find;
	this.getPathDirection = getPathDirection;
	this.calculateDirection = calculateDirection;

	var openList = [];
	var closedList = [];

	var UP = 1,
		DOWN = 2,
		LEFT = 3,
		RIGHT = 4;

	function getNeighbouringBlocks(activeBlock, prohibitedDirection) {
		var result = [];
		var walkableBlocks = physics.getWalkableBlocks();
		var possibleNeighbours = [];
		if (prohibitedDirection != RIGHT) {
			possibleNeighbours.push({ 'x': activeBlock.x + 1, 'y': activeBlock.y });
		}
		if (prohibitedDirection != LEFT) {
			possibleNeighbours.push({ 'x': activeBlock.x - 1, 'y': activeBlock.y });
		}
		if (prohibitedDirection != DOWN) {
			possibleNeighbours.push({ 'x': activeBlock.x, 'y': activeBlock.y + 1 });
		}
		if (prohibitedDirection != UP) {
			possibleNeighbours.push({ 'x': activeBlock.x, 'y': activeBlock.y - 1});
		}
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
		var firstNode = true;
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
			if (firstNode) {
				firstNode = false;
				neighbours = getNeighbouringBlocks(currentBlock, physics.getOppositeDirection(direction));
			} else {
				neighbours = getNeighbouringBlocks(currentBlock, 99);
			}
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

	// path decision algorithm to replace the a*
	function calculateDirection(block, end, direction) {
		
		var invalidDirection = physics.getOppositeDirection(direction);
		
		var possibleDirections = [];

		if (UP !== invalidDirection) {
			if (physics.isWalkableBlock([block[0], block[1] - 1])) {
				possibleDirections.push(UP);
			}
		}

		if (DOWN !== invalidDirection) {
			if (physics.isWalkableBlock([block[0], block[1] + 1])) {
				possibleDirections.push(DOWN);
			}	
		}

		if (LEFT !== invalidDirection) {
			if (physics.isWalkableBlock([block[0] - 1, block[1]])) {
				possibleDirections.push(LEFT);
			}	
		}

		if (RIGHT !== invalidDirection) {
			if (physics.isWalkableBlock([block[0] + 1, block[1]])) {
				possibleDirections.push(RIGHT);
			}
		}

		var shortest = 9999;
		var finalDirection = undefined;
		possibleDirections.forEach(function(direction) {
			
			var directionBlock = [];
			
			if (direction == UP) {
				directionBlock.push(block[0]);
				directionBlock.push(block[1] - 1);
			} else if (direction == DOWN) {
				directionBlock.push(block[0]);
				directionBlock.push(block[1] + 1);
			} else if (direction == RIGHT) {	
				directionBlock.push(block[0] + 1);
				directionBlock.push(block[1]);
			} else if (direction == LEFT) {
				directionBlock.push(block[0] - 1);
				directionBlock.push(block[1]);
			}

			var distance = calculateDirectDistance(directionBlock, end);

			if (distance < shortest) {
				shortest = distance;
				finalDirection = direction;
			}

		});

		return finalDirection;

	}

	function calculateDirectDistance(block, end) {
		var aSq = Math.abs(block[0] - end[0]);
		var bSq = Math.abs(block[1] - end[1]);
		var cSq = aSq + bSq;
		return Math.sqrt(cSq);
	}

}