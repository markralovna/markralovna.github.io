window.MODE_DEBUG = false;

function toggleSelectedSolid( newSolid ) {
	const p = '../poli/models/' + newSolid + '.glb';
	window.scene.remove(window.solid);
	window.setCameraToSolid(newSolid);
	window.loadSolid(p);
}