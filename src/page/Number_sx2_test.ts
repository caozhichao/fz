module sx {
	export class Number_sx2_test extends eg.PageBase{
		public _btn_tips:eui.Button;
		public _btn_reset:eui.Button;
		private _sx:Number_sx2;
		private _timer:egret.Timer;
		public constructor() {
			super();
			this.skinName = 'skins.NumberSXSkin';
		}
		public initUI(data:any):void{
			super.initUI(data);
			let sx:Number_sx2 = new Number_sx2();
			sx.x = 100;
			sx.y = 200;
			this.addChild(sx);
			this._sx = sx;
			this._btn_tips.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);	
			this._btn_reset.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReset,this);	

			this._timer = new egret.Timer(1000);	
			this._timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
			this._timer.start();
		}

		private onTimer(evt:egret.TimerEvent):void{
			eg.log('test state:' + this._sx.state);
			if(this._sx.state == 0){
				this.onReset(null);
			}
		}

		private onTap(evt:egret.TouchEvent):void{
			this._sx.nodeTips();
		}

		private onReset(evt:egret.TouchEvent):void{
			this._sx.reset();
		}
	}
}