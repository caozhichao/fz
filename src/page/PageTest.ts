module fz {
	export class PageTest extends eg.PageBase{
		public constructor() {
			super();
		}
		public initUI(data:any):void{
			super.initUI(data);
			// let spr:egret.HashObject = eg.Pool.Instance.getItemByClass(egret.Sprite);
			// eg.log(spr.hashCode);
			// eg.Pool.Instance.recover(spr);
			// spr = eg.Pool.Instance.getItemByClass(egret.Sprite);
			// eg.log(spr.hashCode);
			let spr:egret.HashObject = eg.Pool.Instance.getItemByCreateFun(egret.Sprite,this.createFun,this);
			eg.log(spr.hashCode);
			// this.addEventListener(this.a,)
		}

		private createFun():egret.Sprite{
			eg.log(this);
			let spr = new egret.Sprite();
			return spr;
		}
	}
}