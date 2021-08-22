class Diamond extends Component {

	constructor() {
		super();
		this.name = "Diamond";
		/*this.nodeProperties['width'] = {
			"v":  10,
			"name": "Width",
			"default": 0,
			"min": 0,
			"max": 1000,
			"step": 0.01
		};*/
		this.nodeProperties['rotacio'] = {
			"v":  0,
			"name": "Rotation",
			"default": 0,
			"min": 0,
			"max": TAU,
			"step": 0.01
		};
		this.nodeProperties['ple'] = {
			"v":  false,
			"name": "Filled?",
			"default": false,
			"type": "bool"
		};
		this.nodeProperties['radi']['name'] = 'Side size';/* Height */
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
		let r = this.nodeProperties["radi"].v;
		let a = this.nodeProperties["rotacio"].v;
		push();
		translate(R, R);
		rotate(a);
		square(0, 0, r);//Diamond(R, R, r, r);//
		pop();
	}

}