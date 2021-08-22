class Raids extends Component {

	constructor() {
		super();
		this.name = "Raids";
		this.nodeProperties['numRaids'] = {
			"v":  2,
			"name": "numRaids",
			"default": 2,
			"min": 1,
			"max": 24,
			"step": 1
		};
		/*this.nodeProperties['angleEntreBranques'] = {
			"v":  angleEntreBranques,
			"name": "angleEntreBranques",
			"default": 0.2,
			"min": 0,
			"max": 1,
			"integer": false
		};*/
		this.dir = 1;
	}

	update() {
		let M = HALF_PI/this.nodeProperties["numRaids"].v;
		let incr = M * 0.01 * this.dir;
		//this.fase = (this.fase + this.faseIncr) % M;
		this.fase += incr;
		if (this.fase < 0) {
			this.fase = 0;
			this.dir *= -1;
		}
		if (this.fase >M) {
			this.fase =M;
			this.dir *= -1;
		}
	}

	drawComponent(index) {
		let r = this.ringProperties["radi"].v * 0.5;
		let R = this.nodeProperties["radi"].v;
		let n = this.nodeProperties["numRaids"].v;

		for (let j = -n; j <= n; j++) {
			let ai = this.fase * j + QUARTER_PI;
			var posX = r + (R - abs(j*10)) * cos(ai);
			var posY = r + (R - abs(j*10)) * sin(ai);
			line(r, r, posX, posY);
		}
	}

}