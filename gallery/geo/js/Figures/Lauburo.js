class Lauburo extends Figure {

	constructor(pX, pY) {
		super(pX, pY);
		
		this.name = "Lauburo";

		const c = pX > pY ? pX : pY; 
		this.vars = {
			'radius': {
				v: 350,
				default: c * 0.35,
				min: c * 0.05,
				max: c * 0.75,
				integer: false
			},
			'branches': {
				v: 0,
				default: 4,
				min: 2,
				max: 10,
				integer: true
			}
		}
		this.vars['generations'] = {
			v: 0,
			default: 4,
			min: 1,
			max: 6,
			integer: true
		}
	}

	display() {
		angleMode(RADIANS);

		const b = this.vars['branches'].v;

		translate(this.posX, this.posY);
		for (let i = 0; i < b; i++) {
			push();
			rotate(TAU / b * i);
			this.drawBarnch(i);
			pop();
		}
	}

	drawBarnch(iteration) {
		const n = this.vars['generations'].v;
		
		var r = this.vars['radius'].v;
		var p = r * 0.5;

		var a = 0;
		var d = 1;

		if (MODE_DEBUG) { stroke('#ff00ff50'); ellipse(p, 0, r, r); stroke('#ff00ffAA'); }
		arc(p, 0, r, r, a, a+PI, OPEN);
		
		for (let i = 0; i < n; i++) {
			p += r * 0.25 * d;
			r *= 0.5;
			a += PI;
			d *= -1;
			if (MODE_DEBUG) { stroke('#00ffff50'); ellipse(p, 0, r, r); stroke('#00ffffAA'); }
			arc(p, 0, r, r, a, a+PI, OPEN);
			if (MODE_DEBUG) { stroke('#ffff0050'); ellipse(p+r/4, 0, r/2, r/2); stroke('#ffff00AA'); }
			arc(p+r/4, 0, r/2, r/2, a, a-PI, OPEN);
		}
	}
}