module game{

	/**
	 * 游戏container
	 * @Class GameContainer
	 * @author Bean
	 * @since 2016.12.28
	 */
	export class GameContainer extends egret.Sprite {

		private _startView: GameStartView;
		private _sceneView: GameScene;
		private _endView: GameEndView;

		public constructor() {
			super();
			Message.layer = this;
		}

		public init(): void {
			this.enterView(0);
		}

		/**
		 *进入游戏界面
		 @param type 0第一次进入
		 * */
		public enterView(type: number): void {
			this.clearView();
			if (this._startView == null)
			{
				this._startView = new GameStartView();
				this._startView.addEventListener(game.START_GAME, this.startGame, this);
			}	
			this._startView.isPop = true;
			Message.show('欢迎进入飞行战场')
		}
		/**
		 *开始游戏
		 * */
		public startGame(): void {
			this.clearView();
			if (this._sceneView == null) {
				this._sceneView = new GameScene();
				this._sceneView.addEventListener(game.END_GAME, this.endGame, this);
			}
			this._sceneView.isPop = true;
			this._sceneView.start();
			SoundManager.ins.playBgSound();
		}

		public endGame(): void {
			this.clearView();
			SoundManager.ins.stopBgSound();
			if (this._endView == null) {
				this._endView = new GameEndView();
				this._endView.addEventListener(game.START_GAME, this.startGame, this);
			}
			this._endView.isPop = true;
		}

		private clearView(): void {
			if (this._sceneView)
				this._sceneView.isPop = false;
			if (this._startView)
				this._startView.isPop = false;
			if (this._endView)
				this._endView.isPop = false;
		}
	}
}