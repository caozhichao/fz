/**
 * 飞机基类
 * @Class AirPlan
 * @author Bean
 * @since 2016.12.28
 */
class AirPlan extends egret.Sprite {

	protected _boomMc: egret.MovieClip = null;
	private _boomMcData: egret.MovieClipDataFactory;
	/** 发射子弹*/
	public static CREATE_BULLET: string = 'create_bullet';

	public static TYPE_MY_AIR: number = 1;
	public static TYPE_SMALL_AIR: number = 2;
	public static TYPE_BOSS_AIR: number = 3;

	protected _avatarImg: egret.Bitmap;

	private _data: AirData;
	/**上一次产生子弹的时间点*/
	private _lastCreateTime: number = 0;
	/**剩余血量*/
	protected _leftBlood: number = 0;

	public constructor() {
		super();
		var img = new egret.Bitmap();
		this.addChild(img);
		this._avatarImg = img;
	}

	public set data(val: AirData) {
		this._leftBlood = val.maxBlood;
		this._data = val;
		this._avatarImg.texture = RES.getRes('airskin_' + val.skin);
	}

	public get data(): AirData {
		return this._data;
	}

	public get leftBlood(): number {
		return this._leftBlood;
	}

	/**造成伤害值*/
	public hurted(val: number): void {
		this._leftBlood = this.leftBlood - val;
		// if (this.data.type == AirPlan.TYPE_BOSS_AIR) {
		// 	console.log(this._leftBlood);
		// }
	}
	/**播放爆炸效果*/
	protected playBoom(): void {
		if (this._boomMc == null) {
			let mcData = RES.getRes('boom_json');
			let mcTexture = RES.getRes('boom_png');
			let mc: egret.MovieClip = new egret.MovieClip();
			this._boomMcData = new egret.MovieClipDataFactory(mcData, mcTexture);
			mc.x = this.width / 2;
			mc.y = this.height / 2;
			this._boomMc = mc;
			mc.addEventListener(egret.MovieClipEvent.COMPLETE, this.onPlayBoomHandler, this);
			// mc.addEventListener(egret.MovieClipEvent.LOOP_COMPLETE, this.onLoopCom, this);
		}
		// this._loopCount = 0;
		this._boomMc.movieClipData = this._boomMcData.generateMovieClipData('boom' + this.data.boomid);
		this.addChild(this._boomMc);
	}
	// private _loopCount: number = 1;
	// protected onLoopCom(): void {
	// 	this._loopCount++;
	// 	console.log('播放次数' + this._loopCount);
	// }

	protected onPlayBoomHandler(): void {
		this.removeChild(this._boomMc);
		this.reUse();
	}

	/**死亡 */
	public die(): void {
		this.playBoom();
		SoundManager.ins.playBoomSound(this.data.boomid);
	}

	public checkCreateBullet(): void {
		var curTime: number = egret.getTimer();
		var lastTime: number = this._lastCreateTime;
		if ((curTime - this._lastCreateTime < this._data.createrate) || this.y < (-this.height - 30))
			return;
		this._lastCreateTime = curTime;
		this.dispatchEventWith(AirPlan.CREATE_BULLET);
	}

	public reUse(): void {
		if (this.parent)
			this.parent.removeChild(this);
		this._lastCreateTime = 0;
		this.x = 0;
		this.y = 0;
	}
}