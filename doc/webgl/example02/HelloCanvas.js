//https://www.cnblogs.com/mirror-pc/p/4181398.html
function main(){
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas,true);
    // console.log(gl);
    // gl.clearColor(0.0,0.0,0.0,1.0);
    // gl.clear(gl.COLOR_BUFFER_BIT);

    /*
    var VSHADER_SOURCE = 
    'void main() {\n' + 
    'gl_Position = vec4(0.5,-0.5,0.0,1.0);\n'+
    'gl_PointSize = 100.0;\n' +
    "}\n"
    */
    //attribute 传值
    var VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' +
    // 'attribute float a_PointSize;\n'+  
    // 'uniform vec4 u_Translation;\n'+   
    // 'uniform float u_CosB,u_SinB;\n'+
    // 'uniform mat4 u_xformMatrix;\n' + 
    // 'uniform mat4 u_ModelMatrix;\n' + 
    // 'attribute float a_PointSize;\n' + 
    // 'attribute vec4 a_Color;\n'+
    // 'varying vec4 v_Color;\n'+
    'attribute vec2 a_TexCoord;\n' + 
    'varying vec2 v_TexCoord;\n' + 
    'void main() {\n' + 
    // 'gl_Position = a_Position + u_Translation;\n' + 
    // 'gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;\n' + 
    // 'gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;\n' + 
    // 'gl_Position.z = a_Position.z;\n'+
    // 'gl_Position.w = 1.0;\n'+
        // 'gl_Position = u_ModelMatrix * a_Position;\n'+
        'gl_Position = a_Position;\n'+
        // 'gl_PointSize = a_PointSize;\n'+
        // 'gl_PointSize = 10.0;\n' + 
        // 'v_Color = a_Color;\n'+
        'v_TexCoord = a_TexCoord;\n'+
    '}\n';

    var FSHADER_SOURCE = 
    '#ifdef GL_ES\n'+
    'precision mediump float;\n'+
    '#endif\n'+
    // 'varying vec4 v_Color;\n'+
    'varying vec2 v_TexCoord;\n'+
    'uniform sampler2D u_Sampler;\n'+
    'void main() {\n' + 
    // 'gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n'+
        // 'gl_FragColor = v_Color;\n' + 
        'gl_FragColor = texture2D(u_Sampler,v_TexCoord);\n'+
    '}\n';

    initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
    // return;
    //获取attribute 变量
    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    //将顶点位置传输给attribute变量
    // gl.vertexAttrib3f(a_Position,0.0,-0.5,0.0);
    // gl.vertexAttrib1f(a_Position,0.5);

    /*
    var a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize');
    gl.vertexAttrib1f(a_PointSize,10.0);
    */
    //平移三角形
    /*
    var Tx = 0.5;
    var Ty = 0.5;
    var Tz = 0.0;
    var u_Translation = gl.getUniformLocation(gl.program,'u_Translation');
    gl.uniform4f(u_Translation,Tx,Ty,Tz,0.0);
    */
    //旋转角度
    var ANGLE = 60;
    var radian = Math.PI * ANGLE / 180.0;
    var cosB = Math.cos(radian);
    var sinB = Math.sin(radian);
    /*
    var u_CosB = gl.getUniformLocation(gl.program,'u_CosB');
    var u_SinB = gl.getUniformLocation(gl.program,'u_SinB');
    gl.uniform1f(u_CosB,cosB);
    gl.uniform1f(u_SinB,sinB);
    */
    //矩阵旋转
    /*
    var xformMatrix = new Float32Array([
        cosB,sinB,0.0,0.0,
        -sinB,cosB,0.0,0.0,
        0.0,0.0,1.0,0.0,
        0.25,-0.25,0.0,1.0
    ]);
    */
    //使用matrix js库
    // var xformMatrix = new Matrix4();
    // xformMatrix.scale(2,1,1);
    // xformMatrix.setRotate(ANGLE,0,0,1);
    // xformMatrix.translate(0.5,0,0.0);

    // xformMatrix.setTranslate(0.5,0,0);
    // xformMatrix.rotate(ANGLE,0,0,1);

    // var u_xformMatrix = gl.getUniformLocation(gl.program,'u_xformMatrix');
    // gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix);
    // gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix.elements);
    /*
    canvas.onmousedown = function(ev){
        click(ev,gl,canvas,a_Position);
    }
    */
    //数据缓冲区
    var n = initVertexBuffers(gl);





    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    initTextures(gl,n);

    // gl.drawArrays(gl.POINTS,0,1);
    // gl.drawArrays(gl.POINTS,0,n);
    //绘制三角形
    // gl.drawArrays(gl.TRIANGLES,0,n);

    // gl.drawArrays(gl.LINES,0,n);
    // gl.drawArrays(gl.LINE_STRIP,0,n);
    // gl.drawArrays(gl.LINE_LOOP,0,n);
    // gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
    // gl.drawArrays(gl.TRIANGLE_FAN,0,n);

    /*
    var u_ModelMatrix = gl.getUniformLocation(gl.program,'u_ModelMatrix');
    var currentAngle = 0;
    var modelMatrix = new Matrix4();
    
    var tick = function(t){
        // console.log(t);
        currentAngle = animate(currentAngle);
        draw(gl,n,currentAngle,modelMatrix,u_ModelMatrix);
        requestAnimationFrame(tick);
    }
    tick();
    */
}

