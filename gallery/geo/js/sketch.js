const MODE = 'web';
const MODE_DEBUG = false;

var dataGetter;
var animations = [];
var CANVAS_WIDTH, CANVAS_HEIGHT;

function setup() {
	CANVAS_WIDTH = window.innerWidth;
	CANVAS_HEIGHT = window.innerHeight;
	
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	frameRate(MODE_DEBUG ? 1 : 12);

	animations.push(new TorusFlower(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5));			// 0
	animations.push(new Star(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5));					// 1
	animations.push(new GoldenSpiral(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5));			// 2
	//animations.push(new Lauburo(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5));			// 3
	animations.push(new FlowerLife(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5));			// 4
	animations.push(new Moon(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5));					// 5
	animations.push(new Ones(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5));					// 6
	animations.push(new PolygonalSpiral(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5));		// 7
	animations.push(new YinYang(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5));				// 8
	animations.push(new Snowflake(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5));			// 9
	animations.push(new RecursiveTree(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5));		// 10
	animations.push(new SierpinskiCarpet(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5));		// 11

	dataGetter = new WebDataGetter(animations, 1);
	color = new StyleNColor(12, 6, 80, 70, 1);
}

function draw() {
	var data = dataGetter.getSlideValues();
	
	var selectedAnimation = animations[dataGetter.getCurrentAnimation()];

	color.refresh();
	selectedAnimation.setValues(data);
	//selectedAnimation.update();
	selectedAnimation.display();
}