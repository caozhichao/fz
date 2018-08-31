module eg {
	/***
	 * 网页元素使用
	 */
	export class HtmlImage implements IDispose{
		private element:HTMLImageElement;
		private _imgUrl:string;
		public constructor(imgUrl:string) {			
			var gameDiv = document.getElementById("gameDiv");
			this.element = document.createElement("img");			
			this.element.style.position = "absolute";			
			gameDiv.appendChild(this.element);
			this.show(imgUrl);
			// this.addEvent('');
		}

		public addEvent(type:string):void{
			this.element.addEventListener('touchstart',this.onTouchstart,false);
		}

		private onTouchstart(evt):void{
			eg.log(evt);
		}

		public show(imgUrl:string=null):void{
			if(imgUrl != null && this._imgUrl != imgUrl){
				this._imgUrl = imgUrl;
				this.element.src = imgUrl;
			}
			this.element.style.display = "inline";
		}

		public setPosition(xPos:number,yPos:number,w:number,h:number):void{
			var wScale = document.body.clientWidth / eg.Config.STAGE_W;
            var hScale = document.body.clientHeight / eg.Config.STAGE_H
            eg.log('wScale:' + wScale);
            eg.log('hScale:' + hScale);
            this.element.style.width = w * wScale + "px";
            this.element.style.height = h * hScale + "px";
            this.element.style.left = xPos * wScale + "px";
            this.element.style.top = yPos * hScale + "px";
		}

		public hide(isDestroy:boolean=false):void{
			this.element.style.display = "none";
			if(isDestroy){
				this.dispose();
			}
		}

		public dispose():void{
			this.element.parentNode.removeChild(this.element);
		}

		public getElement():HTMLImageElement{
			return this.element;
		}
	}
}