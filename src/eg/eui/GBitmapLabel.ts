module eg {
	export class GBitmapLabel extends eui.BitmapLabel implements IDispose{
		public constructor() {
			super();
		}

		/**
		 * 设置语言包id(可以在编辑器中直接绑定语言包id)
		 */
		public set languageId(value:string){
			this.text = LanguageManager.Instance.getLanguage(value);
		}
		
		public dispose():void{

		}
	}
}