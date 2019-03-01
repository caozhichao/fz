module test {
	export class RegExpTest {
		public constructor() {

			let str = "abc{0}123$${1}";
			let replaceParams = ['A','B'];

			str = str.replace(/\$?\{(\d+)\}/g,(substring,$1)=>{
						return replaceParams[$1];
			});		
			console.log(str);
			// str = "abc{0}123${1}";
			// console.log(eg.replace(str,replaceParams));		
			// str = '';
			// let arr = [];
			// for(let i:number = 0; i < 10000;i++){
			// 	str += 'a{' + i + '}'; 
			// 	arr[i] = i;
			// }
			// let t1 = egret.getTimer();
			// str = eg.replace(str,arr);
			// console.log('time:' + (egret.getTimer() - t1));
			// console.log(str);

		}
	}
}