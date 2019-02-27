module test {
	export class WSTest2 extends eg.PageBase{
		private _ws:eg.WS;
		public _btn_connect:eui.Button;
		public _btn_send:eui.Button;
		public constructor() {
			super();
			this.skinName = 'ws_test';
		}

		public initUI(data:any):void{
			super.initUI(data);

			this._ws = eg.WS.getInstance();
			// this._ws.addEventListener

			// this._ws.sendData(egret.WebSocket.TYPE_STRING,"abc");
			// this._ws.sendData(egret.WebSocket.TYPE_BINARY,new egret.ByteArray());

			this._ws.addEventListener(egret.Event.CONNECT,this.onConnect,this);

			this._btn_connect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnConnect,this);
			this._btn_send.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSend,this);
		}

		private onConnect(evt:egret.Event):void{

			setInterval(()=>{
				this.onSend(null);
			},50);
		}

		private onBtnConnect(evt:egret.TouchEvent):void{
			this._ws.connectByUrl('ws://192.168.1.52:38080/websocket/caozhichao');
		}

		private onSend(evt:egret.TouchEvent):void{

			 var message = {
				"message":"大家好abc123:" + egret.getTimer(),
				"username":"caozhichao",
				"to":'All'
        	};
			this._ws.sendData(egret.WebSocket.TYPE_STRING,JSON.stringify(message));
		}
	}
}