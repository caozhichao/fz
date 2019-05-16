module fz {
	export class PageTips extends eg.PageBase{
		public _container:eui.Group;
		public constructor() {
			super();
			this.skinName = 'skins.PageTipsSkin';			
		}

		public initComplete(data:any):void{
			super.initComplete(data);
			// this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
			if(eg.Config.STAGE_H < 1206){
				this._container.scaleX = this._container.scaleY = eg.Config.DesignScale;
			}
		}

		private onTap(evt:egret.TouchEvent):void{
			eg.log('onTap');
			window.location.href = 'http://www.baidu.com';
		}
	}
}