console.log('Battleships game!');

var coorX = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

// if you want more kind of boats add another name here...
var boatNames = ['battleship', 'destroyer'];
// .. and here with a size
var fleet = {
	battleship: {
		size: 5,
		boats: []
	},
	destroyer: {
		size: 4,
		boats: []
	}
};

var createBoat = function(size, name) {
	var boat = {
		positions: [],
		damage: 0
	};
	var direction = Math.floor(Math.random() * 2 + 1);
	if (direction == 1) {
		// horizontal
		var boatX = Math.floor(Math.random() * (10 - size));
		var boatY = Math.floor(Math.random() * 10) + 1;
		for (var i = 0; i < size; i++) {
			boat.positions.push(coorX[i + boatX] + boatY);
		}
	} else {
		// vertical
		var boatX = Math.floor(Math.random() * 10);
		var boatY = Math.floor(Math.random() * (10 - size) + 1);
		for (var i = 0; i < size; i++) {
			boat.positions.push(coorX[boatX] + (boatY + i));
		}
	}

	var collision = false;
	// each type of boats
	boatNames.forEach(function(name) {
		// each boats created
		fleet[name].boats.forEach(function(_this) {
			// check if the position exist	
			_this.positions.filter(function(val) {
				if (boat.positions.indexOf(val) != -1) {
					collision = true;
				}
			});
		});
	});

	if (!collision) {
		// save boats
		if (size == 5) {
			fleet.battleship.boats.push(boat);
		} else {
			fleet.destroyer.boats.push(boat);
		}
	} else {
		// create boat again
		createBoat(size);
	}
};

// create boats
createBoat(fleet.battleship.size);
createBoat(fleet.destroyer.size);
createBoat(fleet.destroyer.size);
// show coordinates
/*
console.log('-----------------');
console.log(fleet.battleship.boats);
console.log(fleet.destroyer.boats);
console.log('-----------------');
*/

process.stdin.resume();
process.stdin.setEncoding('utf8');

// save coordinates
var shoots = [];
var boatDestroyed = 0;

var getCoordinate = function() {
	console.log('');
	console.log('Give me a coordinate:');

	process.stdin.once('data', function(coordinate) {
		coordinate = (coordinate.replace(/(?:\r\n|\r|\n)/g, '')).toUpperCase();

		if (shoots.indexOf(coordinate) < 0) {
			shoots.push(coordinate);
			var touched  = false;
			var numBoats = 0;
			// shoot
			boatNames.forEach(function(name) {
				fleet[name].boats.forEach(function(_this) {
					numBoats ++;
					_this.positions.filter(function(val) {
						if (val == coordinate) {
							touched = true;
							_this.damage = _this.damage + 1;
							// check if the boat has the same damage num than size (destroyed)
							if (fleet[name].size == _this.damage) {
								console.log('BOAT DESTROYED!!');
								boatDestroyed ++;
							} else {
								console.log('TOUCHED!');
							}
						}
					});
				});
			});

			if (!touched) {
				console.log('WATER');
			}
		} else {
			console.log('Coordinate used. Use other position.');
		}

		if (boatDestroyed == numBoats) {
			console.log('');
			console.log('Congratulations, you win  :D');
			process.exit();
		} else {
			getCoordinate();
		}
	});
};

getCoordinate();