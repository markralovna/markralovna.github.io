class Star extends Component {

	constructor() {
		super();
		this.name = "Star";
		this.nodeProperties['puntes'] = {
			"v":  8,
			"name": "Puntes",
			"default": 8,
			"min": 3,
			"max": 32,
			"step": 1
		};
		this.nodeProperties['dist'] = {
			"v":  60,
			"name": "Distancia entre puntes",
			"default": 30,
			"min": 1,
			"max": 64,
			"step": 1
		};
	}
	
	drawComponent(index) {
		const R = this.ringProperties["radi"].v * 0.34;
		const r = this.nodeProperties["radi"].v;
		const n = this.nodeProperties["puntes"].v;
		const D = parseInt(map(this.nodeProperties['dist'].v, this.nodeProperties['dist'].min, this.nodeProperties['dist'].max, 1, n*0.5));//let D = this.nodeProperties["dist"].v;
		for (let i = 0; i < n; i++) {
			const a1 = TAU / n * i;
			const p1x = R + cos(a1) * r;
			const p1y = R + sin(a1) * r;
			const a2 = TAU / n * (i + D);
			const p2x = R + cos(a2) * r;
			const p2y = R + sin(a2) * r;
			line(p1x, p1y, p2x, p2y);
		}
	}

}