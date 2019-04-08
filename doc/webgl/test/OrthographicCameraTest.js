var canvas;
var camera, scene, renderer;
function main(){

    canvas = document.getElementById('demo');

    scene = new THREE.Scene();

    var axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    var r = 400 / 300;


    var camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
    // var camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 10);
    camera.position.set(0, 0, 5);
    // camera.position.set(4, -3, 5);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);

    var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        })
    );
    scene.add(cube);

    renderer = new THREE.WebGLRenderer( { antialias: true ,canvas:canvas} );
    
    renderer.render( scene, camera );
}