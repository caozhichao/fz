module game {
	export class Test2Proxy extends puremvc.Proxy implements puremvc.IProxy{
		public static NAME:string = 'Test2Proxy';
		public constructor() {
			super(Test2Proxy.NAME,new Test2Vo());
		}

		onRegister( ):void{
			eg.log('onRegister -> Test2Proxy');
		}

		onRemove():void{
			eg.log('onRemove -> Test2Proxy');
		}

		public reqRemoteData():void{
			// this.facade().re
		}

		public get data():Test2Vo{
			return this.getData() as Test2Vo;
		}
	}
}