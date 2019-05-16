module fish {
	/**
	 * fish
	 */
	export class FishView extends eg.PageBase{
		public constructor() {
			super();
			this.skinName = 'skins.FishViewSkin';
		}
		public initComplete(data:any):void{
			super.initComplete(data);

			// for(let i:number = 0; i < 0;i++){
			// 	let fish:Fish = new Fish();
			// 	fish.x = Math.random() * 1280 | 0;
			// 	fish.y = Math.random() * 720 | 0;
			// 	this.addChild(fish);
			// }

			let fishData = RES.getRes('fish0_json');
			let texture = RES.getRes('fish0_png');
			let fac:egret.MovieClipDataFactory =  new egret.MovieClipDataFactory(fishData,texture);
			let mcData:egret.MovieClipData = fac.generateMovieClipData('fish0');
			for(let i = 0; i < 700; i++){
				let mc:egret.MovieClip = new egret.MovieClip(mcData);
				// let spr = new egret.DisplayObjectContainer();

				// this.addChild(spr);
				// spr.addChild(mc);
				this.addChild(mc);
				mc.play(-1);
				mc.x = Math.random() * 1280 | 0;
				mc.y = Math.random() * 720 | 0;

				// spr.x = Math.random() * 1280 | 0;
				// spr.y = Math.random() * 720 | 0;
			}



		}
	}
}