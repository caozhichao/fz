module fz {
	export class StructTest extends eg.PageBase{
		public constructor() {
			super();
		}

		public initComplete(data:any):void{
			super.initComplete(data);
			// let stack:eg.Stack<number> = new eg.Stack<number>();
			// stack.push(1);
			// stack.push(5);
			// stack.push(0);
			// stack.push(100);
			// eg.log(stack);

			// eg.log(stack.size());

			// eg.log(stack.peek());

			// eg.log(stack.pop());
			// eg.log(stack.pop());
			// eg.log(stack.size());

			// let arr:Array<number> = [100,200];
			// let arr2 = arr.filter((value,index,array)=>{
			// 	eg.log(`${value}|${index}`);		
			// 	return value > 100;		
			// },this);

			// let queue:eg.Queue<number> = new eg.Queue<number>();
			// queue.enqueue(1);
			// queue.enqueue(2);
			// eg.log(queue.toString());
			// eg.log(queue.dequeue());
			// eg.log(queue.dequeue());

			// eg.log(queue.isEmpty());

			
			



			eg.log('end');
		}
	}
}