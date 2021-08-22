class StyleNColor {

	constructor(bg, sw, defSat, defBright, speed) {

		this.backGroundColor = bg;
		this.strokeWeight = sw;
		this.defaultSaturation = defSat;
		this.defaultBrightness = defBright;
		this.speed = speed;

		this.currentHue = 0;

		noFill();
		colorMode(HSL);
		
		this.refresh();

	}

	update() {
		this.currentHue += this.speed;
		if (this.currentHue > 360) this.currentHue = 0;
	}

	refresh() {
		this.update();
		strokeWeight(this.strokeWeight);
		background(this.backGroundColor);
		stroke(this.currentHue, this.defaultSaturation, this.defaultBrightness);
	}
}