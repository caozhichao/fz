namespace eg
{
	
	/**
 	 * 最大堆   它的每个节点都比它的子节点大。
	 * 最小堆   它的每个节点都比它的子节点小。
	 * Heap是一种特殊的二叉树，它的每个节点都比它的子节点大(或小)。内部实现是用数组存储的。
	 * 比如原树状结构为： 
	 *    2
	 *   / \
	 *  1   0
	 * 则存储成数组为：
	 * [2,1,0]	 
	 * @author caozhichao
	 * 创建时间：2013-8-21 下午2:47:22
	 * 
	 */
	export class Heap<T>
	{
		private  _heap:Array<T>;
		//添加的位置
		private  _postionIndex:number;
		//比较函数  return -1 0 1
		private  _compare:Function;
		public constructor(compare:Function)
		{
			this._compare = compare;
			this.reset();
 		}
		
		public  reset():void
		{
			this._heap = [];
			this._postionIndex = 0;
		}
		
		/**
		 * 入队
		 * @param value
		 * 
		 */		
		//pIndex = (childindex -1)/2
		public  enqueue(value:T):void
		{
			this._heap[this._postionIndex] = value;
			this.sort(this._postionIndex);
			this._postionIndex++;
		}
		
		/**
		 * 排序 
		 * @param childIndex
		 * 
		 */		
		private  sort(childIndex:number):void
		{
			//父节点index
			var pIndex:number;
			//子节点index
			var cIndex:number = childIndex;
			var temp:T = this._heap[cIndex];
			//cIndex>0才有pIndex
			while(cIndex > 0)
			{
				pIndex = (cIndex - 1) >> 1;
				//如果新插入的数据大于parent的数据，则应不断上移与parent交换位置
				if(this._compare(temp,this._heap[pIndex]) > 0)
				{
					this._heap[cIndex] = this._heap[pIndex]; 
					//更改子节点的位置
					cIndex = pIndex;
				} else 
				{
					break;
				}
			}
			this._heap[cIndex] = temp;
		}
		
		/**
		 * 修改数据 
		 * @param obj
		 * @param newObj
		 * @return 
		 * 
		 */		
		public  modify(obj:T,newObj:T):Boolean
		{
			var cindex:number = this._heap.indexOf(obj);
			if(cindex < 0)return false
			this._heap[cindex]= newObj;
			this.sort(cindex);
			return true
		}
		/**
		 * 出队 
		 * @return 
		 * 
		 */		
		public  dequeue():T
		{
			var element:T = this._heap[0];
			var lastElement:T = this._heap.pop(); 
			this._postionIndex--;
			if(this._postionIndex > 0)
			{
				this._heap[0] = lastElement;
				var pIndex:number = 0;
				var cIndex:number = 1;
				var temp:T = this._heap[pIndex];
				while(cIndex <= this._postionIndex-1)
				{
					//比较2个子节点
					if(this._heap[cIndex+1] && this._compare(this._heap[cIndex],this._heap[cIndex+1]) < 0)
					{
						cIndex++;
					}
					if(this._compare(temp,this._heap[cIndex])<0)
					{
						this._heap[pIndex] = this._heap[cIndex];
						pIndex = cIndex;
						//计算子节点的位置
						cIndex = (cIndex << 1) + 1;
					}else
					{
						break
					}
				}
				this._heap[pIndex] = temp;
			}
			return element;
		}
		
		public  toString():string
		{
			return this._heap.toString();
		}
		
		public  get heap():Array<T>
		{
			return this._heap;
		}
		
		public  toTree():void
		{
			// var pIndex:number = 0;
			// var cIndex:number = 1;
			// if(this._postionIndex > 0)
			// {
			// 	eg.log("     " + this._heap[pIndex]);
			// }
			// while(cIndex < this._postionIndex - 1)
			// {
			// 	trace("//");
				
			// 	trace(" \\");
			// }	
		}
	}
}