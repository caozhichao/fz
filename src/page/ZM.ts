module fz {

	/**
	 * 祖玛算法
	 * https://blog.csdn.net/wuzhi3078/article/details/51706700
	 */
	export class ZM extends eg.PageBase{
		private posList:number[];
		private lastNode:Node;
		private index:number = 0;
		private posIndex:number = 0;
		public constructor() {
			super();
		}

		public initUI(data:any):void{
			super.initUI(data);
			this.posList = [-25,249,25,249,75,249,125,249,175,249,225,249,275,249,325,249,325,299,325,349,325,399,325,449,325,399,325,549,325,599,325,649];	

			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
			this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		}

		private onTap(evt:egret.TouchEvent):void{
			let node:Node = new Node(this.index++);
			if(this.lastNode){
				this.lastNode.next = node;
			}
			node.pre = this.lastNode;
			this.lastNode = node;
			this.addChild(node);
		}

		private onEnterFrame(evt:egret.Event):void{
			let node:Node;
			node = this.lastNode;
			if(node){
				node.x = this.posList[this.posIndex++];
				node.y = this.posList[this.posIndex++];
			}
		}
	}

	class Node extends egret.Sprite{
		public pre:Node;
		public next:Node;
		private index:number;
		// private nodeX:number;
		// private nodeY:number;
		private curX:number;
		private curY:number;
		private tx:number;
		private ty:number;

		private speed:number = 5;
		
		public constructor(index:number){
			super();
			this.index = index;
			this.initUI();
		}

		private initUI():void{
			let shape:egret.Shape = new egret.Shape();
			shape.graphics.beginFill(0x0);
			shape.graphics.drawCircle(0,0,50);
			shape.graphics.endFill();
			this.addChild(shape);
		}

		public setNodePos(x:number,y:number):void{
			this.curX = x;
			this.curY = y;
			this.x = this.curX;
			this.y = this.curY;
		}

		public moveTo(tx:number,ty:number):void{
			this.tx = tx;
			this.ty = ty;
		}
		
		public updatePos():void{


			
		}

	}
}