module eg {
	export class EXMLProcessor implements RES.processor.Processor{
		public constructor() {

		}

		async onLoadStart(host, resource) {                
			return new Promise((resolve,reject)=>{
				// EXML.load("resource/" + resource.url,(clazz:any,url:string)=>{
				if(Config.isWxgame()){ //微信小游戏模式下，exml会被编译成js文件使用，不必再去加载exml文件(也无法动态加载exml，无法动态转换成js脚本)
					resolve();
				} else {
					EXML.load( resource.root + resource.url,(clazz:any,url:string)=>{
						// egret.log(egret.getDefinitionByName("BSkin"));
						//微信客户端中需要手动绑定对象，不然无法找到class对象
						if(egret.Capabilities.runtimeType == 'web'){
							let __class__:string = clazz.prototype.__class__;
							let paths = __class__.split('.');
							let length = paths.length;
							let definition = window;                            
							for(let i = 0; i < length; i++){
								let path = paths[i];
								if(definition[path] == null){
									if(i != length - 1){
										definition[path] = {};
									} else {
										eg.log("注册exml到window:" + __class__);
										definition[path] = clazz;
									}
								}                               
								definition = definition[path];
							}
						}
						resolve(clazz);
					},this);
				}							
			});
		}
		
		onRemoveStart(host, resource) {
			return Promise.resolve();
		}
	}
}