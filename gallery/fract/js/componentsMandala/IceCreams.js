class IceCreams extends Component {

	constructor() {
		super();
		this.name = "Ice Creams";
		this.nodeProperties['ple'] = {
			"v":  false,
			"name": "Filled?",
			"default": false,
			"type": "bool"
		};
	}

	display() {
		const p = this.nodeProperties["ple"].v;
		if (p) fill(documentStyle['foreground']);
		if (this.selected) stroke(documentStyle['selected']);
		this.rotateViewAndDrawnComponent();
		if (p) fill(documentStyle['background']);
		if (this.selected) stroke(documentStyle['foreground']);
	}

	drawComponent() {
		let R = this.ringProperties["radi"].v * 0.34;
		let r = this.nodeProperties["radi"].v;
		var d = r * 0.2;
		while (r >= d) {
			circle(R, R, r);
			r -= d;
		}
	}

}