module eg {
	/**
	 * 描述文件 description.json
	 */
	export class Description {
		private static _instance:Description;		
		private _data:any;
		private _platform:string;
		public constructor() {

		}

		public static get Instance():Description{
			if(Description._instance==null){
				Description._instance = new Description();
			}
			return Description._instance;
		}
		/**
		 * 设置配置文件数据
		 */
		public set data(value:any){
			this._data = value;
		}

		/**
		 * 设置平台标识 52,qa,v4,v8
		 */
		public set platform(value:string){
			this._platform = value;
		}

		public get platform():string{
			return this._platform;
		}


		/**
		 * 获取游戏API
		 */
		public getGameAPI(name:string):string{			
			return this.getDomain('game') + this.getAPI(name);
		}

		/**
		 * 获取 wx API
		 */
		public getWXAPI(name:string):string{
			return this.getDomain('wx') + this.getAPI(name);
		}

		/**
		 * 获取 log API
		 */
		public getLogAPI(name:string):string{
			return this.getDomain('log') + this.getAPI(name);
		}

		/**
		 * 获取当前平台的域名
		 */
		public getDomain(name:string):string{
			return this._data['domain']['domain'][this._platform][name];
		}

		public getAPI(name:string):string{
			return this._data['domain']['api'][name];
		}

		/**
		 * 获取api 优先使用改方法
		 * apiType api的类型  游戏 会员 log 微信(根据配置决定)
		 * api api的名称
		 */
		public getAPI2(apiType:string,apiName:string):string{
			return this.getDomain(apiType) + this._data['domain']['api'][apiName];
		}

		/**
		 * 获取语言包数据
		 */
		public get languageData():any{
			return this._data.language;
		}

		/**
		 * 获取description 中的值
		 * keys 
		 * 格式1 key1.key2.key3   
		 * 格式2 [key1,key2,key3];
		 */
		public getValue(keys:string):any;
		public getValue(keys:string[]):any;
		public getValue(keys):any{
			let type = typeof keys;
			eg.log('type:' + type);	
			let keyArr:string[];
			if(type == 'string'){
				keyArr = (keys as string).split('.');
			} else {
				keyArr = keys;
			} 
						
			let value = this._data;
			let len = keyArr.length;
			for(let i:number=0; i < len; i++){
				value = value[keyArr[i]];
			}
			return value;
		}
	}
}