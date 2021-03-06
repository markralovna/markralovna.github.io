class SnakeGame extends Game {
	constructor () {
		super();
		this.info.title = 'The Snake Game';
		this.info.shortName = 'Snake';
		this.gameController = new SnakeGameController();
		const that = this;
		this.inputs = [
			{ label: 'Play/Pause', callback: function ( ) { that.gameController.pause()                      }, pushable: true  },
			{ label: 'up',         callback: function ( ) { that.gameController.updateDirection(UP_ARROW)    }, pushable: false },
			{ label: 'down',       callback: function ( ) { that.gameController.updateDirection(DOWN_ARROW)  }, pushable: false },
			{ label: 'left',       callback: function ( ) { that.gameController.updateDirection(LEFT_ARROW)  }, pushable: false },
			{ label: 'right',      callback: function ( ) { that.gameController.updateDirection(RIGHT_ARROW) }, pushable: false }
		];
		this.outputs = [
			{ label: 'Points', model: function() { return that.gameController.points } }
		];
	}
}



class SnakeGameController extends GameController {
	constructor () {
		super();
	}

	starGame () {
		const numberOfCells = 18;
		
		this.pitch = new SnakePitch( 0, 0, width, height, numberOfCells );
		this.character = new SnakeCharacter( createVector(1, 9), this.pitch );
		this.apple = new SnakeApple( this.pitch );
		this.points = 0;
		this.paused = false;

		this.time = 0;
	}

	draw () {
		this.pitch.display();
		this.character.display();
		if ( !this.character.isCollidingSomething(this.pitch) ) {
			if (!this.paused) this.character.update( millis()-this.time );
		}
		else
			this.gameover();
		if ( this.character.eats(this.apple) )
			this.sumPoint();
		this.apple.display();
		this.time = millis();
	}

	sumPoint () {
		this.character.grow();
		this.points++;
		this.apple.relocate();
	}

	updateDirection (d) {
		this.character.updateDirection(d);
	}

	pause () {
		this.paused = !this.paused;
	}
}


class SnakeCharacter {
	constructor (position, pitch) {
		this.pitch = pitch;
		this.positionGrid = position;
		this.tail = [ ];
		this.speed = .005;
		this.tailLenght = 10;
		this.size = floor (pitch.size / pitch.numberOfCells) * .9;
		this.direction = createVector(this.speed, 0);
	}

	update ( deltaTime ) {
		this.checkIfUpdateDirection();
		this.tail.push(this.positionGrid.copy());
		if (this.tail.length > this.tailLenght)
			this.tail.shift();
		this.move(deltaTime);
	}

	display () {
		stroke(colors.y);
		strokeWeight(this.size);
		beginShape();
		this.tail.forEach(v => {
			const p = this.pitch.col2pos(v.x, v.y);
			vertex(p.x, p.y);
		});
		endShape();
	}

	checkIfUpdateDirection () {
		if (keyIsPressed === true) this.updateDirection(keyCode);
	}

	updateDirection (direction) {
		const s = this.speed;
		this.positionGrid = createVector( round( this.positionGrid.x ), round( this.positionGrid.y ) );
		//ToDo: s'hauria de restringir fer un gir de 180º
		switch (direction) {
			case UP_ARROW:    this.direction = createVector( 0, -s); break;
			case DOWN_ARROW:  this.direction = createVector( 0,  s); break;
			case LEFT_ARROW:  this.direction = createVector(-s,  0); break;
			case RIGHT_ARROW: this.direction = createVector( s,  0); break;
		};
	}

	move ( deltaTime ) {
		this.positionGrid = createVector(
			this.positionGrid.x + this.direction.x * deltaTime,
			this.positionGrid.y + this.direction.y * deltaTime
		);
	}

	eats (apple) {
		return round(this.positionGrid.x) == round(apple.gridPosition.x) && round(this.positionGrid.y) == round(apple.gridPosition.y);
	}

	isCollidingSomething (pitch) {
		return this.isCollidingWalls(pitch) || this.isCollidingItself();
	}

	isCollidingWalls (pitch) {
		var res = false;
		const b = pitch.col2pos(this.positionGrid.x, this.positionGrid.y);
		const s = this.size * .5;
		if      ( b.x - s <= pitch.minX ) res = true;
		else if ( b.x + s >= pitch.maxX ) res = true;
		else if ( b.y - s <= pitch.minY ) res = true;
		else if ( b.y + s >= pitch.maxY ) res = true;
		return res;
	}

	isCollidingItself () {
		var res = false;
		for ( let i = 0; i < this.tail.length - 20 ; i++ ) {
			const t = this.tail[i];
			const b = this.positionGrid;
			if ( dist(b.x, b.y, t.x, t.y ) < .5 ) res = true;
		}
		return res;
	}

	grow () {
		this.tailLenght += 1;// ToDo: hauria de ser 1, però no creix prou
	}
}


class SnakeApple {
	constructor (pitch) {
		this.pitch = pitch;
		this.size = floor (pitch.size / pitch.numberOfCells) * .6;
		this.relocate();
	}

	relocate () {
		const t = this.pitch.numberOfCells;
		this.gridPosition = createVector( floor(random(1, t)), floor(random(1, t)) ); // ToDo: s'hauria d'intentar que no es posi per sobre la serp
	}

	display () {
		stroke(colors.m);
		strokeWeight(this.size);
		const p = this.pitch.col2pos( this.gridPosition.x, this.gridPosition.y );
		point(p.x, p.y);
	}
}


class SnakePitch {
	constructor (minX, minY, maxX, maxY, numberOfCells) {
		this.minX = minX;
		this.minY = minY;
		this.maxX = maxX;
		this.maxY = maxY;
		this.numberOfCells = numberOfCells;
		this.size = maxX;
	}

	display () {
		stroke(colors.c);
		strokeWeight(10);
		rect(0, 0, width, height);
		this.displayGrid();
	}

	displayGrid () {
		const s = width / this.numberOfCells;
		stroke(colors.c[0], colors.c[1], colors.c[2], .2);
		strokeCap(SQUARE);
		strokeWeight(s);
		for (let i = 1; i < this.numberOfCells; i+=2) {
			const I = i * s
			line( I, 0, I, height );
			line( 0, I, width, I );
		}
		strokeCap(ROUND);
	}

	col2pos (col, row) {
		const c = map( col, 0, this.numberOfCells, this.minX, this.maxX );
		const r = map( row, 0, this.numberOfCells, this.minY, this.maxY );
		return createVector(c, r);
	}
}
