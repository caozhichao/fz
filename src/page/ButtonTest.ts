module test {
	export class ButtonTest extends eg.PageBase{
		private _spr:egret.Sprite;
		private mm:egret.Matrix;
		public constructor() {
			super();
		}
		public initComplete(data:any):void{
			super.initComplete(data);
			let spr:egret.Sprite = new egret.Sprite();
			spr.graphics.beginFill(0xff0000);
			spr.graphics.drawRect(0,0,100,100);
			spr.graphics.endFill();

			this.addChild(spr);

			this.mm = new egret.Matrix();

			this._spr = spr;
			spr.touchEnabled = true;
			spr.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
			spr.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
		}

		private onBegin(evt:egret.TouchEvent):void{
			// this._spr.scaleX = this._spr.scaleY = 0.5;
			// this.mm.translate(this._spr.width * 0.2,this._spr.height * 0.2);
			// this.mm.scale(0.8,0.8);
			let mm = new egret.Matrix();
			mm.scale(0.8,0.8);
			mm.translate(this._spr.width * 0.2 / 2,this._spr.height * 0.2 / 2);
			this._spr.matrix = mm;
			// this._spr.x += (1 - 0.5) * this._spr.width / 2;
			// this._spr.y += (1-0.5) * this._spr.height / 2;
			console.log(this._spr.scaleX + '|' + this._spr.scaleY);
		}
		private onEnd(evt:egret.TouchEvent):void{
			// this._spr.scaleX = this._spr.scaleY = 1;
			// this.mm.translate(0,0);
			// this.mm.scale(1,1);
			let aa = new egret.Matrix();
			aa.scale(1,1);
			this._spr.matrix = aa;

			console.log(this._spr.scaleX + '|' + this._spr.scaleY);
			// let w = this._spr.width / 0.8;


		}
	}
}