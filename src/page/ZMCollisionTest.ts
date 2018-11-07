module test {

	/***
	 * 祖玛打出的球碰撞后，如何确定放在那个位置，是碰撞球的前面还是后面
	 * 思路
	 * 1.前提 轨道中小球的运动方向（转化成角度）即计算当前点到下一个点的角度即可      以该角度画直线的垂线分割 圆  分成2个半球的角度
	 * 2.计算打出去的小球碰撞后  的2个小球的圆心点的角度， 如果 该角度，在方向所在的半球角度范围之内   则放该球的前面，否则 放该球的后面
	 * 
	 */
	export class ZMCollisionTest extends egret.Sprite{
		private spr:egret.Sprite;
		private line:egret.Sprite;

		private moveX:number;
		private moveY:number;
		private speed:number = 3;
		private moveCount:number = 0
		public constructor() {
			super();
			//this.initUI();

			this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdd,this);
		}

		private onAdd(evt):void{
			this.initUI();
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
			this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		}

		private onEnterFrame(evt:egret.Event):void{
			if(this.moveCount > 0){
				this.spr.x += this.moveX;
				this.spr.y += this.moveY;
				this.moveCount--;

				//计算2点间的距离
				
				let dis = Math.sqrt( (this.spr.x - 300) * (this.spr.x - 300) +  (this.spr.y - 300) * (this.spr.y - 300) );
				if(dis <= 40){
					//碰撞到了
					console.log("碰撞到了");
					this.moveCount = 0;
					//计算角度

					 let degrees  = Math.atan2(this.spr.y - 300, this.spr.x - 300) * 180 / Math.PI;
					 console.log('degrees:' + degrees);
					 if(degrees >= -90 && degrees <= 90){
						this.spr.x = 340;
						this.spr.y = 300;

					 } else {
						 this.spr.x = 260;
						 this.spr.y = 300;
					 }
				}

			}
		}

		private onTap(evt:egret.TouchEvent):void{
			console.log(evt.stageX + "|" + evt.stageY);
			// console.log("角度:"  + Math.atan2(evt.stageY - 300, evt.stageX - 300) * 180 / Math.PI);

			// let node:Node = new Node();
			// node.x = 300;
			// node.y = 500;
			// this.addChild(node);
			let x = evt.stageX;
			let y = evt.stageY;
			let curX = this.spr.x;
			let curY = this.spr.y;

			let radians:number = Math.atan2(evt.stageY - this.spr.y,evt.stageX - this.spr.x);

			let dis = Math.sqrt( (x - curX) * (x - curX) +  (y - curY) * (y - curY) );

			this.moveX = Math.cos(radians) * this.speed;
			this.moveY = Math.sin(radians) * this.speed;
			this.moveCount = Math.floor(dis / this.speed);



		}



		private initUI():void{
			this.spr = new egret.Sprite();
			this.spr.graphics.beginFill(0x00ffff);
			this.spr.graphics.drawCircle(0,0,20);
			this.spr.graphics.endFill();
			this.addChild(this.spr);
			this.spr.x = 300;
			this.spr.y = 500;

			//
			// this.drawLine(300,200,300,400,0x00ff00);

			//小球运行的方向
			// this.drawLine(300,300,400,300,0x0000ff);
			// //画对应的垂线
			// let len = 100;

			let node:Node = new Node();
			node.x = 300;
			node.y = 300;
			this.addChild(node);
			// let obj = {rotation:0}
			// egret.Tween.get(obj,{onChange:()=>{
			// 	node.drawDirLine(obj.rotation);
			// }}).to({rotation:360},5000);
			// egret.Tween.get(node).to({})
		}

		private test1():void{

		}

		private test2():void{

		}

		private test3():void{

		}

		private drawLine(sx:number,sy:number,tx:number,ty:number,color:number):void{
			this.graphics.lineStyle(1,color);
			this.graphics.moveTo(sx,sy);
			this.graphics.lineTo(tx,ty);
			this.graphics.endFill();
		}
	}

	class Node extends egret.Sprite{
		private spr:egret.Sprite;
		constructor(){
			super();

			this.initUI();
		}

		private initUI():void{
			this.spr = new egret.Sprite();

			this.spr.graphics.beginFill(0xff0000);
			this.spr.graphics.drawCircle(0,0,20);
			this.spr.graphics.endFill();
			this.addChild(this.spr);
			this.drawDirLine(0);
		}

		public drawDirLine(degrees:number):void{
			this.graphics.clear();
			//方向线
			let radians = degrees * Math.PI/180;
			let dx:number = Math.cos(radians) * 100;
			let dy:number = Math.sin(radians) * 100;
			this.graphics.lineStyle(1,0x00ff00);
			this.graphics.moveTo(0,0);
			this.graphics.lineTo(dx,dy);
			this.graphics.endFill();

			//垂直线
			let degrees2 = degrees - 90;
			let radians2 = degrees2 * Math.PI/180;
			let p1x:number = Math.cos(radians2) * 100; 
			let p1y:number = Math.sin(radians2) * 100;
			let p2x:number = -p1x;
			let p2y:number = -p1y;

			this.graphics.lineStyle(1,0x0000ff);
			this.graphics.moveTo(p1x,p1y);
			this.graphics.lineTo(p2x,p2y);
			this.graphics.endFill();


			let minDegrees = degrees - 90;
			let maxDegrees = degrees + 90;
			console.log("minDegrees:" + minDegrees + ' maxDegrees:' + maxDegrees);

		}

	}

}