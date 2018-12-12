module game {
	/**
	 * 模块化的命令 随模块的打开注册，关闭卸载
	 */
	export class Test2InitCommand extends puremvc.SimpleCommand implements puremvc.ICommand{
		//模块初始化
		public static INIT:string = 'Test2InitCommand_Init';
		//默认关闭退出
		public static EXIT:string = 'Test2InitCommand_Exit';
		public constructor() {
			super();
		}

		execute( notification:puremvc.INotification ):void{
			super.execute(notification);
			//初始化模版相关的command proxy;
			let fac:puremvc.IFacade = this.facade();
			switch(notification.getName()){
				case Test2InitCommand.INIT:
					fac.registerCommand(Test2InitCommand.EXIT,Test2InitCommand);
					fac.registerProxy(new Test2Proxy());
					break;
				case Test2InitCommand.EXIT:
					fac.removeCommand(Test2InitCommand.INIT);
					fac.removeCommand(Test2InitCommand.EXIT);
					fac.removeProxy(Test2Proxy.NAME);
					break;
			}
		}
	}
}