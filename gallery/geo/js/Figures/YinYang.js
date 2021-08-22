class YinYang extends Figure {

	constructor(pX, pY) {
		super(pX, pY);

		this.name = "yīnyáng";

		const c = pX > pY ? pX : pY; 
		this.vars = {
			'dim': {
				v: 0,
				default: c * 0.7,
				min: c * 0.1,
				max: c * 1.5,
				integer: false
			},
			'childs': {
				v: 0,
				default: 1,
				min: 2,
				max: 8,
				integer: true
			}
		}
	}

	display() {

		angleMode(RADIANS);
		if (MODE_DEBUG) stroke('#00ffff50');
		const dim = this.vars['dim'].v;
		const chi = this.vars['childs'].v;
		ellipse(this.posX, this.posY, dim, dim);

		var d, x, y;

		d = dim * 0.5;
		x = (dim - d) * 0.5;
		y = 0;

		translate(this.posX, this.posY);
		for (var j = 0; j < chi; j++) {
			push();
			rotate(TAU/chi * j);
			if (MODE_DEBUG) { stroke('#ff00ff30'); ellipse(x, y, d, d); stroke('#ff00ffAA') };
			arc(x, y, d, d, PI, 0);
			const D = d * 0.6666666 / chi;
			ellipse(x, y, D, D);
			pop();
		}
		translate(-this.posX, -this.posY);
	}

}