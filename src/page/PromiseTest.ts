class PromiseTest {
	public constructor() {

		setTimeout(function() {
			new Promise((resolve,reject)=>{
				setTimeout(function() {
					resolve('aaa');
				}, 1000);
			}).then((value)=>{
				eg.log('value:' + value);
			})			
		}, 5000);

	}
}