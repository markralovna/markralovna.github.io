class MiDiDataGetter {

	constructor() {
		this.inputs = [];
		this.currentAnimation = 0;
		//...
	}

	getSlideValues() {
		//..
	}
	
	getCurrentAnimation() {
		return this.currentAnimation;
	}

}














/*var flower, circles;
var mask;
var CANVAS_WIDTH, CANVAS_HEIGHT;

var inputMidi;
var loopSound;

let so1,so2;
var beat1,beat2;
var beat1Pat = [1,0,0,2,0,2,0,0];
var beat2Pat = [0,1,1,0,2,0,1,0];

var slider_1 = 0;
var slider_2 = 1;
var slider_3 = 2;
var knob_1 = 16;
var knob_2 = 17;
var button_1 = 32;

//variables imatge i so
var s1v = 20;
var s2v = 50;
var s3v = 70;
var s4v = 30;
var s5v = 60;


var activeSketch;
const sketches = {
	FLOWER: 2,
	CIRCLES: 1,
	BOTH: 0
}

function preload(){
	loopSound = loadSound('./sons/loop.mp3');
	beat1 =loadSound('./sons/beat1.mp3');
	beat2 =loadSound('./sons/beat2.mp3');
}


function setup() {
	CANVAS_WIDTH = screen.width;
	CANVAS_HEIGHT = screen.height;

	frameRate(24);

	imageMode(CENTER);
	mask = loadImage('./mascara.png');
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

	setSketch(sketches.CIRCLES);

	so1 = new p5.Oscillator('sawtooth'); //tipus -> 'sine' (default), 'triangle', 'sawtooth', 'square' 
	so2 = new p5.Oscillator('square');

	let beat1Phrase = new p5.Phrase('beat1', playBeat1, beat1Pat);
	let beat2Phrase = new p5.Phrase('beat2', playBeat2, beat2Pat);
	myPart = new p5.Part();
	myPart.addPhrase(beat1Phrase);
	myPart.addPhrase(beat2Phrase);
	myPart.setBPM(60);
	masterVolume(0.5);

	myPart.start();
	myPart.loop();

}


function draw() {
	inputMidi = p5.midi.onInput();

	if(inputMidi != null){
		console.log(inputMidi.data);
	
		if(inputMidi.data[1] == slider_1)
			s1v = map(inputMidi.data[2],0,127,0,100);
		if(inputMidi.data[1] == slider_2)
			s2v = map(inputMidi.data[2],0,127,0,100);
		if(inputMidi.data[1] == slider_3)
			s3v = map(inputMidi.data[2],0,127,0,100);
		if(inputMidi.data[1] == knob_1)
			s4v = map(inputMidi.data[2],0,127,0,100);
		if(inputMidi.data[1] == knob_2)
			s5v = map(inputMidi.data[2],0,127,0,100);    
		if(inputMidi.data[1] == button_1 && inputMidi.data[2]==127)
			setSketch((activeSketch+1)%3);
	}


	switch (activeSketch) {
		case sketches.BOTH:
		case sketches.FLOWER:
			flower.setRadius(map(s1v, 0, 100, 100, 1000));
			flower.setNumChildren(map(s2v, 0, 100, 3, 30));
			flower.setHueColor1(map(s3v, 0, 100, 0, 360));
			flower.setHueColor2(map(s4v, 0, 100, 0, 360));
			flower.setVelocity(map(s5v, 0, 100, 0, 1));

			flower.update();
			flower.display();

			if (activeSketch != sketches.BOTH) break;

		case sketches.CIRCLES:
			circles.setRadius(map(s1v, 0, 100, 25, 280));
			circles.setDistance(map(s2v, 0, 100, 10, 200));
			circles.setColor(map(s3v, 0, 100, 0, 360));
			circles.setVel(map(s4v, 0, 100, 0.05, 0.5));
			circles.setAlpha(map(s5v, 0, 100, 0, 1));
	
			circles.update();
			circles.display();

			break;
	}
	
	so1.freq(midiToFreq(map(s1v, 0, 100, 0, 127)));
	so2.freq(midiToFreq(map(s2v, 0, 100, 0, 127)));

	myPart.setBPM(map(s4v,0,100,25,150));


	image(mask, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_HEIGHT * 3, CANVAS_HEIGHT);
}



function setSketch(sketch) {
	activeSketch = sketch;
	if (sketch == sketches.FLOWER)
		flower = new FlowerSphere(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5);
	else if (sketch == sketches.CIRCLES)
		circles = new CircleFractals(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5);
}

function playBeat1(time, playbackRate) {
	beat1.rate(playbackRate);
	beat1.play(time);
  }
  
  function playBeat2(time, playbackRate) {
	beat2.rate(playbackRate);
	beat2.play(time);
  }

  function setRate(playbackRate){
	  beat1.rate(playbackRate)
  }
  
  function mouseClicked() {
	var context = new AudioContext();
	context.resume()
	console.log('Playback resumed successfully');
	
	so1.start();
	so2.start();
	// prevent default
	return false;
  }*/