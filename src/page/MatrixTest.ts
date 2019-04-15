module test {
	/***
	 * 矩阵
	 * https://www.cnblogs.com/alantu2018/p/8528299.html
	 * 
	 * 动态注册点
	 * https://www.cnblogs.com/kenkofox/p/3305241.html
	 * 
	 */
	export class MatrixTest extends egret.Sprite{
		public constructor() {
			super();
			// this.test();
			// this.test2();
			this.test3();
		}

		private test3():void{
			let matrix:egret.Matrix = new egret.Matrix();
			matrix.translate(1,0);
			matrix.scale(0.5,0.5);
			let p = new egret.Point(1,1);
			matrix.transformPoint(p.x,p.y,p);
			console.log(p.x + '|' + p.y);
		}

		private test2():void{

			let container = new egret.Sprite();
			container.graphics.beginFill(0x0);
			container.graphics.drawRect(0,0,300,300);
			container.graphics.endFill();

			container.x = 150;
			container.y = 150;

			let spr = new egret.Sprite();
			spr.graphics.beginFill(0xff0000,1);
			spr.graphics.drawRect(0,0,100,100);
			spr.graphics.endFill();
			// spr.x = 50;
			// spr.anchorOffsetX = 50;
			// spr.anchorOffsetY = 50;

			container.addChild(spr);
			this.addChild(container);

			let resultPoint = new egret.Point();
			// let m:egret.Matrix = spr.matrix;
			// m.transformPoint(100,0,resultPoint);

			// m = container.matrix;
			// m.transformPoint(resultPoint.x,resultPoint.y,resultPoint);

			// let m1 = container.matrix;
			// let m1 = spr.matrix;

			let m:egret.Matrix = new egret.Matrix();
			// m.copyFrom(spr.matrix);
			// m.prepend(m1.a,m1.b,m1.c,m1.d,m1.tx,m1.ty);
			// m.transformPoint(100,0,resultPoint);
			// m.copyFrom(container.matrix).append(m1.a,m1.b,m1.c,m1.d,m1.tx,m1.ty);
			// m.transformPoint(0,0,resultPoint);
			// console.log(resultPoint);

			// m.translate(10,0);

			// let m1:egret.Matrix = new egret.Matrix();
			// m1.translate(10,0);

			// // m.concat(m1);
			// m.append(m1.a,m1.b,m1.c,m1.d,m1.tx,m1.ty);


			// m.translate(10,0);

			// m.transformPoint(0,0,resultPoint);

			// m.invert();

			// m.transformPoint(resultPoint.x,resultPoint.y,resultPoint);
			spr.x = 100;
			m = spr.matrix.clone();
			// m.translate(-50,-50);
			// m.translate(100,0);
			// m.translate(0,0);
			// m.rotate(45 * Math.PI / 180);
			// m.translate(50,50);
			// spr.matrix = m;
			// m.translate(0,0);
			
			this.addEventListener(egret.Event.ENTER_FRAME,(evt)=>{
				// spr.rotation += 1;
				m.translate(-100,0);
				m.rotate(2 * Math.PI / 180);
				m.translate(100,0);
				spr.matrix = m;
			},this)

			console.log('aaa');






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
			/*
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
			*/

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