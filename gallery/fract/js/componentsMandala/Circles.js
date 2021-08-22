class Circles extends Component {

	constructor() {
		super();
		this.name = "Circles";
		this.nodeProperties['ple'] = {
			"v":  false,
			"name": "Filled?",
			"default": false,
			"type": "bool"
		};
		this.incr = 0.0025;
		this.fase = 1;
		this.min = 0.95;
		this.max = 1.05;
	}

	display() {
		if (this.selected) stroke(documentStyle['selected']);
		const p = this.nodeProperties['ple'].v;
		if (p) fill(documentStyle['foreground']);
		this.rotateViewAndDrawnComponent();
		if (p) fill(documentStyle['background']);
		if (this.selected) stroke(documentStyle['foreground']);
	}
	
	drawComponent(index) {
		let R = this.ringProperties["radi"].v * 0.34;
		var r = this.nodeProperties["radi"].v;
		r *= this.fase;
		circle(R, R, r);
	}

}