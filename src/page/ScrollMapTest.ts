class ScrollMapTest extends egret.Sprite{
	private map:egret.Bitmap;

	public constructor() {
		super();
		this.init();
	}	

	private init():void{
		this.map = new egret.Bitmap(RES.getRes('background_jpg'));
		this.addChild(this.map);
	}
}