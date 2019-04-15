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
    camera.position.set(3, 5, 5);
    // camera.position.set(4, -3, 5);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);

    var geometry = new THREE.CubeGeometry(1,1,1);

    /*
    // 初始化几何形状
    var geometry = new THREE.Geometry();

    // 设置顶点位置
    // 顶部4顶点
    geometry.vertices.push(new THREE.Vector3(-1, 2, -1)); //0
    geometry.vertices.push(new THREE.Vector3(1, 2, -1)); //1
    geometry.vertices.push(new THREE.Vector3(1, 2, 1)); //2
    geometry.vertices.push(new THREE.Vector3(-1, 2, 1)); //3
    // 底部4顶点
    geometry.vertices.push(new THREE.Vector3(-2, 0, -2));
    geometry.vertices.push(new THREE.Vector3(2, 0, -2));
    geometry.vertices.push(new THREE.Vector3(2, 0, 2));
    geometry.vertices.push(new THREE.Vector3(-2, 0, 2));

    // 设置顶点连接情况
    // 顶面
    geometry.faces.push(new THREE.Face3(0, 1, 3));
    geometry.faces.push(new THREE.Face3(1, 2, 3));
    // 底面
    geometry.faces.push(new THREE.Face3(4, 5, 6));
    // geometry.faces.push(new THREE.Face3(5, 6, 7));
    geometry.faces.push(new THREE.Face3(4, 6, 7));
    // 四个侧面
    // geometry.faces.push(new THREE.Face3(1, 5, 6));
    // geometry.faces.push(new THREE.Face3(6, 2, 1));
    // geometry.faces.push(new THREE.Face3(2, 6, 7));
    // geometry.faces.push(new THREE.Face3(7, 3, 2));
    // geometry.faces.push(new THREE.Face3(3, 7, 0));
    // geometry.faces.push(new THREE.Face3(7, 4, 0));
    // geometry.faces.push(new THREE.Face3(0, 4, 5));
    // geometry.faces.push(new THREE.Face3(0, 5, 1));
    */

    /*
    var geometry = new THREE.BufferGeometry();
// 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
// 因为在两个三角面片里，这两个顶点都需要被用到。
var vertices = new Float32Array( [
	-1.0, -1.0,  1.0,
	 1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,

	 1.0,  1.0,  1.0,
	-1.0,  1.0,  1.0,
	-1.0, -1.0,  1.0
] );

// itemSize = 3 因为每个顶点都是一个三元组。
geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

    // geometry = new THREE.Geometry().fromBufferGeometry(geometry);
    */
    var cube = new THREE.Mesh(geometry,
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true,
            // side:THREE.FrontSide
        })
    );

    // scene.add(cube);


    //线
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
    geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
    var material = new THREE.LineBasicMaterial( { color: 0x0000ff,wireframe: true } );
    var line = new THREE.Line( geometry, material );
    scene.add( line );


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




    // setTimeout(function() {
    //     var worldPos = cube.localToWorld(new THREE.Vector3(0,0,0));
    //     var standardVector = worldPos.project(camera);
    // }, 1000);
}