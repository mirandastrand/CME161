// Citations for getting audio capture to work: 
// http://papers.traustikristjansson.info/?p=486
// https://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html

// -----------------------   Audio Capture   -----------------------

var audioContext;
var analyser;
var frequencyData;

// Set up the Audio Context
try {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContext();
} catch(e) {
  alert("Web Audio API is not supported in your browser");
}

// Set up getUserMedia
try {
  navigator.getUserMedia = navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia;
  var hasMicrophoneInput = (navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia);
} catch(e) {
  alert("getUserMedia() is not supported in your browser");
}

var errorFunction = function(e) {
  alert("Error in getUserMedia: " + e);
};  

// Connect the microphone to audio context, set up analyser and frequency array
navigator.getUserMedia({audio: true}, function(stream) {
  var microphone = audioContext.createMediaStreamSource(stream);
  analyser = audioContext.createAnalyser();
  microphone.connect(analyser);
  frequencyData = new Uint8Array(analyser.frequencyBinCount);
}, errorFunction);

//document.getElementById("text").innerHTML = "test hey";

// Log frequency array at time interval 
(function(){
    if (analyser != null) {
      analyser.getByteFrequencyData(frequencyData);
      console.log(frequencyData);
      //document.getElementById("text").innerHTML = frequencyData[0];
    }
    setTimeout(arguments.callee, 100);
})();


// -----------------------   Three.js Visualizer   -----------------------

var SCENE_WIDTH = SCENE_HEIGHT = 500;

// create a canvas and a renderer, then append to document
var canvas = document.getElementById("music_viz");
var renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true}); // use webgl renderer (GPU!)
renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT); // Resizes the output canvas to (width, height), and also sets the viewport to fit that size, starting in (0, 0).

// scene - where we put our models
var scene = new THREE.Scene();

// camera - how we look at our scene
var camera = new THREE.PerspectiveCamera( 45, SCENE_WIDTH / SCENE_HEIGHT, 1, 10000 );
camera.position.set( SCENE_WIDTH, SCENE_HEIGHT/2, 2000 );

// orbit controls - how we use our mouse to move the camera
var controls = new THREE.OrbitControls( camera,  canvas);
controls.addEventListener( 'change', render );

// parent object (like a sub-scene)
var parent = new THREE.Object3D();


var bounding_box = new THREE.BoundingBoxHelper(parent); // can also be tied to scene
                                                        // but since our objects are in the parent we tie it here
bounding_box.update(); // render
//parent.add(bounding_box);

document.body.appendChild(renderer.domElement);

var BlobMesh = function() {
  this.mesh_detail = 200;
  this.noise_detail = 10;
  this.position = new THREE.Vector3();
  this.radius = 200;
  this.velocity = new THREE.Vector3();
  this.z = 0;
  this.hue = Math.random();

  this.createSphere = function() {
    this.geometry = new THREE.SphereGeometry(this.radius, this.mesh_detail, this.mesh_detail);
    
    this.geometry.parameters.phiStart = 0;
    this.geometry.parameters.phiLength = Math.PI * 2;
    this.geometry.parameters.thetaStart = 0;
    this.geometry.parameters.thetaLength = Math.PI;

    this.material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        specular: 0x333333,
        emissive: 0x111111,
        shininess: 50,
        shading: THREE.FlatShading,
        side: THREE.DoubleSide,
        wireframe: false,
        wireframeLinewidth: .05
    });

    this.material.transparent = true;
    this.material.opacity = .4;
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 0, 0);
  }

  this.updateSphere = function() {
    var speed = .075;
    //var perlin = new ImprovedNoise();
    var quality = 7;
    this.seed += Math.random() * speed;
    var vertices = this.geometry.vertices;

    var i = 0;
    for ( var y = 0; y <= this.geometry.parameters.heightSegments; y ++ ) {
     for ( var x = 0; x <= this.geometry.parameters.widthSegments; x ++ ) {
      var u = x / this.geometry.parameters.widthSegments;
      var v = y / this.geometry.parameters.heightSegments;
            var a = x % this.geometry.parameters.radius;
            var b = y % this.geometry.parameters.radius;
            var noise = this.noise_detail * Math.random()
            //var noise = this.noise_detail * perlin.noise(a / quality, b / quality, this.seed);
            var norm = this.geometry.parameters.radius + noise * 6.5;
    
      vertices[i].x = -norm * 
   Math.cos( this.geometry.parameters.phiStart + u * this.geometry.parameters.phiLength ) * 
   Math.sin( this.geometry.parameters.thetaStart + v * this.geometry.parameters.thetaLength );
      vertices[i].y = norm * Math.cos( this.geometry.parameters.thetaStart + v * this.geometry.parameters.thetaLength );
      vertices[i].z = norm * 
   Math.sin( this.geometry.parameters.phiStart + u * this.geometry.parameters.phiLength ) * 
   Math.sin( this.geometry.parameters.thetaStart + v * this.geometry.parameters.thetaLength );
            i++;
     }
    }

    this.mesh.geometry.verticesNeedUpdate = true;
  }
}

var blob = new BlobMesh();
blob.radius = 300;
blob.mesh_detail = 100;
blob.noise_detail = 20;
blob.createSphere();
blob.material.setValues({
    opacity: 1,
    color: "#ffffff",
    wireframe: false,
    shading: THREE.SmoothShading,
    //vertexColors: THREE.FaceColors,
    transparent: false,
    opacity: 0.9,
    wrapAround: true
});
parent.add(blob.mesh);
scene.add(parent);


// Lights
var ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);

var dist_until_0 = 1000;
var lights = [];
lights[0] = new THREE.PointLight(0xff0040, 1, 2 * dist_until_0);
lights[1] = new THREE.PointLight(0x0040ff, 1, 2 * dist_until_0);
lights[2] = new THREE.PointLight(0x80ff80, 1, dist_until_0);

//x,z,y
// -SCENE_WIDTH => z=0 since we moved the scene by -2*SCENE_WIDTH
lights[0].position.set(SCENE_WIDTH, -SCENE_WIDTH, SCENE_WIDTH);
lights[1].position.set(-SCENE_WIDTH, -SCENE_WIDTH, SCENE_WIDTH);
lights[2].position.set(0, 1.5 * SCENE_WIDTH, -2 * SCENE_WIDTH);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

// draw loop
function draw() {
  requestAnimationFrame(draw);
  blob.updateSphere();
  //updateMesh();
  renderer.render(scene, camera);
}

function render() {
  renderer.render( scene, camera );
}

// start animation
requestAnimationFrame(draw);

