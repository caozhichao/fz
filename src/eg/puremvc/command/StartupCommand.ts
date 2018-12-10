module eg {
	export class StartupCommand extends puremvc.MacroCommand{
		public constructor() {
			super();
		}

		initializeMacroCommand(){
			super.initializeMacroCommand();	
			this.addSubCommand(ModelPrepCommand);
		}

		execute( notification:puremvc.INotification ):void{
			super.execute(notification);		
			let fac:puremvc.IFacade = this.facade();
			fac.registerCommand(UIManagerCommand.NAME,UIManagerCommand);		
					
			this.sendNotification(UIManagerCommand.NAME,{mediatorName:test.ViewTestMediator.NAME,type:'open'});			
		}
	}
}