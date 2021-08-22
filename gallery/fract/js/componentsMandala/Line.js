class Line extends Component {

	constructor() {
		super();
		this.name = "Line";
		this.nodeProperties['rotacio'] = {
			"v":  PI,
			"name": "Rotation",
			"default": PI,
			"min": 0,
			"max": TAU,
			"step": 0.01
		};
	}
	
	drawComponent(index) {
		let R = this.ringProperties["radi"].v * 0.34;
		let r = this.nodeProperties["radi"].v;
		let a = this.nodeProperties["rotacio"].v;

		push();
		translate(R, R);
		rotate(a);
		line(-r/2, -r/2, r/2, r/2);
		pop();
	}

}