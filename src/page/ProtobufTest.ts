module test {
	export class ProtobufTest extends egret.Sprite{
		private Proto:any;
		public constructor() {
			super();
			this.init();
		}
		private init():void{

			// protobuf.load('resource/assets/game/test.proto',(err:any,root:any)=>{
			// 	this.Proto = root.Test;
			// 	console.log(root.Test)
			// })

			//微信小游戏下 protobuf 参考   proto 协议 生成对应的js文件使用
			// https://github.com/WanderWang/protobuf-egret
			//https://mp.weixin.qq.com/s/WNdIRxZEfpKFpUdFdlr5Mg

		}
	}
}