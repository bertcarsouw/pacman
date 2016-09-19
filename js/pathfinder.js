function Pathfinder(physics) {

	this.findDirectionToBlock = findDirectionToBlock;
	this.findNewGhostDirection = findNewGhostDirection;
	this.findFourBlocksInDirection = findFourBlocksInDirection;
	this.findTwoBlocksInFrontPosition = findTwoBlocksInFrontPosition;
	this.getRequiredInkyPosition = getRequiredInkyPosition;
	
	function findDirectionToBlock(startBlock, endBlock, direction) {
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
		if (endX == 0) {
			endX = 28;
		}
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

	// pathfinder used by speedy (pinky)
	function findFourBlocksInDirection(startBlock, direction) {
		if (direction == RIGHT) {
			var noOfBlocksToTheRight = 28 - (startBlock % 28);
			if (noOfBlocksToTheRight < 4) {
				return startBlock + noOfBlocksToTheRight;
			}
			return startBlock + 4;
		} else if (direction == LEFT) {
			var noOfBlocksToTheLeft = (startBlock % 28) - 1;
			if (noOfBlocksToTheLeft < 4) {
				return startBlock - noOfBlocksToTheLeft;
			}
			return startBlock - 4;
		} else if (direction == UP) {
			if (startBlock - 112 > 0) {
				return startBlock - 112;
			} else if (startBlock - 84 > 0) {
				return startBlock - 84;
			} else if (startBlock - 56 > 0) {
				return startBlock - 56;
			} else if (startBlock - 28 > 0) {
				return startBlock - 28;
			}
		} else if (direction == DOWN) {
			if (startBlock + 112 < 868) {
				return startBlock + 112;
			} else if (startBlock + 84 < 868) {
				return startBlock + 84;
			} else if (startBlock + 56 < 868) {
				return startBlock + 56;
			} else if (startBlock + 28 < 868) {
				return startBlock + 28;
			}
		}
	}

	function findTwoBlocksInFrontPosition(x, y, direction) {
		// in center pacman
		x += 26;
		y += 26;

		if (direction == RIGHT)  {
			x += 66;
		} else if (direction == LEFT) {
			x -= 66;
		} else if (direction == UP) {
			y -= 66;
		} else if (direction == DOWN) {
			y += 66;
		}

		if (x < 0) {
			x = 0;
		} else if (x > 925) {
			x = 925;
		}
		if (y < 0) {
			y = 0;
		} else if (y > 1024) {
			y = 1024
		}

		return [x, y];

	}

	function getRequiredInkyPosition(blinkyPosition, twoBlocksInFrontPacmanPosition) {
		
		var newEndpoint  = [];

		var horizontal = Math.abs(blinkyPosition[0] - twoBlocksInFrontPacmanPosition[0]);
		var vertical = Math.abs(blinkyPosition[1] - twoBlocksInFrontPacmanPosition[1]);
		
		newEndpoint[0] = twoBlocksInFrontPacmanPosition[0];
		newEndpoint[1] = twoBlocksInFrontPacmanPosition[1];

		var down = blinkyPosition[1] < twoBlocksInFrontPacmanPosition[1];

		if (blinkyPosition[0] < twoBlocksInFrontPacmanPosition[0]) {
			// right
			if (down) {
				newEndpoint[0] += horizontal;
				newEndpoint[1] += vertical;
			} else {
				newEndpoint[0] += horizontal;
				newEndpoint[1] -= vertical;
			}
		} else {
			//left
			if (down) {
				// down
				newEndpoint[0] -= horizontal;
				newEndpoint[1] += vertical;	
			} else {
				// up
				newEndpoint[0] -= horizontal;
				newEndpoint[1] -= vertical;
			}
		}

		horizontal = blinkyPosition[0] - twoBlocksInFrontPacmanPosition[0];
		vertical = blinkyPosition[1] - twoBlocksInFrontPacmanPosition[1];

		if (isOutOfGrid(newEndpoint)) {
			// y = ax + b;
			var a = vertical / horizontal;
			if (a == Infinity) {
				a = 999999;
			} else if (a == -Infinity) {
				a = 0.0001;
			}

			var b = blinkyPosition[1] - a * blinkyPosition[0];

			// alert(a);
			// alert(b);

			if (newEndpoint[0] < 0) {
				// set x to 200
				newEndpoint[0] = 0;
				newEndpoint[1] = b;
			} else if (newEndpoint[0] > 1024) {
				// set x to 600
				newEndpoint[0] = 1024;
				newEndpoint[1] = a * 1024 + b;
			}

			if (newEndpoint[1] < 0) {
				// set y to 200

				// y = ax + b;
				// y - b = ax;
				// x = (y - b) / a
				newEndpoint[1] = 0;
				newEndpoint[0] = (0 - b) / a;
			} else if (newEndpoint[1] > 1024) {
				// set y to 600
				newEndpoint[1] = 1024;
				newEndpoint[0] = (1024 - b) / a;
			}

			return [newEndpoint[0], newEndpoint[1]];
		} else {
			return [newEndpoint[0], newEndpoint[1]];
		}
	
	}

	function isOutOfGrid(point) {
		if (point[0] < 0 || point[0] > 925) {
			return true;
		}
		if (point[1] < 0 || point[1] > 1024) {
			return true;
		}
		return false;
	}

}