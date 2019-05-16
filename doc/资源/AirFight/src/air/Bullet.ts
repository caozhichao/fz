/**
 * 子弹类r
 * @Class Bullet
 * @author Bean
 * @since 2016.12.28
 */
class Bullet extends egret.Sprite{
	private static _pools: Bullet[] = [];

	private _data: BulletData;

	private _bulletImg: egret.Bitmap;
	public constructor() {
		super();
		var img = new egret.Bitmap();
		this.addChild(img);
		this._bulletImg = img;
	}

	public set data(val: BulletData){
		if (this._data == val)
			return;	
		this._data = val;
		this._bulletImg.texture = RES.getRes('bulletskin_'+val.skin);
	}

	public get data(): BulletData{
		return this._data;
	}

	public dispos(): void{
		if (this.parent)
			this.parent.removeChild(this);
		if (Bullet._pools.indexOf(this) == -1)
			Bullet._pools.push(this);	
		this.x = 0;
		this.y = 0;
	}

	public static getBullet(): Bullet{
		var bullet: Bullet;
		if (Bullet._pools.length > 0)
			bullet = Bullet._pools.shift();
		else
			bullet = new Bullet();	
		return bullet;
	}
}