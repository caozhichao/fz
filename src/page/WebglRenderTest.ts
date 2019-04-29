class WebglRenderTest extends egret.Sprite{
	public constructor() {
		super();
		console.log('WebglRenderTest');
		// this.graphics.beginFill(0xff0000);
		// this.graphics.drawRect(0,0,400,300);
		// this.graphics.endFill();

		// RES.getResByUrl('resource/assets/game/gold.png',(evt)=>{
		// 	console.log('a');
		// },this);	

		// let image:eui.Image = new eui.Image('resource/assets/game/images/gold.png');			
		// this.addChild(image);
		let imageLoader:egret.ImageLoader = new egret.ImageLoader();
		imageLoader.addEventListener(egret.Event.COMPLETE,(evt)=>{
			console.log(evt);
			let texture:egret.Texture = new egret.Texture();
			texture._setBitmapData(imageLoader.data);

			let bmp1:egret.Bitmap = new egret.Bitmap(texture);

			this.addChild(bmp1);

			let bmp2:egret.Bitmap = new egret.Bitmap(texture);

			bmp2.y = 200;
			this.addChild(bmp2);


			

		},this);
		imageLoader.load('resource/assets/game/images/gold.png');
	}
}