module game {
	/**
	 * 模块信息
	 */
	export class Module implements IModule{
		private _name:string;
		private _viewComponent:any;
		private _initCommands:Function[];		
		public constructor(viewComponent:any,initCommands:Function[]=null) {
			this._viewComponent = viewComponent;
			this._initCommands = initCommands;
		}

		public setViewComponent(value:any):any{
			this._viewComponent = value;
		}

		public getViewComponent():any{
			return this._viewComponent;
		}

		public setInitCommands(value:Function[]):void{
			this._initCommands = value;
		}

		public getInitCommands():Function[]{
			return this._initCommands || [];
		}

	}
}