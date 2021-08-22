class Bezier extends Component {

	constructor() {
		super();
		this.name = "Bezier";
		this.nodeProperties = {
			'height':  {
				"v":  100,
				"name": "Height",
				"default": 100,
				"min": 1,
				"max": 500,
				"step": 1
			},
			'width':  {
				"v": 75,
				"name": "Node Radius",
				"default": 75,
				"min": 5,
				"max": 250,
				"integer": false
			},
			'ple':  {
				"v":  false,
				"name": "Filled?",
				"default": false,
				"type": "bool"
			}
		};
	}

	display() {
		const p = this.nodeProperties['ple'].v;
		if (p) fill(documentStyle['foreground']);
		this.rotateViewAndDrawnComponent();
		if (p) fill(documentStyle['background']);
	}

	drawComponent (index) {
		let r = this.ringProperties["radi"].v * 0.5;
		let w = this.nodeProperties["width"].v * 0.5;
		let h = this.nodeProperties["height"].v * 0.5;

		let u = w / 1.4;

		var x1 = -u;
		var y1 = r-w;
		var x2 = -2*u;
		var y2 = y1+2*u;
		var x3 = 0;
		var x4 = 0;
		var y4 = r+h;
		var y3 = y4-u;

		//this.showDebug(x1, y1, x2, y2, x3, x4, y4, y3);

		noStroke();
		triangle(x1, y1, x4, y4, -x1, y1);//xapusa èpica per poderfer un fill fake
		stroke(this.selected ? documentStyle['selected'] : documentStyle['foreground']);


		bezier(x1, y1, x2, y2, x3, y3, x4, y4);
		bezier(-x1, y1, -x2, y2, -x3, y3, -x4, y4);
	}

	showDebug(x1, y1, x2, y2, x3, y3, x4, y4) {
		strokeWeight(10);
		stroke('#f00');point(x1,y1);point(x4,y4);
		stroke('#0f0');point(x2,y2);point(x3,y3);
		stroke(documentStyle['foreground']);strokeWeight(documentStyle['strokeWeight']);
	}
}