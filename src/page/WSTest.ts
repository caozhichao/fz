module test {
	/***
	 * ws 测试
	 */
	export class WSTest {
		public constructor() {
			this.test();
		}

		public test():void{
			// let a = 16;
			// console.log(a.toString(2));
			// let bytes:egret.ByteArray = new egret.ByteArray();
			// bytes.endian = egret.Endian.LITTLE_ENDIAN;
			// bytes.writeShort(a);
			// bytes.position = 0;
			// let a1 = bytes.readByte();
			// let a2 = bytes.readByte();
			// console.log(a1.toString(2));
			// console.log(a2.toString(2));
			// bytes.bytes
			eg.WS.getInstance().init();


			 //创建 ByteArray 对象
			var byte:egret.ByteArray = new egret.ByteArray();
			//写入字符串信息
			byte.writeUTF("Hello Egret WebSocket");
			// //写入布尔值信息
			// byte.writeBoolean(false);
			// //写入int值信息
			// byte.writeInt(123);
			byte.position = 0;
			//发送数据


			//连接服务器
			//test
			eg.WS.getInstance().connect("echo.websocket.org", 80);

			setTimeout(function() {
				eg.WS.getInstance().sendData(byte);
			}, 5000);

			eg.WS.getInstance().addEventListener(egret.ProgressEvent.SOCKET_DATA,(evt)=>{
				console.log('aaa');
			},this);
		}
	}
}