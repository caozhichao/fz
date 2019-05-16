class GameModel {
	private static _ins: GameModel;

	private _myairIds: number[] = [];
	private _enemyIds: number[] = [];

	public createEnemyDelay: number = 1000;
	/**击杀敌机数量*/
	public killNum: number = 0;
	/**战斗结果 -1未结束0失败1成功*/
	public result: number = 0;
	/**通关需要击杀敌机数*/
	public needKillNum: number = 0;
	/**bossid*/
	public bossId: number = 0;
	/**buff增加的血量*/
	public addBlood: number = 0;
	public constructor() {
	}

	private _myairDatas: Object = null;
	private _enemyAirDatas: Object = null;
	private _bulletDatas: Object = null;
	public static get ins(): GameModel {
		if (GameModel._ins == null)
			GameModel._ins = new GameModel();
		return GameModel._ins;
	}

	public get myairIds(): number[] {
		return this._myairIds;
	}
	public get enemyIds(): number[] {
		return this._enemyIds;
	}
	public get enemyAirDatas(): Object {
		return this._enemyAirDatas;
	}
	public get myairDatas(): Object {
		return this._myairDatas;
	}

	public get bulletDatas(): Object {
		return this._bulletDatas;
	}
	public analyseData(data: any): void {
		this.createEnemyDelay = data.createEnemyDelay;
		this.needKillNum = data.needKillNum;
		this.bossId = data.bossId;
		this.addBlood = data.addBlood;
		this._myairDatas = {};
		this._enemyAirDatas = {};
		this._bulletDatas = {};
		var airs: any[] = data.air;
		let i: number = 0;
		for (i; i < airs.length; i++) {
			var airData: AirData = new AirData();
			airData.id = airs[i].id;
			airData.type = airs[i].type;
			airData.bulletid = airs[i].bulletid;
			airData.bulletPos = airs[i].bulletpos;
			airData.createrate = airs[i].createrate;
			airData.hitHurt = airs[i].hithurt;
			airData.maxBlood = airs[i].blood;
			airData.skin = airs[i].skin;
			airData.speed = airs[i].speed;
			airData.boomid = airs[i].boomid;
			airData.boomsd = airs[i].boomsd;
			if (airData.type == 1) {
				this._myairDatas[airData.id] = airData;
				this._myairIds.push(airData.id);
			}
			if (airData.type == 2 || airData.type == 3) {
				this._enemyAirDatas[airData.id] = airData;
				this._enemyIds.push(airData.id);
			}
		}
		var bullets: any[] = data.bullet;
		for (i = 0; i < bullets.length; i++) {
			var bulletData: BulletData = new BulletData();
			bulletData.id = bullets[i].id;
			bulletData.skin = bullets[i].skin;
			bulletData.hurt = bullets[i].hurt;
			bulletData.speed = bullets[i].speed;
			this._bulletDatas[bulletData.id] = bulletData;
		}
	}
}