var canvas;
var camera, scene, renderer;
function main(){
    canvas = document.getElementById('demo');
    scene = new THREE.Scene();
    var axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );
    var r = 400 / 300;
    camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 100);
    // var camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 10);
    // camera.position.set(3, 5, 5);
    camera.position.set(0, 0, 5);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);

    var length = 1,width = 2;

    var shape = new THREE.Shape();
    shape.moveTo(0,0);
    shape.lineTo(0,width);
    shape.lineTo(length,width);
    shape.lineTo(length,0);
    shape.lineTo(0,0);

    var extrudeSettings = {
        steps: 1,
        depth: 3,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
    };

    var geometry = new THREE.ExtrudeGeometry(shape,extrudeSettings);
    var mesh = new THREE.Mesh(geometry,
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true,
            // side:THREE.FrontSide
            // vertexColors:THREE.FaceColors
            // vertexColors:THREE.VertexColors
        })
    );


    scene.add(mesh);
    geometry.center();

    // mesh.rotation.x = -Math.PI / 2;
    // mesh.position.x = 1;
    // mesh.position.z = 1;
    var axesHelper = new THREE.AxesHelper( 0.5 );
    mesh.add( axesHelper );

    // var box = new THREE.BoxHelper( mesh, 0xffff00 );
    // scene.add( box );

//     var box = new THREE.Box3();
// box.setFromCenterAndSize( new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 2, 1, 3 ) );

// var helper = new THREE.Box3Helper( box, 0xffff00 );
// scene.add( helper );


    renderer = new THREE.WebGLRenderer( { antialias: true ,canvas:canvas} );    
    // renderer.render( scene, camera );
    animation();
    function animation(){
        requestAnimationFrame(animation);
        renderer.render( scene, camera );
    }
    var controls = new THREE.OrbitControls( camera );
    controls.target.set( 0, 0, 0 );
    controls.update();    
}