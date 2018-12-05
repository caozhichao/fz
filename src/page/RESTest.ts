module test {
	export class RESTest {
		public constructor() {
			

			RES.getResByUrl('resource/config/description.json',()=>{},this,RES.ResourceItem.TYPE_JSON);

		}
	}
}