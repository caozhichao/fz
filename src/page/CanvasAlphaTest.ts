
/**
 * canvas 背景透明测试
 * canvas 地下可以放html元素，本身支持透明
 * canvas 下面的html图片元素 不能长按识别
 */
class CanvasAlphaTest extends egret.Sprite{
	public constructor() {
		super();

		var gameDiv = document.getElementById("gameDiv");
		let element:HTMLImageElement = document.createElement("img");			
		// element.style.position = "absolute";		
		element.src = 'resource/assets/game/images/p1.png';	
		// gameDiv.appendChild(element);	

		let cvs = gameDiv.firstChild;
		// cvs.insertBefore(element);
		gameDiv.insertBefore(element,cvs);

		let img:eui.Image = new eui.Image();
		img.source = 'resource/assets/game/images/test.png';
		this.addChild(img);
	}
}