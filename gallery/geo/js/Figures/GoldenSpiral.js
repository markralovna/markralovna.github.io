class GoldenSpiral extends Figure {

	/* ┌──────────────────────────────┐
	   │          Constructor         │
	   └──────────────────────────────┘ */

	constructor(pX, pY) {
		super(pX, pY);
		
		this.name = "Golden Spiral";

		const c = pX > pY ? pX : pY; 
		this.vars = {
			'dim': {
				v: 0,
				default: c * .015,
				min: c * .01,
				max: c * .02,
				integer: false
			},
			'iterations': {
				v: 0,
				default: 18,
				min: 1,
				max: 32,
				integer: true
			},
			'numBranches': {
				v: 4,
				default: 4,
				min: 1,
				max: 16,
				integer: true
			}
		}
		this.fi = this.calcGoldenNumber();
	}

	display() {
		const r = this.vars['dim'].v;
		const n = this.vars['numBranches'].v;
		if (MODE_DEBUG) { stroke('#00FFFF88'); circle(this.posX, this.posY, r); }
		angleMode(RADIANS);
		for (let i = 1; i <= n; i++) {
			const a = TAU / n * i;
			this.spiral(
				this.posX + r * cos( a ) * .5, // posX
				this.posY + r * sin( a ) * .5, // posY
				r, //diameter
				( TAU / n ) * i + PI // fase
			);
		}
	}

	calcFibonacciSeq(iterations) {
		var res = [0, 1];
		for (let i = 0; i < iterations; i++)
			res.push(res[i] + res[i+1])
		if (MODE_DEBUG) console.log(res);
		return res;
	}
	
	calcGoldenNumber() {
		const values = this.calcFibonacciSeq(10);
		const res = values[values.length-1] / values[values.length-2];
		if (MODE_DEBUG) console.log("Golden number:", res);
		return res;
	}

	spiral(posX, posY, diameter, fase) {
		if (MODE_DEBUG) { stroke('#FF00FF20'); circle(posX, posY, diameter); stroke('#FF00FF88'); }
		arc(posX, posY, diameter, diameter, fase, fase + HALF_PI, OPEN);

		const d = .5 / this.fi;
		const maxDim = this.vars['iterations'].v * this.fi *this.vars['dim'].v;

		if (diameter < maxDim ) this.spiral(
			posX - cos( HALF_PI + fase ) * diameter * d ,
			posY - sin( HALF_PI + fase ) * diameter * d ,
			diameter * this.fi, // diameter
			fase + HALF_PI // fase
		);



	}

}