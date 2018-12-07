module eg {
	/**
	 * 场景卷屏算法
	 */
	export class SceneScroll {

		//视口的尺寸
		private _viewRect:egret.Rectangle;
		//场景地图的尺寸
		private _sceneRect:egret.Rectangle;
		//移动参考点
		private _scrollPoint:egret.Point;

		//滚动范围
		protected _scrollRect:egret.Rectangle;

		private $pos:egret.Point;

		public constructor(viewWith:number,viewHeight:number,maxWidth:number,maxHeight:number) {
			this._viewRect = new egret.Rectangle(0,0,viewWith,viewHeight);
			this._sceneRect = new egret.Rectangle(0,0,maxWidth,maxHeight);
			this._scrollPoint = new egret.Point(viewWith/2,viewHeight/2);
			this._scrollRect = new egret.Rectangle(0,0,maxWidth - viewWith,maxHeight - viewHeight);
			this.$pos = new egret.Point();
		}

		/**
		 * 根据移动目标计算场景的偏移量
		 */
		public updatePostion(x:number,y:number):egret.Point{
			let offX:number = x - this._scrollPoint.x;
			let offY:number = y - this._scrollPoint.y;
			offX = offX < 0?0:offX > this._scrollRect.width?this._scrollRect.width:offX;
			offY = offY < 0?0:offY > this._scrollRect.height?this._scrollRect.height:offY;
			offX = offX | 0; //取整
			offY = offY | 0; 
			this._sceneRect.x = -offX;
			this._sceneRect.y = -offY;
			this.$pos.setTo(-offX,-offY);
			return this.$pos;
		}
		
	}
}