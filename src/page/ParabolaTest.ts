module test {
	export class ParabolaTest extends eg.PageBase{
		public p:eui.Rect;
		private speed:number = 300;
		private degrees:number = -75;
		private t:number;
		private flag:boolean;
		private friction:number;
		private gravity:number;
		public constructor() {
			super();
			this.skinName = 'skins.ParabolaTestSkin';
			this.resName = ['ParabolaTest']
		}

		public initComplete(data:any):void{
			super.initComplete(data);		
			this.flag = false;
			this.friction = 0;
			this.gravity = 0;
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);	
			this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);			
		}

		private onTap(evt:egret.TouchEvent):void{
			
			this.t = egret.getTimer();
			this.flag = true;
		}

		private onEnterFrame(evt:egret.Event):void{
			if(this.flag){
				let t1:number = egret.getTimer();
				let passTime:number = t1 - this.t;
				this.t = t1;

				let radians  = Math.PI * this.degrees / 180;
				this.p.x += Math.cos(radians) * (this.speed - this.friction) / 1000 * passTime;
				this.p.y += Math.sin(radians) * (this.speed - this.friction - this.gravity) / 1000 * passTime;
				this.friction += 1;
				this.gravity += 1;
				// eg.log(this.speed - this.friction);
				eg.log(this.friction + '|' + this.gravity);
			}

		}
	}
}