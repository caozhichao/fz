module eg {
	export function stringToArray(value:string) {



	}

	/**
	 * htmlText 转换成 字符数组
	 * (实现不同文本大小，颜色 打字机效果)
	 */
	export function htmlStringToArray(htmlText:string):egret.ITextElement[]{
		let elements:egret.ITextElement[] = new egret.HtmlTextParser().parse(htmlText);
		let len:number = elements.length;
		let list:egret.ITextElement[] = [];
		for(let i:number = 0; i < len;i++){

			let element:egret.ITextElement = elements[i];
			let text = element.text;
			let textLen:number = text.length;
			let newObj;
			for(let j:number = 0; j < textLen; j++){
				newObj = {text:text.charAt(j),style:element.style};
				list.push(newObj);
			}

		}
		return list;
	}
}