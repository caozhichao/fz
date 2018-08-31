module eg {
	export class EventDispatcher  extends egret.EventDispatcher{ 
		private static instance:EventDispatcher;
		public constructor() {
			super();
		}

		public static get Instance():EventDispatcher{
			if(EventDispatcher.instance == null){
				EventDispatcher.instance = new EventDispatcher();
			}
			return EventDispatcher.instance;
		}
	}
}