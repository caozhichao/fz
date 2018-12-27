class Velocity1 extends egret.Sprite{
	private ball:Ball;
	// private vx:number = 5;
	// private vy:number = 5;
	private angle:number = 45;
	private speed:number = 3;
	private friction:number = 0.01;
	public constructor() {
		super();
		this.init();
	}

	private init():void{
		this.ball = new Ball();
		this.ball.x = 300;
		this.ball.y = 200;
		this.addChild(this.ball);
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}

	private onEnterFrame(evt:egret.Event):void{

		// this.ball.x += this.vx;
		// this.ball.y += this.vy;
		if(this.speed > this.friction){
			this.speed -= this.friction;
		} else {
			this.speed = 0;
		}
		let radians:number = this.angle * Math.PI / 180;
		let vx:number = Math.cos(radians) * this.speed;
		let vy:number = Math.sin(radians) * this.speed;
		this.ball.x += vx;
		this.ball.y += vy;

		/*
		let left:number = 0;
		let right:number = eg.Config.STAGE_W;
		let top:number = 0;
		let bottom:number = eg.Config.STAGE_H;

		if(this.ball.x + this.ball.radius > right){
			this.ball.x = right - this.ball.radius;
			this.vx *= -1;
		} else if(this.ball.x - this.ball.radius < left){
			this.ball.x = left + this.ball.radius;
			this.vx *= -1;
		} else if(this.ball.y + this.ball.radius > bottom){
			this.ball.y = bottom - this.ball.radius;
			this.vy *= -1;
		} else if(this.ball.y - this.ball.radius < top){
			this.ball.y = top + this.ball.radius;
			this.vy *= -1;
		}
		*/


	}
}