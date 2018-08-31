namespace eg {
	export class LoadingSimpleUI extends egret.DisplayObjectContainer implements eg.ILoadingUI{
		private firstRadius:number = 50;
		private secondRadius:number = 25;
		//取点的角度间隔
		private angle:number = 30;
		private num:number;
		private frameIndex:number;
		private thickness:number = 5;
		//动画帧频
		private frameRate:number = 20;
		private frameTime:number;
		private t1:number;
		//保存获取到的点
		private firstPoints:any[];
		private secondPoints:any[];
		private shape:egret.Shape;
		private ani_shape:egret.Shape;

		private tf_msg:egret.TextField;

		public constructor() {
			super();
			this.initUI();
		}

		private initUI():void{

			this.frameTime = 1000 / this.frameRate;

			let bg:egret.Shape = eg.createRect(eg.Config.STAGE_W,eg.Config.STAGE_H,0x0,0.7);
			bg.touchEnabled = true;

			this.addChild(bg);

			//获取圆上的点

			this.firstPoints = [];
			this.secondPoints = [];

			this.num = 360 / this.angle;

			let pX:number;
			let pY:number;
			let total:number = 0;
			let radians:number;
			for(let i:number = 0; i < this.num; i++){
				radians = total * Math.PI / 180;
				pX = Math.cos(radians) * this.firstRadius;
				pY = Math.sin(radians) * this.firstRadius;
				this.firstPoints[i] = {x:pX,y:pY};
				
				pX = Math.cos(radians) * this.secondRadius;
				pY = Math.sin(radians) * this.secondRadius;

				this.secondPoints[i] = {x:pX,y:pY};

				total += this.angle;
			}

			//画出图形

			this.shape = new egret.Shape();

			this.shape.graphics.lineStyle(this.thickness,0xD8D8D8);
			
			let p1:any;
			let p2:any;
			for(let i:number = 0;i< this.num;i++){
				p1 = this.firstPoints[i];
				p2 = this.secondPoints[i];
				this.shape.graphics.moveTo(p2.x,p2.y);
				this.shape.graphics.lineTo(p1.x,p1.y);
			}
			this.shape.graphics.endFill();
			this.shape.x = eg.Config.STAGE_W / 2;
			this.shape.y = eg.Config.STAGE_H / 2;
			this.addChild(this.shape);

			this.ani_shape = new egret.Shape();
			this.ani_shape.x = eg.Config.STAGE_W / 2;
			this.ani_shape.y = eg.Config.STAGE_H / 2;
			this.ani_shape.graphics.lineStyle(this.thickness,0x7A7A7A);
			this.addChild(this.ani_shape);

			this.tf_msg = eg.createTxt("",0,eg.Config.STAGE_H/2 + 70,eg.Config.STAGE_W,50,24,0xffffff,egret.HorizontalAlign.CENTER);

			this.addChild(this.tf_msg);

			if(DEBUG){
				this.show();
			}
		}

		public get content():egret.DisplayObject{
			return this;
		}

		public progress(cur:number,total:number):void{

		}

		public show(msg?:string):void{
			this.frameIndex = 0;
			this.t1 = egret.getTimer();
			this.addEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);
			this.showMsg(msg);
		}

		private showMsg(msg:string):void{
			this.tf_msg.text = msg;
		}

		private onFrame(evt:egret.Event):void{

			let t2:number = egret.getTimer();
			if(t2 - this.t1 > this.frameTime){
				let index:number = this.frameIndex % this.num;
				let p1:any = this.firstPoints[index];
				let p2:any = this.secondPoints[index];
				this.ani_shape.graphics.clear();
				this.ani_shape.graphics.lineStyle(this.thickness,0x333333);
				this.ani_shape.graphics.moveTo(p2.x,p2.y);
				this.ani_shape.graphics.lineTo(p1.x,p1.y);
				this.ani_shape.graphics.endFill();
				this.frameIndex++;
				this.t1 = t2;
			}


		}

		public hide():void{
			this.dispose();
		}

		public dispose():void{		
			if(this.parent){
				this.parent.removeChild(this);
			}
			this.removeEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);
		}		
	}
}