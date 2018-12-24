module eg {
	/***
	 * 版本号控制
	 */
	export class VersionController implements RES.VersionController{
		private info:any;
		public constructor() {
			
		}

		public init(){			
			return new Promise((resolve,reject)=>{
				this.loadVersion(()=>{
					// RES.registerVersionController(this); // 注册好了，会在加载配置文件之前获取版本 调用该方法
					resolve();
				})
			});
		}
		private loadVersion(callback):void{
			let self = this
			var loader:egret.URLLoader = new egret.URLLoader();			
			//添加加载完成侦听
			loader.once(egret.Event.COMPLETE,onComplete, self);
			//添加加载失败侦听
			loader.once(egret.IOErrorEvent.IO_ERROR, onError, self);			

			function onComplete(evt):void{
				try {
					this.info = JSON.parse(loader.data);					
				} catch (error) {
					eg.log('version.json 数据错误');
				}
				callback();
				removeEventListeners();
			}

			function onError(evt):void{
				eg.log('version.json 加载失败');
				removeEventListeners();
			}
			function removeEventListeners():void{
				loader.removeEventListener(egret.Event.COMPLETE,onComplete, self);
				loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);
			}
			//微信小游戏本地资源，不可在后面加版本号
			let url = eg.Config.versionUrl;
			if(egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME){
				if(url.indexOf('http:') != -1 || url.indexOf('https:') != -1){
					url += '?' + Date.now();				
				}
			} else {
				url += '?' + Date.now();				
			}
			// if(url.indexOf('http:') != -1 || url.indexOf('https:') != -1){
			// 	url += '?' + Date.now();				
			// }
			// var request:egret.URLRequest = new egret.URLRequest(eg.Config.versionUrl + '?' + Date.now()); //获取最新版本
			var request:egret.URLRequest = new egret.URLRequest(url); //获取最新版本
			//开始加载
			loader.load(request);
		}

		/**
		 * 资源加载url变更
		 */
		public getVirtualUrl(url: string): string{
			let index = url.indexOf('resource/');
			let realUrl;
			if(index != -1){
				let resourceRoot = url.substring(0,index);
				let path = url.substr(index);
				let realPath = this.info[path];
				realUrl = resourceRoot + (realPath?realPath:path);
				// eg.log('url:' + url + '-> realUrl:' + realUrl);			
			} else {
				realUrl = url;
			}
			return realUrl;
			// let realURL = this.info[url];
			// return realURL?realURL:url;
		}
	}
}