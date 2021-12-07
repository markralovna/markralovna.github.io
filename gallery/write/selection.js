// http://127.0.0.1:5500/gallery/write/?t=ipsum

var selectedText;
const textFolderName = new URL( window.location.href ).searchParams.get("t");

loadFile( "info.json", resp => {
	selectedText = JSON.parse( resp );
	appendAnimationScripts ( );
} );
loadFile( "style.css", resp => {
	document.getElementById( 'text-custom-css' ).innerHTML = resp;
} );
loadFile( "logic.js",  resp => {
	document.getElementById( 'text-custom-js' ).innerHTML  = resp;
} );
loadFile( "content.html", resp => {
	document.getElementById('text').innerHTML = resp;
	selectedText['pages'] = document.querySelectorAll( "#text > div.page" );
	displayPage( 0 );
} );

function loadFile(fileName, callback) {
	const textFilePath = `./texts/${textFolderName}/${fileName}`;
	ajax( textFilePath,  resp => {
		callback( resp );
	} );
}

function ajax(path, callback) {
	const a = new XMLHttpRequest();
	a.overrideMimeType( "application/json" );
	a.open( "GET", path, true );
	a.onreadystatechange = function() {
		if ( a.readyState === 4 && a.status == "200" )
			callback( a.responseText );
		if ( a.readyState === 4 && a.status == "404" )
			display404Error(404);
	}
	a.send(null);
}

function displayPage ( pageInx ) {
	const className = "shown";
	const e = document.querySelector( "#text > div.page.shown" );
	if (e) e.classList.remove( className );
	selectedText['pages'][pageInx].classList.add( className );
}

function display404Error ( ) {
	document.getElementById('text').innerHTML = "<h1>404</h1>";
}

function appendAnimationScripts ( ) {
	selectedText.animations.forEach(animationName => {
		const path = `./animations/${animationName}.js`;
		document.head.appendChild( createScriptEl ( path ) );
	});
}

function createScriptEl ( scriptSrc ) {
	const el = document.createElement( "SCRIPT" );
	el.src = scriptSrc;
	return el;
}

function injectCss ( code ) {
	document.getElementById( 'text-custom-css' ).innerHTML += code;
}





setTimeout( initAnims, 500 );

function initAnims () {
	selectedText.animations.forEach( animationName => {
		eval(`new ${animationName}()`);
	} );
}
