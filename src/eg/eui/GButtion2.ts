module eg {
	export class GButtion2 extends eui.Button{
		public img:eui.Image;
		private _image:string;
		public constructor() {
			super();
			this.initUI();
		}

		private initUI():void{
			this.addEventListener(eui.UIEvent.COMPLETE,this.onUIInitComplete,this);
		}

		private onUIInitComplete(evt:eui.UIEvent):void{
			this.img.source = this.image;
		}

		public get image():string{
			return this._image;
		}

		public set image(value:string){
			this._image = value;
		}
	}
}