module eg {
	export class LinkedList<T>{
		private _head:Node<T>;
		private _length:number;
		public constructor() {
			this._length = 0;
		}

		public append(element:T):void{
			let node:Node<T> = new Node<T>(element);
			if(this._head == null){
				this._head = node;
			} else {
				let current:Node<T> = this._head;
				while(current.next){ //查找到最后一个
					current = current.next;
				}
				current.next = node;
			}
			this._length++;
		}

		public removeAt(position:number):T{
			//检查越界
			if(position > -1 && position < this._length){
				
				let current:Node<T> = this._head;
				let pre:Node<T>;
				let index:number = 0;
				if(position == 0){
					this._head = current.next;
				} else {
					while(index++ < position){
						pre = current;
						current = current.next;
					}
					pre.next = current.next;
				}
				this._length--;
				return current.element;
			}
			return null;
		}

		public get length():number{
			return this._length;
		}


	}

	class Node<T>{
		private _element:T;
		private _next:Node<T>;
		public constructor(element:T){

		}
		public get element():T{
			return this._element;
		}
		public get next():Node<T>{
			return this._next;
		}
		public set next(node:Node<T>){
			this._next = node;
		}
	}
}