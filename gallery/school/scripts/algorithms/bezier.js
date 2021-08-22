class BezierController extends AlgorithmController {
	constructor () {
		super();
		this.info.shortName = 'Bezier';
		this.info.name = 'Bézier curve';
		this.info.infolink = 'https://en.wikipedia.org/wiki/B%C3%A9zier_curve';
		this.algorithm = new Bezier([
			new Point( createVector(width * .20, height * .80) ),
			new Point( createVector(width * .30, height * .25) ),
			new Point( createVector(width * .80, height * .40) ),
			new Point( createVector(width * .65, height * .70) )
		]);
		const that = this;
		this.steps = [
			{
				title: 'Points',
				explanation: 'Draw four points where you want',
				displayFunction: function() { that.algorithm.displayPoints() }
			},
			{
				title: 'Anchors',
				explanation: 'Draw the anchors',
				displayFunction: function() { that.algorithm.displayAnchors(); }
			},
			{
				title: 'Compute T',
				explanation: '',
				displayFunction: function() { that.algorithm.displayTPoints(0); }
			},
			{
				title: 'Join T points',
				explanation: '',
				displayFunction: function() { that.algorithm.displayTPointsLines(0); }
			},
			{
				title: 'Repeat the points',
				explanation: '',
				displayFunction: function() { that.algorithm.displayTPoints(1); that.algorithm.displayTPointsLines(1); }
			},
			{
				title: 'And Repeat',
				explanation: '',
				displayFunction: function() { that.algorithm.displayTPointsAndLinesAll(); that.algorithm.displayFinalTPoint(); }
			},
			{
				title: 'Draw the curve',
				explanation: '',
				displayFunction: function() { that.algorithm.drawCurve() }
			}
		];
		this.inputs = [
			{
				type: 'range',
				minStep: 2,
				label: 'T',
				initValue: 30,
				callback: function(ev) { that.algorithm.setT(ev.target.value) },
				min: 0,
				max: 100
			}
		];
	}
	//draw () { this.algorithm.draw(); }
}





class Bezier extends Algorithm {
	constructor (points) {
		super();
		this.points = points;
		this.TPoints = [ ];
		this.t = .3;
	}

	draw () {
		this.update();
		this.display();
	}

	update () {
		this.updateTPoints();
	}

	display () {
		this.displayAnchors();
		for (let i = 0; i < this.TPoints.length; i++) {
			this.displayTPoints(i);
			this.displayTPointsLines(i);
		}
		this.displayCurve();
		this.displayPoints();
	}

	get iterations () {
		return this.points.length - 1;
	}

	setT(t) {
		this.t = t * .01;
	}

	updateTPoints () {
		for (let i = 0; i <= this.iterations - 1; i++) {
			this.TPoints[i] = [];
			for (let j = 0; j < this.iterations-i; j++) {
				var point = null;
				if (i == 0)
					point =  this.comuteTPoint(this.points[j].position, this.points[j+1].position );
				else
					point = this.comuteTPoint(this.TPoints[i-1][j], this.TPoints[i-1][j+1] );
				this.TPoints[i].push( point );
			}
		}
	}

	displayPoints () {
		this.points.forEach(point => {
			point.update();
			point.display();
		});

		setColor(0, .9, STROKE, LINE);
	}

	displayAnchors () {
		const n = this.iterations;
		setColor(45, .4, STROKE, LINE);
		this.drawAnchorLine(0, 1);
		this.drawAnchorLine(n-1, n);
		setColor(45, .1, STROKE, LINE);
		for (let i = 1; i < n-1; i++) this.drawAnchorLine(i, i + 1);
	}

	displayTPointsAndLinesAll () {
		for (let i = 0; i < this.iterations; i++) {
			this.displayTPointsLines(i);
			this.displayTPoints(i);
		}
	}

	displayTPoints (iteration) {
		const points = this.TPoints[iteration];
		setColor(315, .5, STROKE, POINT);
		for (let i = 0; i < points.length - 1; i++) {
			const p1 = points[i];
			const p2 = points[i+1];
			point(p1.x, p1.y);
			point(p2.x, p2.y);
		}
	}

	displayTPointsLines (iteration) {
		const points = this.TPoints[iteration];
		setColor(315, .1, STROKE, LINE);
		for (let i = 0; i < points.length - 1; i++) {
			const p1 = points[i];
			const p2 = points[i+1];
			line(p1.x, p1.y, p2.x, p2.y);
		}
	}

	displayFinalTPoint () {
		const n = this.TPoints.length - 1;
		setColor(0, .5, STROKE, POINT);
		point(this.TPoints[n][0].x, this.TPoints[n][0].y);
	}

	drawAnchorLine (index1, index2) {
		line( this.points[index1].position.x, this.points[index1].position.y, this.points[index2].position.x, this.points[index2].position.y );
	}

	comuteTPoint (point1, point2) {
		return point2.copy().sub(point1).mult(this.t).add(point1);
	}

	drawCurve () {
		setColor(0, .5, STROKE, LINE);
		drawBezier(this.points, 100);
	}

}





class Point {
	constructor (position) {
		this.position = position;
		this.colorHueOct = 180;
		this.size = 40;
	}

	draw () {
		this.update();
		this.display();
	}

	update () {
		if (this.hover && mouseIsPressed) this.onClick();
	}

	display () {
		if (this.hover) {
			setColor(this.colorHueOct, .4, STROKE, POINT);
			strokeWeight(this.size);
		}
		else {
			setColor(this.colorHueOct, .15, STROKE, POINT);
			strokeWeight(this.size);
			point(this.position.x, this.position.y);
			setColor(this.colorHueOct, .3, STROKE, POINT);
			strokeWeight(this.size * .3);
		}
		point(this.position.x, this.position.y);
	}

	onClick() {
		this.position = createVector(mouseX, mouseY);
	}

	get hover() {
		return dist(mouseX, mouseY, this.position.x, this.position.y) < this.size * .5;
	}

	get x() {
		return this.position.x;
	}

	get y() {
		return this.position.y;
	}
}



function drawBezier (points, resolution) {
	//Inspirated by: Koogs in https://forum.processing.org/two/discussion/19164/make-a-bezier-curve-with-more-than-2-control-points
	var resolution = 1 / resolution;
	var t, x, y;
	const n = points.length - 1;
	const pascals = getPascalTrigRow(n+1);
	beginShape();
	for (t = 0; t < 1 + resolution; t += resolution) {
		x = 0;
		y = 0;
		for (let i = 0; i < points.length; i++) {
			const i_ = n - i;
			x += (pascals[i] * t**i * (1-t)**i_ * points[i].x);
			y += (pascals[i] * t**i * (1-t)**i_ * points[i].y);
		}
		vertex(x, y);
	}
	endShape();
};

function getPascalTrigRow (row) {
	const PascalsTriangle = [
		[1],
		[1, 1],
		[1, 2, 1],
		[1, 3, 3, 1],
		[1, 4, 6, 4, 1],
		[1, 5, 10, 10, 5, 1],
		[1, 6, 15, 20, 15, 6, 1],
		[1, 7, 21, 35, 35, 21, 7, 1],
		[1, 8, 28, 56, 70, 56, 28, 8, 1 ]
	];
	return PascalsTriangle[row - 1];
}
