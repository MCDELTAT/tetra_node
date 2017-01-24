var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);
//import grid from '../../public/textures.pps.png';

var scene, camera, controls, renderer;
var geometry, material, mesh;

exports.init = function() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 1000);
  camera.position.z = 1000;

  geometry = new THREE.BoxGeometry( 50, 50, 50 );

  //the grids for each of the cube faces. Three have opacity=1 to hide them.
  var materials = [
    new THREE.MeshBasicMaterial({ //right
      map: THREE.ImageUtils.loadTexture('textures/pps.png'),
      transparent: true,
      side: THREE.DoubleSide,
      opacity: 0
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('textures/pps.png'),
      transparent: false,
      side: THREE.DoubleSide,
      opacity: 1
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('textures/pps.png'),
      transparent: true,
      side: THREE.DoubleSide,
      opacity: 0
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('textures/pps.png'),
      transparent: false,
      side: THREE.DoubleSide,
      opacity: 1
    }),
    new THREE.MeshBasicMaterial({ //left
      //map: THREE.ImageUtils.loadTexture('textures/pps.png'),
      transparent: true,
      side: THREE.DoubleSide,
      opacity: 0
    }),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('textures/pps.png'),
      transparent: false,
      side: THREE.DoubleSide,
      opacity: 1
    })
  ];

  var graph = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
  scene.add( graph );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  var div = document.getElementById("threeContainer");
  div.appendChild( renderer.domElement );

  camera.position.z = 110.5;
  camera.position.x = 110.5;
  camera.rotation.y = 0.529269912; //PI/8
  
  controls = new OrbitControls(camera);
  controls.addEventListener( 'change', exports.render );
}

//THREE JS internal function to request the delta changes to frame and render.
exports.render = function() {
	renderer.render( scene, camera );
	//camera.position.y += .001;
}

exports.animate = function() {
  requestAnimationFrame( exports.animate );

  renderer.render( scene, camera );
}
