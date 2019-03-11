class PromiseTest {
	public constructor() {

		/*
		setTimeout(function() {
			new Promise((resolve,reject)=>{
				setTimeout(function() {
					resolve('aaa');
				}, 1000);
			}).then((value)=>{
				eg.log('value:' + value);
			})			
		}, 5000);
		*/

		this.test1();

	}

	async test1(){
		console.log('test1');
		await this.test2();
		this.test4();
	}

	async test2(){
		console.log('test2');
		await this.test3();
	}

	async test3(){
		setTimeout(function() {			
			console.log('test3 setTimeout');
		}, 2000);
		console.log('test3')
	}
	async test4(){
		console.log('test4');
	}



}