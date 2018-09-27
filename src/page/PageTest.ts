module fz {
	export class PageTest extends eg.PageBase{
		private _video:egret.Video;
		public constructor() {
			super();
		}
		public initUI(data:any):void{
			super.initUI(data);
			// let spr:egret.HashObject = eg.Pool.Instance.getItemByClass(egret.Sprite);
			// eg.log(spr.hashCode);
			// eg.Pool.Instance.recover(spr);
			// spr = eg.Pool.Instance.getItemByClass(egret.Sprite);
			// eg.log(spr.hashCode);
			//let spr:egret.HashObject = eg.Pool.Instance.getItemByCreateFun(egret.Sprite,this.createFun,this);
			//eg.log(spr.hashCode);
			// this.addEventListener(this.a,)
			// http://developer.egret.com/cn/example/page/examples/1/120-media-video/bin-release/web/001/resource/assets/trailer.mp4

			this._video = new egret.Video();
			this._video.x = 0;
			this._video.y = 0;
			this._video.width = 427;
			this._video.height = 240;
			this._video.fullscreen = false;
			// this._video.poster = this._video.fullscreen ? "resource/assets/posterfullscreen.jpg" : "resource/assets/posterinline.jpg";
			this._video.load("resource/assets/game/media/trailer.mp4");
			this.addChild(this._video);

			  this._video.play();

			  let txt:egret.TextField = new egret.TextField();
			  txt.text = "ssssssssssvcvcvvvvvvvvvvvvvvvvvvv";
			  txt.x = 50;
			  txt.y = 50;			  
			  this.addChild(txt);

		}

		private createFun():egret.Sprite{
			eg.log(this);
			let spr = new egret.Sprite();
			return spr;
		}
	}
}