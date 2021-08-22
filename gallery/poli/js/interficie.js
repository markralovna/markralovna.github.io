window.MODE_DEBUG = false;

window.onload = function() {
	window.loadSolid('./models/icosahedron.glb');
};

function toggleSelectedSolid( newSolid ) {
	const p = './models/' + newSolid + '.glb';
	window.scene.remove(window.solid);
	window.loadSolid(p);
}