// ------------------------------------------------------------------------------------------------
// scene, camera, and renderer go here

var SCENE_WIDTH = SCENE_HEIGHT = 700;

var clock = new THREE.Clock();


// create a canvas and a renderer, then append to document
var canvas = document.getElementById("music_viz");
var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
}); // use webgl renderer (GPU!)
renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT); // Resizes the output canvas to (width, height), and also sets the viewport to fit that size, starting in (0, 0).
document.body.appendChild(renderer.domElement); // attach renderer to canvas

// scene - where we put our models
var scene = new THREE.Scene();

// camera - how we look at our scene
var camera = new THREE.PerspectiveCamera(45, SCENE_WIDTH / SCENE_HEIGHT, 1, 10000);
camera.position.set(SCENE_WIDTH, SCENE_HEIGHT / 2, 2000);

// controls
//var controls = new THREE.OrbitControls(camera);
//controls.damping = 0.2;
//controls.addEventListener('change', render);

// ------------------------------------------------------------------------------------------------



// parent object (like a sub-scene)
var parent = new THREE.Object3D();
//parent.position.x = SCENE_WIDTH;
//parent.position.y = SCENE_WIDTH;
//parent.position.z = -1.5 * SCENE_WIDTH;
parent.rotation.x += .6;
//parent.rotation.x += .3;

scene.position.x = SCENE_WIDTH;
scene.position.y = SCENE_WIDTH;
scene.position.z = -SCENE_WIDTH;


// ------------------------------------------------------------------------------------------------
// add axes
// from: http://soledadpenades.com/articles/three-js-tutorials/drawing-the-coordinate-axes/

function buildAxes(length) {
    var axes = new THREE.Object3D();
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(length, 0, 0), 0xFF0000, false)); // +X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-length, 0, 0), 0xFF0000, true)); // -X
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, length, 0), 0x00FF00, false)); // +Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -length, 0), 0x00FF00, true)); // -Y
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, length), 0x0000FF, false)); // +Z
    axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -length), 0x0000FF, true)); // -Z
    return axes;

}

function buildAxis(src, dst, colorHex, dashed) {
    var geom = new THREE.Geometry(),
        mat;

    if (dashed) {
        mat = new THREE.LineDashedMaterial({
            linewidth: 3,
            color: colorHex,
            dashSize: 3,
            gapSize: 3
        });
    } else {
        mat = new THREE.LineBasicMaterial({
            linewidth: 3,
            color: colorHex
        });
    }

    geom.vertices.push(src.clone());
    geom.vertices.push(dst.clone());
    geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

    var axis = new THREE.Line(geom, mat, THREE.LinePieces);

    return axis;

}

//axes = buildAxes(SCENE_WIDTH);
//parent.add(axes);



// ------------------------------------------------------------------------------------------------
// add Bounding box

// http://threejs.org/docs/#Reference/Extras.Helpers/BoundingBoxHelper
var bounding_box = new THREE.BoundingBoxHelper(parent); // can also be tied to scene
// but since our objects are in the parent we tie it here
bounding_box.update(); // render
//parent.add(bounding_box);

// ---------------------------------------------------------
// Boid Render Prototype Methods
var obj = function () {
    this.logged = false;
    this.mesh_detail = 200;
    this.noise_detail = 10;
    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.radius = 100;
    this.z = Math.random();
    this.seed = Math.random();
    this.hue = Math.random();


    this.create_sphere = function () {

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

        console.log(this.mesh);
    }
    
    this.update_perlin_sphere = function () {
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
        //this.mesh.geometry.verticesNeedUpdate = true;

    }

}

// add object
/*

var o = new obj();
o.mesh_detail = 50;
o.create_plane();
o.material.setValues({
    opacity: 1,
    shading: THREE.FlatShading,
    wrapAround: true
})
parent.add(o.mesh);
*/

/*var o = new obj();
o.radius = 500;
o.mesh_detail = 100;
o.noise_detail = 20;
o.create_sphere();
//oo.position.z = 200;

o.material.setValues({
    opacity: 1,
    color: "#ffffff",
    wireframe: true,
    shading: THREE.SmoothShading,
    //vertexColors: THREE.FaceColors,
    transparent: false,
    opacity: 0.5,
    wrapAround: true
});
parent.add(o.mesh);*/


var oo = new obj();
oo.radius = 300;
oo.mesh_detail = 100;
oo.noise_detail = 20;
oo.create_sphere();
//oo.position.z = 200;

oo.material.setValues({
    opacity: 1,
    color: "#ffffff",
    wireframe: false,
    shading: THREE.SmoothShading,
    //vertexColors: THREE.FaceColors,
    transparent: false,
    opacity: 0.9,
    wrapAround: true
});
parent.add(oo.mesh);

scene.add(parent);


// ------------------------------------------------------------------------------------------------
// Light

/*var ambientLight = new THREE.AmbientLight(0x444444);
//scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(10, 10, 10).normalize();
scene.add(directionalLight);

var directionalLight2 = new THREE.DirectionalLight(0xffffff);
directionalLight2.position.set(-10, -10, -10).normalize();
scene.add(directionalLight2);

*/


var ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);

var sphere = new THREE.SphereGeometry(50, 16, 8);
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
/*
lights[0].add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
    color: 0xff0040
})));
lights[1].add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
    color: 0x0040ff
})));
lights[2].add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
    color: 0x80ff80
})));
*/
scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);




light1 = new THREE.PointLight(0xff0040, 1, 1000);
light2 = new THREE.PointLight(0x0040ff, 1, 1000);
light3 = new THREE.PointLight(0x80ff80, 1, 1000);

/*light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
    color: 0xff0040
})));



light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
    color: 0x0040ff
})));



light3.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
    color: 0x80ff80
})));
*/

parent.add(light1);
parent.add(light2);
parent.add(light3);

// ------------------------------------------------------------------------------------------------
// draw loop

function draw() {

    //console.log("run");

    // start stats recording
    //stats.begin();

    parent.rotation.y += .005;
    //o.update_plane();
    //o.update_perlin();
    oo.update_perlin_sphere();
    //o.update_perlin_sphere();


    var k = Date.now() * 0.0007,
        g = SCENE_WIDTH / 2;

    light1.position.x = Math.sin(k * 0.7) * g;
    light1.position.y = Math.cos(k * 0.5) * g;
    light1.position.z = Math.cos(k * 0.3) * g;
    light2.position.x = Math.cos(k * 0.3) * g;
    light2.position.y = Math.sin(k * 0.5) * g;
    light2.position.z = Math.sin(k * 0.7) * g;
    light3.position.x = Math.sin(k * 0.7) * g;
    light3.position.y = Math.cos(k * 0.3) * g;
    light3.position.z = Math.sin(k * 0.5) * g;

    // render scene
    renderer.render(scene, camera);


    // end stats recording
    //stats.end();

    // run again
    requestAnimationFrame(draw);
}

// ------------------------------------------------------------------------------------------------
// start animation

requestAnimationFrame(draw);

// ------------------------------------------------------------------------------------------------