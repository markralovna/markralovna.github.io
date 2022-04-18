window.addEventListener( "load", loadMenu );
window.addEventListener( "load", openDefaultArtwork );

function openDefaultArtwork() {
	const s = new URL( window.location.href ).searchParams.get( "s" );
	openArtwork( s ? s : Object.keys(artworks)[0] );
}

function loadMenu() {
	const el = e( "menu" );
	Object.keys( artworks ).forEach( key => {
		el.appendChild( createMenuItem( key, artworks[key].title ) );
	} );
}

function createMenuItem( artworkKey, artworkTitle ) {
	const el = document.createElement( "LI" );
	el.innerText = artworkTitle;
	el.onclick = ev => openArtwork( artworkKey );
	return el;
}

function openArtwork( artworkKey ) {
	const artwork = artworks[artworkKey];
	e( "info-title" ).innerText = artwork.title;
	e( "info-date" ).innerText = d( artwork.date );
	e( "info-info" ).innerHTML = artwork.info;
	// e( "info-info" ).innerHTML = "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ad sint, porro voluptas adipisci doloribus <strong>pariatur fugiat ullam</strong> quas iure cupiditate dolore quis, vitae, numquam voluptatum. Molestiae sed, ad velit nostrum nemo <code>aspernatur</code> sint <code>consectetur</code>, labore laboriosam accusantium veritatis id accusamus, dolorum <strong>dolore illum</strong> commodi?2</p><p>Eligendi velit culpa enim quidem? Nisi adipisci nulla illum! Dolores, atque aliquid voluptatem facere <em>molestiae</em> harum qui?</p>";
	loadArtworkControls( artwork, artworkKey );
	setArtworkLink( artworkKey );
}

function e( idDomElement ) {
	return document.getElementById( idDomElement );
}

function loadArtworkControls( artwork, artworkKey ) {
	const cont = e( "info-controls" );
	cont.innerHTML = "";
	artwork.parms.forEach( parm => {
		cont.appendChild( createParmInput( parm, artworkKey ) );
	} );
}

function createParmInput( parm, artworkKey ) {
	const inp = document.createElement( "INPUT" );
	inp.type = "range";
	inp.min = parm.min;
	inp.max = parm.max;
	inp.value = random( parm.min, parm.max );
	inp.onchange = ev => { updateArtworkArgs( artworkKey ) };
	inp.classList.add( "artwork-arg-input" );
	inp.setAttribute( "arg-key", parm.key );
	const lab = document.createElement( "LABEL" );
	lab.innerText = key2label( parm.key );
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
	return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
}

function setArtworkLink( artworkKey, argsQuery = "" ) {
	e( "artwork" ).src = `./s/${artworkKey}.html?${argsQuery}`;
	e( "info-link" ).href = `./s/${artworkKey}.html?${argsQuery}`;
}

function key2label( key ) {
	var label = "";
	label = key.split('_').join(' ');
	label = key[0].toUpperCase() + label.substring(1);
	return label;
}

function updateArtworkArgs( artworkKey ) {
	var argsQuery = "a=0&";
	const els = document.querySelectorAll( ".artwork-arg-input" );
	els.forEach( el => {
		const k = el.getAttribute( "arg-key" );
		const v = el.value;
		argsQuery += `${k}=${v}&`;
	});
	setArtworkLink( artworkKey, argsQuery );
}
