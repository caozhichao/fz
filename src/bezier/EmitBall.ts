module test {
	export class EmitBall extends egret.DisplayObjectContainer{
		private _img:eui.Image;
		private _speed:number = 1000;
		private degrees:number;
		private radians:number;
		private vx:number;
		private vy:number;
		public constructor(radians:number) {
			super();
			// this.degrees = degrees;			
			// this.radians = this.degrees * Math.PI / 180;
			this.radians = radians;
			this.initUI();
		}

		private initUI():void{
			this._img = new eui.Image();
			this._img.source = 'qiu1_png';
			this._img.anchorOffsetX = 32;
			this._img.anchorOffsetY = 32;
			this.addChild(this._img);
		}

		public update(passTime:number):void{
			this.vx = Math.cos(this.radians) *  this._speed / 1000 * passTime;
			this.vy = Math.sin(this.radians) * this._speed / 1000 * passTime;

			this.x += this.vx;
			this.y += this.vy;
		}
	}
}