module test {
	export class BezierShape extends egret.Sprite{
		private tf:egret.TextField;
		public index:number;
		public constructor(color:number,index:number) {
			super();
			this.index = index;
			this.initUI(color,index);
		}

		private initUI(color,index):void{
			this.graphics.beginFill(color);
			this.graphics.drawCircle(0,0,20);
			this.graphics.endFill();
			this.touchEnabled = true;

			this.tf = new egret.TextField();
			this.tf.text = index + "";
			this.tf.size = 12;
			this.addChild(this.tf);
			// this.touchChildren = true;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
		}

		private onBegin(evt:egret.TouchEvent):void{

			this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
			this.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
		}

		private onMove(evt:egret.TouchEvent):void{
			this.x = evt.stageX;
			this.y = evt.stageY;
		}

		private onEnd(evt:egret.TouchEvent):void{
			console.log('onEnd');
			evt.stopImmediatePropagation();
			// evt.stopPropagation();
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
			this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);

			eg.EventDispatcher.Instance.dispatchEventWith('reset_draw');

		}



	}
}