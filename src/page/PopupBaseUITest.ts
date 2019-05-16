module test {
	export class PopupBaseUITest extends eg.PopupBaseUI{
		public constructor() {
			super();
			this.skinName = 'skins.PopupBaseUITestSkin';
		}

		public initComplete(data:any):void{
			super.initComplete(data);
		}
	}
}