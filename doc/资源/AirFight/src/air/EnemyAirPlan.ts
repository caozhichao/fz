/**
 * 敌机
 * @Class MyAirPlan
 * @author Bean
 * @since 2016.12.28
 */
class EnemyAirPlan extends AirPlan {

	private static _pools: EnemyAirPlan[] = [];
	public constructor() {
		super();
	}

	/**死亡 */
	public die(): void {
		super.die();
	}
	/**播放爆炸效果*/
	protected playBoom(): void {
		super.playBoom();
		if (this.data.type == AirPlan.TYPE_SMALL_AIR)
			this._boomMc.play();
		else {
			this._boomMc.play(3);
			this.dispatchEventWith(game.BOOS_DIED);
		}
	}

	protected onPlayBoomHandler(): void {
		super.onPlayBoomHandler();
		if (this.data.type == AirPlan.TYPE_BOSS_AIR) {
			this.dispatchEventWith(game.END_GAME);
		}
	}

	public reUse(): void {
		super.reUse();
		if (EnemyAirPlan._pools.indexOf(this) == -1)
			EnemyAirPlan._pools.push(this);
	}

	public static getAir(): EnemyAirPlan {
		var air: EnemyAirPlan;
		if (EnemyAirPlan._pools.length > 0)
			air = EnemyAirPlan._pools.shift();
		else
			air = new EnemyAirPlan();
		return air;
	}
}