module test {
	/**
	 * https://www.cnblogs.com/ddw1997/archive/2009/09/01/1558039.html
	 * doc
	 * https://greensock.com/docs/TweenLite
	 */
	export class TweenLiteTest extends egret.Sprite{
		public constructor() {
			super();
			this.initUI();
		}
		private initUI():void{			
			let obj = {x:0};
			TweenLite.to(obj,1,{x:100,onUpdate:()=>{
				console.log('onUpdate:' + obj.x);
			},onComplete:()=>{
				console.log("onComplete")
			}});
			// TweenLite.to()
		}		
	}
}