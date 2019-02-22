module eg {
	export class Tips extends egret.Sprite{
		// private _stage:egret.Stage;
		public list:Array<Msg>;
		private timer:egret.Timer;
		private static instance:Tips;
		public constructor() {
			super();
			this.list = new Array<Msg>();
			this.timer = new egret.Timer(100);
			this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
			this.timer.start();
		}
		public static get Instance():Tips{
			if(Tips.instance == null){
				Tips.instance = new Tips();
			}
			return Tips.instance;
		}
		public init(stage:egret.Stage):void{
			// this._stage = stage;
		}

		public addMsg(msg:Msg):void{
			this.list.push(msg);
		}

		private onTimer(evt:egret.TimerEvent):void{
			var msg = this.list.shift();
			if(msg){
				msg.y = eg.Config.STAGE_H / 2;
				msg.x = (eg.Config.STAGE_W - msg.width) / 2;
				egret.Tween.get(msg).wait(700).to({y:msg.y - 200,alpha:0.5},900).wait(0).call(this.onComplete,this,[msg]);
				// this._stage.addChild(msg);

				UILayer.Instance.effect.addChild(msg);
			}
		}

		private onComplete(msg:Msg):void{
			// this._stage.removeChild(msg);
			msg.parent.removeChild(msg);
		}

		public static showMsg(msg:Array<egret.ITextElement>):void{
			var m:Msg = new Msg(msg);			
			Tips.Instance.addMsg(m);
		}
	}

	export class Msg extends egret.Sprite{
		private txt:egret.TextField;
		private shape:egret.Shape;
		public constructor(msg:Array<egret.ITextElement>){
			super();			
			// this.txt = eg.createTxt("",0,0,Config.STAGE_W,35,30,0x000000,egret.HorizontalAlign.CENTER,false);
			this.txt = new egret.TextField();
			// this.txt.width = Config.STAGE_W;
			this.txt.size = 36;//30
			this.txt.textColor = 0xffffff;
			// this.txt.fontFamily = "Microsoft YaHei,Arial";
			// this.txt.textAlign = egret.HorizontalAlign.CENTER;
			// this.txt.verticalAlign = egret.VerticalAlign.MIDDLE;
			this.txt.textFlow = msg;
			// this.txt.border = true;
			// this.txt.borderColor = 0xff0000;

			// this.txt.x = 5;
			// this.txt.y = 5;
			
			//egret.log(this.txt.textWidth + "|" + this.txt.height);

			//提示底
			let w:number = this.txt.textWidth + 10;
			if(w < 150){
				w = 150;
			} 
			this.txt.x = (w - this.txt.textWidth) / 2;
			let h:number = this.txt.textHeight + 10;			
			this.txt.y = 5;
			
			this.shape = eg.createRoundRect(w,h,0x0,0.7);
			this.addChild(this.shape);

			this.addChild(this.txt);	
			this.cacheAsBitmap = true;		
		}
	}
}