module test {
	export class HrefTest extends egret.Sprite{
		public constructor() {
			super();
			this.test();
		}
		public test():void{

			eg.Config.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt)=>{
				window.location.href = 'http://www.baidu.com';
			},this);
		}
	}
}