
/**
 * 图片加载测试
 */
class ImageLoaderTest extends egret.Sprite{
	public constructor() {
		super();
		this.init();
	}

	private async init(){
		// return;
		let url = 'http://hf.rongyi.com/o2o/v4/ly/fd/resource/assets/game/images/game/game_bg_c5c6640c.png'
		url = 'resource/assets/game/images/bg.png?v=' + Date.now();
		// url = 'http://thirdwx.qlogo.cn/mmopen/vi_32/3qUuuVRJ5Kg1zfd1Lxyl3ZzbTPZqlXxrAwcVOcEFGb27fbUq5yEDVI2qme9W03WVntW5VoUx5I0ey2vIf1ywgw/132';
		// url = 'http://www.baidu.com/img/jijian%20pad_13db91458cc0573abbf3055bc9c1d15b.png';
		// url = 'http://10.1.100.76:5036/resource/assets/game/images/bg.png';
		// let imageLoader:egret.ImageLoader = new egret.ImageLoader();		
		// imageLoader.load(url);

		// let result = await eg.get(url,egret.HttpResponseType.ARRAY_BUFFER);
		/*
		console.log(result);
		// var blob = new Blob([result]);
		var blob = new Blob([result], { type: "image/png" });
        var img = document.createElement("img");
        img.onload = function (e) {
            window.URL.revokeObjectURL(img.src); // 清除释放;
        };
        img.src = window.URL.createObjectURL(blob);
        document.body.appendChild(img);
		*/

		// var uInt8Array = new Uint8Array(result as ArrayBuffer);
		// var i = uInt8Array.length;
		// var binaryString = new Array(i);
		// while (i--) {
		// 	binaryString[i] = String.fromCharCode(uInt8Array[i]);
		// }
		// var data = binaryString.join('');

		//转出ArrayBuffer 为base64字符串显示
		// let t1 = egret.getTimer();
		// var data = eg.transformArrayBufferToBase64(result as ArrayBuffer);
		// var data = egret.Base64Util.encode(result as ArrayBuffer);
		// console.log('time:' + (egret.getTimer() - t1));
		// var img = document.createElement("img");
		// img.src = "data:image/png;base64," + data;
		// document.body.appendChild(img);

		// let img:eui.Image = new eui.Image();
		// img.source = "data:image/png;base64," + data;
		// img.source = url;
		// this.addChild(img);

		// setTimeout(()=> {
		// 	//draw
		// 	let renderTexture:egret.RenderTexture = new egret.RenderTexture();
		// 	renderTexture.drawToTexture(this);
		// 	let bmp:egret.Bitmap = new egret.Bitmap(renderTexture);
		// 	bmp.x = 100;
		// 	bmp.y = 100;
		// 	this.addChild(bmp);			
		// }, 2000);

		let buffer:ArrayBuffer = RES.getRes('bg_png');
		console.log(buffer.byteLength);
		// let t1 = egret.getTimer();
		// var data = egret.Base64Util.encode(buffer);
		// console.log('time:' + (egret.getTimer() - t1));
		// var img = document.createElement("img");
		// img.src = "data:image/png;base64," + data;
		// document.body.appendChild(img);
		let bitmap:egret.Bitmap = new egret.Bitmap();
		let texture:egret.Texture = new egret.Texture();
		let bitmapData:egret.BitmapData = egret.BitmapData.create('arraybuffer',buffer,(bitmapData:egret.BitmapData)=>{
			texture.bitmapData = bitmapData;
			// this.addChild(new egret.Bitmap(texture));
			bitmap.texture = texture;
		});

		this.addChild(bitmap);

		let s:egret.Sprite = new egret.Sprite();
		s.graphics.beginFill(0xff0000);
		s.graphics.drawRect(0,0,150,150);
		s.graphics.endFill();
		this.addChild(s);
		s.blendMode = egret.BlendMode.ERASE;

		



	}

	/***
	 * ArrayBuffer 二进制数据转换为Base64字符串
	 * 应用如:图片的二进制数据转换为base64字符串显示
	 * 
	 */
	transformArrayBufferToBase64 (buffer) {
		var binary = '';
		var bytes = new Uint8Array(buffer);
		for (var len = bytes.byteLength, i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	}



}