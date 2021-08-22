class PolygonalSpiral extends Figure {

	constructor(pX, pY) {
		super(pX, pY);

		this.name = "Polygonal Spiral";

		const c = pX > pY ? pX : pY; 
		this.vars = {
			'dim': {
				v: 0,
				default: c * 0.7,
				min: c * 0.1,
				max: c * 1.5,
				integer: false
			},
			'sides': {
				v: 0,
				default: 7,
				min: 3,
				max: 12,
				integer: true
			},
			't': {
				v: 0,
				default: 0.25,
				min: 0,
				max: 1,
				integer: false
			},
			'iterations': {
				v: 0,
				default: 4,
				min: 1,
				max: 24,
				integer: true
			}
		}
	}

	display() {
		angleMode(RADIANS);

		const d = this.vars['dim'].v;
		const iterations = this.vars['iterations'].v;
		const sides = this.vars['sides'].v;
		const t = this.vars['t'].v;

		if (MODE_DEBUG) stroke('#00FFFF50');
		if (MODE_DEBUG) ellipse(this.posX, this.posY, d, d);
		var c = this.displayPolygonInCircle(this.posX, this.posY, d, sides);

		for (let i = 0; i < iterations; i++) {
			var c2 = this.findPoligonChild(c, t);
			this.displayPolygonWithPoints(c2, sides);
			c = c2;
		}
	}

	findPoligonChild(points, t) {
		var newPoints = [];
		for (let i = 0; i < points.length; i++) {
			const p = points[i];
			const p2 = i < points.length-1 ? points[i+1] : points[0];
			var P = {
				x: p['x'] + (p2['x']-p['x']) * t,
				y: p['y'] + (p2['y']-p['y']) * t
			};
			if (MODE_DEBUG) { stroke('#FFFF00');strokeWeight(10);point(P['x'], P['y']);strokeWeight(4) };
			newPoints.push(P);
		};
		return newPoints;
	}

}