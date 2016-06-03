// ------------------------------------------------------------------------------------------------
// scene, camera, and renderer go here

var SCENE_WIDTH = SCENE_HEIGHT = 500;

// create a canvas and a renderer, then append to document
var canvas = document.getElementById("three_boid");
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

// ------------------------------------------------------------------------------------------------

// parent object (like a sub-scene)
var parent = new THREE.Object3D();

// ------------------------------------------------------------------------------------------------
// add axes
// from: http://soledadpenades.com/articles/three-js-tutorials/drawing-the-coordinate-axes/

function buildAxes( length ) {
    var axes = new THREE.Object3D();
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z
    return axes;

}

function buildAxis( src, dst, colorHex, dashed ) {
    var geom = new THREE.Geometry(),
        mat; 

    if(dashed) {
            mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
    } else {
            mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
    }

    geom.vertices.push( src.clone() );
    geom.vertices.push( dst.clone() );
    geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

    var axis = new THREE.Line( geom, mat, THREE.LinePieces );

    return axis;

}

axes = buildAxes( SCENE_WIDTH );
parent.add( axes );



// ------------------------------------------------------------------------------------------------
// add Bounding box

// http://threejs.org/docs/#Reference/Extras.Helpers/BoundingBoxHelper
var bounding_box = new THREE.BoundingBoxHelper(parent); // can also be tied to scene
                                                        // but since our objects are in the parent we tie it here
bounding_box.update(); // render
parent.add(bounding_box);

// ---------------------------------------------------------
// Particle Render Prototype Methods


    // Boid Render Prototype Methods

    // add properties
Boid.prototype.set_hue  = function(){ this.hue = 180 * Math.random(); }
Boid.prototype.set_radius = function(){ this.radius = Math.random() * 40; }
Boid.prototype.set_rotation = function(){ 
    this.rotation   = new THREE.Vector3();
    this.rotation.x = this.rotation.y = this.rotation.z = 0;

    this.rotation_v = new THREE.Vector3();
    this.rotation_v.x = Math.random()/10;
    this.rotation_v.y = Math.random()/10;
    this.rotation_v.z = Math.random()/10;
}

Boid.prototype.create_geometry = function(){
    // enable this if you want spheres
    // http://threejs.org/docs/#Reference/Extras.Geometries/SphereGeometry
    // this.geometry = new THREE.SphereGeometry(
    //     this.radius, // radius — sphere radius. Default is 50.
    //     25,          // widthSegments — number of horizontal segments. Minimum value is 3, and the default is 8.
    //     25           // heightSegments — number of vertical segments. Minimum value is 2, and the default is 6.
    // );
    
    // http://threejs.org/docs/#Reference/Extras.Geometries/BoxGeometry
    this.geometry = new THREE.BoxGeometry( this.radius, this.radius, this.radius);
}

Boid.prototype.create_material = function(){
    // http://threejs.org/docs/#Reference/Math/Color
    this.color = new THREE.Color();
    this.color.setHSL( Math.random(), .85, .5 );

    // http://threejs.org/docs/#Reference/Materials/MeshPhongMaterial
    this.material = new THREE.MeshPhongMaterial({
        color: this.color,
        specular: 0x333333,
        shininess: .9
    });
    this.material.transparent = true;
    this.material.opacity = .75;
}

Boid.prototype.create_mesh = function(){
    // http://threejs.org/docs/#Reference/Objects/Mesh
    this.mesh = new THREE.Mesh(
        this.geometry,
        this.material
    );
    this.mesh.position.set(this.x, this.y, this.z);
    console.log(this.mesh);
}

Boid.prototype.init_mesh_obj = function(){
    this.create_geometry();
    this.create_material();
    this.create_mesh();
}

Boid.prototype.update_mesh = function(){
    // update rotation ( rotation is a vector of type Euler http://threejs.org/docs/#Reference/Math/Euler )
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.rotation.setFromVector3(new THREE.Vector3(this.rotation.x, this.rotation.y, this.rotation.z));

    // calculate momentum and apply it to the color
    var momentum = this.velocity.length() * this.radius;
    var intensity = momentum/200;
    if(intensity < 0) intensity = 0;
    if(intensity > 1) intensity = 1;
    this.mesh.material.color.setHSL( intensity, .1 + intensity * .85, .2 + intensity * .4);
}

