class PoissonController extends AlgorithmController {
	constructor () {
		super();
		this.info.visible = false;
		this.info.shortName = 'Poisson';
		this.info.name = 'Poisson distribution';
		this.info.infolink = 'https://en.wikipedia.org/wiki/Poisson_distribution';
		this.algorithm = new Poisson( );
		const that = this;
		this.steps = [
			{
				title: 'Initialize',
				explanation: 'Choose a random point',
				displayFunction: function() { that.algorithm.displayInitPoint() }
			},
			{
				title: 'Set radius',
				explanation: '...',
				displayFunction: function() { that.algorithm.displayInitRadius() }
			},
			{
				title: 'Set second point',
				explanation: 'Choose a random point within the circle',
				displayFunction: function() { that.algorithm.displayFollowinfPoint(0) }
			},
			{
				title: 'Repeat',
				explanation: '',
				displayFunction: function() { that.algorithm.displayAllPoints() }
			}
		];
		this.inputs = [
			{
				minStep: 1,
				type: 'range',
				label: 'Distance between points',
				initValue: C*.1,
				callback: function(ev) { that.algorithm.setDistanceBetweenPoints(ev.target.value) },
				min: 5,
				max: C*.3
			},
			{
				minStep: 3,
				type: 'range',
				label: 'Num of points',
				initValue: 30,
				callback: function(ev) { that.algorithm.setN(ev.target.value) },
				min: 0,
				max: 100
			}
		];
	}
}



class Poisson extends Algorithm {
	constructor ( ) {
		super();
		this.n = 100;
		this.distanceBetweenPoints = C * .1;
		this.initPoint = createVector( random(0, width), random(0, height) );
		this.pointsAlphas = [];
		for (let i = 0; i < this.n; i++)
			this.pointsAlphas.push( random(0, TAU) );
	}

	draw () {
		stroke(getColor(45, .4)); strokeWeight(15);
		this.points.forEach(p => {
			point(p.x, p.y);
		});
	}

	update () {
		// ...
	}

	displayInitPoint () {
		stroke(getColor(45, .4)); strokeWeight(15);
		point( this.initPoint.x, this.initPoint.y );
	}

	displayInitRadius () {
		stroke(getColor(180, .4)); strokeWeight(5);
		circle( this.initPoint.x, this.initPoint.y, this.distanceBetweenPoints );
	}

	displayFollowinfPoint ( indx ) {
		const a = this.pointsAlphas[indx];
		const x = this.initPoint.x + cos(a) * this.distanceBetweenPoints * .5;
		const y = this.initPoint.y + sin(a) * this.distanceBetweenPoints * .5;
		stroke(getColor(300, .4)); strokeWeight(15);
		point( x, y );
	}

	displayAllPoints () {
		var x = this.initPoint.x;
		var y = this.initPoint.y;
		for (let i = 0; i < this.n; i++) {
			const a = this.pointsAlphas[i];
			x += cos(a) * this.distanceBetweenPoints * .5;
			y += sin(a) * this.distanceBetweenPoints * .5;
			stroke(getColor(300, .4)); strokeWeight(15);
			point( x, y );
		}
	}

	setDistanceBetweenPoints ( d ) {
		this.distanceBetweenPoints = d;
	}

	setN( n ) {
		this.n = n;
	}

}

