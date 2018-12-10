module eg {
	export class ViewMediatorMappingProxy extends puremvc.Proxy{
		public static NAME:string = 'ViewMediatorMappingProxy';
		private _views:Object;
		private _mediators:Object;
		public constructor() {
			super(ViewMediatorMappingProxy.NAME);
			this._views = {};
			this._mediators = {};
			this._views[test.ViewTestMediator.NAME] = test.PureMVCViewTest;
			this._mediators[test.ViewTestMediator.NAME] = test.ViewTestMediator;
		}
		public getView(mediatorName:string):Function{
			return this._views[mediatorName];
		}
		public getMediator(mediatorName:string):Function{
			return this._mediators[mediatorName];
		}
	}
}