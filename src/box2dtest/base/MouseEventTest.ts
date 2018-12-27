class MouseEventTest extends egret.Sprite{
	public constructor() {
		super();
		this.init();
	}

	private init():void{

		let ball:Ball = new Ball();
		ball.touchEnabled = true;
		ball.x = 100;
		ball.y = 100;
		this.addChild(ball);
		ball.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this,true);
		ball.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
		ball.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
	}

	private onBegin(evt:egret.TouchEvent):void{
		eg.log('mouse down - ball');
	}
	private onEnd(evt:egret.TouchEvent):void{
		eg.log('mouse end - ball');
	}
	private onMove(evt:egret.TouchEvent):void{
		eg.log('mouse move - ball');
	}

}