module eg {
	/**
	 * 弹窗基类
	 */
	export class PopupBaseUI extends eg.PageBase{
		//黑色底 alpha:0.7
		private _bg:eui.Rect;
		public constructor() {
			super();
		}

		public initUI(data:any):void{
			super.initUI(data);
			this._bg = new eui.Rect(eg.Config.STAGE_W,eg.Config.STAGE_H);
			this._bg.fillColor = 0x0;
			this._bg.fillAlpha = 0.7;
			this.addChildAt(this._bg,0);
		}


		public enter(){
			return new Promise((resolve,reject)=>{
				
			})
		}
		
		public get pageType():string{
			return UILayer.LAYER_POPUP;
		}
	}
}