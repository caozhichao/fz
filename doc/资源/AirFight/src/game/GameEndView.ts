module game {
	/**
	 * 游戏结束界面
	 * @Class GameEndView
	 * @author Bean
	 * @since 2016.12.28
	 */
	export class GameEndView extends BaseView {
		private ui: EndUi = null;
		public constructor() {
			super();
			this.ui = new EndUi();
			this.addChild(this.ui);
			var self: GameEndView = this;
			this.ui.addEventListener(egret.Event.COMPLETE, function (): void {
				self.ui.restarBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (): void {
					this.dispatchEvent(new egret.Event(game.START_GAME));
				}, self);
			}, this);
		}

		// private clickFunction(): void {

		// }

		protected show(): void {
			super.show();
			var result = GameModel.ins.result;
			if (result == 0) {
				Message.show('很遗憾你没有过关');
			}
			else if (result == 1) {
				Message.show('恭喜你通关了');
			}
			else {
				throw '战斗还没结果怎么出了结束界面';
			}
			this.ui.killnum.text = GameModel.ins.killNum.toString();
			this.ui.killnum.width = this.ui.killnum.textWidth + 2;
			this.ui.killnum.x = (this.ui.width - this.ui.killnum.width) >> 1;
		}
	}

	class EndUi extends eui.Component {

		public titleImg: eui.Image;
		public killnum: eui.BitmapLabel;
		public restarBtn: eui.Button;


		public constructor() {
            super();
            this.skinName = "resource/uiSkin/GameEndSkin.exml";
            // this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

		protected childrenCreated(): void{
			super.childrenCreated();
			this.dispatchEventWith(egret.Event.COMPLETE);
		}

	}
}