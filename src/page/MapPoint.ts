module test {
	export class MapPoint extends eg.PageBase{
		private select:Point;
		private matrixLine:Line[][];
		private _map:egret.Bitmap;

		public _container:eui.Group;
		public _mapImg:eui.Image;
		public _sl:eui.Scroller;

		private _kb:KeyBoard;

		private _keyState:any;
		public constructor() {
			super();
			this.skinName = 'skins.Map2dSkin';
			// this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddedToStage,this);
		}

		public initUI(data:any):void{

			this._container.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTap,this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
			this.matrixLine = [];
			this._keyState = {};
			this._kb = new KeyBoard();
			this._kb.addEventListener(KeyBoard.onkeydown,this.onKeyDown,this);		
			this.changeState();
		}

		private onKeyDown(evt):void{
			//console.log(evt.data);
			if(this._kb.isContain(evt.data,KeyBoard.A)){
				this._keyState[KeyBoard.A] = !this._keyState[KeyBoard.A];			
				this.changeState();			
			}
			console.log(this._keyState);
		}

		private changeState():void{
			if(this._keyState[KeyBoard.A]){					
				this._sl.scrollPolicyH = eui.ScrollPolicy.OFF;
				this._sl.scrollPolicyV = eui.ScrollPolicy.OFF;				
			}else {
				this._sl.scrollPolicyH = eui.ScrollPolicy.ON;
				this._sl.scrollPolicyV = eui.ScrollPolicy.ON;				
			}				
		}

		private onMapBegin(evt:egret.TouchEvent):void{
			console.log(evt.localX + '|' + evt.localY);			
		}			

		private onAddedToStage(evt:egret.Event):void{

			let map = new egret.Bitmap(RES.getRes('52b7cb7821232fca53000004_201809211329088743_png'));
			map.touchEnabled = true;
        	this.addChild(map);
			this._map = map;
			// this._map.width = 1080;
			// this._map.height = 540;

			// this.graphics.beginFill(0x00ff00);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTap,this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
			// this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
			this.matrixLine = [];
		}
		private onMove(evt:egret.TouchEvent):void{

			if(this._keyState[KeyBoard.A]){
				console.log('onMove:' + evt.stageX + '|' + evt.stageY);
				// this.select.x = evt.stageX;
				// this.select.y = evt.stageY;
				let p = this._container.globalToLocal(evt.stageX,evt.stageY);
				this.select.changeXY(p.x,p.y);
			}

			evt.stopImmediatePropagation();
			evt.stopPropagation();
		}

		private onEnd(evt:egret.TouchEvent):void{
			console.log('onEnd');
		}


		private onTap(evt:egret.TouchEvent):void{

			if(!this._keyState[KeyBoard.A]){
				return;
			}

			console.log(evt);
			if(this.select){
				this.select.changeColor(0xff0000);					
			}
			let p = evt.target;	
			let flag = false;		
			if(p instanceof Line){

				let l = p as Line;
				l.changeColor(0x0000ff);


				return;
			}
			if( !(p instanceof Point) ){
				p = new Point();
				p.x = evt.localX;
				p.y = evt.localY;
				this._container.addChild(p);							
				// flag = true;
			} 			

			if(this.select && this.select.id != p.id){
				// console.log('line');
				// this.matrix[]
				let i = this.select.id;
				let j = p.id;
				let tmp;
				if(i > j){
					tmp = i;
					i = j;
					j = tmp;
				}
				if(this.matrixLine[i] == null){
					this.matrixLine[i] = [];
				}
				
				if(!this.matrixLine[i][j]){
					let line = new Line(this.select,p);
					this._container.addChild(line);

					this.matrixLine[i][j] = line; 
					console.log('add line');
				}


			}
			this.select = p;
			this.select.changeColor(0x000000);			

			evt.stopImmediatePropagation();				
		}
	}
	class Point extends egret.Sprite{
		private _tf:egret.TextField;
		private _id:number;
		private static num:number=0;
		public constructor(){
			super();
			this.initUI();
			this.touchEnabled = true;
			this.touchChildren = false;
		}
		private initUI():void{
			this.changeColor(0xff0000);

			this._id = Point.num++;
			this._tf = new egret.TextField();
			this._tf.text = this._id + '';
			// this._tf.border = true;
			this._tf.width = 40;
			this._tf.height = 40;
			this._tf.anchorOffsetX = 20;
			this._tf.anchorOffsetY = 20;
			this._tf.textAlign = egret.HorizontalAlign.CENTER;
			this._tf.verticalAlign = egret.VerticalAlign.MIDDLE;

			this.addChild(this._tf);
		}
		public get id():number{
			return this._id;
		}
		public changeColor(value:number):void{
			this.graphics.beginFill(value);
			this.graphics.drawCircle(0,0,20);
			this.graphics.endFill();
		}
		public changeXY(x:number,y:number):void{
			this.x = x;
			this.y = y;

			this.dispatchEventWith('changeXY');
		}
	}

	class Line extends egret.Sprite{
		private _p1:Point;
		private _p2:Point;
		public constructor(p1:Point,p2:Point){
			super();	
			this._p1 = p1;
			this._p2 = p2;		
			// this.graphics.lineStyle(5,0x00ff00);
			// this.graphics.moveTo(p1.x,p1.y);
			// this.graphics.lineTo(p2.x,p2.y);
			// this.graphics.endFill();
			this.changeColor(0x00ff00);

			this._p1.addEventListener('changeXY',this.onChangeXY,this);
			this._p2.addEventListener('changeXY',this.onChangeXY,this);

			this.touchEnabled = true;
		}

		private onChangeXY(evt:egret.Event):void{
			this.changeColor(0x00ff00);
		}

		public changeColor(color:number):void{
			this.graphics.clear();
			this.graphics.lineStyle(8,color);
			this.graphics.moveTo(this._p1.x,this._p1.y);
			this.graphics.lineTo(this._p2.x,this._p2.y);
			this.graphics.endFill();
		}

		
	}
}