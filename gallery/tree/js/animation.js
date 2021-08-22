class Tree {

	constructor(positionX, positionY, maxHeight, steps) {
		this.size = [positionX, positionY];

		this.vel = 3;
		this.angleBetweenBranches = 0.75;
		this.colorDiff = 20;
		this.brLenRatio = 0.5;
		this.backgroundAlpha = 0.8;

		this.maxHeight = maxHeight;
		this.steps = steps;
		this.porperSat = 80;
		this.color = [120, this.porperSat, this.porperSat];
		this.maxBrances = 7;

		this.doReset();
	}


	doGrow() {
		this.lenght += this.maxHeight/(this.steps+2);
		if(this.lenght > this.maxHeight) this.lenght = this.maxHeight;
	}

	doColorfy() {
		this.color[1] += 100/this.steps;
		if(this.color[1] > this.porperSat) this.color[1] = this.porperSat;
	}

	doMakeMoreBranhces() {
		this.numBranches += 1;
		if(this.numBranches > this.maxBrances) this.numBranches = this.maxBrances;
	}

	doReset() {
		this.lenght = this.maxHeight / (this.steps+2) * 2;
		this.color[1] = 0;
		this.numBranches = 1;
	}


	update() {
		this.color[0] += this.vel;
		if (this.color[0] > 360) this.color[0] = 0;
	}

	display() {
		colorMode(HSB);
		background(12);
		strokeWeight(5);
		
		translate(this.size[0]/2, this.size[1]);

		this.drawTree(this.lenght, this.color[0], this.numBranches);
	}


	drawTree(l, hue, branches) {
		stroke(hue, this.color[1], this.color[2]);

		line(0, 0, 0, -l);
		translate(0, -l);

		var c = hue - this.colorDiff;
		if (c < 0) c += 360;

		var angle = (branches -1) * this.angleBetweenBranches * -0.5;

		for (let b = 0; b < branches; b++) {
			push();
			rotate(angle);
			if (branches > 1)
				this.drawTree(l * this.brLenRatio, c, branches-1);
			pop();
			angle += this.angleBetweenBranches;
		}
	}
}