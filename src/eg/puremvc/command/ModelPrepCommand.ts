module eg {
	export class ModelPrepCommand extends puremvc.SimpleCommand{
		public constructor() {
			super();
		}

		execute( notification:puremvc.INotification ):void{
			let mappingProxy:ViewMediatorMappingProxy = new ViewMediatorMappingProxy();
			mappingProxy.addMapping(test.PureMVCViewTest,test.ViewTestMediator);
			this.facade().registerProxy(mappingProxy);
		}
	}
}