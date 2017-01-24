var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);
var Stats = require('Stats');

var scene, camera, controls, renderer;
var geometry, material, mesh;

exports.resetCamera = function(){
  camera.position.z = 110.5;
  camera.position.x = 110.5;
  camera.rotation.y = 0.529269912; //PI/8
  controls.reset();
}

exports.scale = function(x, y, z) {
  if(x >= y && x >= z){
  	this.graph.scale.x += x;
  	this.graph.scale.y += x;
  	this.graph.scale.z += x;
  }
  else if(y >= x && y >= z){
  	this.graph.scale.x += y;
  	this.graph.scale.y += y;
  	this.graph.scale.z += y;
  }
  else if(z >= y && z >= x){
  	this.graph.scale.x += z;
  	this.graph.scale.y += z;
  	this.graph.scale.z += z;
  }
  console.log("x=:",x);
  console.log("y=:",y);
  console.log("z=:",z);
  controls.maxDistance *=x*2;
  camera.position.x *=x  ;
}

//function to generate spheres at coordinates
//three.js Objects all have an incremental id
//in this case, the spheres are id:4 onward (scene=1,cam=2,grid=3)
var sphGeometry = new THREE.SphereGeometry(0.25,32,32);
var speciesMat1 = new THREE.MeshBasicMaterial({color: 0x84dbfc});
var speciesMat2 = new THREE.MeshBasicMaterial({color: 0xfa515f});
var speciesMat3 = new THREE.MeshBasicMaterial({color: 0x6bf35c});
var speciesMaterials = [speciesMat1,speciesMat2,speciesMat3];
var pointsStartIndex = 4;
var tempObject;
function createSphere(species,xCoor,yCoor,zCoor){
	scene.add(new THREE.Mesh(sphGeometry,speciesMaterials[species]));
	tempObject = scene.getObjectById( pointsStartIndex );
  // console.log(tempObject);
  // console.log(scene.getObjectById(4));
	tempObject.position.set(xCoor/10,yCoor/10,zCoor/10);
	pointsStartIndex++; //increment the var so next point can be id'ed correctly
}

//draw the graph points.
//Parameters: Species (int) will determine color, length (int) = # of points
function drawPoints (species, length){
	//get the first parameter name of each speciesObject
	var startIndex = Object.keys(Stats.speciesArray[species])[0];
	console.log("The start index of "+species+" is: ",startIndex);
	console.log("Adding startIndex and length is: ",(+startIndex+ length));
	console.log("The range of drawing is from "+startIndex+" to "+(+startIndex+ +length));
	for (var i=startIndex; i<(+startIndex + +length); i++){
		createSphere(species,Stats.speciesArray[species][i].dim1,Stats.speciesArray[species][i].dim2,Stats.speciesArray[species][i].dim3);
	}
}

exports.pointsDraw = function() {
  //for # of species, draw them all.
  for (var i=0; i<Stats.speciesArray.length; i++){
    drawPoints(i, Stats.speciesLengths[i]);
  }
}

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
  exports.graph = graph;
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
