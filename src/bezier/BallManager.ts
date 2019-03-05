module test {
	export class BallManager {
		private static _instance:BallManager;
		//默认的球组(游戏开始的球组)
		private _defalult:BallGroup;
		//最后一个球（定位出球顺序）
		private _defaultLastBall:Ball;

		private _ballGroups:BallGroup[];
		private _ballContainer:egret.DisplayObjectContainer;

		public constructor() {			

		}	

		public static getInstance():BallManager{

			if(BallManager._instance == null){
				BallManager._instance = new BallManager();
			}
			return BallManager._instance;
		}

		public init(ballContainer:egret.DisplayObjectContainer):void{
			this._ballContainer = ballContainer;
			this._defalult = new BallGroup();
			this._ballGroups = [this._defalult];
		}

		public update(passTime:number):void{
			this._defalult.update(passTime);			
			this.defaultAddBall();
		}

		/**
		 * 游戏过程中不断加球
		 */
		private defaultAddBall():void{
			//加入ball
			let sId:number = Math.floor(Math.random() * 3);
			let ball:Ball;
			let ballPos:number;
			if(this._defaultLastBall == null){
				ballPos = 0;		
				ball = new Ball(ballPos,test.GameData.pos,sId);				
			} else {
				let lastBallPos:number = this._defaultLastBall.pos;
				if(lastBallPos >= Ball.WIDTH){ // 球的间距为64个单位
					ballPos = lastBallPos - Ball.WIDTH;
					// console.log('newPos:' + newPos);
					ball = new Ball(ballPos,test.GameData.pos,sId);					
				}			
			}
			if(ball){
				this._defalult.addBall(ball);
				this._ballContainer.addChild(ball);
				this._defaultLastBall = ball;
			}
		}

		/**
		 * 碰撞
		 */
		public checkCollision(emitBall:EmitBall):Ball{

			let [ball,index] = this._defalult.checkCollision(emitBall);
			if(ball){
				// console.log(ball.pos);
				console.log('碰撞index:' + index);
				let newBall:Ball = new Ball(ball.pos,test.GameData.pos,1);
				this._defalult.addBall(newBall,index);
				this._ballContainer.addChild(newBall);
				//调整插入前面的位置
				this._defalult.fixPos(index);


				//test 消除检查
				this.x(index);
			}


			return ball;
		}

		/**
		 * 碰撞后消除检查
		 */
		public x(index:number):void{
			let [min,max] = this._defalult.find(index);
			let count = max - min + 1;
			if(count >= 3){
				//找到可消除的段
				//1.从数组中删除消除的数组
				let balls = this._defalult.removeBall(min,count);
				//2.显示上移除
				balls.forEach(element => {
					this._ballContainer.removeChild(element);
				});

				//3.拆分球组


			}
			console.log('min:' + min + ' max:' + max + ' count:' + count);
		}
	}
}