module eg {
	export class WXCacheManager {				
		//资源版本号文件路径
		private resConfigPath:string = 'wx_version.json';
		//缓存版本号文件
		private resFile:WXFile;
		public constructor() {									
		}
		
		public static get Instance():WXCacheManager{
			return instance;
		}

		public init(){	
			return new Promise(async (resolve,reject)=>{
				if(egret.Capabilities.runtimeType == 'wxgame'){
					eg.log('---------------------------启用wxgame缓存------------------------------');
					// RES.processor.map('image',new WXImageProcessor());
					this.wxResProcessor();
					this.resFile = new WXFile('http://',WXFile.CACHE_DIR + this.resConfigPath);
					let result;
					if(this.resFile.exists(this.resFile.localPath)){
						result = await this.resFile.read();		
					}
					// eg.log('resCacheConfig:' + result);	
					resCacheConfig = result||{};
				}
				resolve();
			})		
		}

		private wxResProcessor():void{
			RES.processor.map('image',new WXImageProcessor());
			RES.processor.map('text',new WXTextProcessor());
			RES.processor.map('json',new WXJsonProcessor());
			RES.processor.map('sheet',new WXSheetProcessor());
		}

		public getRes(url:string){
			//resource/assets/xx
			//1.判断是否有缓存，如果有，则比较版本号，没有则从网络下载，并缓存该文件
			return new Promise(async(resolve,reject)=>{
				let file:WXFile = new WXFile(url);
				if(file.isRemotePath && this.isUpdateFile(file)){
					eg.log("网络下载资源");
					await file.downloadFile();
					//更新本地配置
					this.updateCacheConfig(file);
				} 
				// else {
				// 	eg.log("直接从本地缓存读取");
				// }
				let result = await file.read();			
				resolve(result);		
			})
		}

		/**
		 * 判断是否需要从远程网络更新文件
		 */
		private isUpdateFile(file:WXFile):boolean{
			//本地无文件，或者版本号不一致则从网络下载更新文件		
			eg.log('isUpdateFile:' + file.remoteUrl);	
			return !(file.exists(file.localPath) && this.compareResVersion(file));
		}		

		/**
		 * 比较资源版本号
		 */
		private compareResVersion(file:WXFile):boolean{
			let localVersion:string = resCacheConfig?resCacheConfig[file.prefixPath]:undefined;
			eg.log('localVersion:' + localVersion + " verson:" + file.version);
			return localVersion == file.version;
		}

		/**
		 * 保存缓存配置文件
		 */
		private updateCacheConfig(file:WXFile):void{
			// resCacheConfig = resCacheConfig || {};
			eg.log('updateCacheConfig prefixPath:' + file.prefixPath + '-> version:' + file.version);
			if(file.version){//版本号为undefine 无法正常保存，这里也无需保存
				resCacheConfig[file.prefixPath] = file.version;				
				let str:string = JSON.stringify(resCacheConfig);
				eg.log(str);				
				this.resFile.writeText(str);
			}
		}

		/**
		 * 清理缓存
		 */
		private clearCache(){
			//策略 根据缓存过期时间清理


		}

	}
	let instance:WXCacheManager = new WXCacheManager();	
	/**
	 * 配置数据格式为path:version 的json数据
	 *  
	 */
	let resCacheConfig;	
}