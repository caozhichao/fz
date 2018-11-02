class EventTest extends egret.Sprite{
	public constructor() {
		super();
		this.graphics.beginFill(0xFF0000);
		this.graphics.drawRect(0,0,100,100);
		this.graphics.endFill();
		this.touchEnabled = true;
		// this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
		// this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this,true);
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdd,this);
	}

	private onAdd(evt:egret.Event):void{
		// this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this,true);
		// this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin2,this,true);
		// this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
	}

	private onBegin(evt:egret.TouchEvent):void{
		egret.log('onBegin:' +  evt.target + '|' + evt.eventPhase);
		// egret.EventPhase.AT_TARGET
		evt.stopImmediatePropagation();
		// evt.stopPropagation();

	}
	private onBegin2(evt:egret.TouchEvent):void{
		egret.log('onBegin2:' +  evt.target + '|' + evt.eventPhase);
		// egret.EventPhase.AT_TARGET
		// evt.stopImmediatePropagation();
		// evt.stopPropagation();

	}
}