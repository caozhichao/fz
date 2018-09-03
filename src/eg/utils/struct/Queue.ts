module eg {
	/**
	 * 队列
	 * 先进先出
	 */
	export class Queue<T>{
		private _items:Array<T>;
		public constructor() {
			this._items = [];
		}

		/**
		 * 入队
		 */
		public enqueue(element:T):void{
			this._items.push(element);
		}

		/**
		 * 出队
		 */
		public dequeue():T{
			return this._items.shift();
		}

		public isEmpty():boolean{
			return this.size() == 0;
		}

		/**
		 * 第一个元素
		 */
		public front():T{
			return this._items[0];
		}

		public size():number{
			return this._items.length;
		}

		public toString():string{
			return this._items.toString();
		}
	}
}