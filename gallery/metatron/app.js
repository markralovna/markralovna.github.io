window.MODE_DEBUG = false;

window.addEventListener( 'load', initButtons );
window.addEventListener( 'load', insertCssColorvars );

function initButtons ( ) {
	const cont = document.getElementById("buttonRow");
	Object.keys(solids).forEach(s => {
		const solid = solids[s];
		buttonEl = document.createElement("button");
		buttonEl.innerText = solid.name;
		buttonEl.classList.add( `solid-${s}` );
		// buttonEl.addEventListener( 'click', ev => { toggleSvgSolid( s ); } );
		buttonEl.addEventListener( 'click', ev => { toggleThreeSolid( s ); } );
		cont.appendChild( buttonEl );
	});
}

function toggleSvgSolid ( solidName ) {
	const cont = drawElement.getElementById( "draw-solid" );
	while (cont.lastChild)
		cont.removeChild(cont.lastChild);
	cont.appendChild( drawSolid( solidName ) )
}

function toggleThreeSolid( newSolid ) {
	const p = `./models/${newSolid}.glb`;
	window.scene.remove(window.line);
	window.setCameraToSolid(newSolid);
	window.loadSolid(p);
	window.lineBasicMaterial.color = new THREE.Color( `hsl(${solids[newSolid].colorHue}, 80%, 60%)` );
}

function insertCssColorvars ( ) {
	const sheet = document.querySelector( "style" ).sheet;
	Object.keys(solids).forEach(s => {
		sheet.insertRule( `.solid-${s} { --solid-color: ${solids[s].colorHue} }`, 0 );
	});
}
