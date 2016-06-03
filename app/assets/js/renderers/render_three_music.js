
// ----------------------------------------------   Audio Capture   ----------------------------------------------
// Citations for getting audio capture to work: 
// http://papers.traustikristjansson.info/?p=486
// https://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html

var audioContext;
var analyser;
var frequencyData;
var useSmoothingTimeConstant = true;
var smoothingTimeConstant = 1;

// Set up the Audio Context
try {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContext();
} catch (e) {
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
} catch (e) {
  alert("getUserMedia() is not supported in your browser");
}

var errorFunction = function(e) {
  alert("Error in getUserMedia(): " + e);
};

// Connect the microphone to audio context, set up analyser and frequency array
navigator.getUserMedia({
  audio: true
}, function(stream) {
  var microphone = audioContext.createMediaStreamSource(stream);
  analyser = audioContext.createAnalyser();
  microphone.connect(analyser);
  frequencyData = new Uint8Array(analyser.frequencyBinCount);
}, errorFunction);

// Log frequency array at regular time interval so the frequencyData array is always current
// when the visualization accesses it
(function() {
  if (analyser != null) {
    analyser.getByteFrequencyData(frequencyData);
    smoothingTimeConstant = analyser.smoothingTimeConstant
  }
  setTimeout(arguments.callee, 1);
})();


// ----------------------------------------------   Three.js Visualizer   ----------------------------------------------

var SCENE_WIDTH = window.innerWidth;
var SCENE_HEIGHT = window.innerHeight;

// create a clock -- needed for the particles
var clock = new THREE.Clock(true)

// create a canvas and a renderer, then append to document
var canvas = document.getElementById("music_viz");
var renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
}); // use webgl renderer (GPU!)
renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT); // Resizes the output canvas to (width, height), and also sets the viewport to fit that size, starting in (0, 0).

// scene - where we put our models
var scene = new THREE.Scene();

// camera - how we look at our scene
var camera = new THREE.PerspectiveCamera(45, SCENE_WIDTH / SCENE_HEIGHT, 1, 10000);
camera.position.set(SCENE_WIDTH, SCENE_HEIGHT / 2, 2000);

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

// ------------------------------------------------------------------------------------------------
// Define and add blob music visualizer

