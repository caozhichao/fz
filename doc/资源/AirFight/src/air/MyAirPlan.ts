/**
 * 我的飞机
 * @Class MyAirPlan
 * @author Bean
 * @since 2016.12.28
 */
class MyAirPlan extends AirPlan {
	private _isTouch: boolean = false;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddHandler, this);
	}

	protected onAddHandler(e: egret.Event): void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddHandler, this);
		this.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveHandler, this);
	}

	private onRemoveHandler(e: egret.Event): void {
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveHandler, this);
		this.parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddHandler, this);
	}

	private onMove(evt: egret.TouchEvent): void {
		var tx: number = evt.localX;
		tx = Math.max(0, tx);
		tx = Math.min(GameUtil.curWidth() - this.width, tx);

		var ty: number = evt.localY;
		ty = Math.max(GameUtil.curHeight() / 2 - 100, ty);
		ty = Math.min(GameUtil.curHeight() - this.height - 10, ty);
		this.x = tx;
		this.y = ty;
	}

	public addBlood(val: number): void{
		this._leftBlood += val;
	}

	/**造成伤害值*/
	public hurted(val: number): void {
		this._leftBlood -= val;
		if (this._leftBlood > 0) {
			EffectUtils.shakeObj(this._avatarImg);
		}
	}

	protected onPlayBoomHandler(): void {
		this.removeChild(this._boomMc);
		this.dispatchEventWith(game.END_GAME);
	}

	/**播放爆炸效果*/
	protected playBoom(): void {
		super.playBoom();
		this._boomMc.play(3);
	}

	/**死亡 */
	public die(): void {
		super.die();
		this.dispatchEventWith(game.PLAYER_DIED);
		this.parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
	}

	public reUse(): void {
		super.reUse();
		if (this._boomMc && this._boomMc.isPlaying) {
			this._boomMc.stop();
			this.removeChild(this._boomMc);
		}
	}
}