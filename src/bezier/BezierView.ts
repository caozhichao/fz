module test {
	/**
	 * 贝塞尔曲线 测试
	 * https://www.cnblogs.com/hyb1/p/3875468.html
	 * 匀速
	 * https://blog.csdn.net/linuxheik/article/details/79454663
	 */
	export class BezierView extends eg.PageBase{
		public p0:eui.Rect;
		public p1:eui.Rect;
		public p2:eui.Rect;
		public pMove:eui.Rect;
		public pMove2:eui.Rect;
		public _btn_test:eui.Button;
		public _tf_speed:eui.EditableText;

		public _btn_speed:eui.Button;
		public _tf_time:eui.EditableText;



		private pos:number[] = [];
		private shape:egret.Shape;

		private t1:number;

		private times:number = 0;

		private m_time:number = 50;
		private m_add_time:number = 0;

		private flag:boolean = false;

		public constructor() {
			super();
			this.skinName = 'skins.BezierViewSkin';
		}

		public initUI(data:any):void{
			super.initUI(data);

			this.shape = new egret.Shape();
			this.addChild(this.shape);

			// this.pos = this.Bezier1();
			this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
			this._btn_test.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTest,this);
			this._btn_speed.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChange,this);
		}

		private onChange(evt:egret.TouchEvent):void{
			this.m_time = parseInt(this._tf_time.text);
			console.log('m_time:' + this.m_time);
		}

		private onEnterFrame(evt:egret.Event):void{

			if(!this.flag) return;

			this.m_time -= 0.1;
			if(this.m_time <= 1){
				this.m_time = 1;
			}

			let t2:number=egret.getTimer();

			this.times += t2 - this.t1;
			this.t1 = t2;

			let count = 0;
			while(this.times >= this.m_time){
				count++;
				let tx:number = this.pos.shift();
				let ty:number = this.pos.shift();
				let degrees:number = this.pos.shift();
				if(tx) {
					this.pMove.x = tx;
					this.pMove2.x = tx;
				}
				if(ty){
					this.pMove.y = ty;
					this.pMove2.y = ty;
				}
				if(degrees){					
					this.pMove2.rotation = degrees;
				}
				this.times -= this.m_time;
			}
			console.log('count:' + count);

		}

		private onTest(evt:egret.TouchEvent):void{
			// this.pos = this.Bezier2();
			let P0={x:50,y:50},P1={x:500,y:600},P2={x:800,y:200};
			P0.x = this.p0.x;
			P0.y = this.p0.y;
			P1.x = this.p1.x;
			P1.y = this.p1.y;
			P2.x = this.p2.x;
			P2.y = this.p2.y;
			
			this.pos = eg.BezierUtil.getInstance().getPoints(P0,P1,P2,1);
			this.flag = true;
			this.t1 = egret.getTimer();
			this.drawPath(this.pos);
		}

		/**
		 * S = V * T;
		 * 
		 */
		public Bezier1():number[]{
			//速度
			let speed = parseInt(this._tf_speed.text);
			//距离
			let dis = egret.Point.distance(new egret.Point(this.p0.x,this.p0.y),new egret.Point(this.p1.x,this.p1.y));
			//根据该速度，计算，移动的次数
			let count = (dis / speed) | 0;

			//根据次数，转换成，时间t 的步长
			let step:number = 1 / count;

			console.log('speed:' + speed + '|' + 'count:' + count + '|' + 'step:' + step);
			//一次贝塞尔曲线公式
			//B(t) = (1-t)P0 + tP1;
			let pos = [];
			for(let t = 0; t <= 1;t+=step){
				let tx:number = (1-t) * this.p0.x + t * this.p1.x;
				let ty:number = (1-t) * this.p0.y + t * this.p1.y;
				// console.log(tx + '|' + ty);
				pos.push(tx,ty);
			}
			return pos;
		}

		public Bezier2():number[]{
			let pos = [];		
			let t = 0; 
			for(let i = 0; i <= 100;i+=1){
				t = i / 100;   //处理小数点影响到精度问题 转换成i 整数循环
				let tx:number = (1-t)*(1-t) * this.p0.x + 2*t*(1 - t) * this.p1.x + t * t * this.p2.x;
				let ty:number = (1-t)*(1-t) * this.p0.y + 2*t*(1 - t) * this.p1.y + t * t * this.p2.y;
				// console.log(tx + '|' + ty);
				console.log('t:' + t);
				pos.push(tx,ty);
			}
			return pos;
		}

		private drawPath(pos:number[]):void{

			this.shape.graphics.clear();
			this.shape.graphics.lineStyle(2,0xff0000);
			for(let i:number = 0;i < pos.length; i+=3){
				if(i == 0){
					this.shape.graphics.moveTo(pos[i],pos[i+1]);
				} else {
					this.shape.graphics.lineTo(pos[i],pos[i+1]);
				}
			}
			this.shape.graphics.endFill();

		}
	}
}