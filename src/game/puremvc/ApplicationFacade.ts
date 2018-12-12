module game {
	/**
	 * 多核版本 key 指定 FACADEID
	 */
	export class ApplicationFacade extends puremvc.Facade implements puremvc.IFacade{
		public static FACADEID:string = 'ApplicationFacade';
		public static STARTUP:string = 'startup';

		public constructor(key:string) {
			super(key);
		}	

		public initializeController():void{
			super.initializeController();
			this.registerCommand(UICommand.NAME,UICommand);	
			this.registerCommand(ModuleCommand.OPEN,ModuleCommand);			
			this.registerCommand(ModuleCommand.CLOSE,ModuleCommand);			
			//注册StartupCommand			
			this.registerCommand(ApplicationFacade.STARTUP,StartupCommand);			
		}

		public static getInstance():ApplicationFacade{
			if(!puremvc.Facade.instanceMap[ApplicationFacade.FACADEID]){
				puremvc.Facade.instanceMap[ApplicationFacade.FACADEID] = new ApplicationFacade(ApplicationFacade.FACADEID);
			}
			return puremvc.Facade.instanceMap[ApplicationFacade.FACADEID];
		}

		public startup(main:any):void{			
			this.sendNotification(ApplicationFacade.STARTUP);
		}
	}
}