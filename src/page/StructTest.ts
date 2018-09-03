module fz {
	export class StructTest extends eg.PageBase{
		public constructor() {
			super();
		}

		public initUI(data:any):void{
			super.initUI(data);
			let stack:eg.Stack<number> = new eg.Stack<number>();
			stack.push(1);
			stack.push(5);
			stack.push(0);
			stack.push(100);
			eg.log(stack);

			eg.log(stack.size());

			eg.log(stack.peek());

			eg.log(stack.pop());
			eg.log(stack.pop());
			eg.log(stack.size());
			eg.log('end');
		}
	}
}