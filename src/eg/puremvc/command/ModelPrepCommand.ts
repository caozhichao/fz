module eg {
	export class ModelPrepCommand extends puremvc.SimpleCommand{
		public constructor() {
			super();
		}

		execute( notification:puremvc.INotification ):void{
			this.facade().registerProxy(new ViewMediatorMappingProxy());
		}
	}
}