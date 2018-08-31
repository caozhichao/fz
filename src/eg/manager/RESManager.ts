module eg {
	export class RESManager {
		public constructor() {
		}		

		public async loadConfig(url:string,resourceRoot:string){
			eg.log('loadConfig:' + url + " resourceRoot:" + resourceRoot);
			return await RES.loadConfig(url, resourceRoot);
		}

		public static get Instance():RESManager{
			return instance;
		}
	}
	let instance:RESManager = new RESManager();
}