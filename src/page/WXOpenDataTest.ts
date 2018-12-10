module test {
	export class WXOpenDataTest extends egret.Sprite{
		public constructor() {
			super();
			this.init();
		}

		private init():void{
			// this.graphics.beginFill(0xFFFF);
			// this.graphics.drawRect(0,0,eg.Config.STAGE_W,eg.Config.STAGE_H);
			// this.graphics.endFill();

			eg.log('init');
		// 	let sharedCanvas = window["sharedCanvas"];
		// 	eg.log('sharedCanvas:' + sharedCanvas);

		// 	sharedCanvas.width = 320;
		// 	sharedCanvas.height = 320;
		// 	let bmd:egret.BitmapData = new egret.BitmapData(sharedCanvas);

		// 	let texture:egret.Texture = new egret.Texture();
		// 	texture._setBitmapData(bmd);

		// // 	const bitmapdata = new egret.BitmapData(sharedCanvas);
        // // bitmapdata.$deleteSource = false;
        // // const texture = new egret.Texture();
        // // texture._setBitmapData(bitmapdata);
        // // const bitmap = new egret.Bitmap(texture);
        // // bitmap.width = width;
        // // bitmap.height = height;

		// 	let bmp:egret.Bitmap = new egret.Bitmap(texture);

		// 	bmp.width = 320;
        // 	bmp.height = 320;
		// 	this.addChild(bmp);

			 //主要示例代码开始
			
			let bitmap = window['platform'].openDataContext.createDisplayObject(null, 556,830);
			// 必须设置这个大小
		// 	sharedCanvas.width = width;
		// sharedCanvas.height = height
			bitmap.x = 100;
			bitmap.y = 200;
            this.addChild(bitmap);
// a:0.5859375
// b:0
// c:0
// d:0.5861159929701231
// h:200
// tx:119.53125
// ty:160.0096660808436
// type:"changeMatrix"
// w:200	

			let m:egret.Matrix = new egret.Matrix();
			m.tx = 100;
			m.ty = 200;
			let h = eg.Config.STAGE_W * egret.Capabilities.boundingClientHeight / egret.Capabilities.boundingClientWidth;
			m.scale(egret.Capabilities.boundingClientWidth / eg.Config.STAGE_W,egret.Capabilities.boundingClientHeight / h);

			let openDataContext = wx['getOpenDataContext']();
			openDataContext.postMessage({
				type:'changeMatrix',
				a:m.a,
				b:m.b,
				c:m.c,
				d:m.d,
				h:830,
				tx:m.tx,
				ty:m.ty,
				w:556
			})

			openDataContext.postMessage({
				command: 'loadRes',
				year: (new Date()).getFullYear()
			})

			// eg.Config.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt)=>{
			// 	openDataContext.postMessage({
			// 	command: 'open',
			// 	year: (new Date()).getFullYear()
			// })
			// },this);
			setTimeout(function() {
				openDataContext.postMessage({
					command: 'open',
					year: (new Date()).getFullYear()
				})
			}, 2000);

		}
	}
}