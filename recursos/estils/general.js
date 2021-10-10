window.onload = function() {
	createCaptionsImage();
	addScriptToEnd( "https://viewer.diagrams.net/js/viewer-static.min.js" );
}

function createCaptionsImage() {
	document.querySelectorAll( 'img' ).forEach( imgElement => {
		const captionElement = document.createElement( 'CITE' );
		captionElement.innerText = imgElement.alt;
		appendElementAfterElement(captionElement, imgElement);
	} );
}

function appendElementAfterElement(newNode, referenceNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function addScriptToEnd( scriptRoute ) {
	const bodyLastEl = document.querySelector( 'body > *:last-child' );
	const el = document.createElement( 'SCRIPT' );
	el.src = scriptRoute;
	el.async = true;
	appendElementAfterElement(el, bodyLastEl);
}
