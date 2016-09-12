function Pathfinder(physics) {

	this.findDirectionToPacman = findDirectionToPacman;
	this.findNewGhostDirection = findNewGhostDirection;

	function findDirectionToPacman(startBlock, endBlock, direction) {
		var neighbours = getAvailableNeighbours(startBlock, direction);
		var fastestNeighbour = calculateFastestNeighbour(neighbours, endBlock);
		if (fastestNeighbour == (startBlock + 1)) {
			return RIGHT;
		} else if (fastestNeighbour == (startBlock - 1)) {
			return LEFT;
		} else if (fastestNeighbour == (startBlock - 28)) {
			return UP;
		} else if (fastestNeighbour == (startBlock + 28)) {
			return DOWN;
		}
	}

	function getAvailableNeighbours(blockNumber, direction) {
		var neighbours = [];
		var oppositeDirection = physics.getOppositeDirection(direction);
		if (oppositeDirection != UP) {
			if (physics.isWalkableBlock(blockNumber - 28)) {
				neighbours.push(blockNumber - 28);
			} 
		}
		if (oppositeDirection != DOWN) {
			if (physics.isWalkableBlock(blockNumber + 28)) {
				neighbours.push(blockNumber + 28);
			} 
		}
		if (oppositeDirection != LEFT) {
			if (physics.isWalkableBlock(blockNumber - 1)) {
				neighbours.push(blockNumber - 1);
			} 
		}
		if (oppositeDirection != RIGHT) {
			if (physics.isWalkableBlock(blockNumber + 1)) {
				neighbours.push(blockNumber + 1);
			}
		}
		return neighbours;
	}

	function calculateFastestNeighbour(neighbours, endBlock) {
		var endX = endBlock % 28;
		var endY = Math.ceil(endBlock / 28);
		var fastest = 99999;
		var fastestNeighbour = null;
		neighbours.forEach(function(neighbour) {
			var neighbourX = neighbour % 28;
			var neighbourY = Math.ceil(neighbour / 28);
			var aSq = Math.abs(neighbourX - endX);
			aSq = aSq * aSq;
			var bSq = Math.abs(neighbourY - endY);
			bSq = bSq * bSq;
			var distance = Math.sqrt(aSq + bSq);
			if (distance <= fastest) {
				fastest = distance;
				fastestNeighbour = neighbour;
			}
		});
		return fastestNeighbour;
	}

	function findNewGhostDirection(currentBlock, direction) {
		var oppositeDirection = physics.getOppositeDirection(direction);
		if (oppositeDirection != LEFT) {
			if (physics.isWalkableBlock(currentBlock - 1)) {
				return LEFT;
			}
		}
		if (oppositeDirection != RIGHT) {
			if (physics.isWalkableBlock(currentBlock + 1)) {
				return RIGHT;
			}
		}
		if (oppositeDirection != UP) {
			if (physics.isWalkableBlock(currentBlock - 28)) {
				return UP;
			}
		}
		if (oppositeDirection != DOWN) {
			if (physics.isWalkableBlock(currentBlock + 28)) {
				return DOWN;
			}
		}
	}

}