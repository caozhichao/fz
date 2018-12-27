/**
 * 缓动
 */
class Easing1 extends egret.Sprite{
	private ball:Ball;
	private easing:number = 0.1;
	private targetX:number = eg.Config.STAGE_W / 2;
	private targetY:number = eg.Config.STAGE_H / 2;
	public constructor() {
		super();
		this.init();
	}

	private init():void{
		this.ball = new Ball();
		this.addChild(this.ball);
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}
	private onEnterFrame(evt:egret.Event):void{
		let vx:number = (this.targetX - this.ball.x) * this.easing;
		let vy:number = (this.targetY - this.ball.y) * this.easing;
		this.ball.x += vx;
		this.ball.y += vy;
	}
}