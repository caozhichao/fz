
module eg {
	export class UIManagerCommand extends puremvc.SimpleCommand{
		public static NAME:string = 'UIManagerCommand';
		public static OPEN:string = 'open';
		public static CLOSE:string = 'close';
		public constructor() {
			super();
		}

		execute( notification:puremvc.INotification ):void
		{	
			let proxy:ViewMediatorMappingProxy = this.facade().retrieveProxy(ViewMediatorMappingProxy.NAME) as ViewMediatorMappingProxy;
			let body = notification.getBody();
			let viewClass:any = proxy.getView(body.mediatorName);					
			let mediatorClass:any = proxy.getMediator(body.mediatorName);
			switch(body.type){
				case UIManagerCommand.OPEN:
					let viewObj = new viewClass();
					this.facade().registerMediator(new mediatorClass(body.mediatorName,viewObj));
					UIManager.Instance.showUI(viewObj);
					break;
				case UIManagerCommand.CLOSE:
					break;
			}
		}
	}
}