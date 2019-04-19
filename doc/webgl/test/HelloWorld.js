var canvas;
var camera, scene, renderer;
var raycaster;
var mouse = new THREE.Vector2();
var mesh;
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
    // camera.rotateY(-15 * Math.PI / 180);
    // camera.position.z = 5;
    // camera.position.x = 3;
    // camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);

    var geometry = new THREE.CubeGeometry(1,1,1);
    mesh = new THREE.Mesh(geometry,
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true,
            // side:THREE.FrontSide
            // vertexColors:THREE.FaceColors
            // vertexColors:THREE.VertexColors
        })
    );

    let loader = new THREE.ImageLoader();
    loader.load('./background.jpg', (map)=>{
        scene.add(new THREE.Mesh(new THREE.PlaneGeometry(1024,768), new THREE.MeshBasicMaterial({
            map: new THREE.Texture(map)
        })))
    })

    scene.add(mesh);
    renderer = new THREE.WebGLRenderer( { antialias: true ,canvas:canvas} );    
    renderer.render( scene, camera );


    raycaster = new THREE.Raycaster();


    animation();
    function animation(){
        requestAnimationFrame(animation);
        renderer.render( scene, camera );


        
    }
    // var controls = new THREE.OrbitControls( camera );
    // controls.target.set( 0, 0, 0 );
    // controls.update();    


    document.addEventListener( 'click', onDocumentMouseMove );
}


function onDocumentMouseMove( event ) {
    event.preventDefault();
    mouse.x = ( (event.clientX-8) / 400 ) * 2 - 1;
    mouse.y = - ( (event.clientY-8) / 300) * 2 + 1;

    // raycaster.setFromCamera( mouse, camera );
    // var intersects = raycaster.intersectObjects( scene.children,true);
    // console.log(intersects.length,event);

    console.log(mouse.x + '|' + mouse.y);


    let p = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);    

    mesh.position.set(p.x,p.y,p.z);

    // var p = new THREE.Vector3(1, 1, 0).unproject(camera);    
    // mesh.position.set(p.x,p.y,p.z);
    console.log(p);
    camera.position.x = 2;

    // x: 2
    // y: 1.5000000000000002
    // z: -45.5
    // p = new THREE.Vector3(mouse.x * 2,mouse.y * 1.5,-45.5);
    // mesh.position.set(p)
    // mesh.position.set(p.x,p.y,p.z);


}