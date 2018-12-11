module test {
	export class Test extends egret.Sprite{
		public constructor() {
			super();
			this.test();
		}

		private test():void{
			// let img:eui.Image = new eui.Image();
			// img.source = 'https://wx.qlogo.cn/mmopen/vi_32/dEEAHL2xST5LZdnstaZ2H5b4uL0LPDPbf9sqaIXmQLkibf127JkL4cap8siafsBibeMSRJyzFo0PTW9yPDibwBVjhQ/132';
			// this.addChild(img);
			// img.width = 112;
			// img.height = 112;
			let cla:Function = test.Test;
			// new cla();
			console.log(typeof test.Test);
		}
	}
}