
/**
 * 圆形倒计时
 */
class CircleLeftTime extends egret.Sprite{
	private _timer:egret.Timer;
	private spr:egret.Sprite;
	private angle:number = 0;
	private t1:number;
	public constructor() {
		super();
		this.init();
	}

	private init():void{

		let bg:egret.Sprite = new egret.Sprite();
		bg.graphics.beginFill(0x0000ff);
		bg.graphics.drawCircle(0,0,100);
		bg.graphics.beginFill(0x0);
		bg.graphics.drawCircle(0,0,80);
		bg.graphics.endFill();

		this.addChild(bg);
		bg.x = 200;
		bg.y = 200;

		let spr:egret.Sprite = new egret.Sprite();
		// spr.graphics.beginFill(0xff0000);
		// spr.graphics.lineStyle(1,0x00ff00);
		// spr.graphics.moveTo(0,0);
		// spr.graphics.lineTo(100,0);
		// spr.graphics.drawArc(0,0,100,0,180 * Math.PI / 180,false);

		// spr.graphics.moveTo(0,0);

		// spr.graphics.endFill();
		
		this.addChild(spr);

		spr.x = 200;
		spr.y = 200;

		bg.mask = spr;

		this.spr = spr;

		// this._timer = new egret.Timer(1000,10);
		// this._timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		// this._timer.start();

		this.t1 = egret.getTimer();
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}

	private onEnterFrame(evt:egret.Event):void{
		let t2 = egret.getTimer();
		this.angle = 360 / 10000 * (t2 - this.t1);  //根据时间计算出旋转的角度
		if(this.angle > 360){
			this.angle = 0; //  不能使用360 
		}

		// this.angle += (360 / 10);

		let spr = this.spr;

		spr.graphics.clear();

		spr.graphics.beginFill(0xff0000);
		// spr.graphics.lineStyle(1,0x00ff00);
		spr.graphics.moveTo(0,0);
		spr.graphics.lineTo(100,0);
		spr.graphics.drawArc(0,0,100,0,this.angle * Math.PI / 180,true); // true false  正反向绘制 默认 倒计时，或者进度条
		spr.graphics.moveTo(0,0);
		spr.graphics.endFill();
	}

	private onTimer(evt:egret.TimerEvent):void{

		this.angle += (360 / 10);

		let spr = this.spr;

		spr.graphics.clear();

		spr.graphics.beginFill(0xff0000);
		spr.graphics.lineStyle(1,0x00ff00);
		spr.graphics.moveTo(0,0);
		spr.graphics.lineTo(100,0);
		spr.graphics.drawArc(0,0,100,0,this.angle * Math.PI / 180,true);
		spr.graphics.moveTo(0,0);
		spr.graphics.endFill();
	}

}