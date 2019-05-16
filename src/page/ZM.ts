module fz {

	/**
	 * 祖玛算法
	 * https://blog.csdn.net/wuzhi3078/article/details/51706700
	 */
	export class ZM extends eg.PageBase{
		private posList:number[];
		// private lastNode:Node;
		private index:number = 0;
		private posIndex:number = 0;
		private spr:egret.Sprite;
		private bg:egret.Sprite;

		private speed:number = 1;
		private count = 0;
		private moveX = 0;
		private moveY = 0;
		private pos:number = 0;
		private curX:number;
		private curY:number;	
		private toX:number;
		private toY:number;	

		private nodeList:Node[];

		private lastNode:Node;
		private timer:egret.Timer;
		public constructor() {
			super();
		}

		public initComplete(data:any):void{
			super.initComplete(data);
			let map = new egret.Bitmap(RES.getRes("1_png"));
			this.addChild(map);
			// this.posList = [-25,249,25,249,75,249,125,249,175,249,225,249,275,249,325,249,325,299,325,349,325,399,325,449,325,399,325,549,325,599,325,649];	
			this.posList = [700,118,660.95,128.95,629.45,153.75,616.45,191.25,614.45,231.25,614.45,271.25,614.45,311.25,614.45,351.25,614.45,391.25,614.45,431.25,
			614.45,471.25,614.45,511.25,614.45,551.25,614.45,591.25,614.45,631.25,614.45,671.25,614.45,711.25,614.45,751.25,614.45,791.25,611.9,831.25,
			594,867.05,559.5,887.7,519.8,893.05,479.8,893.05,439.8,893.05,399.8,893.05,359.8,893.05,319.8,893.05,279.8,893.05,239.8,893.05,
			199.8,893.05,158.5,893.05,118.8,885.3,88.25,859.1,71.6,822.25,69.15,781.75,67.05,741.75,67.05,701.75,68.6,661.75,68.6,621.75,68.6,581.75,
			68.6,541.75,68.6,501.75,68.6,461.75,68.6,421.75,68.6,381.75,67.05,341.75,67.05,301.75,67.05,261.75,70,220.9,74,180.1,95.05,144.15,128.4,122.9,
			168.4,117.25,208.4,117.25,248.4,117.25,288.4,117.25,328.4,117.25,368.4,117.25];	
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
			// this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);

			this.bg = new egret.Sprite();
			this.bg.graphics.beginFill(0x00);
			this.bg.graphics.lineStyle(1,0x00ff00);
			this.addChild(this.bg);


			this.spr = new egret.Sprite();
			this.spr.graphics.beginFill(0xff0000);
			this.spr.graphics.drawCircle(0,0,20);
			this.spr.graphics.endFill();

			this.addChild(this.spr);

			this.bg.graphics.moveTo(this.spr.x,this.spr.y);

			this.nodeList = [];

			this.timer = new egret.Timer(10);
			this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
			this.timer.start();

			this.addNode();
		}

		private onTimer(evt:egret.TouchEvent):void{

			this.onEnterFrame(null);

		}


		private onTap(evt:egret.TouchEvent):void{
			// egret.Tween.get(this.spr).to({x:evt.stageX,y:evt.stageY},2000);
			// this.spr.x = evt.localX;
			// this.spr.y = evt.localY;
			// this.bg.graphics.lineTo(evt.stageX,evt.stageY);
			// this.bg.graphics.drawCircle(evt.stageX,evt.stageY,10);
			// this.bg.graphics.endFill();

			// this.pos = 0;
			// this.curX = this.posList[0];
			// this.curY = this.posList[1];
			// this.spr.x = this.curX;
			// this.spr.y = this.curY;
			// this.toX = this.curX;
			// this.toX = this.curY;
			// this.pos += 2;
			// this.moveTo(this.posList[this.pos],this.posList[this.pos+1]);
			// this.pos += 2;
			// this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
			// let node = new Node(0);
			// this.addChild(node);
			// this.nodeList.push(node);

			// this.lastNode = node;

			// this.lastNode.once('addNextNode',(evt)=>{

			// },this);

			// this.addNode();
			Node.speed = 1;
		}

		private addNode():void{
			let node = new Node(0);
			this.addChild(node);
			this.nodeList.push(node);

			this.lastNode = node;

			this.lastNode.once('addNextNode',(evt)=>{
				console.log("addNextNode");
				this.addNode();
			},this);
		}


		private moveTo(x:number,y:number):void{

			this.toX = x;
			this.toX = y;

			let curX = this.spr.x;
			let curY = this.spr.y;
			let radians  = Math.atan2(y - curY,x - curX);

			let dis = Math.sqrt( (x - curX) * (x - curX) +  (y - curY) * (y - curY) );

			let count = Math.floor(dis / this.speed );

			let moveX:number = Math.cos(radians) * this.speed;
			let moveY:number = Math.sin(radians) * this.speed;


			
			this.count = count;

			this.moveX = moveX;
			this.moveY = moveY;


		}


		private onEnterFrame(evt:egret.Event):void{
			// if(this.count != 0){
			// 	this.spr.x += this.moveX;
			// 	this.spr.y += this.moveY;
			// 	this.count--;
			// 	if(this.count == 0){
			// 		if(this.pos < this.posList.length){
			// 			this.curX = this.toX;
			// 			this.curY = this.toY;
			// 			this.moveTo(this.posList[this.pos],this.posList[this.pos+1]);
			// 			this.pos += 2;
			// 		}	
			// 	}
			// } else {
			// 	// if(this.pos < this.posList.length){
			// 	// 	this.curX = this.toX;
			// 	// 	this.curY = this.toY;
			// 	// 	this.moveTo(this.posList[this.pos],this.posList[this.pos+1]);
			// 	// 	this.pos += 2;
			// 	// }
			// }

			this.nodeList.forEach((node)=>{
				node.enterFrame();
			})
		}
	}

	class Node extends egret.Sprite{
		private spr:egret.Sprite;

		public static speed:number = 5;
		private count = 0;
		private moveX = 0;
		private moveY = 0;
		private pos:number = 0;
		private curX:number;
		private curY:number;	
		private toX:number;
		private toY:number;	


		private num = 0;
		private isLast:boolean;
		private posList = [700,118,660.95,128.95,629.45,153.75,616.45,191.25,614.45,231.25,614.45,271.25,614.45,311.25,614.45,351.25,614.45,391.25,614.45,431.25,
			614.45,471.25,614.45,511.25,614.45,551.25,614.45,591.25,614.45,631.25,614.45,671.25,614.45,711.25,614.45,751.25,614.45,791.25,611.9,831.25,
			594,867.05,559.5,887.7,519.8,893.05,479.8,893.05,439.8,893.05,399.8,893.05,359.8,893.05,319.8,893.05,279.8,893.05,239.8,893.05,
			199.8,893.05,158.5,893.05,118.8,885.3,88.25,859.1,71.6,822.25,69.15,781.75,67.05,741.75,67.05,701.75,68.6,661.75,68.6,621.75,68.6,581.75,
			68.6,541.75,68.6,501.75,68.6,461.75,68.6,421.75,68.6,381.75,67.05,341.75,67.05,301.75,67.05,261.75,70,220.9,74,180.1,95.05,144.15,128.4,122.9,
			168.4,117.25,208.4,117.25,248.4,117.25,288.4,117.25,328.4,117.25,368.4,117.25];	

		constructor(pos:number,isLast:boolean = true,offX:number=0,offY:number=0){
			super();
			this.isLast = isLast;
			this.pos = pos;
			this.curX = this.posList[this.pos];
			this.curY = this.posList[this.pos+1];
			this.x = this.curX;
			this.y = this.curY;
			this.initUI();
			this.pos += 2;
			this.moveTo(this.posList[this.pos],this.posList[this.pos+1]);
			this.pos += 2;
		}

		private initUI():void{
			this.spr = new egret.Sprite();
			this.spr.graphics.beginFill(0xff0000);
			this.spr.graphics.drawCircle(0,0,20);
			this.spr.graphics.endFill();
			this.addChild(this.spr);			
		}

		public enterFrame():void{
			if(this.count != 0){
				this.x += this.moveX;
				this.y += this.moveY;
				this.count--;
				if(this.count == 0){
					// this.x = this.toX;
					// this.y = this.toY;
					if(this.isLast){
						this.dispatchEvent(new egret.Event('addNextNode'));
						this.isLast = false;
					}
					if(this.pos < this.posList.length){
						this.curX = this.toX;
						this.curY = this.toY;
						this.moveTo(this.posList[this.pos],this.posList[this.pos+1]);
						this.pos += 2;
					}	
				}
			} 
		}

		private moveTo(x:number,y:number):void{

			this.toX = x;
			this.toY = y;

			let curX = this.x;
			let curY = this.y;
			let radians  = Math.atan2(y - curY,x - curX);

			let dis = Math.sqrt( (x - curX) * (x - curX) +  (y - curY) * (y - curY) );

			let count = Math.floor(dis / Node.speed );

			let moveX:number = Math.cos(radians) * Node.speed;
			let moveY:number = Math.sin(radians) * Node.speed;


			
			this.count = count;

			this.moveX = moveX;
			this.moveY = moveY;


		}

	}

}