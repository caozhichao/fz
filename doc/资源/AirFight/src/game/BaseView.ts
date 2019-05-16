module game {

	/**开始游戏*/
	export const START_GAME: string = 'start_game';
	/**游戏结束*/
	export const END_GAME: string = 'end_game';
	/**玩家死亡*/
	export const PLAYER_DIED: string = 'player_died';
	/**boss死亡*/
	export const BOOS_DIED: string = 'boos_died';

	/**
	 * 游戏界面基类
	 * @Class GameEndView
	 * @author Bean
	 * @since 2016.12.28
	 */
	export class BaseView extends egret.Sprite {

		protected _container: GameContainer;
		private _isPop: boolean;
		public constructor() {
			super();
			this._container = App.gameContainer;
		}

		public set isPop(val: boolean) {
			if (this._isPop == val)
				return;
			this._isPop = val;
			if (val) {
				this.show();
			}
			else {
				this.hide();
			}
		}

		protected show(): void {
			this._container.addChild(this);
		}

		protected hide(): void {
			if (this._container.contains(this))
				this._container.removeChild(this);
		}

	}
}
