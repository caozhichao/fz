module buff {

	export var BloodPools: BloodItem[] = [];
	/**
	 * 加血的道具
	 * @Class BloodItem
	 * @author Bean
	 * @since 2016.12.28
	 */
	export class BloodItem extends egret.DisplayObjectContainer {
		private _bloodImg: egret.Bitmap;
		public addNum: number = 0;

		private _speedX: number = 7;
		private _speedY: number = 5;
		public constructor() {
			super();
			this._bloodImg = new egret.Bitmap(RES.getRes('buff_blood_png'));
			this.addChild(this._bloodImg);
			this.addNum = GameModel.ins.addBlood;
		}
		/**移动的逻辑，可控制道具做复杂点的移动*/
		public move(): void {
			if (this.x < 0) {
				this._speedX = 7;
			}
			else if (this.x > GameUtil.curWidth() - this.width)
				this._speedX = -7;	
			this.x += this._speedX;
			this.y += this._speedY;
		}
	}


	export function reclaimBlood(blood: BloodItem): void {
		if (blood.parent)
			blood.parent.removeChild(blood);
		if (buff.BloodPools.indexOf(blood) == -1) {
			buff.BloodPools.push(blood);
		}
	}

	export function getBlood(): BloodItem {
		var blood;
		if (buff.BloodPools.length > 0) {
			blood = buff.BloodPools.shift();
		}
		else
			blood = new BloodItem();
		return blood;
	}

}