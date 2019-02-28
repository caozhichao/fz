module fish {
	/**
	 * fish
	 */
	export class FishView extends eg.PageBase{
		public constructor() {
			super();
			this.skinName = 'skins.FishViewSkin';
		}
		public initUI(data:any):void{
			super.initUI(data);

			for(let i:number = 0; i < 1;i++){
				let fish:Fish = new Fish();
				fish.x = Math.random() * 1280 | 0;
				fish.y = Math.random() * 720 | 0;
				this.addChild(fish);
			}

		}
	}
}