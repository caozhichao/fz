module test {
	export class Ball extends egret.DisplayObjectContainer{
		private _img:eui.Image;
		private _pos:number;
		private _points:number[];
		private _sId:number;
		public constructor(pos:number,points:number[],sId:number=0) {
			super()
			this._sId = sId;
			this._pos = pos;
			this._points = points;
			this.initUI();

			this.updatePos(0);
		}

		private initUI():void{
			this._img = new eui.Image();
			this._img.source = 'qiu' + this._sId + '_png';
			this._img.anchorOffsetX = 32;
			this._img.anchorOffsetY = 32;
			this.addChild(this._img);

			// egret.Tween.get(this,{loop:true}).to({rotation:360},5000);
		}

		public updatePos(step:number):void{
			this._pos += step;	
			let px:number = this._points[this._pos * 3];
			let py:number = this._points[this._pos * 3 + 1];
			this.x = px;
			this.y = py;
		}
		public get pos():number{
			return this._pos;
		}
		
		public set pos(value:number){
			this._pos = value;
			this.updatePos(0);
		}
	}
}