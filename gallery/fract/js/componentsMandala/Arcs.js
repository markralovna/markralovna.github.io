class Arcs extends Component {

	constructor() {
		super();
		this.name = "Arcs";
		this.properties['numArcs'] = {
			"v":  16,
			"name": "Number of Arcs",
			"default": 16,
			"min": 2,
			"max": 64,
			"step": 1
		};
		/*this.properties['ple'] = {
			"v":  ple,
			"name": "Filled?",
			"default": false,
			"type": "bool"
		};*/
	}
	
	drawComponent(index) {
		const d = this.properties["desplacamentNode"].v;
		const rn = this.properties["radiNodes"].v;
		const na = this.properties["numArcs"].v;
		const ra = this.properties["radiAnella"].v;

		var radiusArc = PI*rn/na;
		let r = ra * 0.34;
		for (let i = 0; i < na; i++) {
			let a = TAU / na * i + d;
			let posX = rn * cos(a) * 0.5 + ra * 0.34;
			let posY = rn * sin(a) * 0.5 + ra * 0.34;
			circle(posX, posY, radiusArc);
		}
		circle(r, r, this.radiNodes);
	}

}