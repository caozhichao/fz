module eg {
	export class MVCConfig {
		//startup 之前加入需要初始化执行的command
		public static initCommands:Function[] = [];	
		private _mapping;
		private static _instance:MVCConfig;
		public constructor() {
			this._mapping = {};
		}

		public static getInstance():MVCConfig{
			if(MVCConfig._instance == null){
				MVCConfig._instance = new MVCConfig();
			}
			return MVCConfig._instance;
		}
		/***
		 * 添加view - mediator 映射关系
		 */
		public addMapping(viewComponentClass,mediatorClass):void{			
			this._mapping[viewComponentClass] = mediatorClass;
		}

		/**
		 * 获取Mediator
		 */
		public getMediatorClass(viewComponentClass):any{
			return this._mapping[viewComponentClass];
		}
	}
}