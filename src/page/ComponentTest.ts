module test {
	export class ComponentTest extends eg.PageBase{
		public btn:eui.Button;
		public constructor() {
			super();		
			this.skinName = 'skins.PopupBaseUITestSkin';	
			// let com:eui.Component = new eui.Component();
			// com.skinName = 'skins.PopupBaseUITestSkin';
			// com.skinName = 'skins.PopupBaseUITestSkin';
			
			// this.addChild(com);

			
		}

		public initComplete(data):void{
			this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
		}

		private onTap(evt):void{
			eg.UIManager.Instance.showUI(test.ComponentTest2);
		}
	}
}