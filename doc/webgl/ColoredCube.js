
function main(){

    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas,true);

    var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n'+
    'attribute vec4 a_Color;\n'+
    'uniform mat4 u_MvpMatrix;\n'+
    'varying vec4 v_Color;\n'+
    'void main(){\n'+
        'gl_Position = u_MvpMatrix * a_Position;\n'+
        'v_Color = a_Color;\n'+
    '}\n';
    var FSHADER_SOURCE = 
    '#ifdef GL_ES\n'+
    'precision mediump float;\n'+
    '#endif\n'+
    'varying vec4 v_Color;\n'+
    'void main(){\n'+
        'gl_FragColor = v_Color;\n'+
    '}\n';

    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
    
    var n = initVertexBuffers(gl);
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.enable(gl.DEPTH_TEST);

    var mvpMatrix = new Matrix4();
    mvpMatrix.setPerspective(30,1,1,100);
    mvpMatrix.lookAt(3,3,7,0,0,0,0,1,0);

    var u_MvpMatrix = gl.getUniformLocation(gl.program,'u_MvpMatrix');
    gl.uniformMatrix4fv(u_MvpMatrix,false,mvpMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_TEST_BIT);
    
    gl.drawElements(gl.TRIANGLES,n,gl.UNSIGNED_BYTE,0);

    // gl.drawArrays(gl.TRIANGLES,0,3);

}
function initVertexBuffers(gl){


    //给立方体Cube 每个面着不同的颜色

    //下面是2个面的例子

    var vertices = new Float32Array([
        1.0,1.0,1.0,      //前4个点
        -1.0,1.0,1.0,
        -1.0,-1.0,1.0,
        1.0,-1.0,1.0,

        1.0,1.0,1.0,      //右边4个点
        1.0,-1.0,1.0,
        1.0,-1.0,-1.0,
        1.0,1.0,-1.0

    ]);

    var colors = new Float32Array([
        0.4,0.4,1.0,    //前4个点对应的颜色值
        0.4,0.4,1.0,
        0.4,0.4,1.0,
        0.4,0.4,1.0,

        0.4,1.0,0.4,   //右边2个点的颜色值    
        0.4,1.0,0.4,
        0.4,1.0,0.4,
        0.4,1.0,0.4
    ]);



    var indices = new Uint8Array([
        0,1,2,0,2,3, //前
        4,5,6,4,6,7 //右
        // 0,5,6,0,6,1, //上
        // 1,6,7,1,7,2, //左
        // 7,4,3,7,3,2, //下
        // 4,7,6,4,6,5 //后        
    ]);

    initArrayBuffer(gl,vertices,3,gl.FLOAT,'a_Position');
    initArrayBuffer(gl,colors,3,gl.FLOAT,'a_Color');

    // var vertexColorBuffer = gl.createBuffer();
    var indexBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER,vertexColorBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER,verticesColors,gl.STATIC_DRAW);

    // var FSIZE = verticesColors.BYTES_PER_ELEMENT;
    // var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    // gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,FSIZE * 6,0);
    // gl.enableVertexAttribArray(a_Position);

    // var a_Color = gl.getAttribLocation(gl.program,'a_Color');
    // gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE * 6,FSIZE * 3);
    // gl.enableVertexAttribArray(a_Color);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW);

    return indices.length;
}

function initArrayBuffer(gl,data,num,type,attribute){
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
    var a_attribute = gl.getAttribLocation(gl.program,attribute);

    gl.vertexAttribPointer(a_attribute,num,type,false,0,0);
    gl.enableVertexAttribArray(a_attribute);
    return true;
}
