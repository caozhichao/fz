namespace eg {
	export class Event  extends egret.Event{	
		public constructor(type: string, bubbles?: boolean, cancelable?: boolean, data?: any) {
			super(type,bubbles,cancelable,data);			
		}
	}
}