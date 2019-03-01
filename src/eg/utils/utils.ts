
/***
 * 
 * 
 * 工具函数集合
 * 
 * 
 */
namespace eg{
	let $logId:number = 0;
	export function log(value:any):void{
		// if(eg.GameData.Instance.isDebug){				
		if(isDebug()){			
			egret.log("[LOG]" + ($logId++) + " >>> " + value);
		}	
	}

	export function warn(value):void{
		// if(eg.GameData.Instance.isDebug){				
		if(isDebug()){
			egret.log("[WARN]" + ($logId++) + " >>> " + value);
		}
	}

	/**
	 * 是否是debug模式
	 * 
	 */
	export function isDebug():boolean{				
		return DEBUG || Config.showLog || parseInt(egret.getOption("debug")) == 1;
	}


	/**
	 * get 请求
	 */
	export async function get(url:string,responseType:string=egret.HttpResponseType.TEXT){
		return await request(url,egret.HttpMethod.GET,responseType);					
	}

	/***
	 * post 请求
	 * 
	 */
	export async function post(url:string,params?:any,responseType:string=egret.HttpResponseType.TEXT,requestHeaders?:any){
		requestHeaders = requestHeaders || {"Content-Type":"application/x-www-form-urlencoded"};
		return await request(url,egret.HttpMethod.POST,responseType,params,requestHeaders);			
	}

	export async function request(url:string,method:string,responseType?:string,params?:any,requestHeaders?:any){
		eg.log("req >>> " + url);
		return new Promise((resolve,reject)=>{
			if(method == egret.HttpMethod.GET && params != null){
				url += "?" + params;
			}
			var request = new egret.HttpRequest();
			request.withCredentials = false;
			// request.responseType = egret.HttpResponseType.ARRAY_BUFFER;
			request.responseType = responseType;
			request.addEventListener(egret.Event.COMPLETE,onGetComplete,this);
			request.addEventListener(egret.ProgressEvent.PROGRESS,onGetProgress,this);
			request.addEventListener(egret.IOErrorEvent.IO_ERROR,onGetIOError,this);

			let timeoutId:number;
			function onGetComplete(evt:egret.Event):void{	
				clearTimeout(timeoutId);				
				if(evt == null){
					eg.log("onGetProgress->onGetComplete");
				} else {
					eg.log("onGetComplete");
				}
				remove();
				// resolve(request.response);
				if(responseType == egret.HttpResponseType.TEXT){
					try {
						eg.log('http数据:' + request.response);
						// eg.log('JSON:' + JSON);			
						let result:any;
						if(request.response != "" && request.response != null){
							result = JSON.parse(request.response);
						}			
						resolve(result);
					} catch (error) {
						eg.log("res <<< 接口数据json解析错误:" + error.toString() + " >>> url:" + url);
						reject(error);
					}
				} else {
					resolve(request.response);
				}
			}

			function onGetProgress(evt:egret.ProgressEvent):void{
				// console.log(evt.bytesLoaded + "/" + evt.bytesTotal);
				eg.log("progress:" + evt.bytesLoaded + "/" + evt.bytesTotal);
				if(evt.bytesLoaded == evt.bytesTotal){
					if(request.response == undefined || request.response == ""){ //处理数据为空的情况
						
						eg.log('启动延时执行onGetComplete(null)');
						timeoutId = setTimeout(function() {
							onGetComplete(null);
						}, 0);

					} else {
						onGetComplete(null);
					}
				}
			}

			function onGetIOError(evt:egret.IOErrorEvent):void{					
				eg.log("res <<< 接口网络错误 req url:" + url);
				remove();
				reject(evt);
				eg.EventDispatcher.Instance.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
			}

			function remove():void{
				request.removeEventListener(egret.Event.COMPLETE,onGetComplete,this);
				request.removeEventListener(egret.ProgressEvent.PROGRESS,onGetProgress,this);
				request.removeEventListener(egret.IOErrorEvent.IO_ERROR,onGetIOError,this);
			}

			request.open(url,method);

			//添加头信息
			for(let header in requestHeaders){
				request.setRequestHeader(header,requestHeaders[header]);
			}

			if(method == egret.HttpMethod.POST && params != null){				
				request.send(formatReqParams(params,requestHeaders["Content-Type"]));
				// request.send(JSON.stringify(params));				
			} else {
				request.send();
			}
		})
	}

	export function formatReqParams(params:any,contentType:string):any{
		let value;
		if(contentType == "text/json"){
			value = JSON.stringify(params);
		} else if(contentType == "application/octet-stream"){
			value = params;
		} else if(contentType == "application/json"){
			value = JSON.stringify(params);
		}else {
			value = "";

			for (var key in params) {
				if(value != ""){
					value += "&";
				}
				value += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
			}
		}
		// eg.log("post参数:" + value);
		return value;
	}

	/**
	 * 创建一个显示对象
	 * 
	 */
	export function createBitmap(resName:string,x:number=0,y:number=0,touchEnabled:boolean = false,isAnchorCenter:boolean=false):egret.Bitmap{
		let bmp:egret.Bitmap;		
		if(RES.hasRes(resName)){
			bmp = new egret.Bitmap(RES.getRes(resName));						
			if(isAnchorCenter){
				bmp.anchorOffsetX = bmp.width / 2;
				bmp.anchorOffsetY = bmp.height / 2;
			}
			bmp.x = x;
			bmp.y = y;
			bmp.touchEnabled = touchEnabled;
		}  else {
			eg.log("资源不存在:" + resName);
		}
		return bmp;
	}
	
