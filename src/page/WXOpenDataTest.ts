module test {
	export class WXOpenDataTest extends egret.Sprite{
		public constructor() {
			super();
			this.init();
		}

		private init():void{

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
			
			let bitmap = window['platform'].openDataContext.createDisplayObject(null, 320,320);
			bitmap.x = 100;
			bitmap.y = 200;
            this.addChild(bitmap);


			let openDataContext = wx['getOpenDataContext']();
			openDataContext.postMessage({
				command: 'loadRes',
				year: (new Date()).getFullYear()
			})

			eg.Config.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt)=>{
				openDataContext.postMessage({
				command: 'open',
				year: (new Date()).getFullYear()
			})
			},this);

		}
	}
}