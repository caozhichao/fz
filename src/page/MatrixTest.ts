module test {
	export class MatrixTest extends egret.Sprite{
		public constructor() {
			super();
			// this.test();
			this.test2();
		}

		private test2():void{

			/*
			let m = new egret.Matrix();
			m.rotate(90 * Math.PI / 180);			
			// m.translate(10,0);
			m.scale(2,1);
			let result = new egret.Point();
			m.transformPoint(10,0,result);

			console.log(result);

			let radian = 90 * Math.PI / 180;
			// console.log(Math.cos(radian));
			let x = 10;
			let y = 0;
			let x1 = x * Math.cos(radian) - y * Math.sin(radian);
			let y1 = x * Math.sin(radian) + y * Math.cos(radian);
			console.log('x1:' + x1 + ' y1:' + y1);
			*/
			let spr:egret.Sprite = new egret.Sprite();
			spr.graphics.beginFill(0xff0000);
			spr.graphics.drawRect(0,0,100,50);
			spr.graphics.endFill();
			this.addChild(spr);
			spr.anchorOffsetX = 50;
			spr.anchorOffsetY = 25;

			let m:egret.Matrix = new egret.Matrix();
			// m.rotate(45);
			// m.translate(100,100);
			m.translate(100,100);
			m.rotate(45);
			
			spr.matrix = m;

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

			// let p:egret.Point = a.localToGlobal(50,50);
			// console.log(p.toString());

			egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(evt)=>{
				// console.log(evt);
				console.log(a.matrix);
				console.log(b.matrix);

				let p:egret.Point = a.localToGlobal(b.x,b.y);
				console.log(p.toString());
				let m = new egret.Matrix();
				m.concat(a.matrix);
				// m.concat(b.matrix);
				console.log('----------------');
				let p2 = m.transformPoint(b.x,b.y);
				console.log(p2);

			},this);

			let mm = new egret.Matrix();
			mm.tx = 100;
			mm.ty = 100;
			mm.scale(0.5,0.5);

			console.log(mm);
		}		
	}
}