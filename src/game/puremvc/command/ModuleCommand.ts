module game {
	export class ModuleCommand extends puremvc.MacroCommand implements puremvc.ICommand{
		public static NAME:string = 'ModuleCommand';
		public static OPEN:string = ModuleCommand.NAME + '_open';
		public static CLOSE:string = ModuleCommand.NAME + '_close';
		public constructor() {
			super();
		}

		execute( notification:puremvc.INotification ):void{			
			super.execute(notification);
			switch(notification.getName()){
				case ModuleCommand.OPEN:

					break;
				case ModuleCommand.CLOSE:
					break;
			}						
		}
	}
}