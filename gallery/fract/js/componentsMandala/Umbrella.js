class Umbrella extends Component {

	constructor() {
		super();
		this.name = "Umbrella";
		this.nodeProperties['numRaids'] = {
			"v":  24,
			"name": "Number of Raids",
			"default": 24,
			"min": 2,
			"max": 64,
			"step": 1
		};
	}
	
	drawComponent(index) {
		let R = this.ringProperties["radi"].v * 0.34;
		let r = this.nodeProperties["radi"].v;
		let n = this.nodeProperties["numRaids"].v;
		for (let i = 0; i < n; i++) {
			let a = TAU / n * i + this.fase;
			var posX = R + r * cos(a) * 0.5;
			var posY = R + r * sin(a) * 0.5;
			line(R, R, posX, posY);
		}
	}

}