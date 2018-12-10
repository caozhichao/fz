module test {
	export class PureMVCViewTest extends eg.PageBase{
		public constructor() {
			super();					
		}
		public initUI(data:any):void{
			super.initUI(data);
			eg.log('PureMVCViewTest');
		}
	}
}