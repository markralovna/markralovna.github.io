class SierpinskiCarpet extends Figure {

	constructor(pX, pY) {
		super(pX, pY);

		this.name = "Sierpiński Carpet";

		const c = pX > pY ? pX : pY; 
		this.vars = { }
		this.vars['dim'] = {
			v: 0,
			default: c * 0.7,
			min: c * 0.1,
			max: c * 1.5,
			integer: false
		}
		this.vars['iteracions'] = {
			v: 0,
			default: 3,
			min: 1,
			max: 6,
			integer: true
		}
		this.vars['sides'] = {
			v: 0,
			default: 3,
			min: 3,
			max: 6,
			integer: true
		}
		this.colorHue = 0;
	}

	display() {
		angleMode(RADIANS);
		const d = this.vars['dim'].v;
		const s = this.vars['sides'].v;
		const x = this.posX;
		const y = this.posY;
		if (MODE_DEBUG) { stroke('#00FFFF50'); circle(x, y, d); };
		this.displayRecursivePolygon(s, x, y, d * 0.5);
		if (MODE_DEBUG) console.log("Número de polígons:", Math.pow(s, (this.vars['iteracions'].v - 1)) );
	}

	displayRecursivePolygon(sides, centerX, centerY, dim) {

		const A = TAU / sides;
		const iteracio = log( ( this.vars['dim'].v/dim ) ) / log(2);

		for (var i = 0; i < sides; i++) {

			push();
			translate(centerX, centerY);
			rotate(A * i);

			if (MODE_DEBUG) stroke('#FF00FF50');

			var v = p5.Vector.fromAngle(A, dim * .5);
			var x1 = dim * .5, y1 = 0, x2 = v.x, y2 = v.y;
			var a = createVector(x1, y1).angleBetween(createVector(x2, y2));
			a += PI * this.getTheMagicNumber(sides);
			var costat = dist(x1, y1, x2, y2);

			if (iteracio < this.vars['iteracions'].v)
				this.displayRecursivePolygon (
					sides,
					cos( A * 1.5 ) * dim * this.getThePosRatio(sides),
					sin( A * 1.5 ) * dim * this.getThePosRatio(sides),
					dim * this.getTheRezigeRatio(sides)
				);
			else
				for (var j = 0; j < sides; j++) {
					v = p5.Vector.fromAngle(a, costat);
					line(x1, y1, x2, y2);
					x1 = x2, y1 = y2, x2 += v.x, y2 += v.y, a += A;
				}

			pop();
		}
	}

	getTheMagicNumber  (sides) { return { 3: 0.5, 4: 0.25, 5: 0.1, 6: 0 } [sides] }

	getTheRezigeRatio  (sides) { return { 3: 0.5, 4: 0.333333, 5: 0.375, 6: 0.333333 }[sides] } //Xapusa número 01
	getThePosRatio  (sides) { return {  3: 0.5, 4: 0.7, 5: 0.8, 6: 0.875 } [sides] } //Xapusa número 02

}