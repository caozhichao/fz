
/**
 * 环绕旋转公式
 */
class Rotate2 extends egret.Sprite{
	private ball:Ball;
	private vr:number = 0.05;	
	public constructor() {
		super();
		this.init();
	}

	private init():void{
		this.ball = new Ball();
		this.addChild(this.ball);
		this.ball.x = 500;
		this.ball.y = 300;
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}
	private onEnterFrame(evt:egret.Event):void{
		//围绕旋转的点
		let rotateX:number = eg.Config.STAGE_W / 2;
		let rotateY:number = eg.Config.STAGE_H / 2;

		let x1:number = this.ball.x - rotateX;
		let y1:number = this.ball.y - rotateY;

		let x2:number = Math.cos(this.vr) * x1 - Math.sin(this.vr) * y1;
		let y2:number = Math.cos(this.vr) * y1 + Math.sin(this.vr) * x1;
		this.ball.x = rotateX + x2;
		this.ball.y = rotateY + y2;
		
		this.graphics.clear();
		this.graphics.lineStyle(1);
		this.graphics.moveTo(rotateX,rotateY);
		this.graphics.lineTo(this.ball.x,this.ball.y);
		this.graphics.endFill();


	}
}