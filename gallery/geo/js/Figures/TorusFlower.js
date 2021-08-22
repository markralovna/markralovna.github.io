class TorusFlower extends Figure {

	constructor(pX, pY) {
		super(pX, pY);

		this.name = "Torus Flower";

		this.vars['numChildren'] = {
			v: 8,
			default: 8,
			min: 3,
			max: 30,
			integer: true
		}
		this.vars['arcs'] = {
			v: 0,
			default: 1,
			min: 1,
			max: 5,
			integer: true
		}
	}

	display() {
		if (MODE_DEBUG) this.displayInfo();
		let R = this.vars['radius'].v;
		let c = this.vars['numChildren'].v;
		let n = this.vars['arcs'].v;
		angleMode(RADIANS);
		for (let j = 1; j <= n; j++)
			for (let i = 0; i < c; i++) {
				let r = R/j;
				let a = 2 * PI / c * i;
				let x = r * cos(a) * 0.5 + this.posX;
				let y = r * sin(a) * 0.5 + this.posY;
				ellipse(x, y, r, r);
			}
	}

	displayInfo() {
		stroke('#00ffff88');
		ellipse(this.posX, this.posY, this.vars['radius'].v, this.vars['radius'].v);
		ellipse(this.posX, this.posY, this.vars['radius'].v * 2, this.vars['radius'].v * 2);
		stroke('#ff00ff88');
	}

}