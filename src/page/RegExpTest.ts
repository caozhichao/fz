module test {
	export class RegExpTest {
		public constructor() {

			let str = "abc{0}123${1}";
			let replaceParams = ['A','B'];

			str = str.replace(/\$*\{(\d+)\}/g,(substring,$1)=>{
						return replaceParams[$1];
			});		
			console.log(str);
			str = "abc{0}123${1}";
			console.log(eg.replace(str,replaceParams));		
		}
	}
}