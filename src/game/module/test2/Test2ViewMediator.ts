module game {
	export class Test2ViewMediator extends game.MediatorBase{
		public static NAME:string = "Test2ViewMediator";
		public constructor(viewComponent:any=null) {
			super(Test2ViewMediator.NAME,viewComponent);
		}

		public get view():Test2View{
			return this.viewComponent as Test2View;
		}

		onRegister():void{
			super.onRegister();
			//绑定initCommand
			this.facade().registerCommand(Test2InitCommand.INIT,Test2InitCommand);			
			this.sendNotification(Test2InitCommand.INIT);
		}

		public uiInitComplete(evt:egret.Event):void{
			super.uiInitComplete(evt);
			this.view.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtn,this);
		}

		public onRemoved(evt:egret.Event):void{
			super.onRemoved(evt);
			this.view.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtn,this);			
			this.sendNotification(Test2InitCommand.EXIT);
		}

		private onBtn(evt:egret.TouchEvent):void{
			this.sendNotification(game.UICommand.NAME,{ui:test.PureMVCViewTest},game.UICommand.OPEN);
		}
	}
}