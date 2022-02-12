window.addEventListener( "load", loadMenu );
window.addEventListener( "load", openDefaultArtwork );

function openDefaultArtwork() {
	const s = new URL( window.location.href ).searchParams.get( "s" );
	openArtwork( s ? s : Object.keys(artworks)[0] );
}

function loadMenu() {
	const el = e( "menu" );
	Object.keys( artworks ).forEach( artworkKey => {
		el.appendChild( createMenuItem( artworkKey ) );
	} );
}

function createMenuItem( artworkKey ) {
	const el = document.createElement( "LI" );
	el.innerText = artworkKey;
	el.onclick = ev => openArtwork( artworkKey );
	return el;
}

function openArtwork( artworkKey ) {
	const artwork = artworks[artworkKey];
	e( "artwork" ).src = `./s/${artworkKey}.html`;
	e( "info-title" ).innerText = artwork.title;
	e( "info-date" ).innerText = d( artwork.date );
	e( "info-info" ).innerHTML = artwork.info;
	loadArtworkControls( artwork );
	e( "info-link" ).href = `./s/${artworkKey}.html`;
}

function e( idDomElement ) {
	return document.getElementById( idDomElement );
}

function loadArtworkControls( artwork ) {
	const cont = e( "info-controls" );
	cont.innerHTML = "";
	artwork.parms.forEach( parm => {
		cont.appendChild( createParmInput( parm ) );
	} );
}

function createParmInput( parm ) {
	const inp = document.createElement( "INPUT" );
	inp.type = "range";
	inp.min = parm.min;
	inp.max = parm.max;
	inp.value = random( parm.min, parm.max );
	const lab = document.createElement( "LABEL" );
	lab.innerText = parm.key;
	const el = document.createElement( "DIV" );
	el.appendChild( lab );
	el.appendChild( inp );
	return el;
}

function random( min, max ) {
	return Math.random( ) * ( max - min ) + min;
}

function d( epoch ) {
	const d = new Date(0);
	d.setUTCSeconds( epoch );
	return `${d.getDay()}/${d.getMonth()+1}/${d.getFullYear()}`;
}
