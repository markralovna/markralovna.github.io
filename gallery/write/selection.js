// http://127.0.0.1:5500/gallery/write/?t=ipsum

const textFileName = new URL( window.location.href ).searchParams.get("t");
const textFilePath = `./texts/${textFileName}.json`;

var selectedText;
ajax( textFilePath, resp => {
	setSelectedText( JSON.parse( resp ) );
} );

function setSelectedText( obj ) {
	selectedText = obj;
	currentPage = -1;
	updateDomText( `<h1>${obj.title}</h1>` );
	document.getElementById( 'text-custom-css' ).innerHTML = obj.customCss;
	document.getElementById( 'text-custom-js' ).innerHTML = obj.customJs;
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

function updateDomText ( newText ) {
	document.getElementById('text').innerHTML = newText;
}

function display404Error ( ) {
	updateDomText( `<h1>404</h1>` );
}
