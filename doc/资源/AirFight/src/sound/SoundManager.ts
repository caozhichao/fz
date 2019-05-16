class SoundManager {
	private _bgSound: egret.Sound;
	private _bgChanel: egret.SoundChannel;
	private _boomSound: egret.Sound;
	public constructor() {
		this._bgSound = RES.getRes('bgsound_mp3');
	}
	private static _ins: SoundManager;

	public static get ins(): SoundManager{
		if (SoundManager._ins == null)
			SoundManager._ins = new SoundManager();
		return SoundManager._ins;
	}

	public playBgSound(): void{
		if (this._bgChanel == null) {
			this._bgChanel = this._bgSound.play(0);
		}
	}

	public stopBgSound(): void{
		if (this._bgChanel) {
			this._bgChanel.stop();
			this._bgChanel = null;
		}
	}

	public playBoomSound(id:number): void{
		this._boomSound = RES.getRes('boomSd' + id);
		this._boomSound.play(0,1);
	}
}