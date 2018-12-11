module eg {
	export class StartupCommand extends puremvc.MacroCommand{
		public constructor() {
			super();
		}

		initializeMacroCommand(){
			super.initializeMacroCommand();				
			var	commands:Function[] =  eg.MVCConfig.initCommands;
			var	len:number = commands.length;
			for(let i:number=0;i < len;i++){
				this.addSubCommand(commands[i]);
			}
		}

		execute( notification:puremvc.INotification ):void{
			super.execute(notification);					
		}
	}
}