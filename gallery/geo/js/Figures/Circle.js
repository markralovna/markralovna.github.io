class Circle extends Figure {

	constructor(pX, pY) {
		super(pX, pY);

		this.name = "...";

		const c = pX > pY ? pX : pY; 
		this.vars = { }
		this.vars['dim'] = {
			v: 0,
			default: c * 0.7,
			min: c * 0.1,
			max: c * 1.5,
			integer: false
		}
	}

	display() {
		this.XXXXX();
	}

	XXXXX() {
		const d = this.vars['dim'].v;
		const x = this.posX;
		const y = this.posY;
		if (MODE_DEBUG) stroke('#00ffff50');
		ellipse(x, y, d, d);
	}

}