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
			//合并球组
			this.mergeBallGroup();
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

			let len = this._ballGroups.length;
			let ballGroup:BallGroup;
			let ball;
			let index;
			for(let i:number = 0;i < len;i++){
				ballGroup = this._ballGroups[i];
				// let [ball,index] = ballGroup.checkCollision(emitBall);
				[ball,index] = ballGroup.checkCollision(emitBall);
				if(ball){
					// console.log(ball.pos);
					console.log('碰撞index:' + index);
					let newBall:Ball = new Ball(ball.pos,test.GameData.pos,1);
					ballGroup.addBall(newBall,index);
					this._ballContainer.addChild(newBall);
					//调整插入前面的位置
					ballGroup.fixPos(index,64);
					//test 消除检查
					this.x(index,ballGroup);
					break;
				}
			}

			// let [ball,index] = this._defalult.checkCollision(emitBall);
			// if(ball){
			// 	// console.log(ball.pos);
			// 	console.log('碰撞index:' + index);
			// 	let newBall:Ball = new Ball(ball.pos,test.GameData.pos,1);
			// 	this._defalult.addBall(newBall,index);
			// 	this._ballContainer.addChild(newBall);
			// 	//调整插入前面的位置
			// 	this._defalult.fixPos(index,64);
			// 	//test 消除检查
			// 	this.x(index);
			// }
			return ball;
		}

		/**
		 * 碰撞后消除检查
		 */
		public x(index:number,ballGroup:BallGroup):void{
			let [min,max] = ballGroup.find(index);
			let count = max - min + 1;
			if(count >= 3){
				//找到可消除的段
				//1.从数组中删除消除的数组
				let balls = ballGroup.removeBall(min,count);
				//2.显示上移除
				balls.forEach(element => {
					this._ballContainer.removeChild(element);
				});

				//3.拆分球组(把 0-min 段拆分出去)
				let groupIndex = this._ballGroups.indexOf(ballGroup);
				if(min != 0){
					let newBalls = ballGroup.removeBall(0,min);
					let newBallGroup = new BallGroup(newBalls);
					// this._ballGroups.push(newBallGroup);
					this._ballGroups.splice(groupIndex+1,0,newBallGroup);
				}
				//原有的组如果为空，并且不是第一个组，删除，
				if(ballGroup.ballLength == 0 && groupIndex != 0){
					this._ballGroups.splice(groupIndex,1);
				}
			}
			console.log('min:' + min + ' max:' + max + ' count:' + count);
		}

		private mergeBallGroup():void{
			let len = this._ballGroups.length;
			let mergeBallGroup = this._ballGroups[0];
			let ballGroup:BallGroup;
			let headBall:Ball;
			let tailBall:Ball;
			let dis;
			for(let i:number = 1; i < len; i++){
				ballGroup = this._ballGroups[i];
				//判断头尾球是否碰撞到了
				headBall = mergeBallGroup.getBall(0);
				if(headBall){
					tailBall = ballGroup.getBall(ballGroup.ballLength-1);
					dis = tailBall.pos - headBall.pos;
					if(dis <= 64){
						console.log('dis:' + dis);
						//修正坐标
						ballGroup.fixPos(ballGroup.ballLength-1,64 - dis);
						//合并
						mergeBallGroup.merge(ballGroup.getBalls());
						this._ballGroups.splice(i,1);
						break;
					}
				}								 
				mergeBallGroup = ballGroup;			
			}
		}
	}
}