function draw(gl,n,currentAngle,modelMatrix,u_ModelMatrix){
    modelMatrix.setRotate(currentAngle,0,0,1);
    modelMatrix.translate(0.35,0,0);
    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,n);
}
var g_last = Date.now();
var ANGLE_STEP = 45;
function animate(angle){
    var now = Date.now();
    var elapsed = now - g_last;
    g_last = now;
    var newAngle = angle + ANGLE_STEP / 1000 * elapsed;
    return newAngle %= 360;
}

function initVertexBuffers(gl){
    // var vertices = new Float32Array([0.0,0.5,-0.5,-0.5,0.5,-0.5]);
    //顶点和大小数据
    // var vertices = new Float32Array([0.0,0.5,10.0,
    //                                 -0.5,-0.5,20.0,
    //                                 0.5,-0.5,30.0
    //                             ]);

    //顶点和颜色数据
    // var vertices = new Float32Array([
    //     0.0,0.5,1.0,0.0,0.0,
    //     -0.5,-0.5,0.0,1.0,0.0,
    //     0.5,-0.5,0.0,0.0,1.0
    // ]);
    //包含纹理坐标的顶点数据 4边形
    var vertices = new Float32Array([
        -0.5, 0.5,0.0,1.0,
        -0.5,-0.5,0.0,0.0,
         0.5, 0.5,1.0,1.0,
         0.5,-0.5,1.0,0.0,
    ]);


    var n = 4; //顶点个数
    // var vertices = new Float32Array([-0.5,0.5,-0.5,-0.5,0.5,0.5,0.5,-0.5]);
    // var n = vertices.length / 2; //顶点个数
    //创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    //将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    //向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    //将缓存区对象分配给a_Position变量
    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    // gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    var FSIZE = vertices.BYTES_PER_ELEMENT;
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*4,0);
    //连接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    //顶点大小数据
    // var sizes = new Float32Array([10.0,20.0,30.0]);
    // var sizeBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER,sizeBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER,sizes,gl.STATIC_DRAW);
    // var a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize');
    // gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false,0,0);
    // gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false,FSIZE*3,FSIZE*2);
    // gl.enableVertexAttribArray(a_PointSize);

    // var a_Color = gl.getAttribLocation(gl.program,'a_Color');
    // gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE * 5,FSIZE * 2);
    // gl.enableVertexAttribArray(a_Color);

    var a_TexCoord = gl.getAttribLocation(gl.program,'a_TexCoord');
    gl.vertexAttribPointer(a_TexCoord,2,gl.FLOAT,false,FSIZE * 4,FSIZE * 2);
    gl.enableVertexAttribArray(a_TexCoord);

    return n;
}

function initTextures(gl,n){
    var texture = gl.createTexture();
    var u_Sampler = gl.getUniformLocation(gl.program,'u_Sampler');
    var image = new Image();
    // image.crossOrigin = '*';
    image.onload = function(){
        loadTexture(gl,n,texture,u_Sampler,image);
    }
    image.src= 'texture01.jpg';
}
function loadTexture(gl,n,texture,u_Sampler,image){
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D,texture);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);
    gl.uniform1i(u_Sampler,0);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
}


var g_points = [];
function click(ev,gl,canvas,a_Position){
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    console.log(rect);
    console.log(x + '|' + y);

    var gl_x = ((x - rect.left) - canvas.width/2) / (canvas.width/2);
    var gl_y = (canvas.height/2 - (y-rect.top)) / (canvas.height/2);
    g_points.push(gl_x);
    g_points.push(gl_y);
    gl.clear(gl.COLOR_BUFFER_BIT);
    var len = g_points.length;
    for(var i = 0; i < len; i+=2){
        gl.vertexAttrib3f(a_Position,g_points[i],g_points[i+1],0.0);
        gl.drawArrays(gl.POINTS,0,1);
    }

}