module fz {
	export class PageGame extends eg.PageBase{
		private _container:egret.DisplayObjectContainer;
		private _tileContainer:egret.DisplayObjectContainer;
		private _tileMapVo:TileMapVo;
		private t1:number;
		private _player:Player;
		private _tileMapX:number;
		private _tileMapY:number;
		private _tileList:Tile[];

		//掉落时间检查
		private _fallDownCheckTime:number = 1000;
		private _fallDownTime:number;
		private _fallDownList:Tile[];
		//背景地图
		private map:Map;
		public constructor() {
			super();
		}

		public initUI(data:any):void{
			super.initUI(data);	
			// /*		
			this.map = new Map();
			this.map.y = eg.Config.STAGE_H;
			this.addChild(this.map);
			
			this._container = new egret.DisplayObjectContainer();
			this._tileContainer = new egret.DisplayObjectContainer();
			this._player = new Player(1);
			this._container.addChild(this._tileContainer);
			this._container.addChild(this._player);
			this.addChild(this._container);
			this._container.x = eg.Config.STAGE_W / 2 - TileVo.WIDTH / 2;
			this._container.y = eg.Config.STAGE_H - 400;		
			this._tileMapX = this._container.x;
			this._tileMapY = this._container.y;				


			this.initMap();
			this.t1 = egret.getTimer();
			this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);	
			this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTap,this);
			// */			
		}

		private initMap():void{
			this._tileList = [];
			this._fallDownTime = 0;
			this._fallDownList = [];
			this._tileMapVo = new TileMapVo();		
			this._player.updatePostion(this._tileMapVo.curTileVo);			
		}

		private onTap(evt:egret.TouchEvent):void{
			eg.log(evt.stageX);
			//点击的位置 0 左边 1右边
			let clickDir:number = 0;
			if(evt.stageX > eg.Config.STAGE_W / 2){
				clickDir = 1 // 右边
			}

			let ret = this._tileMapVo.checkDir(clickDir);

			eg.log(ret);
			if(ret[0] == 1){ //选择正确
				this._player.updatePostion(ret[1]);
				this._player.dir = clickDir;
				this.updateMap(clickDir);
				//添加一行格子
				this._tileMapVo.addNextRowTile(0);
				this.updateBgMap();
			}
		}

		private updateBgMap():void{
			//背景图片滚动
			let bgTy:number = this.map.y + TileVo.HEIGHT / 2;
			egret.Tween.removeTweens(this.map);
			egret.Tween.get(this.map).to({y:bgTy},500);
		}

		/**
		 * 格子容器移动
		 */
		private updateMap(dir:number):void{

			if(dir == 0){
				this._tileMapX += TileVo.WIDTH / 2;
			} else {
				this._tileMapX -= TileVo.WIDTH / 2;
			}
			this._tileMapY += TileVo.HEIGHT/2;

			let dis = egret.Point.distance(new egret.Point(this._container.x,this._container.y),new egret.Point(this._tileMapX,this._tileMapY));

			egret.Tween.removeTweens(this._container);			
			egret.Tween.get(this._container).to({x:this._tileMapX,y:this._tileMapY},450);
			// eg.log(this._tileMapX + '|' + this._tileMapY);
		}

		private onEnterFrame(evt:egret.Event):void{
			let t2:number = egret.getTimer();
			let passTime = t2 - this.t1;
			this.t1 = t2;
			this.updateTile(passTime);
			this.checkFallDown(passTime);
			this.tileMove(passTime);

			//背景地图
			this.map.move();
		}

		/**
		 * 检查掉落
		 */
		private checkFallDown(passTime:number):void{
			this._fallDownTime += passTime;
			if(this._fallDownTime >= this._fallDownCheckTime){
				this._fallDownTime -= this._fallDownCheckTime;
				this._tileList.forEach(element => {
					if(element.row > this._tileMapVo.curTileVo.row){
						if(this._fallDownList.indexOf(element) == -1){
							this._fallDownList.push(element);
						}
					}
				});
			}
		}

		/**
		 * 格子移动
		 */
		private tileMove(passTime:number):void{

			let deletList:Tile[] = [];
			this._fallDownList.forEach(element => {
				element.move(passTime);
				if(this._container.y + element.y >= eg.Config.STAGE_H){
					//出了屏幕了
					eg.log('出了屏幕了');
					deletList.push(element);
				}
			});

			deletList.forEach(element => {
				let index = this._tileList.indexOf(element);
				this._tileList.splice(index,1);
				this._tileContainer.removeChild(element);
				let index2 = this._fallDownList.indexOf(element);
				this._fallDownList.splice(index2,1);
			});		
		}

		/**
		 * 添加格子地图
		 */
		private updateTile(passTime):void{
			let list:TileVo[] = this._tileMapVo.nextRowTile;
			if(list){
				list.forEach(element => {
					if(element){
						this.addTile(element);
					}
				});
			}
		}

		/**
		 * 添加一个Tile
		 */
		private addTile(tileVo:TileVo):void{
			let tile:Tile = new Tile(tileVo);	
			let ty:number = tile.y;
			tile.y -= 300;
			egret.Tween.get(tile).to({y:ty},500);
			this._tileContainer.addChildAt(tile,0); //处理深度问题，后加的在后面，防止遮挡		
			this._tileList.push(tile);
		}

		// public get resName():string[]{
		// 	return ['game'];
		// }

	}

	class Tile extends egret.Sprite{	
		//掉落的速度
		public static speed:number = 600;
		private _bg:egret.Shape;
		private _lable:eui.Label;
		private _row:number;
		private _col:number;

		private _img:egret.Bitmap;
		private _obstacleImg:egret.Bitmap;
		
		private _data:TileVo;
		public constructor(data:TileVo){
			super();
			// this._row = pos.row;
			// this._col = pos.col;
			this._data = data;			
			this.initUI();
		}

		public initUI():void{

			let pos:egret.Point = this._data.screenPostion;
			this.x = pos.x;
			this.y = pos.y;

			/*
			let lineShape:egret.Shape = new egret.Shape();
			// lineShape.graphics.lineStyle(1,(this._col + this._row)%2==0?0xffff00:0x0);
			// if((this._col + this._row)%2 ==0){
			// 	lineShape.graphics.beginFill(0x0);
			// }
			lineShape.graphics.lineStyle(1,0xff0000);
			if(this._data.id == 0){
				// lineShape.graphics.beginFill(0x0);
			}

			lineShape.graphics.moveTo(0,0);
			lineShape.graphics.lineTo(TileVo.WIDTH,0);
			lineShape.graphics.lineTo(TileVo.WIDTH,TileVo.HEIGHT);
			lineShape.graphics.lineTo(0,TileVo.HEIGHT);
			lineShape.graphics.lineTo(0,0);	
			lineShape.graphics.endFill();		
			this.addChild(lineShape);
			*/

			

			/*
			if(this._data.id == 0){
				this._bg = new egret.Shape();
				this._bg.graphics.lineStyle(1,0xff0000);			
				this._bg.graphics.beginFill(0x0000ff);
				this._bg.graphics.moveTo(0,TileVo.HEIGHT / 2);
				this._bg.graphics.lineTo(TileVo.WIDTH/2,0);
				this._bg.graphics.lineTo(TileVo.WIDTH,TileVo.HEIGHT / 2);
				this._bg.graphics.lineTo(TileVo.WIDTH/2,TileVo.HEIGHT);
				this._bg.graphics.lineTo(0,TileVo.HEIGHT/2);
				this._bg.graphics.endFill();
				this.addChild(this._bg);
			}
			*/

			// /*
			// this._img = RES.getRes('tile_png');
			this._img = new egret.Bitmap(RES.getRes('tile_sheet_json.tile0'));

			this._img.anchorOffsetX = 75;
			this._img.anchorOffsetY = 43;
			this.addChild(this._img);

			this._img.x = TileVo.WIDTH / 2;
			this._img.y = TileVo.HEIGHT / 2;

			if(this._data.id != 0){
				this._obstacleImg = new egret.Bitmap(RES.getRes('tile_sheet_json.tile' + this._data.id));
				this._obstacleImg.anchorOffsetX = this._obstacleImg.width / 2;
				this._obstacleImg.anchorOffsetY = this._obstacleImg.height;
				this._obstacleImg.x = TileVo.WIDTH / 2;
				this._obstacleImg.y = TileVo.HEIGHT / 2 + 15;				
				this.addChild(this._obstacleImg);
			}
			// */


			/*
			this._lable = new eui.Label(this._data.toString());
			this._lable.width = TileVo.WIDTH;
			this._lable.height = TileVo.HEIGHT;
			this._lable.textAlign = egret.HorizontalAlign.CENTER;
			this._lable.verticalAlign = egret.VerticalAlign.MIDDLE;
			this._lable.size = 30;
			this.addChild(this._lable);
			*/
		}

		public move(passTime:number):void{
			this.y += Tile.speed / 1000 * passTime;
			// eg.log(this._row + '|' + this._col + '|' + this.y);
		}

		public get row():number{
			return this._data.row;
		}
		public get col():number{
			return this._data.col;
		}
	}

	class Player extends egret.Sprite{
		private shape:egret.Shape;
		private _dir:number;
		private _id:number;
		private _body:egret.Bitmap;
		public constructor(id:number){
			super();
			this._id = id;
			this.initUI();
		}
		private initUI():void{
			// this.shape = eg.createCircle(50,0xff0000,1);
			// this.addChild(this.shape);			
			this._body = new egret.Bitmap(RES.getRes('p' + this._id + '_png'));
			this._body.anchorOffsetX = this._body.width / 2;
			this._body.anchorOffsetY = this._body.height;
			this._body.y = 20;
			this.addChild(this._body);
		}

		public get dir():number{
			return this._dir;
		}

		public set dir(value:number){
			this._dir = value;
			if(this._dir == 0){
				this._body.scaleX = -1;
			} else {
				this._body.scaleX = 1;
			}
		}

		public move(passTime:number):void{
			//this.y += TileMap.speed / 1000 * passTime;
			// eg.log(this.y);
		}

		public updatePostion(tileVo:TileVo):void{
			let pos:egret.Point = tileVo.screenPostion;
			// this.x = pos.x + TileVo.WIDTH / 2;
			// this.y = pos.y + TileVo.HEIGHT / 2;
			let tx = pos.x + TileVo.WIDTH / 2;
			let ty = pos.y + TileVo.HEIGHT / 2;

			egret.Tween.get(this).to({x:tx,y:ty},100);
		}

	}


	class TileMapVo{
		/**
		 * 所有格子数据
		 */
		private allList:any[][];
		/***
		 * 可行格子列表
		 */
		private openList:TileVo[];
		
		private _firstTileVo:TileVo;
		private _lastRow:number;
		private _lastCol:number;
		private _lastTileVo:TileVo;
		//行走的对象
		private _curTileVo:TileVo;

		//初始格子的行数
		private initTileRowCount:number = 1;
		/**
		 * 当前显示的行
		 */
		private curShowRow:number = 0;
		

		public constructor(){
			this.initMap();	
		}

		private initMap():void{

			eg.log('initMap');
			this._lastRow = 0;
			this._lastCol = 0;
			this.openList = [];
			this.allList = [];

			// //设置起点格子
			this._firstTileVo = new TileVo(0,0,0);
			this._curTileVo = this._firstTileVo;
			this._lastTileVo = this._firstTileVo;
			this.openList[0] = this._lastTileVo;
			this.allList[0] = [this._lastTileVo];

			for(let i:number = 0;i < 7;i++){
				this.addNextRowTile(1);		
			}
		}

		public addNextRowTile(num:number):void{
			eg.log('addNextRowTile');
			//1.添加可行走的格子
			let seed:number = Math.floor(Math.random() * 2);
			let tileVo:TileVo;
			if(seed % 2 == 0){ //左边
				tileVo = this._lastTileVo.leftTile;
			} else {
				tileVo = this._lastTileVo.rightTile;
			}
			//this.openList.push(tileVo);
			this._lastTileVo.nextTile = tileVo;
			this._lastTileVo = tileVo;
			this._lastRow = this._lastTileVo.row;
			this._lastCol = this._lastTileVo.col;
			let list = [];
			list.push(tileVo);
			//2.添加同行的其他格子

			//障碍类型id
			let types = [1,2,3,4,5];
			let count = Math.floor(Math.random() * 3);
			//当前同行2边的4个格子的col
			// let colList = [tileVo.col-2,tileVo.col-1,tileVo.col +1,tileVo.col+2];
			let colList = [tileVo.col-1,tileVo.col +1];
			let i:number = 0;
			while(i < count){
				let colIndex = Math.floor(Math.random() * colList.length);
				let col = colList[colIndex];
				colList.splice(colIndex,1);//避免重复
				tileVo = new TileVo(tileVo.row,col,types[Math.floor(Math.random() * types.length)]);
				list.push(tileVo);
				i++
			}
			//保存所有数据
			this.allList[this._lastRow] = list;			
		}

		/**
		 * 获取下一行的格子
		 */
		public get nextRowTile():TileVo[]{
			// eg.log('nextRowTile:' + egret.getTimer());
			let list;
			if(this.curShowRow >= this._lastRow){
				list = this.allList[this.curShowRow];		
				eg.log('list1:' + list);
				this.curShowRow--;
			}
			return list;
		}

		public get startTileVo():TileVo{
			return this.openList[0];
		}	

		public get firstTileVo():TileVo{
			return this._firstTileVo;
		}

		public get nextTileVo():TileVo{
			let tileVo:TileVo = this._curTileVo.nextTile;
			this._curTileVo = tileVo;
			return tileVo;
		}

		public get curTileVo():TileVo{
			return this._curTileVo;
		}

		public get leftTile():TileVo{
			return this._curTileVo.leftTile;
		}

		public get rightTile():TileVo{
			return this._curTileVo.rightTile;
		}

		public checkDir(dir:number):any[]{
			let tile:TileVo;
			if(dir == 0){
				tile = this._curTileVo.leftTile;
			} else if(dir == 1){
				tile = this._curTileVo.rightTile;
			}

			let ret = [];
			//next 
			let nextTile = this._curTileVo.nextTile;
			if(tile.row == nextTile.row && tile.col == nextTile.col){
				ret = [1,tile];
				this._curTileVo = nextTile;
			} else {
				ret = [0,tile];
			}
			return ret;
		}


	}

	class TileVo{
		public static WIDTH:number = 192;
		public static HEIGHT:number = 190;
		private _row:number;
		private _col:number;
		private _id; //格子类型id
		private _nextTile:TileVo;
		public constructor(row:number,col:number,id:number){
			this._row = row;
			this._col = col;
			this._id = id;
		}

		public set nextTile(value:TileVo){
			this._nextTile = value;
		}

		public get nextTile():TileVo{
			return this._nextTile;
		}

		public get screenPostion():egret.Point{
			let x = this._col*TileVo.WIDTH+(this._row&1)*TileVo.WIDTH/2;
			let y = this._row*TileVo.HEIGHT/2;
			return new egret.Point(x,y);
		}

		public get row():number{
			return this._row;
		}

		public get col():number{
			return this._col;
		}

		public get id():number{
			return this._id;
		}

		/**
		 * 获取下一行的左边的位置
		 * 
		 */
		public get leftTile():TileVo{
			eg.log('leftTile');
			let leftRow:number;
			let leftCol:number;
			leftRow = this._row - 1;
			if(this._row % 2 == 0){ //偶数行				
				leftCol = this._col - 1;				
			} else { //奇数行				
				leftCol = this._col;				
			}
			return new TileVo(leftRow,leftCol,0);
		}

		/**
		 * 获取下一行的右边的位置
		 * 
		 */
		public get rightTile():TileVo{
			eg.log('rightTile');
			let rightRow:number;
			let rightCol:number;
			rightRow = this._row - 1;											
			if(this._row % 2 == 0){ //偶数行		
				rightCol = this._col;		
			} else { //奇数行							
				rightCol = this._col +1;											
			}
			return new TileVo(rightRow,rightCol,0);
		}

		public clone():TileVo{
			let tileVo:TileVo = new TileVo(this._row,this._col,this._id);
			return tileVo;
		}

		public toString():string{			
			return this._row + "|" + this._col + '|' + this._id;
		}
	}

	class Map extends egret.Sprite{
		private count:number = 0;
		private mapList:egret.Bitmap[];
		private deleteCount:number = 0;
		private mapHeight:number = 1507;
		public constructor(){
			super();
			this.initUI();
		}

		private initUI():void{
			this.mapList = [];
			this.addMap();
			this.addMap();
		}

		public addMap():void{
			this.count++;
			let bg:egret.Bitmap = new egret.Bitmap(RES.getRes('map2_png'));
			bg.y = -this.count * bg.height;
			this.addChild(bg);
			this.mapList.push(bg);
		}

		public move():void{

			let num = Math.floor((this.y - eg.Config.STAGE_H) / this.mapHeight);
			
			let len = num - this.deleteCount;
			if(len > 0){
				eg.log(num + '|' + this.deleteCount);
				let map = this.mapList.shift();
				this.removeChild(map);
				this.addMap();
				this.deleteCount = num;
			}





		}		

	}

}