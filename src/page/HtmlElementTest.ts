module test {
	export class HtmlElementTest extends egret.Sprite{
		public constructor() {
			super();
			this.init();
		}

		private init():void{

			let spr:egret.Sprite = new egret.Sprite();
			spr.graphics.beginFill(0xff0000);
			spr.graphics.drawRect(0,0,200,200);
			spr.graphics.endFill();
			this.addChild(spr);

			spr.x = 300;
			spr.y = 300;

			//html 坐标定位
			var gameDiv = document.getElementById("gameDiv");
			let element = document.createElement("img");			
			element.style.position = "absolute";		
			gameDiv.appendChild(element);		

			element.src = 'resource/assets/game/images/logo.png';
			eg.log(egret.Capabilities.boundingClientWidth + "|" + egret.Capabilities.boundingClientHeight);
			eg.log(egret.MainContext.instance.stage.stageWidth + "|" + egret.MainContext.instance.stage.stageHeight);
			let xScale:number = egret.Capabilities.boundingClientWidth / egret.MainContext.instance.stage.stageWidth;
			let yScale:number = egret.Capabilities.boundingClientHeight / egret.MainContext.instance.stage.stageHeight;

			element.style.left = (xScale * spr.x) + 'px';
			element.style.top = yScale * spr.y + 'px';
			element.style.width = xScale * spr.width + 'px';
			element.style.height = yScale * spr.height + 'px';

			var funcChange = function():void{
    			console.log( spr.x );				
				element.style.left = ((xScale * spr.x) + 0.5) + 'px';
				// element.style.top = yScale * spr.y + 'px';
				// element.style.width = xScale * spr.width + 'px';
				// element.style.height = yScale * spr.height + 'px';
			}

			// egret.Tween.get(spr,{onChange:funcChange,onChangeObj:this}).to({x:300},1000);

			// let onChange = ()=>{
			// 	eg.log("a");
			// }

		}
	}
}