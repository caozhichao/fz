
module eg {
	export class UICommand extends puremvc.MacroCommand implements puremvc.ICommand{
		public static NAME:string = 'UICommand';
		public static OPEN:string = 'open';
		public static CLOSE:string = 'close';
		public constructor() {
			super();
		}

		initializeMacroCommand():void{
			super.initializeMacroCommand();


		}

		execute( notification:puremvc.INotification ):void
		{				
			let body = notification.getBody();	
			let type = notification.getType();					
			switch(type){
				case UICommand.OPEN:															
					let page:IPage = UIManager.Instance.showUI(body.ui);
					let viewClass = eg.getDefinition(page);
					let mediatorClass = MVCConfig.getInstance().getMediatorClass(viewClass);
					//绑定显示对象的Mediator
					let mediatorObj = new mediatorClass(page);
					this.facade().registerMediator(mediatorObj);
					break;
				case UICommand.CLOSE:
					break;
			}
		}
	}
}