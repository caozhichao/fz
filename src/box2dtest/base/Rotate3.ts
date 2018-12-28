class Rotate3 extends egret.Sprite{
	private ball:Ball;
	private vr:number = -0.05;	
	public constructor() {
		super();
		this.init();
	}

	private init():void{
		this.ball = new Ball();
		this.addChild(this.ball);
		this.ball.x = 800;
		this.ball.y = 375;
		// this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		// return;
		let rotateX:number = eg.Config.STAGE_W / 2;
		let rotateY:number = eg.Config.STAGE_H / 2;
		eg.log(rotateX + "|" + rotateY);


		this.graphics.lineStyle(1);
		this.graphics.moveTo(rotateX,rotateY);
		this.graphics.lineTo(this.ball.x,this.ball.y);
		// // this.graphics.endFill();

		let rotateAngle:number = 45;

		let x1:number = this.ball.x - rotateX;
		let y1:number = this.ball.y - rotateY;

		let radius:number = rotateAngle * Math.PI / 180;
		// radius = this.vr;

		//顺时针旋转 计算公式
		// let x2:number = Math.cos(radius) * x1 - Math.sin(radius) * y1;
		// let y2:number = Math.cos(radius) * y1 + Math.sin(radius) * x1;

		//逆时针旋转计算公式
		let x2:number = Math.cos(radius) * x1 + Math.sin(radius) * y1;
		let y2:number = Math.cos(radius) * y1 - Math.sin(radius) * x1;

		this.ball.x = rotateX + x2;
		this.ball.y = rotateY + y2;

		this.graphics.moveTo(rotateX,rotateY);
		this.graphics.lineTo(rotateX+x2,rotateY+y2);





	}
	private onEnterFrame(evt:egret.Event):void{
		//围绕旋转的点
		let rotateX:number = eg.Config.STAGE_W / 2;
		let rotateY:number = eg.Config.STAGE_H / 2;
	// eg.log(rotateX + "|" + rotateY);

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