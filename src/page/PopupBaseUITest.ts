module test {
	export class PopupBaseUITest extends eg.PopupBaseUI{
		public constructor() {
			super();
			this.skinName = 'skins.PopupBaseUITestSkin';
		}

		public initUI(data:any):void{
			super.initUI(data);
		}
	}
}