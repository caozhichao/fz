module test {
	export class MatrixTest extends egret.Sprite{
		public constructor() {
			super();
			this.test();
		}

		private test():void{
			console.log(this.matrix.toString());
			let a:egret.Sprite = new egret.Sprite();
			a.graphics.beginFill(0xff0000);
			a.graphics.drawRect(0,0,100,100);
			a.graphics.endFill();

			let b:egret.Sprite = new egret.Sprite();
			b.graphics.beginFill(0x00ff00);
			b.graphics.drawRect(0,0,100,100);
			b.graphics.endFill();

			this.addChild(a);
			// this.addChild(b);

			
			// let temp:egret.Matrix = a.matrix;
			// temp.scale(0.5,1);
			// a.matrix = temp;
			// console.log(a.matrix.toString());
			// console.log(b.matrix.toString());

			a.x = 100;
			a.y = 100;

			b.x = 50;
			b.y = 50;
			a.addChild(b);

			let p:egret.Point = a.localToGlobal(50,50);
			console.log(p.toString());

			egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(evt)=>{
				console.log(evt);
			},this);

		}		
	}
}