function readParms( args ) {
	const values = { };
	const urlParams = new URLSearchParams( window.location.href );
	args.forEach( arg => {
		const v = urlParams.get( arg.key );
		values[arg.key] = v != null ? parseInt(v) : Math.random( ) * ( arg.max - arg.min ) + arg.min;
	});
	return values;
}

function getCurrentArtworkId( ) {
	const url = window.location.href;
	const a = url.split('/');
	const b = a[ a.length - 1 ];
	const c = b.split('.')[0];
	return c;
}

function getCurrentArtworkData( ) {
	const key = getCurrentArtworkId( );
	return artworks[key];
}

const artworkData = getCurrentArtworkData();
const values = readParms( artworkData.parms );
