module test {
	/**
	 * 屏幕适配测试
	 * 
	 * 
	 */
	export class StageScaleModeTest extends eg.PageBase{
		public constructor() {
			super();
			this.skinName = 'skins.StageScaleModeTestSkin';			
		}

		public initUI(data):void{
			super.initUI(data);
			console.log(this.stage.stageWidth + "|" + this.stage.stageHeight);
			console.log(this.width + '|' + this.height);

			//stage

			// this.stage
		}
	}
}