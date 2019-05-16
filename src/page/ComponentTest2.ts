module test {
	export class ComponentTest2 extends eg.PageBase{
		public btn:eui.Button;
		public constructor() {
			super();		
			this.skinName = 'skins.ComponentSkin2';				
		}

		public initComplete(data):void{
			this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
		}

		private onTap(evt):void{
			eg.UIManager.Instance.showUI(test.ComponentTest);
		}
	}
}