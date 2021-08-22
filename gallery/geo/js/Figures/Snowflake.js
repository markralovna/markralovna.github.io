class Snowflake extends Figure {

	constructor(pX, pY) {
		super(pX, pY);

		this.name = "Snow Flake";

		const c = pX > pY ? pX : pY; 
		this.vars = {
			'lenght': {
				v: 0,
				default: c * 0.26,
				min: c * 0.05,
				max: c * 0.5,
				integer: false
			},
			'angleBetweenBranches': {
				v: 0,
				default: 1.25,
				min: 0,
				max: TAU,
				integer: false
			},
			'branches': {
				v: 0,
				default: 3,
				min: 1,
				max: 5,
				integer: true
			}
		}
	}

	display() {
		angleMode(RADIANS);
		
		const l = this.vars['lenght'].v;
		const b = this.vars['branches'].v;

		if (MODE_DEBUG) stroke('#ff00ff40');
		
		translate(this.posX, this.posY);
		for (var i = 0; i < b*2; i++) {
			push();
			rotate(TAU * i * 0.5 / b);
			this.displayBranch(l, b);
			pop();
		}
		if (MODE_DEBUG) console.log('Número de branques:', b*2 + b*2*b +               b*2*b * (b-2)               );//Calcul erroni
	}

	displayBranch(l, branches) {
		const a = this.vars['angleBetweenBranches'].v;

		line(0, 0, 0, l);
		translate(0, l);
		var angle = (branches -1) * a * -0.5;
		for (let b = 0; b < branches; b++) {
			push();
			rotate(angle);
			if (branches > 1)
				this.displayBranch(l * 0.65, branches-1);
			pop();
			angle += a;
		}
	}

}