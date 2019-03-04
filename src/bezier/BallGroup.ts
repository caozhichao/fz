module test {
	export class BallGroup{
		private _balls:Ball[];
		private _passTime:number;
		private _speed:number;
		private _updateTime:number;
		// private _lastBall:Ball;
		// private _ballContainer:egret.DisplayObjectContainer;
		public constructor(/*ballContainer:egret.DisplayObjectContainer*/) {			
			// this._ballContainer = ballContainer;
			this.init();
		}

		public init():void{
			this._balls = [];
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

		public removeBall(index:number):void{
			this._balls.splice(index,1);
		}

		public update(passTime:number):void{
			this._passTime += passTime;		
			while(this._passTime >= this._updateTime){				
				this.updateBallPos();
				this._passTime-= this._updateTime;
			}
			// //加入ball
			// let ball:Ball;
			// if(this._lastBall == null){
			// 	ball = new Ball(0,test.GameData.pos);
			// 	this.addBall(ball,0);				
			// } else {
			// 	let lastBallPos:number = this._lastBall.pos;
			// 	if(lastBallPos >= 64){
			// 		let newPos:number = lastBallPos - 64;
			// 		console.log('newPos:' + newPos);
			// 		ball = new Ball(newPos,test.GameData.pos);
			// 		this.addBall(ball);	
			// 	}			
			// }
			// if(ball){
			// 	this._lastBall = ball;
			// 	this._ballContainer.addChild(ball);
			// }

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
				element.updatePos(1);
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
		public fixPos(index:number):void{
			let len = this._balls.length;
			let ball:Ball;
			for(let i:number = index; i < len; i++){
				ball = this._balls[i];
				ball.pos += 64;
			}
		}
	}
}