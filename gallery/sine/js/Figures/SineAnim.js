class SineAnim {
	
	/* ┌──────────────────────────────┐
	   │          Constructor         │
	   └──────────────────────────────┘ */

	constructor() {
		this.name = "Sine";
		this.pos = createVector(width * .5, height * .5);
		this.radius = 0;
	}


	
	/* ┌──────────────────────────────┐
	   │       Getters & Setters      │
	   └──────────────────────────────┘ */

	getName() {
		return this.name;
	}

	input2parms(amplitude, spectrum, waveform, x) {
		this.radius = map(amplitude, 0, 1, 50, 500);
	}



	/* ┌──────────────────────────────┐
	   │        Mètodes comuns        │
	   └──────────────────────────────┘ */

	draw() {
		background(12);
		circle(this.pos.x, this.pos.y, this.radius);
	}

	setup() {
		fill(248);
		background(12);
	}

}