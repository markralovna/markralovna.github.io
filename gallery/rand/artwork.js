function readParms( args ) {
	const values = { };
	const urlParams = new URLSearchParams( window.location.href );
	args.forEach( arg => {
		const v = urlParams.get( arg.key );
		if ( v == null ) {
			values[arg.key] = Math.random( ) * ( arg.max - arg.min ) + arg.min;
			if ( arg.step == 1 ) values[arg.key] = Math.floor( values[arg.key] );
		}
		else
			values[arg.key] = parseFloat(v);
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

function a( key ) {
	return values[key];
}

const artworkData = getCurrentArtworkData();
const values = readParms( artworkData.parms );
