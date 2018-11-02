module test {
	/**
	 * 判断点是否在三角形内部(射线法实现)
	 */
	export class RayCastingTest extends egret.Sprite{

		private pSpr:egret.Sprite;
		public constructor() {
			super();
			this.init();
		}

		private init():void{
			this.pSpr = new egret.Sprite();
			this.addChild(this.pSpr);


			//多边形的顶点坐标
			let poly:number[];
			// poly = [100,100,300,100,300,300,100,300];
			poly = [100,100,259,162,259,284,132,294,50,284,29,195];
			let p = {x:150,y:200};
			this.drawPoly(poly);
			this.drawRay(p);

			let t1 = egret.getTimer();

			for(let i:number = 0; i < 5000; i++){				
				let result = this.rayCasting(p,poly);
			}

			console.log(egret.getTimer() - t1);


			//模拟碰撞测试
			// this.addEventListener(egret.Event.ENTER_FRAME,(evt)=>{
			// 	// p.x += 2;
			// 	// this.drawRay(p);
			// 	// let result = this.rayCasting(p,poly);
			// 	let t1 = egret.getTimer();

			// 	for(let i:number = 0; i < 5000; i++){				
			// 		let result = this.rayCasting(p,poly);
			// 	}

			// 	console.log(egret.getTimer() - t1);

			// 	// console.log(result);
			// },this);
		}	

		/**
		 * 射线法
		 * @param p 点
		 * @param poly 多变型顶点 [x,y,x,y];
		 */
		private rayCasting(p:any,poly:number[]):string{

			//点
			let px = p.x;
			let py = p.y;

			let len:number = poly.length;
			let sx:number;
			let sy:number;
			let tx:number;
			let ty:number;

			let flag = false

			for(let i:number = 0,j = len - 2; i < len;j=i,i+=2){

				//判断与线段的是否相交
				sx = poly[i];
				sy = poly[i+1];
				tx = poly[j];
				ty = poly[j+1];
				// console.log('sx:' + sx + ' sy:' + sy + ' tx:' + tx + ' ty:' + ty);

				// 点与多边形顶点重合
				if((sx === px && sy === py) || (tx === px && ty === py)) {
					return 'on'
				}

				if((sy < py && ty >= py) || (sy >= py && ty < py)){
					 // 线段上与射线 Y 坐标相同的点的 X 坐标
					var x = sx + (py - sy) * (tx - sx) / (ty - sy)

					// 点在多边形的边上
					if(x === px) {
						return 'on'
					}
					// 射线穿过多边形的边界
					if(x > px) {
						flag = !flag
					}
				}
			}
			return flag ? 'in' : 'out';
		}
		private drawRay(p:any):void{

			// this.graphics.lineStyle(1,0x00FF00);
			// this.graphics.moveTo(p.x,p.y);
			// this.graphics.lineTo(p.x + 1000,p.y);
			// this.graphics.endFill();
			this.pSpr.graphics.clear();
			this.pSpr.graphics.lineStyle(1,0x00FF00);
			this.pSpr.graphics.moveTo(p.x,p.y);
			this.pSpr.graphics.lineTo(p.x + 1000,p.y);
			this.pSpr.graphics.endFill();

		}

		private drawPoly(vertex:number[]):void{

			this.graphics.lineStyle(2,0xFF0000);
			this.graphics.moveTo(vertex[0],vertex[1]);
			for(let i:number = 2; i < vertex.length;i += 2){
				this.graphics.lineTo(vertex[i],vertex[i+1]);
			}
			this.graphics.lineTo(vertex[0],vertex[0]);
			this.graphics.endFill();
		}

	}
}