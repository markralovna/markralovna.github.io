class MinesWeeper extends Game {
	constructor () {
		super();
		this.info.title = 'Minesweeper';
		this.info.shortName = 'Minesweeper';
		this.gameController = new MinesWeeperController();
		const that = this;
		this.inputs = [
			{ label: 'Flag', callback: function(){ that.gameController.toggleFlagMode() }, pushable: true }
		];
		this.events = [
			{ event: 'click', callback: function(){ that.gameController.clicked() } }
		];
		this.outputs = [
			{ label: 'Mines left', model: function() { return that.gameController.minesLeft } }
		];
	}
}



class MinesWeeperController extends GameController {
	constructor () {
		super();
		this.flagMode = false;
		this.numCellsRow = 8;//ToDo: poder triar
		this.totalMines = this.numCellsRow * this.numCellsRow;
		this.numMines = floor( this.numCellsRow * this.numCellsRow * .15 );
	}

	setup () {
		noFill();
		textSize( width / this.numCellsRow * .6 );
		textAlign(CENTER, CENTER);
		strokeJoin(ROUND);
		strokeCap(ROUND);
		textStyle(BOLD);
	}

	update () {
		// console.log('- Reveled mines: ', this.reveledCells, '\n- Flags: ', this.flags, '\n- Total mines: ', this.totalMines);
		if ( this.reveledCells + this.flags >=  this.totalMines)
			showModal('Congratulations', '', 'Restart ', this.starGame.bind(this) );
	}

	display () {
		noFill();
		stroke(colors.m);
		strokeWeight(10);
		rect(0, 0, width, height);
		this.cells.forEach(row => {
			row.forEach(cell => {
				cell.draw();
			});
		});
	}

	starGame () {
		this.flags = 0;
		this.reveledCells = 0;
		this.reloadCells();
		this.setupMines();//ToDo: cridar després del primer clic
	}

	gameover() {
		this.revealAll();
		showModal('Game Over', '', 'Restart', this.starGame.bind(this) );
	}

	reloadCells () {
		const size = width / this.numCellsRow;
		this.cells = [];
		for (let r = 0; r < this.numCellsRow; r++) {
			const row = [];
			for (let c = 0; c < this.numCellsRow; c++)
				row.push( new MinesWeeperCell(size, c, r) );
			this.cells.push(row);
		}
	}

	revealAll () {
		this.cells.forEach(row => {
			row.forEach(cell => {
				cell.reveal();
			});
		});
	}

	loopCellNeighbour (row, col, callback) {
		const a = [-1, 0, 1];
		a.forEach(y => {
			const r = row + y;
			if (r >= 0 && r < this.numCellsRow )
				a.forEach(x => {
					const c = col + x;
					if (c >= 0 && c < this.numCellsRow )
						callback(r, c);
				});
		});
	}

	setupMines () {
		for (var i = 0; i < this.numMines; i++) {
			var minaPosada = false;
			while ( !minaPosada ) {
				const r = floor( random(0, this.numCellsRow) );
				const c = floor( random(0, this.numCellsRow) );
				var cell = this.cells[r][c];
				if ( !cell.mine ) {
					cell.addMine();
					const that = this;
					this.loopCellNeighbour(r, c, function(row, col){
						that.cells[row][col].addNeighbour();
					});
					minaPosada = true;
				}
			}
		}
	}

	get minesLeft () {
		return this.numMines - this.flags;
	}

	toggleFlagMode () {
		this.flagMode = !this.flagMode;
	}

	clicked () {
		const c = floor(map( mouseX, 0, width,  0, this.numCellsRow ));
		const r = floor(map( mouseY, 0, height, 0, this.numCellsRow ));
		if ( this.flagMode )
			this.flags += this.cells[r][c].toggleFlag();
		else
			this.revealCell(r, c);
	}

	revealCell (row, col) {
		const cell = this.cells[row][col];
		switch ( cell.reveal() ) {
			case -1: this.gameover();        break;
			case  1: this.reveledCells += 1; break;
		}
		const that = this;
		if ( cell.neighbourMines == 0 )
			this.loopCellNeighbour(row, col, function(r, c) {
				if (that.cells[r][c].isCovered) that.revealCell(r, c);
			});
	}

}

class MinesWeeperCell {
	constructor (size, column, row) {
		this.size = size;
		this.position = createVector(
			column * this.size,
			row * this.size
		);
		this.covered = true;
		this.flag = false;
		this.mine = false;
		this.neighbourMines = 0;
	}

	draw() {
		this.display();
	}

	reveal() {
		var res = 0;
		if ( !this.flag && this.covered ) {
			this.covered = false;
			if ( this.mine ) res = -1;
			else res = 1;
		}
		return res;
	}

	addMine() {
		this.mine = true;
		this.neighbourMines -= 1;
	}

	addNeighbour( ) {
		this.neighbourMines += 1;
	}

	toggleFlag() {
		this.flag = !this.flag;
		return this.flag ? 1 : -1;
	}
	
	get hover() {
		return (
			( mouseX > this.position.x ) &&
			( mouseX < (this.position.x + this.size) ) &&
			( mouseY > this.position.y ) &&
			( mouseY < (this.position.y + this.size) )
		);
	}
	
	get isCovered() {
		return this.covered;
	}
	
	get backgroundColor() {
		var c = [];
		if ( this.covered ) {
			if ( this.flag ) c = [colors.m[0], colors.m[1], colors.m[2], .5];
			else if ( this.hover ) c = [colors.y[0], colors.y[1], colors.y[2], .2];
			else c = [colors.m[0], colors.m[1], colors.m[2], 0];
		}
		else
			c = [colors.c[0], colors.c[1], colors.c[2], .2];
		return c;
	}

	display() {
		strokeWeight(5);
		stroke(colors.m);
		fill( this.backgroundColor );
		rect(this.position.x, this.position.y, this.size, this.size);
		if ( !this.covered ) {
			const s = this.size * .5;
			const x = this.position.x + s;
			const y = this.position.y + s;
			if (this.mine) {
				strokeWeight( s );
				stroke( colors.y );
				point(x, y);
			}
			else if (this.neighbourMines > 0) {
				noStroke();
				fill( colors.y );
				text(this.neighbourMines, x, y);
			}
		}
	}
}
