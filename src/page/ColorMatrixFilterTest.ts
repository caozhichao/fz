module test {
	export class ColorMatrixFilterTest extends egret.DisplayObjectContainer{
		public constructor() {
			super();
			this.init();
		}
		private init():void{

			let spr:egret.Shape = new egret.Shape();
			spr.graphics.beginFill(0xff0000);
			spr.graphics.drawRect(0,0,200,150);
			spr.graphics.endFill();
			this.addChild(spr);
			//颜色矩阵数组
			var colorMatrix = [
				0.3,0.6,0,0,0,
				0.3,0.6,0,0,0,
				0.3,0.6,0,0,0,
				0,0,0,1,0
			];
			var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);

			spr.filters = [colorFlilter];
		}
	}
}