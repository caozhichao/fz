module test {
	export class BezierEdit extends egret.Sprite{
		private index:number = 0;
		private shapeList:BezierShape[];
		private lineShape:egret.Shape;
		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdd,this);
		}

		private onAdd(evt:egret.TouchEvent):void{
			this.initUI();
		}

		private initUI():void{

			let map = new egret.Bitmap(RES.getRes("1_png"));
			this.addChild(map);

			this.lineShape = new egret.Shape();
			this.addChild(this.lineShape);

			this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTap,this);

			this.shapeList = [];
			// let shape:BezierShape = new test.BezierShape(0xff0000);

			// this.addChild(shape);
			// this.stage.add

			// this.stage.addEventListener(egret.Ev)
			eg.EventDispatcher.Instance.addEventListener('reset_draw',(evt)=>{
				this.draw();
			},this);
		}

		private onTap(evt:egret.TouchEvent):void{
			console.log('onTap');

			let shape:BezierShape = new test.BezierShape(0xff0000,this.index);
			shape.x = evt.stageX;
			shape.y = evt.stageY;
			this.addChild(shape);
			this.index++;
			this.shapeList.push(shape);

			// this.shapeList.sort();

			// let arr:number[][] = [];


			// for(let i:number = 0; i < this.shapeList.length;i++){
			// 	arr[i] = [this.shapeList[i].x,this.shapeList[i].y];
			// }
			// if(arr.length > 2){
			// 	this.graphics.clear();
			// 	this.initMap(arr);
			// }
			this.draw();
		}
		private draw():void{
			let arr:number[][] = [];
			for(let i:number = 0; i < this.shapeList.length;i++){
				arr[i] = [this.shapeList[i].x,this.shapeList[i].y];
			}

			if(arr.length > 2){
				this.lineShape.graphics.clear();
				this.initMap(arr);
			}
		}

		private initMap(arr:number[][]) {

			this.lineShape.graphics.lineStyle(2,0xFFFFFF);

			this.lineShape.graphics.moveTo(arr[0][0],arr[0][1]);

			for (var i:number = 1; i<arr.length - 2; ++i) {

				var xc:number = (arr[i][0] + arr[i+1][0])/2;

				var yc:number = (arr[i][1] + arr[i+1][1])/2;

				this.lineShape.graphics.curveTo(arr[i][0],arr[i][1],xc,yc);

			}
			this.lineShape.graphics.curveTo(arr[i][0],arr[i][1],arr[i+1][0],arr[i+1][1]);
	   }
	}
}