module test {
	export class BallGroup{
		private _balls:Ball[];
		private _passTime:number;
		private _speed:number;
		private _updateTime:number;	
		//移动方向
		private _dir:number = 1;	
		public constructor(balls:Ball[]=null) {						
			this.init(balls);
		}

		public init(balls:Ball[]):void{			
			this._balls = balls || [];
			this._speed = 50;
			this._updateTime = 1000 / this._speed;
			this._passTime = 0;
		}

		public addBall(ball:Ball,index:number=-1):void{
			if(index != -1){
				this._balls.splice(index,0,ball);
			} else {
				this._balls.push(ball);
			}
		}

		public removeBall(index:number,len:number):Ball[]{
			return this._balls.splice(index,len);
		}

		public update(passTime:number):void{
			this._passTime += passTime;		
			while(this._passTime >= this._updateTime){				
				this.updateBallPos();
				this._passTime-= this._updateTime;
			}
			// //加速处理
			// this._speed -= 2;
			// if(this._speed <= 20){
			// 	this._speed = 20;
			// }
			// // console.log(this._speed);
			// this._updateTime = 1000 / this._speed;
		}


		private updateBallPos():void{
			this._balls.forEach(element => {
				element.updatePos(1 * this._dir);
			});
		}

		public checkCollision(emitBall:EmitBall):any[]{
			let ball = null;
			let len:number = this._balls.length;
			let element:Ball;
			let i;
			for(i = 0; i < len; i++){
				element = this._balls[i];
				let dis:number = (element.x - emitBall.x)*(element.x - emitBall.x) + (element.y - emitBall.y)*(element.y - emitBall.y);				
				if(dis <= 64 * 64){
					ball = element;
					break;
				}
			}			
			return [ball,i];
		}
		public fixPos(index:number,step:number):void{
			let len = this._balls.length;
			let ball:Ball;
			for(let i:number = 0; i <= index; i++){
				ball = this._balls[i];
				ball.pos += step;
			}
		}

		/**
		 * 查找相同的球
		 * @param index 开始查找的位置 
		 * 从index 向左右查找
		 */
		public find(index:number):number[]{
			//开始下标
			let min:number;
			//结束下标
			let max:number;
			let findBall:Ball = this._balls[index];
			let ball:Ball;
			let i;
			for(i = index; i >=0;i--){
				ball = this._balls[i];
				if(ball.sId != findBall.sId){
					min = i+1;
					break;
				}
			}
			if(min == undefined){
				min = i+1;
			}

			let len = this._balls.length;
			for(i = index; i < len;i++){
				ball = this._balls[i];
				if(ball.sId != findBall.sId){
					max = i-1;
					break;
				}
			}
			if(max == undefined){
				max = i-1;
			}
			return [min,max];
		}

		public getBall(index:number):Ball{
			return this._balls[index];
		}

		public get ballLength():number{
			return this._balls.length;
		}

		public getBalls():Ball[]{
			return this._balls;
		}

		public merge(balls:Ball[]):void{
			let len = balls.length;
			for(let i:number = len-1; i >= 0; i--){
				this._balls.unshift(balls[i]);
			}			
		}	

		public changeDir():void{
			this._dir = -this._dir;
		}	

		public set speed(value:number){
			this._speed = value;
			this._updateTime = 1000 / this._speed;
		}
	}
}