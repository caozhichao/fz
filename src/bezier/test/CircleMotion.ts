module test {
	/**
	 * 
	 * 圆上运动
	 * 
	 */
	export class CircleMotion extends egret.Sprite{
		private circle:egret.Sprite;
		private speed:number = 0;
		private radius:number = 100;
		private angle:number = 0;
		public constructor() {
			super();
			this.initUI();
		}

		private initUI():void{

			this.circle = new egret.Sprite();
			this.circle.graphics.beginFill(0xff0000);
			this.circle.graphics.drawCircle(0,0,32);
			this.circle.graphics.endFill();

			this.addChild(this.circle);

			let len = 2 * Math.PI * this.radius * this.radius;
			this.speed = 360 / len   * 300;

			this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		}

		private onEnterFrame(evt:egret.Event):void{

			let radians = this.angle * Math.PI / 180;
			this.circle.x = 500 + this.radius * Math.cos(radians);
			this.circle.y = 500 + this.radius * Math.sin(radians);

			this.angle += this.speed;
		}
	}
}