// Global vars

var UP = 1,
	DOWN = 2,
	LEFT = 3,
	RIGHT = 4;

function printDirection(directionToPrint) {
	if (directionToPrint == 1) {
		console.log('UP');
	} else if (directionToPrint == 2) {
		console.log('DOWN');
	} else if (directionToPrint == 3) {
		console.log('LEFT');
	} else if (directionToPrint == 4) {
		console.log('RIGHT');
	}
}