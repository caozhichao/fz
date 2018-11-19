module eg {
	
	export class Eg {
		private static _instance:Eg;
		public constructor() {

		}

		public static getInstance():Eg{
			if(Eg._instance == null){
				Eg._instance = new Eg();
			}
			return Eg._instance;
		}

		public init(dis:egret.DisplayObjectContainer):void{
			 //初始化开始
			eg.Config.init(dis);
			//UI层
			eg.UILayer.Instance.init(Config.stage);	
			//声音解码异常处理
			// this.soundException();						
		}

		/***
		 * 声音解码失败处理
		 */
		protected soundException():void{
			var WinAlerts = window.alert;
			window.alert = function(e){
				if(e != null && e.indexOf('sound') > -1){                
					eg.warn("声音解码失败");
				} else {
					// WinAlerts(e);
					eg.log('soundException:' + e.toString());
				}
			}
		}
	}
}