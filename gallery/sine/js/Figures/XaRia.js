class XaRia extends SineAnim {

	constructor(pX, pY) {
		super(pX, pY);
		this.name = "XaRia";

		this.pos = createVector(width * .5, height * .5);
		this.tetha = 0;
		this.dim = C;

		this.alpha = .1;

		this.color = [0, 60, 60];
		this.colorSatIncr = 1;
	}

	setup() {
		background(12);
		fill(12);
		colorMode(HSL);
		stroke(0, 60, 60);
		strokeWeight(6);
	}

	draw() {
		this.update();
		this.display();
	}

	input2parms(amplitude, spectrum, waveform, x) {
		this.dim = (amplitude + .85) * C;
		this.color[0] = map(max(spectrum), 0, 2000, 0, 360);
	}

	update() {
		this.tetha += .05;
		this.color[1] += this.colorSatIncr;
		if (this.color[1] > 80 || this.color[1] < 60) this.colorSatIncr *= -1;
	}

	display() {
		background(12, this.alpha);
		if (MODE_DEBUG) { stroke('#FFFF0020'); circle(this.pos.x, this.pos.y, this.dim); }
		const x = this.pos.x + cos(this.tetha) * this.dim * .5;
		const y = this.pos.y + sin(this.tetha) * this.dim * .5;
		stroke(this.color);
		circle(x, y, this.dim * .1);
	}

}