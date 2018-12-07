module test {

	/**
	 * 地图卷屏测试
	 */
	export class SceneScrollTest extends eg.PageBase{
		private _sceneScroll:eg.SceneScroll;
		private _map:Map;
		private _player:Player;	
		private _mapPos:egret.Point;

		private _speed:number = 3;
		private _radians:number;

		// private _dis:number;
		// private _tx:number = 0;
		// private _ty:number = 0;
		private _mCount:number = 0;

		public constructor() {
			super();
		}

		public initUI(data:any):void{
			super.initUI(data);			
			this._mapPos = new egret.Point(0,0);

			this._map = new Map();
			this.addChild(this._map);
			this._player = new Player();
			this._map.addChild(this._player);
			this._sceneScroll = new eg.SceneScroll(eg.Config.STAGE_W,eg.Config.STAGE_H,750,1448);	
			this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);	

			this._map.touchEnabled = true;
			this._map.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMapTap,this);	
		}

		private onMapTap(evt:egret.TouchEvent):void{
			// egret.Tween.get(this._player).to({x:evt.localX,y:evt.localY},1000);
			this._radians = Math.atan2(evt.localY - this._player.y,evt.localX - this._player.x);
			let dis = egret.Point.distance(new egret.Point(this._player.x,this._player.y),new egret.Point(evt.localX,evt.localY));
			// this._tx = evt.localX;
			// this._ty = evt.localY;
			this._mCount = Math.floor(dis / this._speed);


		}

		private onEnterFrame(evt:egret.Event):void{

			//更新Player坐标
			// if(egret.Point.distance(new egret.Point(this._player.x,this._player.y),new egret.Point(this._tx,this._ty)) < 1){
			// 	return;
			// }
			if(this._mCount <= 0){
				return;
			}
			this._mCount--;
			this._player.x += Math.cos(this._radians) * this._speed;
			this._player.y += Math.sin(this._radians) * this._speed;


			//更新地图
			let pos:egret.Point = this._sceneScroll.updatePostion(this._player.x,this._player.y);
			if(pos.x != this._mapPos.x || pos.y != this._mapPos.y){
				eg.log(pos.x + '|' + pos.y);
				this._mapPos.x = pos.x;
				this._mapPos.y = pos.y;

				//更新场景坐标
				this._map.x =  this._mapPos.x;
				this._map.y = this._mapPos.y;
			}




		}
	}

	class Map extends egret.Sprite{
		public constructor(){
			super();
			// this.graphics.beginFill(0xffffff);
			// this.graphics.drawRect(0,0,1000,2000);
			// this.graphics.endFill();
			let img:eui.Image = new eui.Image();
			img.source = 'resource/assets/game/images/bg.png';
			this.addChild(img);
		}
	}
	class Player extends egret.Sprite{
		public constructor(){
			super();

			this.graphics.beginFill(0xff0000);
			this.graphics.drawCircle(0,0,10);
			this.graphics.endFill();

		}
	}
}