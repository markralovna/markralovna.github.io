import { GLTFLoader } from '../lib/GLTFLoader.js';
import { OrbitControls } from '../lib/OrbitControls.js';



const scene = new THREE.Scene();
window.scene = scene;
const camera = new THREE.PerspectiveCamera( 2, 1, 1, 1000 );



camera.position.z = 5;



const renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0x1F1F1F );
renderer.setSize( 600, 600 );
document.getElementById( "wrapper" ).appendChild( renderer.domElement );



const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( 0, 20, 100 );
controls.update();



const loader = new GLTFLoader();
window.lineBasicMaterial = new THREE.LineBasicMaterial( {
	color: 0xffffff,
	linewidth: 3,
	needsUpdate: true,
	linecap: 'round',
	linejoin: 'round'
} );



window.loadSolid = filePath => {
	loader.load( filePath, gltf => {
		const solid = gltf.scene;
		solid.traverse( (o) => {
			if (o.isMesh) {
				const edges = new THREE.EdgesGeometry( o.geometry );
				window.line = new THREE.LineSegments( edges, lineBasicMaterial );
				scene.add( line );
			}
		} ) ;
	}, xhr => {
		// console.log( ( filePath + ' ' + xhr.loaded / xhr.total * 100 ) + '% loaded' );
	}, error => {
		// console.log( 'An error happened' );
	} );
}



function animate() {
	requestAnimationFrame( animate );
		controls.update();
		renderer.render( scene, camera );
	}
	animate();



if ( window.MODE_DEBUG )
	scene.add( new THREE.AxesHelper( 50 ) );






solids.cube.initView = [ 39.177, 38.133, 39.177 ];
solids.tetrahedron.initView = [ 0, 200/3, 0 ];
solids.octahedron.initView = [ 100/3, 100/3, 100/3 ];
solids.icosahedron.initView = [ 0, 63.025, 31.512 ];

window.setCameraToSolid = function ( newSolid ) {
	const v = solids[newSolid].initView;
	camera.position.set( v[0], v[1], v[2] );
}
