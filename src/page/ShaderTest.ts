module test {
	export class ShaderTest extends egret.Sprite{
		public constructor() {
			super();
			this.test1();
            this.test2();
		}

        private test2(){

            for(let i:number = 0; i < 1; i+=0.1){
                console.log(i % 0.1);
            }

        }


		private test1():void{
			let spr:egret.Sprite = new egret.Sprite();
			spr.graphics.beginFill(0xff0000);
			spr.graphics.drawRect(0,0,500,500);
			spr.graphics.endFill();
			this.addChild(spr);		

			let vertexSrc =
            "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +

            "uniform vec2 projectionVector;\n" +

            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +

            "const vec2 center = vec2(-1.0, 1.0);\n" +

            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord;\n" +
            "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
            "}";

			let fragmentSrc4 = [
            "precision lowp float;\n" +
            "varying vec2 vTextureCoord;",
            "varying vec4 vColor;\n",
            "uniform sampler2D uSampler;",

            "uniform float lineWidth;",
            "uniform float offset;",
            "uniform float offset1;",

            "void main()",
            "{",
            "vec2 uv = vTextureCoord.xy;",
            "vec2 texCoord = uv;",

            "float modPart = mod(vTextureCoord.y, lineWidth);",
            "float solidPart = (1.0 - offset) * lineWidth;",

            // "if(modPart < solidPart) {",
            // "gl_FragColor = texture2D(uSampler, texCoord);",
            // "} else {",
            // "gl_FragColor = vec4(0., 0., 0., 1.);",
            "if(vTextureCoord.y<offset || vTextureCoord.y > offset1){",
                "gl_FragColor=texture2D(uSampler, texCoord);",
            "}else{",            
                "gl_FragColor=vec4(0.0,0.0,0.0,0.0);",
            "}",
            "}"
        	].join("\n");	

			 let customFilter4 = new egret.CustomFilter(
                                vertexSrc,
                                fragmentSrc4,
                                {
                                    lineWidth: 0.5,
                                    offset: 0.5,
                                    offset1: 0.5
                                }
                            );

            // spr.filters = [fragmentSrc4];

            spr.filters = [customFilter4];
            // customFilter4.uniforms.offset = 0.5;
            this.addEventListener(egret.Event.ENTER_FRAME,()=>{
                 customFilter4.uniforms.offset -= 0.001;
                if (customFilter4.uniforms.offset <= 0) {
                    customFilter4.uniforms.offset = 0.5;
                }

                 customFilter4.uniforms.offset1 += 0.001;
                if (customFilter4.uniforms.offset1 > 1.0) {
                    customFilter4.uniforms.offset1 = 0.5;
                }

            },this);
		}
	}
}