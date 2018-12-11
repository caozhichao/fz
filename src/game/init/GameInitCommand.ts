module game {
	/**
	 * GameInitCommand
	 * 初始化执行的command可以配置在这里
	 */
	export class GameInitCommand extends puremvc.MacroCommand implements puremvc.ICommand{
		public constructor() {
			super();
		}

		initializeMacroCommand():void{
			//添加其他的command;
		}

		execute( notification:puremvc.INotification ):void{
			super.execute(notification);
			eg.log('GameInitCommand');
			let config:eg.MVCConfig = eg.MVCConfig.getInstance();
			config.addMapping(test.PureMVCViewTest,test.ViewTestMediator);
			config.addMapping(game.Test2View,game.Test2ViewMediator);


			this.sendNotification(eg.UICommand.NAME,{ui:test.PureMVCViewTest,type:'open'});			
		}
	}
}