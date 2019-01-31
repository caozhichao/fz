module sx {
	export class Number_sx2_test extends eg.PageBase{
		public _btn_tips:eui.Button;
		public _btn_reset:eui.Button;
		private _sx:Number_sx2;
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
		}

		private onTap(evt:egret.TouchEvent):void{
			this._sx.nodeTips();
		}

		private onReset(evt:egret.TouchEvent):void{
			this._sx.reset();
		}
	}
}