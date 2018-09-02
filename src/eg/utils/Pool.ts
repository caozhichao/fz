module eg {
	/**
	 * 通用对象池
	 */
	export class Pool {
		private static _instance:Pool;
		private _poolDic:any;
		public constructor() {
			this._poolDic = {};
		}

		public static get Instance():Pool{
			if(Pool._instance == null){
				Pool._instance = new Pool();
			}
			return Pool._instance;
		}

		private getPoolBySign(sign:string):any[] {
			return this._poolDic[sign] || (this._poolDic[sign] = []);						
		}

		/**
		 * 根据对象的Class获取一个对象
		 */
		public getItemByClass(cls:any):any{
			let sign:string = egret.getQualifiedClassName(cls);
			var pool:any[] = this.getPoolBySign(sign);			
			eg.log('getItemByClass:' + sign + "|" + pool.length);
			var rst:any = pool.length ? pool.pop() : new cls();
			return rst;
		}

		/**
		 * 放回池中
		 */
		public recover(item:any):void {
			let sign:string = egret.getQualifiedClassName(item);
			var pool:any[] = this.getPoolBySign(sign);
			pool.push(item);
			eg.log('recover:' + sign + "|" + pool.length);			
		}
		/**
		 * 根据对象的class 和 一个 创建该对象的函数获取一个对象
		 */
		public getItemByCreateFun(cls:any,createFun:Function,thisObject:any):any{
			let sign:string = egret.getQualifiedClassName(cls);
			var pool:any[] = this.getPoolBySign(sign);			
			var rst:any = pool.length ? pool.pop() : createFun.call(thisObject);
			return rst;
		}
	}
}