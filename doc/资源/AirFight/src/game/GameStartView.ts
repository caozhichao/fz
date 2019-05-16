module game {
	/**
	 * 游戏开始界面
	 * @Class GameStartView
	 * @author Bean
	 * @since 2016.12.28
	 */
	export class GameStartView extends BaseView {
		private _startBtn: componment.CustomButton;
		private _bgImg: egret.Bitmap;
		private _titleImg: egret.Bitmap;
		public constructor() {
			super();
			this._bgImg = GameUtil.createBitmapByName('bgMap_1');
			this.addChild(this._bgImg);

			this._titleImg = new egret.Bitmap(RES.getRes('title_png'));
			this._titleImg.x = (GameUtil.curWidth() - this._titleImg.width) >> 1;
			this._titleImg.y = 130;
			this.addChild(this._titleImg);
			var btn = new componment.CustomButton('btn_start_png');
			this._startBtn = btn;
			btn.x = (GameUtil.curWidth() - btn.width) >> 1;
			btn.y = this._bgImg.height - 100;
			this.addChild(btn);
			btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickFunction, this);
		}

		private clickFunction(): void {
			this.dispatchEvent(new egret.Event(game.START_GAME))
		}

		protected show(): void {
			super.show();
		}
	}
}
