class Solid {

/*  ┌──────────────────────────────────────────────────┐
	│                    Constructor                   │
	└──────────────────────────────────────────────────┘ */

	constructor() {

		this.name = "Platonic Solid";

		this.color = [0, 80, 70];

		this.posX = 100;
		this.posY = 100;
		this.size = 200;

		this.cg = 40;
		this.cd = 1;
	}



/*  ┌──────────────────────────────────────────────────┐
	│                      Setters                     │
	└──────────────────────────────────────────────────┘ */

	setSize(s) {
		this.size = s;
	}

	setPosition(pX, pY) {
		this.posX = pX;
		this.posY = pY;
	}

	setColorHue(c) {
		this.color[0] = c;
	}

	setXXX(v) {
		this.XXX = map(v, 0, 127, 100, 1000);
	}



/*  ┌──────────────────────────────────────────────────┐
	│                  Mètodes comuns                  │
	└──────────────────────────────────────────────────┘ */

	setValues(a) {
		//...
	}

	update() {
		this.color[1] += this.cd;
		if (this.color[1] >= 100 || this.color[1] <= 100-this.cg) this.cd *= -1;
	}

	display() {
		angleMode(RADIANS);
		colorMode(HSL);
		noFill();
		stroke(this.color[0], this.color[1], this.color[2]);
		if (MODE_DEBUG) {stroke("#ff00ff40"); strokeWeight(4);}
		if (MODE_DEBUG) ellipse(this.posX, this.posY, this.size, this.size);
		const points = this.getPoints();
		this.resetGradienColor();
		this.drawLines(points);
	}



/*  ┌──────────────────────────────────────────────────┐
	│                  Mètodes suport                  │
	└──────────────────────────────────────────────────┘ */

	resetGradienColor() {
		this.li = this.color[2];
	}

	updateGradienColor(stepSize) {
		this.li = (this.li + stepSize) % 100;
		stroke(this.color[0], this.color[1], this.li);
	}



/*  ┌──────────────────────────────────────────────────┐
	│             Mètodes personalitzables             │
	└──────────────────────────────────────────────────┘ */

	getPoints() {
		let res = {};
		for (let i = 0; i < 6; i++) {
			const a = TAU / 6 * i + HALF_PI;
			res[i] = {};
			res[i]['x'] = this.size * cos(a) * 0.5 + this.posX;
			res[i]['y'] = this.size * sin(a) * 0.5 + this.posY;        
		}
		if (MODE_DEBUG) {stroke("#ffff00"); strokeWeight(10); Object.keys(res).forEach(p => {let P = res[p]; point(P['x'], P['y']);});}
		return res;
	}

	drawLines(points) {
		if (MODE_DEBUG) {stroke("#00ffff40"); strokeWeight(4); }
		for (let i = 0; i < 6; i++) {
			const p1 = points[i];
			const p2 = i == 5 ? points[0] : points[i+1];
			line( p1['x'], p1['y'], p2['x'], p2['y'] );
		}
	}

}