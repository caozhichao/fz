class Rotate1 extends egret.Sprite{
	private ball:Ball;
	private angle:number = 0;
	private radius:number = 150;
	private vr:number = 0.05;
	public constructor() {
		super();
		this.init();
	}
	private init():void{
		this.ball = new Ball();
		this.addChild(this.ball);
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}
	private onEnterFrame(evt:egret.Event){
		this.ball.x = eg.Config.STAGE_W / 2 + Math.cos(this.angle) * this.radius;
		this.ball.y = eg.Config.STAGE_H / 2 + Math.sin(this.angle) * this.radius;
		this.angle += this.vr;

		this.graphics.clear();
		this.graphics.lineStyle(1);
		this.graphics.moveTo(eg.Config.STAGE_W/2,eg.Config.STAGE_H/2);
		this.graphics.lineTo(this.ball.x,this.ball.y);
		this.graphics.endFill();
	}
}