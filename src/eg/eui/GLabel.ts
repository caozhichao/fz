module eg {
	export class GLabel extends eui.Label implements IDispose{
		public constructor() {
			super();			
		}
		
		public dispose():void{

		}

		// public get text():string{
		// 	return egret.superGetter(eg.GLabel,this,'text');
		// }

		// public set text(value:string){
		// 	//支持语言包id设置 格式 @1001
		// 	if(value.indexOf('@') == 0){
		// 		LanguageManager.Instance.getLanguage()
		// 	}
		// 	egret.superSetter(eg.GLabel,this,'text',value);
		// }

		/**
		 * 设置语言包id(可以在编辑器中直接绑定语言包id)
		 */
		public set languageId(value:string){
			this.text = LanguageManager.Instance.getLanguage(value);
		}
	}
}