Boid.prototype.set_parameters = function(){
    // gravity is a downward force, -.1 makes the objects fly around longer
    this.gravity = -.1;
}

// add boids
var n = 200, data = [];
for (var i = 0; i < n; i++){
    // create new boid
	var b = new Boid();
	b.set_parameters();
	b.set_hue();
	b.set_radius();
	b.set_rotation();
	b.init_mesh_obj();

	// add boid mesh object to the parent
	parent.add(b.mesh);

	// add boid object to data array, so each element of the array is a boid
	data.push(b);
}

scene.add(parent);
    

// ------------------------------------------------------------------------------------------------
// Light

var ambientLight = new THREE.AmbientLight(0x444444);
ambientLight.name = "ambient_light";
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(10, 10, 10).normalize();
directionalLight.name = "directional_light";
scene.add(directionalLight);

var directionalLight2 = new THREE.DirectionalLight(0xffffff);
directionalLight2.position.set(-10, -10, -10).normalize();
directionalLight2.name = "directional_light";
scene.add(directionalLight2);

// ------------------------------------------------------------------------------------------------
// add FPS using Stats.js

var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms
document.getElementById('dat_gui_container').appendChild( stats.domElement );

// align to the right of dat.gui
stats.domElement.style.float = 'right';

// ------------------------------------------------------------------------------------------------
// add controls and GUI

var gui = new dat.GUI();
document.getElementById('dat_gui_container').appendChild( gui.domElement );

var controls_state = {
    "ambient_light": true,
    "directional_light": true,
    "ambient_light_intensity": 1,
    "directional_light_intensity": 1,
    "show_axis": true,
    "show_bounding_box": true,
    "coeff_alignment": 1,
    "coeff_cohesion": 1,
    "coeff_separation": 1
};

gui.add(controls_state, 'ambient_light')
    .onChange(function(on) {
        scene.getObjectByName('ambient_light').intensity = 1 * on;
    });

gui.add(controls_state, 'directional_light')
    .onChange(function(on) {
        scene.getObjectByName('directional_light').intensity = 1 * on;
    });

gui.add(controls_state, 'ambient_light_intensity', 0, 1)
    .onChange(function(value) {
        scene.getObjectByName('ambient_light').intensity = value;
    });

gui.add(controls_state, 'directional_light_intensity', 0, 1)
    .onChange(function(value) {
        scene.getObjectByName('directional_light').intensity = value;
    });

gui.add(controls_state, 'show_axis')
    .onChange(function(on) {
        if (on) { parent.add(axes);    } 
        else    { parent.remove(axes); }
    });

gui.add(controls_state, 'show_bounding_box')
    .onChange(function(on) {
        if (on) { parent.add(bounding_box);    } 
        else    { parent.remove(bounding_box); }
    });

gui.add(controls_state, 'coeff_alignment', 0, 10)
    .onChange(function(value) {
        for (var i = 0; i < n; i++) {
            data[i].coeff_alignment = value;
        }
    });

gui.add(controls_state, 'coeff_cohesion', 0, 10)
    .onChange(function(value) {
        for (var i = 0; i < n; i++) {
            data[i].coeff_cohesion = value;
        }
    });

gui.add(controls_state, 'coeff_separation', 0, 10)
    .onChange(function(value) {
        for (var i = 0; i < n; i++) {
            data[i].coeff_separation = value;
        }
    });

// ------------------------------------------------------------------------------------------------
// draw loop

function draw() {

    // start stats recording
    stats.begin();

    for (var i = 0; i < n; i++) {
		data[i].run(data);
		data[i].update_mesh();
	}

    /*parent.rotation.x += controls_state.p_x_rot_v;
    parent.rotation.y += controls.p_y_rot_v;
    parent.rotation.z += controls.p_z_rot_v;*/

    // render scene
    renderer.render(scene, camera);

    // end stats recording
    stats.end();

    // run again
    requestAnimationFrame(draw);
}

function render() {
  renderer.render( scene, camera );
}

// ------------------------------------------------------------------------------------------------
// start animation

requestAnimationFrame(draw);

// ------------------------------------------------------------------------------------------------

