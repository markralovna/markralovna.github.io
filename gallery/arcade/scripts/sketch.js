const MODE_DEBUG = true;

const colors = {
	y: [45,  80, 25, .8],
	c: [180, 80, 25, .8],
	m: [315, 80, 25, .8]
};

const games = [];
var selectedGame;

function setup() {
	const p = document.getElementById('gameScreen');
	const s = ( p.offsetWidth < p.offsetHeight ? p.offsetWidth : p.offsetHeight );
	createCanvas(s, s).parent('gameScreen');

	frameRate( 24 );

	colorMode(HSL);

	games.push( new SnakeGame() ); // 127.0.0.1:5500/gallery/arcade/index.html?g=0
	games.push( new MinesWeeper() ); // 127.0.0.1:5500/gallery/arcade/index.html?g=1
}

function draw() {
	clearCanvas();
	selectedGame.draw();
}

function clearCanvas() {
	background(12);
}

function showModal(title, text, buttonText, buttonCallback ) {
	const el = document.getElementById('dialog');
	el.classList.add('shown');
	document.getElementById('dialog-title').innerText = title;
	document.getElementById('dialog-text').innerText = text;
	const btn = document.getElementById('dialog-btn');
	btn.innerText = buttonText;



	btn.addEventListener('click', function() {
		el.classList.remove('shown');
		buttonCallback();
	});





}
