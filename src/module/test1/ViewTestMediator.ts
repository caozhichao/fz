module test {
	export class ViewTestMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = 'ViewTestMediator';
		public constructor(mediatorName:string=null, viewComponent:any=null) {
			super(mediatorName, viewComponent);
		}

		onRegister():void{
			eg.log('onRegister');
			this.sendNotification("aaa");
		}
		onRemove():void{
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
	}
}