module eg {
	/***
	 * 栈
	 * 后进先出原则
	 */
	export class Stack<T>{
		private _items:T[];
		public constructor() {
			this._items = [];
		}

		/**
		 * 入栈
		 */
		public push(element:T):void{
			this._items.push(element);
		}

		/**
		 *出栈 
		 */
		public pop():T{
			return this._items.pop();
		}

		/**
		 * 返回栈顶元素，不改变栈
		 */
		public peek():T{
			return this._items[this.size() - 1];
		}

		/**
		 * 栈的大小
		 */
		public size():number{
			return this._items.length;
		}
		public toString():string{
			return this._items.toString();
		}
	}
}