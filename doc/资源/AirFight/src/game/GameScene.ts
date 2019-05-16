module game {
	/**
	 * 游戏中界面
	 * @Class GameScene
	 * @author Bean
	 * @since 2016.12.28
	 */
	export class GameScene extends BaseView {
		private static maxEnemy: number = 10;

		private _myAir: MyAirPlan = null;

		private _myBullets: Bullet[] = [];;

		private _enemyList: EnemyAirPlan[] = [];
		private _enemyBullets: Bullet[] = [];
		private _bgMap: BgMap = null;

		private _element: GameElement = null;


		private _createEnemyDelay: number = 0;

		private _lastTime: number = 0;

		private _bitmapTxt: egret.BitmapText
		public constructor() {
			super();
			this.initView();
			this.touchEnabled = true;
		}

		private initView(): void {

			this._createEnemyDelay = GameModel.ins.createEnemyDelay;
			this._bgMap = new BgMap(1);
			this.addChild(this._bgMap);
			this._bgMap.start();

			this._myAir = new MyAirPlan();
			var self: GameScene = this;
			this._myAir.addEventListener(AirPlan.CREATE_BULLET, this.onCreateBullet, this);
			this._myAir.addEventListener(game.END_GAME, function (): void {
				self.dispatchEventWith(game.END_GAME);
				self.clear();
				self._bgMap.pause();
				if (self._bossAir) {
					self._bossAir.reUse();
					self._bossAir = null;
				}
				self._myAir.reUse();
			}, this);
			this._myAir.addEventListener(game.PLAYER_DIED, function (): void {
				GameModel.ins.result = 0;
				self.removeEventListener(egret.Event.ENTER_FRAME, this.onUpDataView, this);
				self.killAllEnemy();
			}, this);
			this._element = new GameElement();
			this._element.x = 0;
			this._element.y = 5;
			this.addChild(this._element);
			this.createEnemy();
		}

		private killAllEnemy(): void {
			while (this._myBullets.length > 0) {
				let bullet: Bullet = this._myBullets.shift();
				bullet.dispos();
			}
			while (this._enemyList.length > 0) {
				let enemy: EnemyAirPlan = this._enemyList.shift();
				if (enemy.parent) {
					enemy.hurted(enemy.data.maxBlood);
					enemy.die();
				}
			}

			while (this._enemyBullets.length > 0) {
				let bullet: Bullet = this._enemyBullets.shift();
				if (bullet.parent) {
					bullet.dispos();
				}
			}
			if (this._bloodBuff) {
				buff.reclaimBlood(this._bloodBuff);
				this._bloodBuff = null;
			}
		}

		public start(): void {
			GameModel.ins.killNum = 0;
			GameModel.ins.result = -1;
			var id: number = GameModel.ins.myairIds[0];
			this._myAir.data = GameModel.ins.myairDatas[id];
			this._myAir.x = (GameUtil.curWidth() - this._myAir.width) >> 1;
			this._myAir.y = GameUtil.curHeight() - 200;
			this.addEventListener(egret.Event.ENTER_FRAME, this.onUpDataView, this);
			this._element.killNum = 0;
			this._element.setProgressBar(0, this._myAir.leftBlood);
			this._element.setValue(this._myAir.leftBlood);
			this.addChild(this._myAir);
			this._lastCreateBuffTime = egret.getTimer();
		}

		private clear(): void {
			while (this._myBullets.length > 0) {
				let bullet: Bullet = this._myBullets.shift();
				this.removeChild(bullet);
				bullet.dispos();
			}
			while (this._enemyList.length > 0) {
				let enemy: EnemyAirPlan = this._enemyList.shift();
				if (enemy.parent)
					enemy.reUse();
			}

			while (this._enemyBullets.length > 0) {
				let bullet: Bullet = this._enemyBullets.shift();
				if (bullet.parent) {
					this.removeChild(bullet);
					bullet.dispos();
				}
			}
		}


		private onCreateBullet(e: egret.Event): void {
			let air: AirPlan = e.target;
			let data: AirData = air.data;
			var targetX: number = air.x;
			var targetY: number = air.y;
			var bulletPos: any[] = data.bulletPos;
			var bulletData: BulletData = GameModel.ins.bulletDatas[data.bulletid];
			if (air == this._myAir) {
				for (let i: number = 0; i < bulletPos.length; i++) {
					let bullet: Bullet = Bullet.getBullet();
					bullet.data = bulletData;
					bullet.x = air.width * bulletPos[i] + targetX - bullet.width / 2;
					bullet.y = targetY + 20;
					this.addChild(bullet);
					this._myBullets.push(bullet);
				}
			}
			else {
				for (let i: number = 0; i < bulletPos.length; i++) {
					let bullet: Bullet = Bullet.getBullet();
					bullet.data = bulletData;
					bullet.x = air.width * bulletPos[i] + targetX - bullet.width / 2;
					bullet.y = targetY + 20;
					this.addChild(bullet);
					this._enemyBullets.push(bullet);
				}
			}
		}

		private onUpDataView(e: egret.Event): void {
			this._myAir.checkCreateBullet();
			let len: number = this._myBullets.length;
			for (var i: number = 0; i < len; i++) {
				let bullet: Bullet = this._myBullets[i];
				if (bullet.y < -bullet.height) {
                    bullet.dispos();
                    this._myBullets.splice(i, 1);
                    i--;
                    len--;
					continue;
                }
                bullet.y -= bullet.data.speed;
			}
			len = this._enemyList.length;
			for (i = 0; i < len; i++) {
				let enemy: EnemyAirPlan = this._enemyList[i];
				if (enemy.y > GameUtil.curHeight()) {
					enemy.reUse();
					this._enemyList.splice(i, 1);
					i--;
					len--;
					continue;
				}
				enemy.y += enemy.data.speed;
				enemy.checkCreateBullet();
			}
			len = this._enemyBullets.length;
			for (i = 0; i < len; i++) {
				let bullet: Bullet = this._enemyBullets[i];
				if (bullet.y > GameUtil.curHeight()) {
                    bullet.dispos();
                    this._enemyBullets.splice(i, 1);
                    i--;
                    len--;
					continue;
                }
                bullet.y += bullet.data.speed;
			}
			this.createEnemy();
			this.checkHit();
			this.checkBossState();
			if (this._bloodBuff) {
				this._bloodBuff.move();
				if (this._bloodBuff.y > GameUtil.curHeight()) {
					buff.reclaimBlood(this._bloodBuff);
					this._bloodBuff = null;
				}
			}
		}

		private _checkHitCount: number = 0;
		/**检测碰撞*/
		private checkHit(): void {
			this._checkHitCount++;
			if (this._checkHitCount % 3 != 0)
				return;
			var killNum = GameModel.ins.killNum;
			let i: number, j: number;
			let bullet: Bullet;
			let enemyAir: EnemyAirPlan;
			let myBulletNum: number = this._myBullets.length;
			let enemyNum: number = this._enemyList.length;

			var delEnemys: EnemyAirPlan[] = [];
			var delBullets: Bullet[] = [];
			for (i = 0; i < myBulletNum; i++) {
				bullet = this._myBullets[i];
				for (j = 0; j < enemyNum; j++) {
					enemyAir = this._enemyList[j];
					if (this.isHit(bullet, enemyAir)) {
						enemyAir.hurted(bullet.data.hurt);
						delBullets.push(bullet);
						if (enemyAir.leftBlood <= 0 && delEnemys.indexOf(enemyAir) == -1) {
							delEnemys.push(enemyAir);
							killNum++;
						}
					}
				}
				if (this._bossAir && this.isHit(bullet, this._bossAir)) {
					this._bossAir.hurted(bullet.data.hurt);
					delBullets.push(bullet);
				}
			}
			let enemyBulletNum: number = this._enemyBullets.length;
			for (i = 0; i < enemyBulletNum; i++) {
				bullet = this._enemyBullets[i];
				if (this.isHit(bullet, this._myAir)) {
					delBullets.push(bullet);
					this._myAir.hurted(bullet.data.hurt);
					if (this._myAir.leftBlood <= 0) {
						break;
					}
				}
			}
			enemyNum = this._enemyList.length;
			for (i = 0; i < enemyNum; i++) {
				enemyAir = this._enemyList[i];
				if (this.isHit(enemyAir, this._myAir)) {
					this._myAir.hurted(enemyAir.data.hitHurt);
					enemyAir.hurted(this._myAir.data.hitHurt);
					if (enemyAir.leftBlood <= 0 && delEnemys.indexOf(enemyAir) == -1) {
						killNum++;
						delEnemys.push(enemyAir);
					}
					if (this._myAir.leftBlood <= 0) {
						break;;
					}
				}
			}
			if (this._bloodBuff && this.isHit(this._myAir, this._bloodBuff)) {
				this._myAir.addBlood(this._bloodBuff.addNum);
				buff.reclaimBlood(this._bloodBuff);
				this._bloodBuff = null;
			}
			if (this._myAir.leftBlood <= 0) {
				this._myAir.die();
			}
			else {
				let index: number;
				while (delEnemys.length > 0) {
					enemyAir = delEnemys.shift();
					index = this._enemyList.indexOf(enemyAir);
					if (index != -1) {
						this._enemyList.splice(index, 1);
					}
					enemyAir.die();
				}
				while (delBullets.length > 0) {
					bullet = delBullets.shift();
					index = this._enemyBullets.indexOf(bullet);
					if (index != -1) {
						this._enemyBullets.splice(index, 1);
					}
					else if (this._myBullets.indexOf(bullet) != -1) {
						this._myBullets.splice(this._myBullets.indexOf(bullet), 1);
					}
					bullet.dispos();
				}
			}
			GameModel.ins.killNum = killNum;
			this._element.killNum = killNum;
			this._element.setValue(this._myAir.leftBlood);
			this.checkCreateBoss();
			this.checkCreateBlood();
		}

		private checkBossState(): void {
			if (this._bossAir == null || this._myAir.leftBlood <= 0) return;
			this._bossAir.y += this._bossAir.data.speed;
			if (this.isHit(this._bossAir, this._myAir)) {
				this._myAir.hurted(this._bossAir.data.hitHurt);
				this._bossAir.hurted(this._myAir.data.hitHurt);
			}
			this._bossAir.checkCreateBullet();
			if (this._bossAir.y > GameUtil.curHeight()) {
				this._myAir.hurted(this._myAir.data.maxBlood);
				this._myAir.die();
			}
			if (this._bossAir.leftBlood <= 0) {
				this._bossAir.die();
			}
		}

		private _bossAir: EnemyAirPlan = null;
		/**
		 * 检测是否创建boss
		 * */
		private checkCreateBoss(): void {
			var killNum = GameModel.ins.killNum;
			var needNum = GameModel.ins.needKillNum;
			if (killNum >= needNum && GameModel.ins.result < 0 && this._bossAir == null) {
				Message.show('boss即将来袭，请做好准备');
				var enemy: EnemyAirPlan = EnemyAirPlan.getAir();
				enemy.data = GameModel.ins.enemyAirDatas[GameModel.ins.bossId];
				enemy.x = Math.random() * (GameUtil.curWidth() - enemy.width);
				enemy.y = -enemy.height - Math.random() * 300;
				enemy.addEventListener(AirPlan.CREATE_BULLET, this.onCreateBullet, this);
				enemy.addEventListener(game.BOOS_DIED, this.bossDied, this);
				enemy.addEventListener(game.END_GAME, this.gameSuccess, this);
				this.addChildAt(enemy, this.numChildren - 1);
				this._bossAir = enemy;
			}
		}

		private gameSuccess(e: egret.Event): void {
			(e.target as EnemyAirPlan).removeEventListener(game.END_GAME, this.gameSuccess, this);
			(e.target as EnemyAirPlan).removeEventListener(AirPlan.CREATE_BULLET, this.onCreateBullet, this);
			GameModel.ins.result = 1;
			this.dispatchEventWith(game.END_GAME);
			this.clear();
			this._bgMap.pause();
			this._bossAir = null;
			this._myAir.reUse();
		}

		private bossDied(): void {
			GameModel.ins.result = 1;
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onUpDataView, this);
			this.killAllEnemy();
		}
		/**
		 * 检测是否创建boss
		* */
		private createEnemy(): void {
			var curTime: number = egret.getTimer();
			if (curTime - this._lastTime < this._createEnemyDelay)
				return;
			this._lastTime = curTime;
			if (this._enemyList.length >= GameScene.maxEnemy)//限制舞台上出现的最大敌人数量
				return;
			var id: number = GameModel.ins.enemyIds[0];
			var enemy: EnemyAirPlan = EnemyAirPlan.getAir();
			enemy.data = GameModel.ins.enemyAirDatas[id];
            enemy.x = Math.random() * (GameUtil.curWidth() - enemy.width);
            enemy.y = -enemy.height - Math.random() * 300;
			enemy.removeEventListener(AirPlan.CREATE_BULLET, this.onCreateBullet, this)
            enemy.addEventListener(AirPlan.CREATE_BULLET, this.onCreateBullet, this);
            this.addChildAt(enemy, this.numChildren - 1);
            this._enemyList.push(enemy);
		}
		/**
		 * 检测是否发生碰撞
		* */
		private isHit(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
			var rect1: egret.Rectangle = obj1.getBounds();
			var rect2: egret.Rectangle = obj2.getBounds();
			rect1.x = obj1.x;
			rect1.y = obj1.y;
			rect2.x = obj2.x;
			rect2.y = obj2.y;
			return rect1.intersects(rect2);
		}
		private _lastCreateBuffTime: number = 0;
		private _bloodBuff: buff.BloodItem;
		/**
		 * 检测是否生成加血buff
		* */
		private checkCreateBlood(): void {
			var curTime: number = egret.getTimer();
			var delay: number = Math.ceil(Math.random() * 4000) + 9000;
			if (curTime - this._lastCreateBuffTime < delay || this._bloodBuff != null) {
				return;
			}
			this._lastCreateBuffTime = curTime;
			var blood: buff.BloodItem = buff.getBlood();
			blood.x = Math.random() * (GameUtil.curWidth() - blood.width);
            blood.y = -blood.height - Math.random() * 70;
			this.addChild(blood);
			this._bloodBuff = blood;
		}
	}

	class GameElement extends eui.Component {

		public numTxt: eui.Label;
		public progressBar: eui.ProgressBar;

        public constructor() {
            super();
            this.skinName = "resource/uiSkin/GameSceneSkin.exml";
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

		protected createCompleteEvent(): void {

		}

		public setValue(val: number): void {
			val = Math.max(0, val);
			this.progressBar.value = val;
			this.progressBar.thumb.width = 130 * (val / this.progressBar.maximum);
		}

		public set killNum(val: number) {
			this.numTxt.text = val.toString();
		}

		public setProgressBar(min: number, max: number): void {
			this.progressBar.minimum = min;
			this.progressBar.maximum = max;
		}
	}
}