class EaseToMouse extends egret.Sprite{
	private ball:Ball;
	private easing:number = 1;

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
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		eg.Config.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);		
	}

	private onTouchMove(evt:egret.TouchEvent):void{
		eg.log(evt.stageX + '|' + evt.stageY);
		this.tx = evt.stageX;
		this.ty = evt.stageY;

		this.flag = true;
	}

	private onEnterFrame(evt:egret.Event):void{
		if(this.flag){
			let vx:number = (this.tx - this.ball.x) * this.easing;
			let vy:number = (this.ty - this.ball.y) * this.easing;
			this.ball.x += vx;
			this.ball.y += vy;
		}
	}

}