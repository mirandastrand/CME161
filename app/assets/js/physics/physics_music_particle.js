// Based on http://threejs.org/examples/canvas_geometry_birds.html ,
// which is based on http://www.openprocessing.org/visuals/?visualID=6910

var MusicParticle = function() {

    var vector = new THREE.Vector3(),
    _width = 1000, _height = 1000, _depth = 1000,
    _maxSpeed = 100;

    this.position = new THREE.Vector3();
    this.baseVelocity = new THREE.Vector3();
    this.velocity = new THREE.Vector3();

    this.setWorldSize = function ( width, height, depth ) {
        _width = width;
        _height = height;
        _depth = depth;
    }

    this.position.x = Math.random() * 400 - 200;
    this.position.y = Math.random() * 400 - 200;
    this.position.z = Math.random() * 400 - 200;
    this.velocity.x = Math.random() * 2 - 1;
    this.velocity.y = Math.random() * 2 - 1;
    this.velocity.z = Math.random() * 2 - 1;
    this.baseVelocity.x = this.velocity.x;
    this.baseVelocity.y = this.velocity.y;
    this.baseVelocity.z = this.velocity.z;
    this.setWorldSize( 500, 500, 500 );

    this.update = function () {
        this.checkBounds();
        this.move();
    }

    this.move = function () {
        var l = this.velocity.length();
        if ( l > _maxSpeed ) {
            this.velocity.divideScalar( l / _maxSpeed );
        }

        this.position.add( this.velocity );
    }

    this.checkBounds = function () {
        if ( this.position.x >   _width ) {
            this.position.x = _width;
            this.baseVelocity.x = - Math.abs(this.baseVelocity.x);
        }
        if ( this.position.x < - _width ) {
            this.position.x = - _width;
            this.baseVelocity.x = Math.abs(this.baseVelocity.x);
        }
        if ( this.position.y >   _height ) {
            this.position.y = _height;
            this.baseVelocity.y = - Math.abs(this.baseVelocity.y);
        }
        if ( this.position.y < - _height ) {
            this.position.y = - _height;
            this.baseVelocity.y = Math.abs(this.baseVelocity.y);
        }
        if ( this.position.z >  _depth ) {
            this.position.z = _depth;
            this.baseVelocity.z = - Math.abs(this.baseVelocity.z);
        }
        if ( this.position.z < - _depth ) {
            this.position.z = - _depth;
            this.baseVelocity.z = Math.abs(this.baseVelocity.z);
        }
    }
}