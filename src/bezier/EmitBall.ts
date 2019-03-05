module test {
	export class EmitBall extends egret.DisplayObjectContainer{
		private _img:eui.Image;
		private _speed:number = 1000;
		private degrees:number;
		private _radians:number;
		private vx:number;
		private vy:number;
		private _sId:number;
		public constructor(sId:number) {
			super();
			// this.degrees = degrees;			
			// this.radians = this.degrees * Math.PI / 180;
			// this._radians = radians;
			this._sId = sId;
			this.initUI();
		}

		private initUI():void{
			this._img = new eui.Image();
			this._img.source = 'qiu' + this._sId + '_png';
			this._img.anchorOffsetX = 32;
			this._img.anchorOffsetY = 32;
			this.addChild(this._img);
		}

		public update(passTime:number):void{
			this.vx = Math.cos(this._radians) *  this._speed / 1000 * passTime;
			this.vy = Math.sin(this._radians) * this._speed / 1000 * passTime;

			this.x += this.vx;
			this.y += this.vy;
		}

		public set radians(value:number){
			this._radians = value;
		}

		public get sId():number{
			return this._sId;
		}
	}
}