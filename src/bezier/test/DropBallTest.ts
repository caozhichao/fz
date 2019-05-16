module test {
	/**
	 * 祖玛 落球入槽，过程测试
	 */
	export class DropBallTest extends eg.PageBase{
		public c1:eui.Rect;
		public c2:eui.Rect;
		public c3:eui.Rect;
		public _btn:eui.Button;
		// private _speed:number = 3;
		private emitBall:EmitBall;
		private t1:number;
		
		public constructor() {
			super();
			this.skinName = 'skins.DropBallTestSkin';
		}

		public initComplete():void{
			super.initComplete(null);

			this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTest,this);
			// this.t1 = egret.getTimer();
			// this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);

			this.emitBall = new EmitBall(1);
			this.addChild(this.emitBall);
		}

		private onEnterFrame(evt:egret.Event):void{

			let t2:number = egret.getTimer();
			if(this.emitBall){
				this.emitBall.update(t2 - this.t1);
			}
			this.t1 = t2;		
			let b = this.checkCollision();	
			if(b){
				this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
				//落球
				this.dropBall();

			}
		}

		/**
		 * 落球移动处理
		 */
		private dropBall():void{
			let startAngle:number = Math.atan2(this.emitBall.y - this.c1.y,this.emitBall.x - this.c1.x) * 180 / Math.PI;
			let endAngle:number = Math.atan2(this.c3.y - this.c1.y,this.c3.x-this.c1.x) * 180 / Math.PI;

			// startAngle = startAngle < 0?360+startAngle:startAngle;
			// endAngle = endAngle < 0?360+endAngle:endAngle;

			//计算角度间的间隔  从最短的路径移动，（圆上，分解成，顺时针，逆时针问题）
			let dis = Math.abs( (startAngle < 0?360+startAngle:startAngle)   -  (endAngle < 0?360+endAngle:endAngle) );
			if(dis <= 180){
				startAngle = startAngle < 0?360+startAngle:startAngle;
				endAngle = endAngle < 0?360+endAngle:endAngle;
			}


			console.log('startAngle:' + startAngle + ' endAngle:' + endAngle);
			let obj = {angle:startAngle};
			egret.Tween.get(obj,{loop:false,onChange:()=>{
				// console.log(obj.angle);
				// this.emitBall.x = 
				let radians = obj.angle * Math.PI / 180;
				this.emitBall.x = this.c1.x + 64 * Math.cos(radians);
				this.emitBall.y = this.c1.y + 64 * Math.sin(radians);

				console.log(obj.angle + '|' + this.emitBall.x + "|" + this.emitBall.y);

			},onChangeObj:this}).to({angle:endAngle},200);
		}

		private checkCollision():boolean{
			let dis:number = (this.c1.x - this.emitBall.x)*(this.c1.x - this.emitBall.x) + (this.c1.y - this.emitBall.y)*(this.c1.y - this.emitBall.y);							
			let b = dis <= 64 * 64;
			return b;
		}

		private onTest(evt:egret.TouchEvent):void{
			this.emitBall.x = this.c2.x;			
			this.emitBall.y = this.c2.y;
			this.emitBall.radians = Math.atan2(this.c1.y - this.emitBall.y,this.c1.x - this.emitBall.x);

			this.t1 = egret.getTimer();
			this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		}
	}
}