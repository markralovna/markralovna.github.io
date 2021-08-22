class Fishes extends Component {

	constructor() {
		super();
		this.name = "Fishes";
		this.nodeProperties['ple'] = {
			"v":  false,
			"name": "Filled?",
			"default": false,
			"type": "bool"
		};
		this.nodeProperties['numPisos'] = {
			"v":  3,
			"name": "Number of floors",
			"default": 3,
			"min": 2,
			"max": 12,
			"step": 1
		};
		this.incr = 0.005;
	}
	
	drawComponent(index) {
		let R = this.ringProperties["radi"].v * 0.34;
		let r = this.nodeProperties["radi"].v;
		let n = this.nodeProperties["numPisos"].v;
		circle(R, R, r);
		strokeWeight(documentStyle['strokeWeight'] * 2);
		for (let i = n; i > 0; i--)
			this.drawPis(i);
		strokeWeight(documentStyle['strokeWeight']);
	}

	drawPis(capa) {
		let RA = this.ringProperties["radi"].v * 0.34;
		let rn = this.nodeProperties["radi"].v;
		let N = this.nodeProperties["numPisos"].v;

		let n = 2**capa;
		let A = TAU / n;
		let r = rn / N;
		let R = 0.5 * rn / N * capa -r/2;
		for (let i = 0; i < n; i++) {
			let a = A * i - (QUARTER_PI) + this.fase;
			let x = cos(a) * R + RA;
			let y = sin(a) * R + RA;
			ellipse(x, y, r, r);
		}
	}
}