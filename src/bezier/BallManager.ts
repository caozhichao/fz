module test {
	export class BallManager {
		private static _instance:BallManager;
		//默认的球组(游戏开始的球组)
		private _defalult:BallGroup;
		//最后一个球（定位出球顺序）
		private _defaultLastBall:Ball;

		private _ballGroups:BallGroup[];
		private _ballContainer:egret.DisplayObjectContainer;

		//0 移动 1 碰撞加球 
		private state:number = 0;

		private xIndex:number;
		private xBallGroup:BallGroup;

		private _moveBallGroup:BallGroup[];

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
			this._moveBallGroup = [this._defalult];
		}

		public update(passTime:number):void{
			if(this.state == 0){
				// this._defalult.update(passTime);			
				this.checkBallGroupMove();

				this.moveBall(passTime);
				this.defaultAddBall();
				//合并球组
				this.mergeBallGroup();
			} else if(this.state == 1) {
				this.x(this.xIndex,this.xBallGroup);
				this.state = 0;				
			}
		}

		private moveBall(passTime:number):void{
			this._moveBallGroup.forEach(element => {
				element.update(passTime);
			});
		}

		/**
		 * 游戏过程中不断加球
		 */
		private defaultAddBall():void{
			//加入ball
			let sId:number = Math.floor(Math.random() * 3);
			let ball:Ball;
			let ballPos:number;
			if(this._defaultLastBall == null || this._defalult.ballLength == 0){
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
					// let newBall:Ball = new Ball(ball.pos,test.GameData.pos,emitBall.sId);
					// ballGroup.addBall(newBall,index);
					// this._ballContainer.addChild(newBall);

					let addIndex:number = this.findAddIndex(index,emitBall,ball);

					let newBall:Ball;
					if(addIndex != index){
						//后面(取碰撞到的球的再后面一个,插在这个球的前面)
						// newBall = new Ball(ball.pos-64,test.GameData.pos,emitBall.sId);
						ball = ballGroup.getBall(addIndex);   //(数组边界情况，需要处理)
						newBall = new Ball(ball.pos+64,test.GameData.pos,emitBall.sId);
					} else {
						newBall = new Ball(ball.pos + 64,test.GameData.pos,emitBall.sId);
					}

					index = addIndex;

					ballGroup.addBall(newBall,index);
					setTimeout(()=> {
						this._ballContainer.addChild(newBall);					
					}, 200);

					let endPos = newBall.pos;
					console.log('ball.pos:' + ball.pos + ' endPos:' + endPos);
					let endX:number = test.GameData.pos[endPos * 3];
					let endY:number = test.GameData.pos[endPos * 3 + 1];

					this.dropBall(emitBall.x,emitBall.y,ball.x,ball.y,endX,endY,emitBall.sId);

					//调整插入前面的位置
					ballGroup.fixPos(index,64);
					/*
					//test 消除检查
					// this.x(index,ballGroup);
					this.xIndex = index;
					this.xBallGroup = ballGroup;
					this.state = 1;
					*/

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
		 * 落球移动处理
		 */
		private dropBall(sx:number,sy:number,refX:number,refY:number,endX:number,endY:number,sId:number):void{
			console.log('sx:' + sx + ' sy:' + sy + ' refX:' + refX + ' refY:' + refY + ' endX:' + endX + ' endY:' + endY + ' sId:' + sId);	
			let startAngle:number = Math.atan2(sy - refY,sx - refX) * 180 / Math.PI;
			let endAngle:number = Math.atan2(endY - refY,endX-refX) * 180 / Math.PI;

			// startAngle = startAngle < 0?360+startAngle:startAngle;
			// endAngle = endAngle < 0?360+endAngle:endAngle;

			//计算角度间的间隔  从最短的路径移动，（圆上，分解成，顺时针，逆时针问题）
			let dis = Math.abs( (startAngle < 0?360+startAngle:startAngle)   -  (endAngle < 0?360+endAngle:endAngle) );
			if(dis <= 180){
				startAngle = startAngle < 0?360+startAngle:startAngle;
				endAngle = endAngle < 0?360+endAngle:endAngle;
			}
			console.log('startAngle:' + startAngle + ' endAngle:' + endAngle);
			let obj = {angle:startAngle};
			let moveBall = new EmitBall(sId);
			this._ballContainer.addChild(moveBall);
			// moveBall.x = sx;
			// moveBall.y = sy;
			// /*
			egret.Tween.get(obj,{loop:false,onChange:()=>{
				console.log(obj.angle);				
				let radians = obj.angle * Math.PI / 180;
				moveBall.x = refX + 64 * Math.cos(radians);
				moveBall.y = refY + 64 * Math.sin(radians);
			},onChangeObj:this}).to({angle:endAngle},200).call((ball:EmitBall)=>{
				console.log(moveBall.x + '|' + moveBall.y);
				ball.parent.removeChild(ball);
			},this,[moveBall]);
			// */
		}


		/**
		 * 碰撞后查找添加球的位置
		 */
		private findAddIndex(collisionIndex:number,emitBall:EmitBall,ball:Ball):number{

			//获取下一个坐标点
			let nextPos = ball.pos + 1;
			let nextX:number = test.GameData.pos[nextPos * 3];
			let nextY:number = test.GameData.pos[nextPos * 3 + 1];
			// let degrees = test.GameData.pos[ball.pos+2];
			let degrees = Math.atan2(nextY - ball.y,nextX - ball.x) * 180 / Math.PI;

			//转化成正角
			// degrees = degrees < 0?360+degrees:degrees;
			//以该角度的方向画垂线，分割圆为2个180的半圆
			let min:number = degrees - 90;
			let max:number = degrees + 90;

			//计算碰撞形成的夹角
			let degrees2 = Math.atan2(emitBall.y - ball.y,emitBall.x - ball.x) * 180 / Math.PI;

			if(degrees2 >= degrees && degrees2 <= max){
				return collisionIndex;
			}
			return collisionIndex + 1;
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

					//加入到移动的球组列表中
					// newBallGroup.changeDir();
					// newBallGroup.speed = 600;
					// this._moveBallGroup.push(newBallGroup);
				}
				//原有的组如果为空，并且不是第一个组(第一个组为出球的组，不能删除)，删除，
				if(ballGroup.ballLength == 0 && groupIndex != 0){
					this._ballGroups.splice(groupIndex,1);
				}
			}
			console.log('min:' + min + ' max:' + max + ' count:' + count);
		}

		/**
		 * 合并球组
		 */
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

						//合并后从移动的球组中删除
						let index = this._moveBallGroup.indexOf(ballGroup);
						this._moveBallGroup.splice(index,index);

						//合并后，检查消除
						this.x(ballGroup.ballLength-1,mergeBallGroup);
						break;
					}
				}								 
				mergeBallGroup = ballGroup;			
			}
		}

		/**
		 * 检查拆分的组是否回滚移动
		 * 检查相邻的2个组的，前后2个球是否相同，如果是，则加入到可移动组中
		 */
		public checkBallGroupMove():void{
			let len = this._ballGroups.length;
			let headBallGroup:BallGroup = this._ballGroups[0];
			let headBall:Ball;
			let tailBall:Ball;

			let ballGroup:BallGroup;
			for(let i:number = 1; i < len; i++){
				headBall = headBallGroup.getBall(0);
				ballGroup = this._ballGroups[i];
				if(headBall){
					tailBall = ballGroup.getBall(ballGroup.ballLength-1);
					if(headBall.sId == tailBall.sId){
						//加入移动组
						let index = this._moveBallGroup.indexOf(ballGroup);
						if(index == -1){
							ballGroup.changeDir();
							ballGroup.speed = 600;
							this._moveBallGroup.push(ballGroup);
						}
					}
				}
				headBallGroup = ballGroup;
			}
		}

	}
}