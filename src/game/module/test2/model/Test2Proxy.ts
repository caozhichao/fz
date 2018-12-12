module game {
	export class Test2Proxy extends puremvc.Proxy implements puremvc.IProxy{
		public static NAME:string = 'Test2Proxy';
		public constructor() {
			super(Test2Proxy.NAME);
		}

		onRegister( ):void{
			eg.log('onRegister -> Test2Proxy');
		}
		onRemove():void{
			eg.log('onRemove -> Test2Proxy');
		}
	}
}