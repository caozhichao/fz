module eg {
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

		public getItemByClass(cls:any):any{
			let sign:string = egret.getQualifiedClassName(cls);
			var pool:any[] = this.getPoolBySign(sign);			
			var rst:any = pool.length ? pool.pop() : new cls();
			return rst;
		}

		public recover(item:any):void {
			let sign:string = egret.getQualifiedClassName(item);
			var pool:any[] = this.getPoolBySign(sign);
			pool.push(item);			
		}
		public getItemByCreateFun(cls:any,createFun:Function,thisObject:any):any{
			let sign:string = egret.getQualifiedClassName(cls);
			var pool:any[] = this.getPoolBySign(sign);			
			var rst:any = pool.length ? pool.pop() : createFun.call(thisObject);
			return rst;
		}
	}
}