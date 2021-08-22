//This sketch borrows heavily from https://p5js.org/examples/simulate-recursive-tree.html

class RecursiveTree extends Figure {

	constructor(pX, pY) {
		super(pX, pY);

		this.name = "Recursive Tree";

		const c = pX > pY ? pX : pY; 
		this.vars = { }
		this.vars['size'] = {
			v: 0,
			default: c * 0.2,
			min: c * 0.05,
			max: c * 0.5,
			integer: false
		},
		this.vars['theta'] = {
			v: 0,
			default: 0.85,
			min: 0,
			max: PI,
			integer: false
		},
		this.vars['childRatius'] = {
			v: 0,
			default: 0.66,
			min: 0,
			max: 0.66,
			integer: false
		}
	}

	display() {
		angleMode(RADIANS);
		let s = this.vars['size'].v;
		let relY = this.posY * 2 - this.posY * 0.2;//let relY = this.posY + s * 0.5;
		translate(this.posX, relY);
		line(0,0,0,-s);
		translate(0,-s);
		this.displayBranch(s);
		if (MODE_DEBUG) this.printInfo();
	}

	displayBranch(h) {

		let theta = this.vars['theta'].v;

		h *= this.vars['childRatius'].v;

		if (h > 2) {
			push();
			rotate(theta);
			line(0, 0, 0, -h);
			translate(0, -h);
			this.displayBranch(h);
			pop();

			push();
			rotate(-theta);
			line(0, 0, 0, -h);
			translate(0, -h);
			this.displayBranch(h);
			pop();
		}
	}

	printInfo() {
		const s = this.vars['size'].v;
		const n = 1 / this.vars['childRatius'].v;
		const numIteracions = floor(log(s/2)/log(n));
		const numBranques = 2 ** numIteracions * 2 - 1;
		console.log("Número d'Iteracions:", numIteracions );
		console.log("Número de branques:", numBranques);
	}
}