class Game {
	constructor () {
		this.info = {
			title: '...',
			shortName: '...'
		};
		this.inputs = [];
		this.events = [
			{ event: 'click', callback: function(){} }
		];
		this.outputs = [];
		this.gameController = new GameController();
	}
	draw () { this.gameController.draw(); }
	setup () {
		this.gameController.setup();
		this.gameController.starGame();
	}
}


class GameController {
	constructor () {
		// ...
	}
	
	starGame () { }

	gameover() {
		alert('Game Over');
		this.starGame();
	}

	// pause () { }

	setup () {
		noFill();
		strokeJoin(ROUND);
		strokeCap(ROUND);
	}

	draw () { }
}
