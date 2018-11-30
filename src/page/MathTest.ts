module test {

	/***
	 * 一个运动的点如何判断与四边碰撞到了，碰撞到那一边了
	 * 
	 * 思路
	 * 计算点与4个边的距离
	 * 夹角问题 点移动到4个夹角点 避免 运动的点想象成一个球  球心到边的距离小于半径表明碰撞到了
	 * 同时碰撞到2个边(按原路径返回)
	 *
	 * 碰撞到边反弹  入射角=反射角
	 * 
	 * 
	 * 
	 */
	export class MathTest extends egret.Sprite{		
		private ball:egret.Sprite;
		private speed:number = 2;
		private mX:number;
		private mY:number;
		private radians:number;
		private degrees:number;
		private r:number = 10;
		//上一个开始移动的点
		private upX:number;
		private upY:number;
		public constructor() {
			super();
			this.initUI();
			this.test();
		}
		private test():void{
			let x1:number = 0;
			let y1:number = 0;
			let x2:number = 1;
			let y2:number = 1;

			console.log(Math.atan2(y2 - y1,x2 - x1) * 180 / Math.PI);

			console.log(Math.atan2(y1 - y2,x1 - x2) * 180 / Math.PI);


		}

		public initUI():void{
			this.graphics.lineStyle(1,0xff0000);
			this.graphics.drawRect(0,0,600,600);
			this.graphics.endFill();

			this.ball = new egret.Sprite();
			this.ball.graphics.beginFill(0x0);
			this.ball.graphics.drawCircle(0,0,10);
			this.ball.graphics.endFill();
			this.ball.x = 50;
			this.ball.y = 50;
			this.addChild(this.ball);

			eg.Config.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
			// this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		}

		private onEnterFrame(evt:egret.Event):void{
			// this.ball.x += this.mX;
			// this.ball.y += this.mY;
			this.ball.x += Math.cos(this.radians) * this.speed;
			this.ball.y += Math.sin(this.radians) * this.speed;

			//计算ball 到4个边的距离
			//上
			let up:number = this.ball.y;
			//下
			let down:number = 600 - this.ball.y;
			//左
			let left:number = this.ball.x;
			//右
			let right:number = 600 - this.ball.x;
			// console.log('up:' + up + ' down:' + down + ' left:' + left + ' right:' + right);
			/*
			if(up < this.r || down < this.r || left < this.r || right < this.r){
				eg.log('碰到边界了');
				// this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
				// let radians:number = Math.atan2(50 - this.ball.y, 50 - this.ball.x);
				// this.radians = radians;
				// this.radians += 180 *;
				// this.degrees += 180; // 垂直 对角
				this.degrees *= -1;
				this.radians = this.degrees * Math.PI / 180;				
			} 
			*/
			let arr = [];
			if(up < this.r){
				arr.push('up');
			} 
			if(down < this.r){
				arr.push('down');
			}
			if(left < this.r){
				arr.push('left');
			}
			if(right < this.r){
				arr.push('right');
			}

			if(arr.length > 0){
				this.degrees = this.refAngle(arr);
				this.radians = this.degrees * Math.PI / 180;		
			}

		}

		/**
		 * 根据入射角=反射角 计算反弹的角度
		 * 入射角  与边的夹角
		 */
		private refAngle(hits:string[]):number{
			let angle:number = 0;
			if(hits.length == 2){
				angle = this.degrees + 180;
			} else{
				let hit = hits[0];
				if(hit == 'down'){
					// if(this.degrees > 0 && this.degrees <=90){
					angle = -this.degrees;
					// }
				} else if(hit == 'right'){
					angle = this.degrees < 0?-180-this.degrees:180-this.degrees;
				}else if(hit == 'left'){
					angle = this.degrees < 0?-180-this.degrees:180-this.degrees;
				}else if(hit == 'up'){
					angle = -this.degrees;
				}
			}
			return angle;
		}


		private onTap(evt:egret.TouchEvent):void{
			console.log('onTap');
			this.upX = this.ball.x;
			this.upY = this.ball.y;
			let tx:number = 300;
			let ty:number = 600;
			let radians:number = Math.atan2(ty - this.ball.y, tx - this.ball.x);
			this.radians = radians;
			this.mX = Math.cos(radians) * this.speed;
			this.mY = Math.sin(radians) * this.speed;

			let degrees = radians * 180/Math.PI
			this.degrees = degrees;
			console.log('degrees:' + degrees);
			this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		}
	}
}