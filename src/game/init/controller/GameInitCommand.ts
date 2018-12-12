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
			let config:game.MVCConfig = game.MVCConfig.getInstance();
			config.addMapping(test.PureMVCViewTest,test.ViewTestMediator);
			config.addMapping(game.Test2View,game.Test2ViewMediator);


			this.sendNotification(game.UICommand.NAME,{ui:test.PureMVCViewTest},game.UICommand.OPEN);			
			// this.sendNotification(eg.UICommand.NAME,{module:new eg.Module(test.PureMVCViewTest),type:eg.UICommand.OPEN});
		}
	}
}