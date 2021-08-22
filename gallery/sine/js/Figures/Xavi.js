class Xavi extends SineAnim {

	constructor(pX, pY) {
		super(pX, pY);
		this.name = "Xavi";

		this.tetha = 0;
		this.pos = createVector(width * .5, height * .5);

		this.color = [0, 60, 60];
		this.colorSatIncr = 1;

		this.dim = C * .1;
		this.speed = .05;
		this.distance = this.dim * 1.5;
		this.alpha = .5;

		this.circles = [createVector(0, 0), createVector(0, 0), createVector(0, 0)];
	}

	setup() {
		background(12);
		noFill();//fill(12);
		colorMode(HSL);
		stroke(0, 60, 60);
		strokeWeight(6);
		angleMode(RADIANS);
	}

	draw() {
		this.update();
		this.display();
	}

	input2parms(amplitude, spectrum, waveform, x) {
		this.dim = (amplitude + .5) * C;
		this.color[0] = map(max(spectrum), 100, 500, 0, 360);
	}

	update() {
		this.tetha += this.speed;

		this.circles[0].x = map(Math.cos(this.tetha), -1, 1, this.distance * (-1), this.distance);
		this.circles[0].y = map(Math.sin(this.tetha), -1, 1, this.distance * (-1), this.distance);

		this.circles[1].x = map(Math.sin(this.tetha + 2 * PI / 3), -1, 1, this.distance * (-1), this.distance);
		this.circles[1].y = map(Math.cos(this.tetha + 2 * PI / 3), -1, 1, this.distance * (-1), this.distance);

		this.circles[2].x = map(Math.cos(this.tetha + 4 * PI / 3), -1, 1, this.distance * (-1), this.distance);
		this.circles[2].y = map(Math.sin(this.tetha + 4 * PI / 3), -1, 1, this.distance * (-1), this.distance);

		this.color[2] = map(Math.sin(this.tetha), -1, 1, 60, 90);
	}

	display() {
		background(12, this.alpha);
		stroke(this.color);
		this.drawCircle(this.pos.x, this.pos.y, this.dim);
	}

	drawCircle(x, y, r) {
		circle(x, y, r);
		const n = 1 / this.circles.length;
		if (r > 5) {
			this.drawCircle(x + this.circles[0].x, y + this.circles[0].y, r * n);
			this.drawCircle(x + this.circles[1].x, y + this.circles[1].y, r * n);
			this.drawCircle(x + this.circles[2].x, y + this.circles[2].y, r * n);
		}
	}

}