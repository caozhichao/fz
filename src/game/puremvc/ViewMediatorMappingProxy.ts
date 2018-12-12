module game {
	/**
	 * viewComponent -> Mediator 映射关系
	 */
	export class ViewMediatorMappingProxy extends puremvc.Proxy{
		public static NAME:string = 'ViewMediatorMappingProxy';		
		private _mapping;
		public constructor() {
			super(ViewMediatorMappingProxy.NAME);			
			this._mapping = {};
		}

		/***
		 * 添加view - mediator 映射关系
		 */
		public addMapping(viewComponentClass,mediatorClass):void{			
			this._mapping.viewComponentClass = mediatorClass;
		}

		/**
		 * 获取Mediator
		 */
		public getMediatorClass(viewComponentClass):any{
			return this._mapping.viewComponentClass;
		}
	}
}