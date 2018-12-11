module test {
	export class PureMVCViewTest extends eg.PageBase{
		public btn:eui.Button;
		public constructor() {
			super();					
			this.skinName = 'skins.Test1Skin';
		}
		public initUI(data:any):void{
			super.initUI(data);
			eg.log('PureMVCViewTest');
		}
	}
}