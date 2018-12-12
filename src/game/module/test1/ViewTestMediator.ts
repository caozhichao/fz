module test {
	export class ViewTestMediator extends eg.MediatorBase implements puremvc.IMediator{
		public static NAME:string = 'ViewTestMediator';
		public constructor(viewComponent:any=null) {
			super(ViewTestMediator.NAME, viewComponent);
		}

		onRegister():void{
			super.onRegister();
			eg.log('onRegister');
			// this.sendNotification("aaa");
		}
		onRemove():void{
			super.onRemove();
			eg.log('onRemove');
		}

		listNotificationInterests( ):string[]{
			return ['aaa'];
		}

		handleNotification( notification:puremvc.INotification ):void
		{
			switch(notification.getName()){
				case 'aaa':
					eg.log('aaa');
					break;
				case 'bbb':
					break;
			}
		}
		public get view():PureMVCViewTest{
			return this.viewComponent as PureMVCViewTest;
		}

		public uiInitComplete(evt:egret.Event):void{
			super.uiInitComplete(evt);
			console.log('1111111:' + this.view.btn);
			this.view.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtn,this);
		}

		public onRemoved(evt:egret.Event):void{
			super.onRemoved(evt);
			this.view.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtn,this);
		}

		private onBtn(evt:egret.TouchEvent):void{
			this.sendNotification(eg.UICommand.NAME,{ui:game.Test2View},eg.UICommand.OPEN);
		}
	}
}