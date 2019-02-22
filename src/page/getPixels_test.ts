module test {
	/**
	 * 
	 */
	export class getPixels_test extends egret.Sprite{
		public constructor() {
			super();
			this.initUI();
		}

		private initUI():void{
			let texture:egret.Texture = RES.getRes('red_png');
			let t1:number = egret.getTimer();
			// let bitmapData:egret.BitmapData = new egret.BitmapData();
			// let shape:egret.Shape = new egret.Shape();			
			// let texture:egret.Texture = new egret.Texture();
			let w:number = texture.textureWidth;
			let h:number = texture.textureHeight;
			let pixels = texture.getPixels(0,0,w,h);

			// for(let i:number=0; i < h;i++){
			// 	for(let j:number=0;j < w;j++){
			// 		let arr = texture.getPixels(i,j);
			// 		// console.log(arr[3]);
			// 	}
			// }
			let count:number = 0;
			for(let i:number=3;i < pixels.length;i+=4){
				// console.log(pixels[i]);
				if(pixels[i] == 255){
					count++;
				}
			}
			console.log(egret.getTimer() - t1);

			console.log('count:' + count);
			
		}
	}
}