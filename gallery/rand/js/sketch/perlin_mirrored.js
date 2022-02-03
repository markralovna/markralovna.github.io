// http://127.0.0.1:5500/gallery/rand/?base_color_hue=180&num_paths=50&num_mirror=6&noise_scale=50

const args = [
	{ key: "base_color_hue", min: 60, max: 300 },
	{ key: "num_paths", min: .01 * window.innerWidth, max: .1 * window.innerWidth },
	{ key: "num_mirror", min: 6, max: 64 },
	{ key: "noise_scale", min: 50, max: 500 } 
];
const values = readParms( args );

const BACKGROUND_COLOR = 12;

const perlinPaths = [ ];

function setup() {
	createCanvas( window.innerWidth, window.innerHeight );
	noLoop( ); 
	colorMode( HSL );
	angleMode( RADIANS );
	noFill( );
	initPerlinPaths( values['num_paths'] );
}

function draw() {
	translate( width * .5, height * .5 );
	background( BACKGROUND_COLOR );
	drawPerlinPaths( values['num_mirror'] );
}

function initPerlinPaths( n ) {
	for ( let i = 0; i < n; i++ ) perlinPaths.push( new PerlinPath( ) );
}

function drawPerlinPaths( symatries ) {
	drawSymmetrically( symatries, ev => {
		perlinPaths.forEach( h => h.display() );
	} );
}

function getNoiseColorShadow( colorHue ) {
	return [
		colorHue + random( -60, 60 ),
		random( 65, 95 ),
		random( 65, 95 ) 
	];
}

function drawSymmetrically( symatries, drawFunction ) {
	const da = TAU / symatries;
	for ( let a = 0; a <= TAU; a += da ) {
		push( );
		rotate( a );
		drawFunction();
		pop();
	}
}

class PerlinPath {
	// This algorithms borrow heavily from https://wangyasai.github.io/Perlin-Noise/
	constructor ( ) {
		this.pos = createVector( random( 0, width * .3 ), random( 0, height * .3 ) );
		this.color = getNoiseColorShadow( values['base_color_hue'] );
		this.speed = random( 1, 5 );
		this.length = random( .1, .4 ) * height;
		this.size = random( 1, 3 );
	}
	display () {
		stroke( this.color );
		strokeWeight( this.size );
		this.current_pos = this.pos.copy();
		for ( let i = 0; i < this.length; i++ ) this.draw( );
	}
	draw ( ) {
		const a = noise( this.current_pos.x/values['noise_scale'], this.current_pos.y/values['noise_scale'] ) * TAU;
		this.current_pos.x += cos(a) * this.speed;
		this.current_pos.y += sin(a) * this.speed;
		point( this.current_pos.x, this.current_pos.y );
	}
}
