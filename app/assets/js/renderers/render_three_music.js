
// ----------------------------------------------   Audio Capture   ----------------------------------------------
// Citations for getting audio capture to work: 
// http://papers.traustikristjansson.info/?p=486
// https://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html

var audioContext;
var analyser;
var frequencyData;

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
  this.noise_detail = 10;
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
        var displacement = frequencyData[x * y % 255] * (SCENE_HEIGHT / (1.5 * 255));
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

// ------------------------------------------------------------------------------------------------
// Add lights

var ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);

var dist_until_0 = 2 * SCENE_WIDTH;
var lights = [];
lights[0] = new THREE.PointLight(0x0000ff, 1, 2 * dist_until_0);
lights[1] = new THREE.PointLight(0xff0000, 1, 2 * dist_until_0);
lights[2] = new THREE.PointLight(0x0099ff, 1, dist_until_0);
lights[3] = new THREE.PointLight(0xff0066, 1, 2 * dist_until_0);
lights[4] = new THREE.PointLight(0x6600ff, 1, dist_until_0);

//x,z,y
// -SCENE_WIDTH => z=0 since we moved the scene by -2*SCENE_WIDTH
lights[0].position.set(SCENE_WIDTH, -SCENE_WIDTH, SCENE_WIDTH);
lights[1].position.set(-SCENE_WIDTH, -SCENE_WIDTH, SCENE_WIDTH);
lights[2].position.set(0, 1.5 * SCENE_WIDTH, -2 * SCENE_WIDTH);
lights[3].position.set(SCENE_WIDTH, SCENE_WIDTH, -2 * SCENE_WIDTH);
lights[4].position.set(-SCENE_WIDTH, -SCENE_WIDTH, -2 * SCENE_WIDTH);

scene.add(lights[0]);
scene.add(lights[1]);
//scene.add(lights[2]);
scene.add(lights[3]);
//scene.add(lights[4]);


// ------------------------------------------------------------------------------------------------
// Add controls and GUI

var controls = new function () {
    this.Light_1_Hue = 240.0 / 360.0;
    this.Light_2_Hue = 0.0;
    this.Light_3_Hue = 204.0 / 360.0;
    this.Light_4_Hue = 336.0 / 360.0;
    this.Light_5_Hue = 264.0 / 360.0
}

var gui = new dat.GUI();
document.getElementById('dat_gui_container').appendChild( gui.domElement );
gui.close(); // start out the gui as closed

Light_1_Hue = gui.add(controls, 'Light_1_Hue', 0, 1);
Light_1_Hue.onChange(function (value) {
  var color = new THREE.Color();
  color.setHSL(value, 1, 0.5);
  lights[0].color = color;
});

Light_2_Hue = gui.add(controls, 'Light_2_Hue', 0, 1);
Light_2_Hue.onChange(function (value) {
  var color = new THREE.Color();
  color.setHSL(value, 1, 0.5);
  lights[1].color = color;
});

/*Light_3_Hue = gui.add(controls, 'Light_3_Hue', 0, 1);
Light_3_Hue.onChange(function (value) {
  var color = new THREE.Color();
  color.setHSL(value, 1, 0.5);
  lights[2].color = color;
});*/

Light_4_Hue = gui.add(controls, 'Light_4_Hue', 0, 1);
Light_4_Hue.onChange(function (value) {
  var color = new THREE.Color();
  color.setHSL(value, 1, 0.5);
  lights[3].color = color;
});

/*Light_5_Hue = gui.add(controls, 'Light_5_Hue', 0, 1);
Light_5_Hue.onChange(function (value) {
  var color = new THREE.Color();
  color.setHSL(value, 1, 0.5);
  lights[4].color = color;
});*/


// ------------------------------------------------------------------------------------------------
// Animate the scene

function draw() {
  requestAnimationFrame(draw);
  blob.updateSphere();
  render();
}

function render() {
  renderer.render(scene, camera);
}

// start animation
requestAnimationFrame(draw);
