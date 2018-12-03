namespace eg {
	export class Loading {
		private ui:eg.ILoadingUI;
		private static ins:Loading;
		private spr:egret.Sprite;
		public constructor() {
			// this.ui = new LoadingUI();
			this.ui = new eg.LoadingSimpleUI();
			this.spr = new egret.Sprite();
		}

		public static get Instance():Loading{
			if(Loading.ins == null){
				Loading.ins = new Loading();
			}
			return Loading.ins;
		}

		/**
		 * 设置loading皮肤 必须实现 ILoadingUI 接口
		 *  默认是LoadingSimpleUI   
		 * 
		 */
		public set loadingUI(value:ILoadingUI){
			this.ui = value;
		}

		public show(msg:string=""):void{			
			eg.log("loading show");
			this.ui.show(msg);
			// eg.Config.stage.addChild(this.ui.content());
			// eg.
			eg.UILayer.Instance.loading.addChild(this.ui.content);
		}

		public progress(cur:number,total:number):void{			
			if(DEBUG){
				//egret.log(cur + "|" + total);
			}
			this.ui.progress(cur,total);
		}

		public hide():void{
			eg.log("loading hide");
			// this.spr.once(egret.Event.ENTER_FRAME,onFrame,this);
			// var self = this;
			// function onFrame(evt:egret.Event):void{
			// 	if(self.ui.parent){
			// 		Config.stage.removeChild(self.ui);
			// 	}
			// }
			// Config.stage.removeChild(this.ui);
			this.ui.hide();
			/*
			var self = this;
			setTimeout(()=>{
				if(self.ui.parent){
					Config.stage.removeChild(self.ui);
				}				
			},50);
			*/
		}
	}
}