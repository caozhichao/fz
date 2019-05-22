module test {
	export class TS_interface  {
		public constructor() {
			let b = new Button();
			console.log('');

			//属性枚举测试

			let obj:any = new Control();
			// let prototype = obj.prototype;
			for(var key in obj){
				console.log(key);
			}

			let keys = Object.keys(obj.__proto__);

			console.log(keys);


		}
	}

	class Control {
		protected state:any;
		public test():void{
			console.log('test');
		}
	}

	interface SelectableControl extends Control{
		select(): void;
	}

	class Button extends Control implements SelectableControl{
		public constructor(){
			super();
			this.state = '100';
			this.test();
		}
		 select(): void{

		 }
	}

	// class Image implements SelectableControl{		
	// 	 select() { }
	// }

}