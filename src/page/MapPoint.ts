module test {
	export class MapPoint extends eg.PageBase{
		private select:Point;
		private _line:Line;

		private matrixLine:Line[][];
		private _map:egret.Bitmap;
		private _points:Point[];

		public _container:eui.Group;
		public _mapImg:eui.Image;
		public _sl:eui.Scroller;
		public _btn:eui.Button;


		private _kb:KeyBoard;

		private _keyState:any;
		public constructor() {
			super();
			this.skinName = 'skins.Map2dSkin';
			// this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddedToStage,this);
		}

		public initComplete(data:any):void{

			this._container.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTap,this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
			this.matrixLine = [];
			this._keyState = {};
			this._kb = new KeyBoard();
			this._kb.addEventListener(KeyBoard.onkeydown,this.onKeyDown,this);		
			this.changeState();
			eg.EventDispatcher.Instance.addEventListener('remove_line',this.onRemoveLine,this);

			this._points = [];
			this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCreateMapData,this);
		}

		private onCreateMapData(evt:egret.TouchEvent):void{

			console.log('onCreateMapData');
			let wMatrix:number[][] = [];

			let vNum = this._points.length;

			let len = this.matrixLine.length;
			let line:Line;
			for(let i = 0; i < vNum; i++){
				let arr = this.matrixLine[i] || [];
				wMatrix[i] = [];				
				for(let j = 0; j < vNum;j++){					
					line = arr[j];					
					if(line){
						wMatrix[i][j] = line.weight;
					} else {
						wMatrix[i][j] = undefined;
					}
				}				
			}
			console.log(wMatrix.toString());


			let vArr = [];
			let p:Point;
			for(let i = 0; i < vNum;i++){
				p = this._points[i];				
				if(p){
					vArr.push(p.id,p.x,p.y);
					// vArr.push({id:p.id,x:p.x,p.y})
				} else {
					// vArr.push(undefined,undefined);
				}
			}

			console.log(vArr.toString());

			//测试寻路
			
			let vetexs = '138,156,255,156,371,159,185,283,374,306'.split(',');
			vetexs = vArr.toString().split(',');

			vNum = vetexs.length / 3;
			let w = ',117,,135,,,,116,,,,,,,,,,,,190,,,,,'.split(',');
			w = wMatrix.toString().split(',');

			// let d = new eg.Dijkstra(vetexs,w,this._points.length);
			// let paths = d.find(0,this.select.id);
			// console.log(paths);



		}

		private onRemoveLine(evt:egret.Event):void{
			this.removeLine(evt.data.startId,evt.data.endId);			
		}

		private onKeyDown(evt):void{
			//console.log(evt.data);
			if(this._kb.isContain(evt.data,KeyBoard.A)){
				this._keyState[KeyBoard.A] = !this._keyState[KeyBoard.A];			
				this.changeState();			
			} else if(this._kb.isContain(evt.data,KeyBoard.C)){
				if(this.select){
					this.select.changeColor(0xff0000);
					this.select = null;
				}
				if(this._line){
					this._line.changeColor(0x00ff00);
					this._line = null;
				}
			} else if(this._kb.isContain(evt.data,KeyBoard.D)){
				//删除
				if(this._line){
					//删除matrix数据
					// let startId:number = this._line.startId();
					// let endId:number = this._line.endId();

					// if(startId < endId){
					// 	this.matrixLine[startId][endId] = null;
					// } else {
					// 	this.matrixLine[endId][startId] = null;
					// }

					// this._line.remove();

					this.removeLine(this._line.startId(),this._line.endId());

					this._line = null;
				}

				if(this.select){
					this._points[this.select.id] = null;
					this.select.remove();
					this.select = null;
				}

			}
			console.log(this._keyState);
		}

		private removeLine(startId,endId):void{

			let temp;
			if(startId > endId){
				temp = startId;
				startId = endId;
				endId = temp;
			} 				
			let line = this.matrixLine[startId][endId];
			if(line){
				line.remove();
				this.matrixLine[startId][endId] = null;
			}
			
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
			// if(this.select){
			// 	this.select.changeColor(0xff0000);					
			// }
			let p = evt.target;	
			let flag = false;		
			if(p instanceof Line){

				if(this._line && this._line != p){
					this._line.changeColor(0x00ff00);
				}

				let l = p as Line;
				l.changeColor(0x000000);
				this._line = l;

				return;
			}
			if( !(p instanceof Point) ){
				p = new Point();
				p.x = evt.localX;
				p.y = evt.localY;
				this._container.addChild(p);							
				// flag = true;
				this._points[p.id] = p;
			} 		

			if(this.select && this.select.id != p.id){
				// console.log('line');
				// this.matrix[]

				this.select.changeColor(0xff0000);

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
		private _radius:number = 20;
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
			this._tf.width = this._radius * 2;
			this._tf.height = this._radius * 2;
			this._tf.anchorOffsetX = this._radius;
			this._tf.anchorOffsetY = this._radius;
			this._tf.textAlign = egret.HorizontalAlign.CENTER;
			this._tf.verticalAlign = egret.VerticalAlign.MIDDLE;

			this.addChild(this._tf);
		}
		public get id():number{
			return this._id;
		}
		public changeColor(value:number):void{
			this.graphics.beginFill(value);
			this.graphics.drawCircle(0,0,this._radius);
			this.graphics.endFill();
		}
		public changeXY(x:number,y:number):void{
			this.x = x;
			this.y = y;

			this.dispatchEventWith('changeXY');
		}

		public remove():void{
			this.dispatchEventWith('remove');
			this.parent.removeChild(this);
		}

	}

	class Line extends egret.Sprite{
		private _p1:Point;
		private _p2:Point;
		private _isDispose:boolean = false;
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

			this._p1.addEventListener('remove',this.onRemovePoint,this);
			this._p2.addEventListener('remove',this.onRemovePoint,this);

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

		public remove():void{
			if(!this._isDispose){
				this._isDispose = true;
				this._p1.removeEventListener('changeXY',this.onChangeXY,this);
				this._p2.removeEventListener('changeXY',this.onChangeXY,this);
				this._p1.removeEventListener('remove',this.onRemovePoint,this);
				this._p2.removeEventListener('remove',this.onRemovePoint,this);
				this.parent.removeChild(this);

			}
		}		

		public startId():number{
			return this._p1.id;
		}

		public endId():number{
			return this._p2.id;
		}

		private onRemovePoint():void{			
			eg.EventDispatcher.Instance.dispatchEventWith('remove_line',false,{startId:this.startId(),endId:this.endId()});
		}

		public get weight():number{
			return egret.Point.distance(new egret.Point(this._p1.x,this._p1.y),new egret.Point(this._p2.x,this._p2.y)) | 0;
		}
	}
}