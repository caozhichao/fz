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
			let ball:Ball;
			let ballPos:number;
			if(this._defaultLastBall == null){
				ballPos = 0;		
				ball = new Ball(ballPos,test.GameData.pos);				
			} else {
				let lastBallPos:number = this._defaultLastBall.pos;
				if(lastBallPos >= 64){ // 球的间距为64个单位
					ballPos = lastBallPos - 64;
					// console.log('newPos:' + newPos);
					ball = new Ball(ballPos,test.GameData.pos);					
				}			
			}
			if(ball){
				this._defalult.addBall(ball,ballPos);
				this._ballContainer.addChild(ball);
				this._defaultLastBall = ball;
			}
		}
		public checkCollision(emitBall:EmitBall):Ball{

			let [ball,index] = this._defalult.checkCollision(emitBall);
			if(ball){
				// console.log(ball.pos);
				let newBall:Ball = new Ball(ball.pos,test.GameData.pos,1);
				this._defalult.addBall(newBall,index);
				this._ballContainer.addChild(newBall);
				//调整插入后面的位置
				this._defalult.fixPos(index+1);
			}
			return ball;
		}
	}
}