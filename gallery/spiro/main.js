import Spirograph from './Spirograph.js';

// console.log( "script `./main.js` loaded" );

window.addEventListener( "load", initSpirograph );

function initSpirograph () {
	// console.log( "function `initSpirograph` loaded" );
	const c = document.getElementById( "draw" );
	const s = new Spirograph( c );
	setInterval( e => { s.draw( ) }, 25 );
}
