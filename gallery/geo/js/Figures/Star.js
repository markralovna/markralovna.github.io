class Star extends Figure {

	constructor(pX, pY) {
		super(pX, pY);
		
		this.name = "Star";

		const c = pX > pY ? pX : pY;
		this.vars = { };
		this.vars['dim'] = {
			v: 0,
			default: c * 0.7,
			min: c * 0.1,
			max: c * 1.5,
			integer: false
		}

		this.vars['childs'] = {
			v: 16,
			default: 16,
			min: 3,
			max: 40,
			integer: true
		}

		this.vars['childDistance'] = {
			v: 16,
			default: 80,
			min: 1,
			max: 100,
			integer: true
		}
	}

	display() {
		if (MODE_DEBUG) this.displayInfo();
		angleMode(DEGREES);

		const d = this.vars['dim'].v;
		const n = this.vars['childs'].v;
		const D = parseInt(map(this.vars['childDistance'].v, this.vars['childDistance'].min, this.vars['childDistance'].max, 1, n*0.5));

		for (let i = 0; i < n; i++) {
			const a1 = 90 - 360 / n * i;
			const p1x = this.posX + cos(a1) * d * 0.5;
			const p1y = this.posY + sin(a1) * d * 0.5;
			const a2 = 90 - 360 / n * (i + D);
			const p2x = this.posX + cos(a2) * d * 0.5;
			const p2y = this.posY + sin(a2) * d * 0.5;
			line(p1x, p1y, p2x, p2y);
		}
	}

	displayInfo() {
		stroke('#00ffff88');
		ellipse(this.posX, this.posY, this.vars['dim'].v, this.vars['dim'].v);
		stroke('#ff00ff88');
	}
}