module eg {
	export class ResourceVersion {
		public static info:any;
		public constructor() {
		}
		public static enable(url:string,callback:Function):void{

			


			  //创建 URLLoader 对象
			var loader:egret.URLLoader = new egret.URLLoader();			
			//添加加载完成侦听
			loader.once(egret.Event.COMPLETE,(evt)=>{
				ResourceVersion.info = JSON.parse(loader.data);
				// versionController.init();
				callback();
			}, this);
			//添加加载失败侦听
			loader.once(egret.IOErrorEvent.IO_ERROR, (evt:egret.IOErrorEvent)=>{
				eg.log(evt);
			}, this);			
			var request:egret.URLRequest = new egret.URLRequest(url);
			//开始加载
			loader.load(request);
			
		}
	}
}