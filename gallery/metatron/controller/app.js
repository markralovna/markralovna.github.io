window.MODE_DEBUG = false;

window.addEventListener( 'load', initButtons );

const solids = {
	cube: {
		name: "Cube",
		points: [ [3,2],[4,2],[5,2],[0,0],[3,2],[2,2],[1,2],[0,2],[5,2],[0,0],[1,2] ]
	},
	tetrahedron: {
		name: "Tetrahedron",
		points: [ [0,2],[2,2],[4,2],[0,2],[0,0],[4,2],[2,2],[0,0] ]
	},
	octahedron: {
		name: "Octahedron",
		points: [ [0,2],[2,2],[4,2],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,2] ]
	},
	icosahedron: {
		name: "Icosahedron",
		points: [ [0,2],[2,2],[4,2],[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[0,2],[2,2],[3,1],[5,1],[1,1],[3,1] ]
	},
}

function initButtons ( ) {
	const cont = document.getElementById("buttonRow");
	Object.keys(solids).forEach(s => {
		const solid = solids[s];
		buttonEl = document.createElement("button");
		buttonEl.innerText = solid.name;
		buttonEl.classList.add( s );
		buttonEl.addEventListener( 'click', ev => { displaySolid( s ); } );
		buttonEl.addEventListener( 'click', ev => { toggleSelectedSolid( s ); } );
		cont.appendChild( buttonEl );
	});
}

function toggleSelectedSolid( newSolid ) {
	const p = './models/' + newSolid + '.glb';
	window.scene.remove(window.solid);
	window.setCameraToSolid(newSolid);
	window.loadSolid(p);
}