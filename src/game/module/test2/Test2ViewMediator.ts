module game {
	export class Test2ViewMediator extends eg.MediatorBase{
		public static NAME:string = "Test2ViewMediator";
		public constructor(viewComponent:any=null) {
			super(Test2ViewMediator.NAME,viewComponent);
		}

		public get view():Test2View{
			return this.viewComponent as Test2View;
		}

		public uiInitComplete(evt:egret.Event):void{
			super.uiInitComplete(evt);
			this.view.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtn,this);
		}

		public onRemoved(evt:egret.Event):void{
			super.onRemoved(evt);
			this.view.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtn,this);
		}

		private onBtn(evt:egret.TouchEvent):void{
			this.sendNotification(eg.UICommand.NAME,{ui:test.PureMVCViewTest,type:eg.UICommand.OPEN});
		}
	}
}