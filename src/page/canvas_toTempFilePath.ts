module test {
	export class canvas_toTempFilePath extends eg.PageBase{
		public constructor() {
			super();
		}
		public initUI(data:any):void{
			super.initUI(data);
			console.log(this.stage);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
		}
		private onTap(evt:egret.TouchEvent):void{
			console.log('onTap');
			console.log(window['canvas']);
			let cc = window['canvas'];
			cc.toTempFilePath({
				success:(res)=>{
					console.log('tempFilePath:' + res.tempFilePath);
				}
			})
		}
	}
}