module eg {
	/**
	 * 获取一个对象的类对象引用。
	 */
	export function getDefinition(value:any):any {
		let className:string = egret.getQualifiedClassName(value);
		return egret.getDefinitionByName(className);
	}
}