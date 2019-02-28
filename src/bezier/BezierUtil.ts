module eg {
	/**
	 * 匀速二次贝塞尔曲线
	 * https://blog.csdn.net/linuxheik/article/details/79454663
	 * https://zhidao.baidu.com/question/515374396.html
	 */
	export class BezierUtil {

		private A:number;

		private B:number;

		private C:number;

		private P0;
		private P1;
		private P2;

		private STEP:number;

		private total_length:number;

		private static _instance:BezierUtil;
		public constructor() {

		}

		public static getInstance():BezierUtil{
			if(BezierUtil._instance == null){
				BezierUtil._instance = new BezierUtil();
			}
			return BezierUtil._instance;
		}

		/**
		 * 匀速二次贝塞尔曲线
		 * 获取曲线上的所有坐标点
		 * @param P0 起始点
		 * @param P1 控制点
		 * @param P2 结束点
		 */
		public getPoints(P0,P1,P2,speed:number=1):number[]{

			this.P0 = P0;
			this.P1 = P1;
			this.P2 = P2;

			let ax = Math.floor(P0.x-2*P1.x+P2.x);
 
			let ay = Math.floor(P0.y-2*P1.y+P2.y);
			
			let bx = Math.floor(2*P1.x-2*P0.x);
			
			let by = Math.floor(2*P1.y-2*P0.y);
			
			
			
			let A = 4*(ax*ax+ay*ay);
			
			let B = 4*(ax*bx+ay*by);
			
			let C = bx*bx+by*by;

			this.A = A;
			this.B = B;
			this.C = C;

			// //曲线总长度			
			// let total_length:number = 0.0;
			// //曲线分割的份数			
			// let STEP = 0;

			//计算总长度			
			this.total_length = this.L(1);
			// let speed = 1;
			this.STEP = this.total_length / speed;


			let points = [];

			for(let i:number = 0;i < this.STEP;i++){
				let pos = this.getIndexPoint(i);
				// points[i] = pos;
				// console.log(pos.x,pos.y);
				points.push(pos.x,pos.y,pos.degrees);
			}
			return points;
		}

		private getIndexPoint(nIndex:number){
			let t = nIndex/this.STEP;
			//如果按照线形增长,此时对应的曲线长度
			let l = t*this.total_length;
			//根据L函数的反函数，求得l对应的t值
			t = this.InvertL(t, l);
			//根据贝塞尔曲线函数，求得取得此时的x,y坐标
			let x = (1-t)*(1-t)*this.P0.x +2*(1-t)*t*this.P1.x + t*t*this.P2.x;
			let y = (1-t)*(1-t)*this.P0.y +2*(1-t)*t*this.P1.y + t*t*this.P2.y;

			//  获取切线
			var Q0:egret.Point = new egret.Point((1 - t) * this.P0.x + t * this.P1.x, (1 - t) * this.P0.y + t * this.P1.y);
			var Q1:egret.Point = new egret.Point((1 - t) * this.P1.x + t * this.P2.x, (1 - t) * this.P1.y + t * this.P2.y);
			//  计算角度
			var dx:number=Q1.x-Q0.x;
			var dy:number=Q1.y-Q0.y;
			var radians:number=Math.atan2(dy,dx);
			var degrees:number=radians*180/Math.PI;

			x = Math.floor(x * 10) / 10
			y = Math.floor(y * 10) / 10
			degrees = Math.floor( degrees * 10) / 10;

			return {x:x,y:y,degrees};
		}


		private L(t:number):number{			
			let A:number = this.A;
			let B:number = this.B;
			let C:number = this.C;

			let temp1:number = Math.sqrt(C+t*(B+A*t));
		
			let temp2:number = (2*A*t*temp1+B*(temp1-Math.sqrt(C)));
		
			let temp3:number = Math.log(B+2*Math.sqrt(A)*Math.sqrt(C));
		
			let temp4:number = Math.log(B+2*A*t+2*Math.sqrt(A)*temp1);
		
			let temp5:number = 2*Math.sqrt(A)*temp2;
		
			let temp6:number = (B*B-4*A*C)*(temp3-temp4);

			return (temp5+temp6)/(8*Math.pow(A,1.5));			
		}

		private InvertL(t:number, l:number):number{			
			let t1=t
			let t2 = 0;
			do
			{
				t2 = t1 - (this.L(t1)-l)/this.s(t1);
				if(Math.abs(t1-t2)<0.000001) break;
				t1=t2;
			}while(true);
			return t2;			
		}

		private s(t:number):number{			
			let A:number = this.A;
			let B:number = this.B;
			let C:number = this.C;
			return Math.sqrt(A*t*t+B*t+C);			
		}
	}
}