	/**
	 * 一次添加多个显示对象
	 */
	export function addChild(parent:egret.DisplayObjectContainer,list:Array<egret.DisplayObject>):void{
		var len = list.length;
		for(var i:number = 0; i < len; i++){
			parent.addChild(list[i]);
		}
	}

	export function createRect(w:number,h:number,color:number,alpha:number=1,touchEnabled:boolean = false):egret.Shape{
		var shape:egret.Shape = new egret.Shape();
		shape.graphics.beginFill(color,alpha);
		shape.graphics.drawRect(0,0,w,h);
		shape.graphics.endFill();
		shape.touchEnabled = touchEnabled;
		return shape;
	}


	export function createTxt(label:string,x:number,y:number,w:number,h:number,size:number = 30,textColor:number = 0x000000,textAlign:string = egret.HorizontalAlign.LEFT,bold:boolean=false,verticalAlign:string=egret.VerticalAlign.MIDDLE,fontFamily:string="Microsoft YaHei,Arial"):egret.TextField{
		var txt:egret.TextField = new egret.TextField();
		txt.width = w;
		txt.height = h;
		txt.textAlign = textAlign;
		txt.verticalAlign = verticalAlign;
		txt.size = size;
		txt.bold = bold;
		// txt.border = true;
		txt.textColor = textColor;
		txt.text = label;
		// txt.fontFamily = "Microsoft YaHei,Arial";
		if(fontFamily != ""){
			// txt.fontFamily = fontFamily;
		}
		txt.x = x;
		txt.y = y;
		return txt;
	}

	export function createTxt2(label:string,x:number,y:number,size:number,textColor:number,textAlign:string = egret.HorizontalAlign.LEFT,bold:boolean=false,verticalAlign:string=egret.VerticalAlign.MIDDLE,fontFamily:string="Microsoft YaHei,Arial"):egret.TextField{
		var txt:egret.TextField = new egret.TextField();			
		txt.textAlign = textAlign;
		txt.verticalAlign = verticalAlign;
		txt.size = size;
		txt.bold = bold;
		// txt.border = true;
		txt.textColor = textColor;
		txt.text = label;
		// txt.fontFamily = "Microsoft YaHei,Arial";
		if(fontFamily != ""){
			// txt.fontFamily = fontFamily;
		}
		txt.x = x;
		txt.y = y;
		return txt;
	}

	export function createCircle(radius:number,color:number,alpha:number=1):egret.Shape{
		var shape:egret.Shape = new egret.Shape();
		shape.graphics.beginFill(color,alpha);
		shape.graphics.drawCircle(0,0,radius);
		shape.graphics.endFill();
		return shape;
	}

	export function createRoundRect(w:number,h:number,color:number,alpha:number=1,ellipseWidth:number = 15,ellipseHeight:number = 15,x:number=0,y:number=0):egret.Shape{
		var shape:egret.Shape = new egret.Shape();
		shape.graphics.beginFill(color,alpha);
		//shape.graphics.drawRect(0,0,w,h);
		shape.graphics.drawRoundRect(0,0,w,h,ellipseWidth,ellipseHeight);
		shape.graphics.endFill();
		shape.x = x;
		shape.y = y;
		return shape;
	} 

	/*
	export async function loadResGroup(name:string){
		return await RES.loadGroup(name);
	}
	*/

	/**
	 * 根据base64图片数据创建一个Bitmap
	 */
	export function createBitmapByBase64Image(base64:string){

		if (!/^data:image/.test(base64)) { //如果没有头部加上头部数据
			base64 = 'data:image/jpeg;base64,' + base64;                      
		} 
		// "data:image/jpeg;base64,"
		return new Promise((resolve,reject)=>{
			eg.log("createBitmapByBase64Image:" + base64.length);
		   let img: HTMLImageElement = new Image();
			img.src = base64;
			// img.crossOrigin = '*';
			img.onload = function () {
				eg.log("img.onload");
				let bpd = new egret.BitmapData(img);
				let texture:egret.Texture = new egret.Texture();
				texture.bitmapData = bpd;
				let bmp:egret.Bitmap = new egret.Bitmap(texture);		
				resolve(bmp);
			}
			img.onerror = function(err){
				eg.log("err:" + err.toString());
			}
		})
	}

	export function utf2buffer (utfstr:string)
    {
        // var buf = new ArrayBuffer(utfstr.length * 2);
        var bufView = new Uint8Array(utfstr.length);
        for (var i = 0, strlen = utfstr.length; i < strlen; i++) {
            bufView[i] = utfstr.charCodeAt(i);
        }
        return bufView;
    }	

	/**
	 * 字符串替换
	 * 字符串格式 xxx${0}bbb{1};
	 * @param str 字符串
	 * @param args 参数数组
	 */
	export function replace(str:string,args):string{
		str = str.replace(/\$*\{(\d+)\}/g,(substring,$1)=>{
			return args[parseInt($1)];
		});	
		return str;
	}
}