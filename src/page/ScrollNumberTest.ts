
/**
 * 数字缓动 
 */
class ScrollNumberTest extends egret.Sprite{
	private easing:number = 0.05;
	private num:number = 1000;
	private cur:number = 0;
	private label:eui.Label;
	public constructor() {
		super();
		this.init();
	}

	private init():void{
		let num = 1000;

		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);

		this.label = new eui.Label();
		this.label.x = 200;
		this.label.y = 200;
		this.addChild(this.label);
	}
	private onEnterFrame(evt:egret.TouchEvent):void{

		this.cur += (this.num - this.cur) * this.easing;
		if(this.num - this.cur < 1){
			this.cur = this.num;
			this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		}
		console.log(this.cur);
		this.label.text = Math.floor(this.cur) + "";

	}
}