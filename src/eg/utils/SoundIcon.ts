namespace eg {
	export class SoundIcon extends egret.DisplayObjectContainer implements eg.IDispose{
		private icon:egret.Bitmap;
		private _playResName:string;
		private _pauseResName:string;
		public constructor(playResName:string='sound_play_png',pauseResName:string='sound_pause_png') {
			super();
			this._playResName = playResName;
			this._pauseResName = pauseResName;
			this.initUI();
		}
		private initUI():void{
			this.icon =  eg.createBitmap(this._playResName);
			this.icon.anchorOffsetX = this.icon.width / 2;
			this.icon.anchorOffsetY = this.icon.height / 2;			
			this.addChild(this.icon);			
			this.change(eg.SoundMgr.Instance.soundStatus);
			this.touchEnabled = true;			
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);			
		}

		private onClick(evt:egret.TouchEvent):void{
			eg.SoundMgr.Instance.soundStatus = eg.SoundMgr.Instance.soundStatus == eg.SoundMgr.PLAY?eg.SoundMgr.CLOSE:eg.SoundMgr.PLAY;			
			this.change(eg.SoundMgr.Instance.soundStatus);
		}

		private change(status:string):void{
			if(status == eg.SoundMgr.PLAY){				
				this.icon.texture = RES.getRes(this._playResName);
				// egret.Tween.get(this.icon,{loop:true}).to({rotation:360},800);
				egret.Tween.get(this.icon,{loop:true}).to({rotation:360},2000);
			} else{
				this.icon.texture = RES.getRes(this._pauseResName);
				egret.Tween.removeTweens(this.icon);
				this.icon.rotation = 0;
				// this.icon.rotation
			}
		}

		public dispose():void{
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
			egret.Tween.removeTweens(this.icon);			
		}
	}
}