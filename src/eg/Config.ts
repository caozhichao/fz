namespace eg{
	export class Config {
		public static STAGE_W:number;
		public static STAGE_H:number;
		public static stage:egret.Stage;
		public static isAutoUploadPageData:boolean=true;
		/**
		 * 是否开启微信小游戏缓存
		 */
		public static wxgameCache:boolean = true;
		/**
		 * 显示log
		 */
		public static showLog:boolean = false;

		//版本号路径
		public static versionUrl:string;
		

		public constructor() {

		}

		public static init(main:egret.DisplayObject):void{
			eg.Config.stage = main.stage;
			eg.Config.STAGE_W = main.stage.stageWidth;
			eg.Config.STAGE_H = main.stage.stageHeight;		
			eg.log("eg.Config.STAGE_W|H:" + eg.Config.STAGE_W + "|" + eg.Config.STAGE_H);	
		}
		public static isWxgame():boolean{
			return egret.Capabilities.runtimeType == 'wxgame';
		}
	}
}