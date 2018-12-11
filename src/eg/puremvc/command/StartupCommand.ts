module eg {
	export class StartupCommand extends puremvc.MacroCommand{
		public constructor() {
			super();
		}

		initializeMacroCommand(){
			super.initializeMacroCommand();	
			// this.addSubCommand(ModelPrepCommand);						
			for(let i:number=0;i < eg.MVCConfig.initCommands.length;i++){
				this.addSubCommand(eg.MVCConfig.initCommands[i]);
			}
		}

		execute( notification:puremvc.INotification ):void{
			super.execute(notification);					
		}
	}
}