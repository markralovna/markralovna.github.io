// // This sketch borrows heavily from the tutorials by https://github.com/processing/p5.js-sound

const AUDIO_SOURCE_MIC = 1024; const AUDIO_SOURCE_FILE = 1025; const AUDIO_SOURCE_OSC = 1026;

const MODE_DEBUG = false;

const anims = [];
const music = [];

let anim, C, input;
let inpAmp, inpFFT;

var selectedAnim = 0;
var musicIndex = 0;
var audioPaused = false;
var audioSource = AUDIO_SOURCE_FILE;





function preload() {
	music.push( loadSound('music/lsd-genius.m4a') );
	music.push( loadSound('music/farbro-tectonic.wav') );
}


function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	C = Math.max(window.innerWidth, window.innerHeight) * .5;
	frameRate(MODE_DEBUG ? 1 : 24);

	loadAnims();
	anims[selectedAnim].setup();

	setAudioInput(audioSource);
	loadAnalysers();
}


function draw() {
	const a = inpAmp.getLevel();
	const s = inpFFT.analyze();
	const w = inpFFT.waveform(1024, 'float32');
	if ( MODE_DEBUG ) console.log('Amplitude: ' + a, 'Spectrum: ' + s, 'Waveform: ' + w);
	anims[selectedAnim].input2parms(a, s, w, 0);
	anims[selectedAnim].draw();
}





function loadAnims() {
	anims.push( new Xavi() );
	anims.push( new XaRia() );
	anims.push( new Wheel() );
	selectedAnim = anims.length - 1;
}

function loadAnalysers() {
	const binCount = 32;
	const smoothing = .6;
	inpAmp = new p5.Amplitude();
	inpAmp.setInput(input);
	inpAmp.smooth(smoothing);
	inpFFT = new p5.FFT(smoothing, binCount);
	inpFFT.setInput(input);
}

function keyPressed() {
	switch (keyCode) {
		case 84:	toggleInput();		break;	// Letter T
		case 32:	pauseAudio();		break;	// Space
		case 77:	toggleMusic();		break;	// Letter M
		case 65:	toggleAnimation();	break;	// Letter A
	}
}

function setAudioInput(source) {
	switch (source) {
		case AUDIO_SOURCE_FILE:
			input = music[musicIndex];
			input.loop();
			break;
		case AUDIO_SOURCE_MIC:
			input = new p5.AudioIn();
			input.start();
			break;
		case AUDIO_SOURCE_OSC:
			input = new p5.Oscillator();
			input.setType('sine'); // sine;  triangle;  square;  sawtooth
			input.start();
			input.amp(0.5);
			input.freq(10);
			break;
	}
}





function toggleInput() {
	audioSource++;
	input.stop();
	if (audioSource > AUDIO_SOURCE_OSC) audioSource = AUDIO_SOURCE_MIC;
	setAudioInput(audioSource);
	loadAnalysers();
}

function pauseAudio() {
	if (audioSource == AUDIO_SOURCE_FILE) {
		if (audioPaused) input.play();
		else input.pause();
		audioPaused = !audioPaused;
		document.getElementById('pauseBtn').innerText = audioPaused ? 'Play' : 'Pause';
	}
}

function toggleMusic() {
	if (audioSource == AUDIO_SOURCE_FILE) {
		input.stop();
		musicIndex = (musicIndex + 1) % music.length;
		input = music[musicIndex];
		input.loop();
		loadAnalysers();
		if (audioPaused) input.pause();
	}
}

function toggleAnimation() {
	selectedAnim++;
	if (selectedAnim >= anims.length) selectedAnim = 0;
	anims[selectedAnim].setup();
}
