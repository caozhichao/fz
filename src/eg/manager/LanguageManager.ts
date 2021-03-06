module eg {
	export class LanguageManager {
		private static _instance:LanguageManager;
		private _data:any;
		public constructor() {
		}

		public static get Instance():LanguageManager{
			if(LanguageManager._instance == null){
				LanguageManager._instance = new LanguageManager();
			}
			return LanguageManager._instance;
		}

		/**
		 * 设置语言包数据
		 * {
		 * 	1000:我是的名字是${0},年龄${1},身高${2},
		 * 	1001:无参数文本
		 * }		
		 * 
		 */
		public set languageData(data:any){
			this._data = data;
		}

		/***
		 * 获取语言文本
		 * 格式: 我是的名字是${0},年龄${1},身高${2}
		 * @params id    语言文本id
		 * @params replaceParams  需要替换的参数 
		 */
		public getLanguage(id:string,...replaceParams:any[]):string{

			let str:string;
			if(this._data == null){
				eg.log('没有设置语言包数据');
			} else {
				str = this._data[id];
			}
			if(str){
				if(replaceParams){
					let len:number = replaceParams.length;
					//字符串替换，正则
					for(let i:number=0;i<len;i++){
						str = str.replace('${' + i +'}',replaceParams[i]);
					}
				}	
			} else {
				eg.log("语言id:" + id + "不存在");
			}
			return str;
		}
	}
}