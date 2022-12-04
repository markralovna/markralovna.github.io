// https://seedcode.com/SpirographN/sgn.html

const TAU = Math.PI * 2;

export default class Spirograph {
	constructor( dom ) {
		// console.log( "constructor `Spirograph`" );
		this.canvas = dom;
		this.ctx = dom.getContext('2d');
		this.x = dom.width * .5;
		this.y = dom.height * .5;
		this.aaa( ); // ToDo 
	}
	draw( ) {
		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		this.stator.draw();
	}
	aaa( ) {
		this.stator = new Gear( this, 150 );
		this.stator.appendRotor( 60 );
	}
}
class Gear {
	constructor( stator, radius ) {
		// console.log( "constructor `Gear`" );
		this.stator = stator;
		this.f = 0;
		this.rotors = [];
		this.speed = .1; // ToDo
		this.radius = radius;
	}
	draw( ) {
		// console.log( "method `Gear.draw`" );
		this.update();
		this.display();
		this.rotors.forEach( r => r.draw() );
	}
	update( ) {
		this.f += this.speed;
	}
	display( ) {
		const c = this.ctx;
		c.beginPath();
		c.ellipse( this.x, this.y, this.radius, this.radius, 0, 0, TAU );
		c.stroke();
	}
	appendRotor( rotorRadius ) {
		const rotor = new Gear( this, rotorRadius );
		this.rotors.push( rotor );
	}
	get ctx() {
		return this.stator.ctx;
	}
	get x() {
		if ( this.stator.radius == null ) return this.stator.x;
		return this.stator.x + Math.cos( this.stator.f ) * ( this.stator.radius - this.radius );
	}
	get y() {
		if ( this.stator.radius == null ) return this.stator.y;
		return this.stator.y + Math.sin( this.stator.f ) * ( this.stator.radius - this.radius );
	}
}
