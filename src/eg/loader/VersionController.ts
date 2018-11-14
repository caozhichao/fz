module eg {
	export class VersionController implements RES.VersionController{
		private info:any;
		public constructor() {
			
		}

		public init(){			
			return new Promise((resolve,reject)=>{
				this.loadVersion(()=>{
					RES.registerVersionController(this);
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
			var request:egret.URLRequest = new egret.URLRequest('version.json');
			//开始加载
			loader.load(request);
		}
		public getVirtualUrl(url: string): string{
			console.log('url:' + url);
			let realURL = this.info[url];
			return realURL?realURL:url;
		}
	}
}