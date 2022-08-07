var speech, inEl, outEl;

window.addEventListener( "load", initApp );

function initApp() {
	initEls( );
	initSpeech( );
	initGestures( );
}

function initEls() {
	inEl = document.getElementById( "image" );
	outEl = document.getElementById( "answer" );
}

function initSpeech() {
	speech = new SpeechSynthesisUtterance();
	speech.lang = 'ca';
	speech.onend = unroll;
}

function initGestures() {
	// window.addEventListener( 'devicemotion', handleShake );
	const c = new URL( window.location.href ).searchParams.get( "c" );
	const crookedMode = ( c != null && c != '0' && c != 'f' && c != 'false' );
	if ( crookedMode ) window.addEventListener( 'click', handleCrookedClick );
	else  inEl.addEventListener( "click", roll );
}

function handleShake( ev ) {
	const t = 25;
	if ( ev.acceleration.x > t || ev.acceleration.y > t || ev.acceleration.z > t )
		roll( ev );
}

function handleCrookedClick( ev ) {
	var v = null;
	if ( ev.clientY > window.innerHeight * .5 ) {
		var v = "m";
		if ( ev.clientX < window.innerWidth * .33 ) v = 's';
		if ( ev.clientX > window.innerWidth * .66 ) v = 'n';
	}
	roll( ev, v );
}

function roll( ev, v = null ) {
	const availableAnswers = ( v == null ) ? answers : answers.filter( a => a.v == v );
	const ans = selectRandomAnswer( availableAnswers );
	displayAnswer( ans );
}

function selectRandomAnswer( list ) {
	const c = list.length
	const a = parseInt( Math.random( ) * c );
	return list[ a ].t;
}

function displayAnswer( msg ) {
	outEl.innerText = msg;
	speech.text = msg;
	window.speechSynthesis.speak( speech );
	inEl.classList.add( "answering" );
}

function unroll( ev ) {
	inEl.classList.remove( "answering" );
}
