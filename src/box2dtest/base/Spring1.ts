class Spring1 extends egret.Sprite{
	private ball:Ball;
	private spring:number = 0.1;
	private targetX:number = eg.Config.STAGE_W / 2;
	private targetY:number = eg.Config.STAGE_H / 2;
	private vx:number = 0;
	private vy:number = 0;

	private friction:number = 0.95;
	private gravity:number = 50;

	private tx:number;
	private ty:number;
	private flag:boolean = false;


	public constructor() {
		super();
		this.init();
	}

	private init():void{

		this.ball = new Ball();
		this.addChild(this.ball);

		// this.ball.y = eg.Config.STAGE_H / 2;

		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);

		eg.Config.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchMove,this);		
	}

	private onTouchMove(evt:egret.TouchEvent):void{
		eg.log(evt.stageX + '|' + evt.stageY);
		this.tx = evt.stageX;
		this.ty = evt.stageY;
		this.flag = true;

		this.vx = 0;
		this.vy = 0;
	}


	private onEnterFrame(evt:egret.Event):void{
		if(!this.flag){
			return;
		}
		// let dx:number = this.targetX - this.ball.x;
		// let dy:number = this.targetY - this.ball.y;
		let dx:number = this.tx - this.ball.x;
		let dy:number = this.ty - this.ball.y;
		let ax:number = dx * this.spring;
		let ay:number = dy * this.spring;
		this.vx += ax;
		this.vy += ay;
		this.vy += this.gravity;

		this.vx *= this.friction;
		this.vy *= this.friction;
		this.ball.x += this.vx;
		this.ball.y += this.vy;
		// eg.log('dx:' + dx + 'ax:' + ax + 'vx:' + this.vx);

		this.graphics.clear();
		this.graphics.lineStyle(1);
		this.graphics.moveTo(this.ball.x,this.ball.y);
		this.graphics.lineTo(this.tx,this.ty);
	}
}