import { GLTFLoader } from '../lib/GLTFLoader.js';
import { OrbitControls } from '../lib/OrbitControls.js';


/* ╔════════════════════════════════════════════════╗
   ║                                                ║
   ║             PREPERACIÓ DE L'ESCENA             ║
   ║                                                ║
   ╚════════════════════════════════════════════════╝ */

var scene = new THREE.Scene();
window.scene = scene;
var camera = new THREE.PerspectiveCamera( 2, 1, 1, 1000 );


/* ┌──────────────────────────────┐
   │        Renderització         │
   └──────────────────────────────┘ */

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0x1F1F1F );
renderer.setSize( 600, 600 );
document.getElementById( "wrapper" ).appendChild( renderer.domElement );


/* ┌──────────────────────────────┐
   │             Llum             │
   └──────────────────────────────┘ */

/*var directionalLight1 = new THREE.DirectionalLight( 0xFF22FF );
directionalLight1.position.set( 10, 10, 10 );
scene.add( directionalLight1 );

var directionalLight2 = new THREE.DirectionalLight( 0xFF22FF );
directionalLight2.position.set( -10, -10, -10 );
scene.add( directionalLight2 );

var directionalLight3 = new THREE.DirectionalLight( 0x22FFFF );
directionalLight3.position.set( -10, 10, 10 );
scene.add( directionalLight3 );

var directionalLight4 = new THREE.DirectionalLight( 0x22FFFF);
directionalLight4.position.set( 10, -10, -10 );
scene.add( directionalLight4 );

var directionalLight5 = new THREE.DirectionalLight( 0xFFFF22 );
directionalLight5.position.set( 0, 0, 10 );
scene.add( directionalLight5 );

var directionalLight6 = new THREE.DirectionalLight( 0xFFFF22 );
directionalLight6.position.set( 0, 0, -10 );
scene.add( directionalLight6 );*/





/* ┌──────────────────────────────┐
   │       Càmera i controls      │
   └──────────────────────────────┘ */

camera.position.z = 5;

var controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 20, 100 );
controls.update();





/* ╔════════════════════════════════════════════════╗
   ║                                                ║
   ║                CÀRREGA DEL SOLID               ║
   ║                                                ║
   ╚════════════════════════════════════════════════╝ */

var loader = new GLTFLoader();
var solidMaterial = new THREE.MeshNormalMaterial( {side: THREE.FrontSide} );//Maria

window.loadSolid = function(filePath) {
	loader.load(
		filePath,
		function ( gltf ) {
			window.solid = gltf.scene;
			scene.add( solid );
			solid.traverse((o) => {
				if (o.isMesh) o.material = solidMaterial;
			} ) ;
		},
		function ( xhr ) { console.log( ( filePath + ' ' + xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
		function ( error ) { console.log( 'An error happened' ); }
	);
}





/* ╔════════════════════════════════════════════════╗
   ║                                                ║
   ║                    ANIMACIÓ                    ║
   ║                                                ║
   ╚════════════════════════════════════════════════╝ */

function animate() {
requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}
animate();





/* ╔════════════════════════════════════════════════╗
   ║                                                ║
   ║              MATERIAL PER DEBUGAR              ║
   ║                                                ║
   ╚════════════════════════════════════════════════╝ */

/* ┌──────────────────────────────┐
   │            Línies            │
   └──────────────────────────────┘ */

if (window.MODE_DEBUG) {

	scene.add( new THREE.AxesHelper( 50 ) );

	/*scene.add( new THREE.DirectionalLightHelper( directionalLight1, 5 ) );
	scene.add( new THREE.DirectionalLightHelper( directionalLight2, 5 ) );
	scene.add( new THREE.DirectionalLightHelper( directionalLight3, 5 ) );
	scene.add( new THREE.DirectionalLightHelper( directionalLight4, 5 ) );
	scene.add( new THREE.DirectionalLightHelper( directionalLight5, 5 ) );
	scene.add( new THREE.DirectionalLightHelper( directionalLight6, 5 ) );*/

	//scene.add( new THREE.PlaneHelper( plane, 1, 0xffff00 ) );

	/*var materialLight = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var lines = [
		[new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3(  50,  50,  50 )],//   VARIABLE: directionalLight          TIPUS: llum (lila)
		[new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -50, -50, -50 )],//   VARIABLE: directionalLight2         TIPUS: llum (lila)
		[new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -50,  50,  50 )],//   VARIABLE: pointLight                TIPUS: llum (blau)
		[new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3(  50, -50, -50 )],//   VARIABLE: pointLight2               TIPUS: llum (blau)
		[new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3(   0,   0,  50 )],//   VARIABLE: pointLight3               TIPUS: llum (groc)
		[new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3(   0,   0, -50 )]//    VARIABLE: pointLight4               TIPUS: llum (groc)
	];
	lines.forEach(points => {
		var geometry = new THREE.BufferGeometry().setFromPoints( points );
		var line = new THREE.Line( geometry, materialLight );
		scene.add( line );
		renderer.render( scene, camera );
	});*/
}






solids.cube.initView = [ 39.177, 38.133, 39.177 ];
solids.tetrahedron.initView = [ 0, 200/3, 0 ];
solids.octahedron.initView = [ 100/3, 100/3, 100/3 ];
solids.icosahedron.initView = [ 0, 63.025, 31.512 ];

window.setCameraToSolid = function ( newSolid ) {
	const v = solids[newSolid].initView;
	camera.position.set( v[0], v[1], v[2] );
}
