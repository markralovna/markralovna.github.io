class Wheel extends SineAnim {

	constructor(pX, pY) {
		super(pX, pY);
		this.name = "Wheel";

		this.pos = createVector(width * .5, height * .5);
		this.dim = C;
		this.color = [0, 90, 70];

		this.alpha = 1;
	}

	setup() {
		background(12);
		colorMode(HSL);
		noFill();
		strokeWeight(6);
		angleMode(RADIANS);
	}

	draw() {
		this.update();
		this.display();
	}

	input2parms(amplitude, spectrum, waveform, x) {
		this.spectrum = spectrum;
		this.color[1] = map(amplitude, 0, .1, 0, 100);
		// ...
	}

	update() {
		// ...
	}

	display() {
		background(12, this.alpha);
		if (MODE_DEBUG) { stroke('#FFFF0020'); circle(this.pos.x, this.pos.y, this.dim); }
		const n = 32;
		for (let i = 0; i < n; i++) {
			const a = TAU / n * i;
			const ch = 360 / n * i;
			const d = this.dim * .5 * this.spectrum[i] * .005;
			const x = this.pos.x + cos(a) * d;
			const y = this.pos.y + sin(a) * d;
			const r = this.dim * .1;
			stroke(ch, this.color[1], this.color[2]);
			circle(x, y, r);
		}
		// ...
	}

}