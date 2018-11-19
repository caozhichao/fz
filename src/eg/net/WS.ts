module eg {
	export class WS extends egret.EventDispatcher{
		private static _instance:WS;
		private _ws:egret.WebSocket;
		public constructor() {
			super();
		}

		public static getInstance():WS{
			if(WS._instance == null){
				WS._instance = new WS();
			}
			return WS._instance;
		}

		public init():void{
			this._ws = new egret.WebSocket();
			 //创建 WebSocket 对象
			this._ws = new egret.WebSocket();
			//设置数据格式为二进制，默认为字符串
			this._ws.type = egret.WebSocket.TYPE_BINARY;
			//添加收到数据侦听，收到数据会调用此方法
			this._ws.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
			//添加链接打开侦听，连接成功会调用此方法
			this._ws.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
			//添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
			this._ws.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
			//添加异常侦听，出现异常会调用此方法
			this._ws.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);			
		}

		public connect ( host :string, port :number ):void{
			this._ws.connect(host,port);
		}

		public connectByUrl ( url :string ):void{
			this._ws.connectByUrl(url);
		}

		public sendData(bytes:egret.ByteArray):void{
			this._ws.writeBytes(bytes, 0, bytes.bytesAvailable);
			this._ws.flush();			
		}

		private onReceiveMessage(e:egret.Event):void {
			eg.log('onReceiveMessage');
			let bytes:egret.ByteArray = new egret.ByteArray();
			this._ws.readBytes(bytes);
			
			this.dispatchEventWith(egret.ProgressEvent.SOCKET_DATA,false,bytes);

			// console.log(bytes.length);
			//读取字符串信息
			// var msg:string = bytes.readUTF();
			//读取布尔值信息
			// var boo:boolean = bytes.readBoolean();
			// //读取int值信息
			// var num:number = bytes.readInt();
			// eg.log("收到数据:");
			// eg.log("readUTF : "+msg);
			// eg.log("readBoolean : "+boo.toString());
			// eg.log("readInt : "+num.toString());
		}

		private onSocketOpen():void {
			eg.log("WebSocketOpen");		
			this.dispatchEventWith(egret.Event.CONNECT);	
		}

		private onSocketClose():void {
			eg.log("WebSocketClose");
			this.dispatchEventWith(egret.Event.CLOSE);	
		}

		private onSocketError():void {
			eg.log("WebSocketError");
			this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);	
		}

		public connected():boolean{
			return this._ws.connected;
		}
		

	}
}