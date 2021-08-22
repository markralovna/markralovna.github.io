class Ones extends Figure {

	constructor(pX, pY) {
		super(pX, pY);

		this.name = "Ones";

		const c = pX > pY ? pX : pY; 
		this.vars = {
			'dim': {
				v: 0,
				default: c * 0.7,
				min: c * 0.1,
				max: c * 1.5,
				integer: false,
				pair: false
			},
			'childs': {
				v: 0,
				default: 5,
				min: 2,
				max: 8,
				integer: false,
				pair: true
			}
		}

		this.curl = 2;
		/*this.vars['curl'] = {
			v: 0,
			default: 2,
			min: 1,
			max: 4,
			integer: true
		};*/
	}

	display() {

		const dim = this.vars['dim'].v;
		const chi = this.vars['childs'].v;

		angleMode(RADIANS);
		if (MODE_DEBUG) stroke('#00FFFF50');
		ellipse(this.posX, this.posY, dim, dim);

		var d, x, y;

		for (let i = 1; i < chi; i++) {
			d = dim / chi * i;
			x = - (dim - d) * 0.5;
			y = 0;
			translate(this.posX, this.posY);
			for (var j = 0; j < this.curl; j++) {
				push();
				rotate(TAU/this.curl * j);
				if (MODE_DEBUG) { stroke('#FF00FF30'); ellipse(x, y, d, d); stroke('#FF00FFAA') };
				arc(x, y, d, d, PI, 0);
				pop();
			}
			translate(-this.posX, -this.posY);
		}
	}

}