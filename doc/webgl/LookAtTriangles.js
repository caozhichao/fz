function main(){
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas,true);

    var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' + 
    'attribute vec4 a_Color;\n'+
    'uniform mat4 u_ViewMatrix;\n'+
    'uniform mat4 u_ModeMatrix;\n'+
    'varying vec4 v_Color;\n'+
    'void main(){\n'+
        'gl_Position = u_ViewMatrix * u_ModeMatrix * a_Position;\n'+
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

    gl.drawArrays(gl.TRIANGLES,0,n);


}

function initVertexBuffers(gl){
    var verticesColors = new Float32Array([
        0.0,0.5,-0.4,   0.4,1.0,0.4,
        -0.5,-0.5,-0.4, 0.4,1.0,0.4,
        0.5,-0.5,-0.4,  1.0,0.4,0.4,

        0.5,0.4,-0.2, 1.0,0.4,0.4,
        -0.5,0.4,-0.2, 1.0,1.0,0.4,
        0.0,-0.6,-0.2, 1.0,1.0,0.4,

        0.0,0.5,0.0, 0.4,0.4,1.0,
        -0.5,-0.5,0.0, 0.4,0.4,1.0,
        0.5,-0.5,0.0,1.0,0.4,0.4

    ]);


     var n = 9; //顶点个数    
    //创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    //将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    //向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER,verticesColors,gl.STATIC_DRAW);
    //将缓存区对象分配给a_Position变量
    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    // gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    var FSIZE = verticesColors.BYTES_PER_ELEMENT;
    gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,FSIZE*6,0);
    //连接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

     var a_Color = gl.getAttribLocation(gl.program,'a_Color');
    gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE * 6,FSIZE * 3);
    gl.enableVertexAttribArray(a_Color);

    var u_ViewMatrix = gl.getUniformLocation(gl.program,'u_ViewMatrix');

    var viewMatrix = new Matrix4();
    // viewMatrix.setLookAt(0.25,0.25,0.25,0,0,0,0,1,0);
    viewMatrix.setLookAt(0.25,0.25,0.25,0,0,0,0,1,0);
    gl.uniformMatrix4fv(u_ViewMatrix,false,viewMatrix.elements);  

    var modelMatrix = new Matrix4();
    modelMatrix.setRotate(-10,0,0,1);

    var u_ModeMatrix = gl.getUniformLocation(gl.program,'u_ModeMatrix');

    gl.uniformMatrix4fv(u_ModeMatrix,false,modelMatrix.elements);  

    return n;  

}