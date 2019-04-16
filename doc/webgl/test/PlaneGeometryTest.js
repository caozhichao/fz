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
   // var geometry = new THREE.CubeGeometry(1,1,1);
    var geometry = new THREE.PlaneGeometry(1,1,1,1);


    //调整2个三角面的顶点顺序
    /*
    geometry.faces = [new THREE.Face3(0,1,3,null,new THREE.Color( 0x00ff00 )),new THREE.Face3(3,2,0,null,new THREE.Color( 0x0000ff ))];
    // geometry.faces = [new THREE.Face3(0,1,3,null,[new THREE.Color( 0x00ff00 ),new THREE.Color( 0xff0000 ),new THREE.Color( 0x0000ff )]),new THREE.Face3(3,2,0,null,[new THREE.Color( 0x0000ff ),new THREE.Color( 0x0000ff ),new THREE.Color( 0x0000ff )])];

    // 如果没有特别指明，面和顶点的法向量可以通过如下代码自动计算
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    */

    var plane = new THREE.Mesh(geometry,
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true,
            // side:THREE.FrontSide
            // vertexColors:THREE.FaceColors
            // vertexColors:THREE.VertexColors
        })
    );
    scene.add(plane);
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