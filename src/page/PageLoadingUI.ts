module test {
	export class PageLoadingUI extends eui.Component implements eg.ILoadingUI{
		// public _tf:eui.Label;
		public _progress:eui.Image;
		public _progressMask:eui.Image;
		public constructor() {
			super();
			this.once(eui.UIEvent.COMPLETE,this.onComplete,this);		
			this.skinName = 'skins.LoadingUISkin';	
		}

		private onComplete(evt:eui.UIEvent):void{
			this._progress.mask = this._progressMask;
		}

		public progress(cur:number,total:number):void{
			eg.log(cur + '/' + total);
			if(this._progressMask){
				this._progressMask.width = cur / total * 566;
			}
			// if(this._tf){
			// 	this._tf.text = cur + '/' + total;
			// }
		}

		public show(msg?:string):void{

		}

		public get content():egret.DisplayObject{
			return this;
		}

		public hide():void{
			eg.log('loading hide');
		}

		public dispose():void{
			if(this.parent){
				this.parent.removeChild(this);
			}
		}
	}
}