var BlobMesh = function() {
  this.mesh_detail = 50;
  this.noise_detail = 11;
  this.radius = 0.5 * SCENE_HEIGHT;
  this.z = 0;

  this.createSphere = function() {
    this.geometry = new THREE.SphereGeometry(this.radius, this.mesh_detail, this.mesh_detail);
    
    this.geometry.parameters.phiStart = 0;
    this.geometry.parameters.phiLength = Math.PI * 2;
    this.geometry.parameters.thetaStart = 0;
    this.geometry.parameters.thetaLength = Math.PI;
    
    this.material = new THREE.MeshPhongMaterial({
      transparent: true,
      opacity: 0.7,
      color: 0xffffff,
      specular: 0xffffff,
      emissive: 0x111111,
      emissiveIntensity: 3,
      shininess: 200,
      shading: THREE.FlatShading,
      /*THREE.SmoothShading,*/
      side: THREE.DoubleSide,
      wireframe: false,
      wrapAround: true
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 0, 0);
  }

  this.updateSphere = function() {
    if (frequencyData == null) { return; }
    var vertices = this.geometry.vertices;
    var i = 0;
    for (var x = 0; x <= this.geometry.parameters.widthSegments; x++) {
      for (var y = 0; y <= this.geometry.parameters.heightSegments; y++) {
      
        // Calculate the theta and phi angles
        var xProp = x / this.geometry.parameters.widthSegments;
        var yProp = y / this.geometry.parameters.heightSegments;
        var theta = this.geometry.parameters.thetaStart + (yProp * this.geometry.parameters.thetaLength);
        var phi = this.geometry.parameters.phiStart + (xProp * this.geometry.parameters.phiLength);

        // Update radius based on the current frequency at the array position chosen for this vertex
        var displacement = frequencyData[x * y % 255] * (SCENE_HEIGHT / (1.3 * 255));
        if (useSmoothingTimeConstant) {
          displacement *= smoothingTimeConstant;
        }
        var newRadius = this.geometry.parameters.radius + displacement;
        
        // Convert back to xyz coordinates and update point
        vertices[i].x = newRadius * Math.sin(theta) * Math.cos(phi);
        vertices[i].y = newRadius * Math.sin(theta) * Math.sin(phi);
        vertices[i].z = newRadius * Math.cos(theta);
        i++;
      }
    }

    this.mesh.geometry.verticesNeedUpdate = true;
  }
}

// Create and add the blob visualizer
var blob = new BlobMesh();
blob.createSphere();
parent.add(blob.mesh);
scene.add(parent);

// ---------------------------------------------------------
// Particle Render Prototype Methods

//MusicParticle.prototype.set_hue  = function(){ this.hue = 0 }
//MusicParticle.prototype.setRadius = function(){ this.radius = Math.random() * 40; }
MusicParticle.prototype.setRotation = function(){ 
  this.rotation   = new THREE.Vector3();
  this.rotation.x = this.rotation.y = this.rotation.z = 0;
  this.rotation_v = new THREE.Vector3();
  this.rotation_v.x = Math.random()/10;
  this.rotation_v.y = Math.random()/10;
  this.rotation_v.z = Math.random()/10;
}

MusicParticle.prototype.createGeometry = function(){
  // http://threejs.org/docs/#Reference/Extras.Geometries/SphereGeometry
  this.geometry = new THREE.SphereGeometry()
  this.radius = 200;
  this.mesh_detail = 50;
  this.noise_detail = 11;
}

MusicParticle.prototype.createMaterial = function(){
  this.color = new THREE.Color(0xfffff);
  this.material = new THREE.MeshPhongMaterial({
    color: this.color,
    specular: 0xffffff,
    intensity: 1000,
    shininess: .9,
    wireframe: true,
    wrapAround: true
  });
  this.material.transparent = false;
  this.material.opacity = 1;
}

MusicParticle.prototype.createMesh = function(){
  // http://threejs.org/docs/#Reference/Objects/Mesh
  this.mesh = new THREE.Mesh(
    this.geometry,
    this.material
  );
  this.mesh.position.set(this.x, this.y, this.z);
}

MusicParticle.prototype.initMeshObj = function(){
  this.createGeometry();
  this.createMaterial();
  this.createMesh();
}

MusicParticle.prototype.updateMesh = function(){
  // update rotation ( rotation is a vector of type Euler http://threejs.org/docs/#Reference/Math/Euler )
  this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  this.mesh.rotation.setFromVector3(new THREE.Vector3(this.rotation.x, this.rotation.y, this.rotation.z));
}

MusicParticle.prototype.updateVelocity = function() {
  if (frequencyData != null) {
      var average = 0;
      for (var i = 0; i < frequencyData.length; i++) {
        average += frequencyData[i];
      }
      average /= frequencyData.length;
      if (useSmoothingTimeConstant) {
        average *= smoothingTimeConstant;
      }
      average += 1;
      this.velocity.x = average * this.baseVelocity.x;
      this.velocity.y = average * this.baseVelocity.y;
      this.velocity.z = average * this.baseVelocity.z;
    }
}

var MAX_PARTICLES = 100;
var currentNumParticles = 10;
var particles = [];
for (var i = 0; i < MAX_PARTICLES; i++){
  var p = new MusicParticle();
  p.setWorldSize(SCENE_WIDTH, SCENE_HEIGHT, SCENE_HEIGHT);
  //p.setRadius();
  p.setRotation();
  p.initMeshObj();
  p.name = "particle_" + i;
  if (i < currentNumParticles) {
    scene.add(p.mesh);
  }
  particles.push(p);
}

// ------------------------------------------------------------------------------------------------
// Add lights

//var ambientLight = new THREE.AmbientLight(0x000000);
//scene.add(ambientLight);

var pointLights = [];
pointLights[0] = new THREE.PointLight(0x0000ff, 1, 4 * SCENE_WIDTH);
pointLights[1] = new THREE.PointLight(0xff0000, 1, 4 * SCENE_WIDTH);
pointLights[2] = new THREE.PointLight(0x0099ff, 1, 2 * SCENE_WIDTH);
pointLights[3] = new THREE.PointLight(0xff0066, 1, 4 * SCENE_WIDTH);
pointLights[4] = new THREE.PointLight(0x6600ff, 1, 2 * SCENE_WIDTH);

pointLights[0].position.set(SCENE_WIDTH, -SCENE_WIDTH, SCENE_WIDTH);
pointLights[1].position.set(-SCENE_WIDTH, -SCENE_WIDTH, SCENE_WIDTH);
pointLights[2].position.set(0, SCENE_WIDTH, -2 * SCENE_WIDTH);
pointLights[3].position.set(SCENE_WIDTH, SCENE_WIDTH, -2 * SCENE_WIDTH);
pointLights[4].position.set(-SCENE_WIDTH, -SCENE_WIDTH, -2 * SCENE_WIDTH);

scene.add(pointLights[0]);
scene.add(pointLights[1]);
//scene.add(pointLights[2]);
scene.add(pointLights[3]);
//scene.add(pointLights[4]);


// ------------------------------------------------------------------------------------------------
// Add controls and GUI

var controls = new function () {
    this.Light_1_Hue = 240.0 / 360.0;
    this.Light_2_Hue = 0.0;
    this.Light_3_Hue = 204.0 / 360.0;
    this.Light_4_Hue = 336.0 / 360.0;
    this.Light_5_Hue = 264.0 / 360.0
    this.Use_Smoothing = true;
    this.Num_Particles = 10;
}

var gui = new dat.GUI();
document.getElementById('dat_gui_container').appendChild( gui.domElement );
gui.close(); // start out the gui as closed

Light_1_Hue = gui.add(controls, 'Light_1_Hue', 0, 1);
Light_1_Hue.onChange(function (value) {
  var color = new THREE.Color();
  color.setHSL(value, 1, 0.5);
  pointLights[0].color = color;
});

Light_2_Hue = gui.add(controls, 'Light_2_Hue', 0, 1);
Light_2_Hue.onChange(function (value) {
  var color = new THREE.Color();
  color.setHSL(value, 1, 0.5);
  pointLights[1].color = color;
});

Light_4_Hue = gui.add(controls, 'Light_4_Hue', 0, 1);
Light_4_Hue.onChange(function (value) {
  var color = new THREE.Color();
  color.setHSL(value, 1, 0.5);
  pointLights[3].color = color;
});


Use_Smoothing = gui.add(controls, 'Use_Smoothing');
Use_Smoothing.onChange(function (value) {
  useSmoothingTimeConstant = value;
});

Num_Particles = gui.add(controls, 'Num_Particles', 0, MAX_PARTICLES);
Num_Particles.onChange(function (value) {
  var newNumParticles = Math.floor(value);
  if (newNumParticles > currentNumParticles) {
    for (var i = currentNumParticles; i < newNumParticles; i++) {
      scene.add(particles[i].mesh);
    }
  } else if (newNumParticles < currentNumParticles) {
    for (var i = newNumParticles; i < currentNumParticles; i++) {
      scene.remove(particles[i].mesh);
    }
  }
  currentNumParticles = newNumParticles;
});

// ------------------------------------------------------------------------------------------------
// Animate the scene

function draw() {
  requestAnimationFrame(draw);
  blob.updateSphere();
  for (var i = 0; i < MAX_PARTICLES; i++) {
    particles[i].update();
    particles[i].updateVelocity();
    particles[i].updateMesh();
  }
  render();
}

function render() {
  renderer.render(scene, camera);
}

// start animation
requestAnimationFrame(draw);
