window.onload = function() {
	const appEl = document.getElementById('app');
	appEl.addEventListener( 'wheel', wheelHandler );
	appEl.addEventListener( 'touchmove', touchHandler );
}

function disableDefaultCallback ( ev ) {
	ev.preventDefault();
}

function wheelHandler ( ev ) {
	if ( enabledPassPageListeners ) {
		const inc = ( ev.deltaY > 0 ? 1 : -1 );
		passPage( inc );
		disablePassPageListeners ( );
	}
}

var lastTouchY = 0;
function touchHandler ( ev ) {
	const threshold = 10;
	const current = ev.touches[0];
	const inc = ( ( current.clientY - lastTouchY.clientY ) > threshold ? 1 : -1 );
	passPage( inc );
	lastTouchY = current;
}

var currentPage = 0;
function passPage ( inc ) {
	currentPage = ( currentPage + inc ) % selectedText.pages.length;
	if ( currentPage < 0 ) currentPage = selectedText.pages.length + currentPage;
	displayPage( currentPage );
}

var enabledPassPageListeners = true;
function disablePassPageListeners ( ) {
	enabledPassPageListeners = false;
	setTimeout( ev => {
		enabledPassPageListeners = true;
	}, 500 );
}

function displayPage ( pageInx ) {
	updateDomText( selectedText.pages[pageInx] );
}
