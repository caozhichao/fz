module test {
	/**
	 * 设两个点是（x1,y1),(x2,y2)
	   那么两点连线的中点坐标是[（x1+x2)/2,(y1+y2)/2]
	   https://zhidao.baidu.com/question/515374396.html
	 */
	export class BezierTest extends egret.Sprite{
		private c:egret.Sprite;
		public constructor() {
			super();
			this.initUI();
		}
		private initUI():void{
			var MapArray:number[][] = [[879,57],[832,55],[648,48],[418,49],[142,68],[66,134],
									[50,225],[53,335],[76,458],[135,542],[300,559],
									[546,558],[677,542],[741,491],[746,378],[734,259],
									[679,155],[564,150],[336,159],[180,193],[158,262],
									[154,351],[207,434],[312,484],[482,474],[591,456],
									[635,384],[613,277],[473,234],[309,251],[289,356]];
			MapArray = [[300,300],[400,300],[400,400]];

			// this.initMap(MapArray);
			// this.drawPoints(MapArray);

			this.c = new egret.Sprite();
			this.c.graphics.beginFill(0xff0000);
			this.c.graphics.drawCircle(0,0,10);
			this.c.graphics.endFill();
			// this.c.x = MapArray[0][0];
			// this.c.y = MapArray[0][1];

			this.addChild(this.c);

			// let vars = {t:0};
			// egret.Tween.get(vars,{onChange:()=>{
			// 	console.log('t:' + vars.t);
			// }}).to({t:1},1000);
			//(1−t)2P0+2t(1−t)P1+t2P2
			// (1 - t)^2 P0 + 2 t (1 - t) P1 + t^2 P2;
			// let p0x = MapArray[0][0];
			// let p0y = MapArray[0][1];

			// let p1x = MapArray[1][0];
			// let p1y = MapArray[1][1];

			// let p2x = MapArray[2][0];
			// let p2y = MapArray[2][1];

			// let lastX = p0x;
			// let lastY = p0y;
			// let flag = true;
			// this.addEventListener(egret.Event.ENTER_FRAME,(evt)=>{

			// 	if(flag){
			// 		vars.t += 0.001;
			// 		let t = vars.t;
			// 		// console.log(t);
			// 		if( Math.abs(t - 1) < 0.0000000000001){
			// 			console.log("结束");
			// 			flag = false;
			// 		} else {
			// 			let cx= (1-t) * (1-t) * p0x + 2 * t * (1-t) * p1x + t * t * p2x;
			// 			let cy = (1-t) * (1-t) * p0y + 2 * t * (1-t) * p1y + t * t * p2y;
			// 			let dis = Math.sqrt( (cx - lastX) * (cx - lastX) +  (cy - lastY) * (cy - lastY) );
			// 			console.log(dis);

			// 			lastX = cx;
			// 			lastY = cy;
			// 			this.c.x = cx;
			// 			this.c.y = cy;
			// 		}

			// 	}
			// },this);


			// this.graphics.lineStyle(2,0xFF0000);

			// this.graphics.moveTo(MapArray[0][0],MapArray[0][1]);

			// this.graphics.lineStyle(2,0x00ffff);
			// this.graphics.drawCircle(MapArray[0][0],MapArray[0][1],5);
			// this.graphics.moveTo(MapArray[0][0],MapArray[0][1]);

			// for (var i:number = 1; i<2; ++i) {
			// 	this.graphics.lineStyle(2,0xFF0000);
			// 	this.graphics.lineTo(MapArray[i][0],MapArray[i][1]);

			// 	this.graphics.lineStyle(2,0x00ffff);
			// 	this.graphics.drawCircle(MapArray[i][0],MapArray[i][1],5);
			// 	this.graphics.moveTo(MapArray[i][0],MapArray[i][1]);

			// 	this.graphics.lineStyle(2,0x0000ff);
			// 	var xc:number = (MapArray[i][0] + MapArray[i+1][0])/2;
			// 	var yc:number = (MapArray[i][1] + MapArray[i+1][1])/2;
			// 	this.graphics.drawCircle(xc,yc,5);
			// 	this.graphics.moveTo(MapArray[i][0],MapArray[i][1]);

			// 	this.graphics.lineStyle(2,0x00ff00);
			// 	this.graphics.curveTo(MapArray[i][0],MapArray[i][1],xc,yc);
			// 	this.graphics.moveTo(MapArray[i][0],MapArray[i][1]);
			// 	console.log(MapArray[i][0],MapArray[i][1]);			
			// }
			// this.initMap(MapArray);

			this.test();
		}

		/**
		 * https://blog.csdn.net/kongbu0622/article/details/10123989
		 * https://zhidao.baidu.com/question/515374396.html
		 * 均速2次 贝塞尔曲线坐标算法
		 */
		private test():void{			
			let MapArray = [[50,50],[500,600],[800,200]];			
			this.initMap(MapArray);
			this.drawPoints(MapArray);
			// return;
			let P0={x:50,y:50},P1={x:500,y:600},P2={x:800,y:200};

			let ax = Math.floor(P0.x-2*P1.x+P2.x);
 
			let ay = Math.floor(P0.y-2*P1.y+P2.y);
			
			let bx = Math.floor(2*P1.x-2*P0.x);
			
			let by = Math.floor(2*P1.y-2*P0.y);
			
			
			
			let A = 4*(ax*ax+ay*ay);
			
			let B = 4*(ax*bx+ay*by);
			
			let C = bx*bx+by*by;
			
			
			
			//曲线总长度
			
			let  total_length:number = 0.0;

			//曲线分割的份数
			
			let STEP = 70;
			
			//-------------------------------------------------------------------------------------
			
			//速度函数
			
			/*
			s(t_) = Sqrt[A*t*t+B*t+C]
			*/
			
			function s(t:number):number
			
			{			
				return Math.sqrt(A*t*t+B*t+C);			
			}

			
//-------------------------------------------------------------------------------------
 
//长度函数
 
/*
L(t) = Integrate[s[t], t]
L(t_) = ((2*Sqrt[A]*(2*A*t*Sqrt[C + t*(B + A*t)] + B*(-Sqrt[C] + Sqrt[C + t*(B + A*t)])) + 
			(B^2 - 4*A*C) (Log[B + 2*Sqrt[A]*Sqrt[C]] - Log[B + 2*A*t + 2 Sqrt[A]*Sqrt[C + t*(B + A*t)]]))
				/(8* A^(3/2)));
*/
 
			function L(t:number)
			
			{
			
				let temp1:number = Math.sqrt(C+t*(B+A*t));
			
				let temp2:number = (2*A*t*temp1+B*(temp1-Math.sqrt(C)));
			
				let temp3:number = Math.log(B+2*Math.sqrt(A)*Math.sqrt(C));
			
				let temp4:number = Math.log(B+2*A*t+2*Math.sqrt(A)*temp1);
			
				let temp5:number = 2*Math.sqrt(A)*temp2;
			
				let temp6:number = (B*B-4*A*C)*(temp3-temp4);

				return (temp5+temp6)/(8*Math.pow(A,1.5));			
			}
			
			
			
			function InvertL(t:number, l:number)
			
			{
			
				let t1=t
				let t2 = 0;
			
				
			
				do
			
				{
			
					t2 = t1 - (L(t1)-l)/s(t1);
			
					if(Math.abs(t1-t2)<0.000001) break;
			
					t1=t2;
			
				}while(true);
			
				return t2;
			
			}

			//计算总长度
			
			total_length = L(1);
			let speed = 1;
			STEP = total_length / speed;

			function aa(nIndex:number){

				let t = nIndex/STEP;
 
				//如果按照线形增长,此时对应的曲线长度
 
				let l = t*total_length;
 
				//根据L函数的反函数，求得l对应的t值
 
				t = InvertL(t, l);
 
 
 
				//根据贝塞尔曲线函数，求得取得此时的x,y坐标
 
				let x = (1-t)*(1-t)*P0.x +2*(1-t)*t*P1.x + t*t*P2.x;
 
				let y = (1-t)*(1-t)*P0.y +2*(1-t)*t*P1.y + t*t*P2.y;
				return {x:x,y:y};
			}

			// for(let i = 0; i <= STEP; i++){
			// 	aa(i);
			// }
			let nIndex = 0;
			let flag = true;
			let lastX:number = 50;
			let lastY:number = 50;
			this.addEventListener(egret.Event.ENTER_FRAME,(evt)=>{
				if(flag){
					if(nIndex > STEP){
						flag = false;
						
					} else {
						let pos = aa(nIndex);
						this.c.x = pos.x;
						this.c.y = pos.y;
						let dis = Math.sqrt( (pos.x - lastX) * (pos.x - lastX) +  (pos.y - lastY) * (pos.y - lastY) );
						lastX = pos.x;
						lastY = pos.y;
						console.log(dis);
					}
					nIndex++;
				}
			},this);
		}

		


		private initMap(arr:number[][]) {

			this.graphics.lineStyle(2,0xFFFFFF);

			this.graphics.moveTo(arr[0][0],arr[0][1]);

			for (var i:number = 1; i<arr.length - 2; ++i) {

				var xc:number = (arr[i][0] + arr[i+1][0])/2;

				var yc:number = (arr[i][1] + arr[i+1][1])/2;

				this.graphics.curveTo(arr[i][0],arr[i][1],xc,yc);

			}
			this.graphics.curveTo(arr[i][0],arr[i][1],arr[i+1][0],arr[i+1][1]);
	   }

	   private drawPoints(arr:number[][]):void{

		   this.graphics.beginFill(0x00);

		   for (var i:number = 0; i<arr.length; ++i) {
				this.graphics.drawCircle(arr[i][0],arr[i][1],5);
			}
	   }

	}
}