var canvas;
var camera, scene, renderer;
function main(){

    canvas = document.getElementById('demo');

    scene = new THREE.Scene();

    var axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    var r = 400 / 300;


    camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
    // var camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 10);
    camera.position.set(3, 5, 5);
    // camera.position.set(4, -3, 5);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);

    var geometry = new THREE.CubeGeometry(1,1,1);

    // var cube = new THREE.Mesh(geometry,
    //     new THREE.MeshBasicMaterial({
    //         color: 0xff0000,
    //         // wireframe: true
    //     })
    // );

    

    var cube = new THREE.Mesh(geometry,
        new THREE.MeshLambertMaterial({
            color: 0x00ff00
        })
    )

    // cube.position.x = 1;
    //
    // var worldPos = cube.localToWorld(new THREE.Vector3(0,0,0));

    scene.add(cube);


    // var light = new THREE.AmbientLight(0x333333);
    // scene.add(light);

    // var light = new THREE.PointLight(0xffffff, 2, 6);
    // light.position.set(3, 3, 0);
    // scene.add(light);

    // var light = new THREE.DirectionalLight();
    // light.position.set(3, 5, 5);
    // scene.add(light);
    cube.castShadow = true;
   

    var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
    // light.target = cube;
    light.position.set(5,5,5);
    light.target.position.set(0, 0, 0);

    light.target = cube;
light.castShadow = true;

light.shadowCameraNear = 2;
light.shadowCameraFar = 10;
light.shadowCameraFov = 30;
light.shadowCameraVisible = true;

light.shadowMapWidth = 1024;
light.shadowMapHeight = 1024;
light.shadowDarkness = 0.3;

    scene.add(light);

    var plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8, 16, 16),
    new THREE.MeshLambertMaterial({color: 0xcccccc}));
    plane.rotation.x = 0;
    plane.position.y = -1;
    plane.receiveShadow = true;
    plane.rotation.x = -90 * Math.PI / 180;
    scene.add(plane);


    renderer = new THREE.WebGLRenderer( { antialias: true ,canvas:canvas} );
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    // renderer.render( scene, camera );

    animation();

    function animation(){
        requestAnimationFrame(animation);
        renderer.render( scene, camera );
    }




    // setTimeout(function() {
    //     var worldPos = cube.localToWorld(new THREE.Vector3(0,0,0));
    //     var standardVector = worldPos.project(camera);
    // }, 1000);
}