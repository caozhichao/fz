module eg {
	export class SoundMgr {
		public static PLAY:string = "play";
		public static CLOSE:string = "close";
		private static _instance:SoundMgr;
		private bgSound:egret.Sound;
		private bgSoundChannel:egret.SoundChannel;
		private backgroundSoundURL:string;		
		private status:string = SoundMgr.PLAY;
		private isPause:boolean = false;		
		public constructor() {

		}

		public static get Instance():SoundMgr{
			if(SoundMgr._instance == null){
				SoundMgr._instance = new SoundMgr();
			}
			return SoundMgr._instance;
		}

		public play(url:string,type:string=egret.Sound.EFFECT):void{

			if(this.status == SoundMgr.CLOSE){
				egret.log("声音关闭状态");
				return;
			}

			let sound:egret.Sound = new egret.Sound();
			sound.type = type;
			if(type == egret.Sound.MUSIC){	
				this.stopBackgroundSound();
				if(this.backgroundSoundURL != url){
					this.backgroundSoundURL = url;
					//切换新的背景声音
					this.bgSound = sound;
				} else {
					let position:number = 0;
					if(this.bgSoundChannel){
						position = this.bgSoundChannel.position;
					}
					this.bgSoundChannel = this.bgSound.play(position);
					return;
				}			
			}
			sound.load(url);
			sound.addEventListener(egret.Event.COMPLETE,onComplete,this);
			sound.addEventListener(egret.IOErrorEvent.IO_ERROR,onIoError,this);
			let self = this;
			function onComplete(evt:egret.Event):void{
				remove();
				if(type == egret.Sound.MUSIC){
					if(self.status == SoundMgr.PLAY && !self.isPause){
						self.bgSoundChannel = sound.play(0);
					}		
				} else {
					egret.log("播放2");
					sound.play(0,1);
				}				
			}
			function onIoError(evt:egret.Event):void{
				remove();
			}
			function remove():void{
				sound.removeEventListener(egret.Event.COMPLETE,onComplete,self);
				sound.removeEventListener(egret.IOErrorEvent.IO_ERROR,onIoError,self);
			}
		}

		public stopBackgroundSound():void{
			if(this.bgSoundChannel){
				this.bgSoundChannel.stop();			
			}
		}

		public set soundStatus(value:string){
			this.status = value;
			if(this.status == SoundMgr.CLOSE){
				this.stopBackgroundSound();
			} else {
				this.play(this.backgroundSoundURL,egret.Sound.MUSIC);
			}
		}

		public get soundStatus():string{
			return this.status;
		}

		public set pause(value:boolean){
			this.isPause = value;
		}

		public get pause():boolean{
			return this.isPause;
		}


		// public changeBgSoundStatus(value:number):void{
		// 	egret.log("changeBgSoundStatus bgSoundStatus:" + this.bgSoundStatus);
		// 	this.bgSoundStatus = value;
		// 	egret.log("bgSoundStatus changeBgSoundStatus:" + this.bgSoundStatus);
		// 	switch(this.bgSoundStatus){
		// 		case 2:					
		// 			this.bgSoundChannel = this.bgSound.play(this.bgSoundChannel?this.bgSoundChannel.position:0);													
		// 			break;
		// 		case 3:
		// 			this.bgSoundChannel.stop();					
		// 			break;
		// 	}

		// }

		// public get bgStatus():number{
		// 	return this.bgSoundStatus;
		// }
	}
}