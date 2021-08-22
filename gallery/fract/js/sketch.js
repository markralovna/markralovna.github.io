var CANVAS_WIDTH, CANVAS_HEIGHT;
let userLayers = [];

let documentStyle = {
	background: 12,
	foreground: [0, 80, 70],
	selected: '#FF00FF',
	strokeWeight: 4
};

function setup() {
	CANVAS_WIDTH = window.innerWidth;
	CANVAS_HEIGHT = window.innerHeight;
	LONG_SIDE_CANVAS = CANVAS_WIDTH > CANVAS_HEIGHT ? CANVAS_WIDTH : CANVAS_HEIGHT;
	
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	frameRate(24);
}

function draw() {
	documentStyle['foreground'][0] = 0;
	loadStyles();
	drawMandala();
	//...
}



function loadStyles() {
	angleMode(RADIANS);
	colorMode(HSL);
	rectMode(CENTER);
	background(documentStyle['background']);
	stroke(documentStyle['foreground']);
	strokeWeight(documentStyle['strokeWeight']);
	fill(documentStyle['background']);
	translate(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5);
}

function drawMandala() {
	userLayers.forEach(c => {
		updateColor(25);
		c.update();
		c.display();
	});
}

function updateColor(step) {
	documentStyle['foreground'][0] += step;
	if (documentStyle['foreground'][0] > 360) documentStyle['foreground'][0] = 0;
		stroke(documentStyle['foreground']);
}