// module eg {
// 	export class HttpService {
// 		private static instance:HttpService;

// 		public constructor() {
// 		}

// 		public static getInstance():HttpService{
// 			if(HttpService.instance == null){
// 				HttpService.instance = new  HttpService();
// 			}
// 			return HttpService.instance;
// 		}

// 		/*
// 	   	 * 参数格式化为字符串
// 		 * @params {"id":"100","name":"caozc"}    format "id=100&name=caozc"
// 		 */
// 		public static formatParam(params:any):string{
// 			var msg:string = "";
// 				for (var key in params) {
// 					msg += "&" + key + "=" + params[key];
// 				}
// 			return msg;
// 		}

// 		public load(url:string,params:any,thisObj:any=null,success:Function=null,error:Function=null,method:string=egret.URLRequestMethod.POST,isShowTips:boolean=true):void{
// 			let sendData:any;
// 			if(params instanceof ArrayBuffer){
// 				sendData = params;
// 			} else {
// 				var vars:egret.URLVariables = new egret.URLVariables();					
// 				vars.decode(eg.HttpService.formatParam(params));
// 				sendData = vars;
// 			}

// 			var urlLoader:egret.URLLoader = new egret.URLLoader();
// 			var request:egret.URLRequest = new egret.URLRequest();
// 			request.method = method;
// 			/*
// 			let headers:Array<egret.URLRequestHeader>;
// 			if(requestHeaders == null){
// 				headers = [new egret.URLRequestHeader("Content-Type","application/x-www-form-urlencoded")];				
// 			} else {
// 				headers = requestHeaders;
// 			}
// 			// request.requestHeaders = headers;
// 			*/
// 			if(params != null){
// 				request.data = sendData;
// 			}
// 			request.url = url;
// 			urlLoader.addEventListener(egret.Event.COMPLETE,onComplete,this);
// 			urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,onIoError,this);			
// 			urlLoader.load(request);
// 			function onComplete(evt:Event):void{
// 				eg.log('urlLoader.data:' + urlLoader.data);
// 				remove();
// 				let data:any = JSON.parse(urlLoader.data);
// 				// if(data.meta.errno != 0 && isShowTips){
// 				// 	// eg.Tips.showMsg([{text:data.meta.msg}]);
// 				// 	// eg.Config.topLayer.addChild(new views.TipsPage(data.msg));
// 				// }
// 				if(success != null){
// 					success.call(thisObj,data);
// 				}
// 			}
			
// 			function onIoError(evt:egret.IOErrorEvent):void{
// 				remove();				
// 				if(error != null){					
// 					error.call(thisObj);
// 				} else {						
// 					eg.Tips.showMsg([{text:"网络异常"}]);
// 					// eg.Config.topLayer.addChild(new views.TipsPage('网络异常'));
// 				}
// 			}

// 			function remove():void{
// 				urlLoader.removeEventListener(egret.Event.COMPLETE,onComplete,this);
// 				urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR,onIoError,this);				
// 			}
// 		}


// 	}
// }