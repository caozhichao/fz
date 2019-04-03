module bug {
	export class Graphics_GlowFilter extends egret.Sprite{
		public constructor() {
			super();
			/**
			 * 
			 * 引擎版本5.2.17
			 * canvas 模式(webgl下正常)
			 * 问题描述
			 * 当绘制的矩形开始点不在（0，0）点
			 * 添加GlowFilter 显示异常
			 * 
			 * 
			 */
			let shape = new egret.Shape();
			shape.graphics.beginFill(0x0);
			// shape.graphics.drawRect(0,0,200,200);
			shape.graphics.drawRect(100,100,200,200);
			shape.graphics.endFill();
			this.addChild(shape);
			shape.filters = [new egret.GlowFilter(0xffff00,1,20,20)];

		}
	}
}