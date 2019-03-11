@Path("/hello", "world")
class decorators_test {
	public constructor() {
		console.log('decorators_test:' + decorators_test.prototype['a123']);

		let h = new Hello();
		let a = h.greeting;
		console.log(a);
	}
}

// function Path(target:any){
// 	console.log("I am decorator.");
// }

function Path(p1: string, p2: string) {
	console.log('p2:' + p2);
    return function (target) { //  这才是真正装饰器
        // do something 
		target.prototype['a123'] = 'a12345';
		console.log(p1);
    }
}



function DefaultValue(value: string) {
    return function (target: any, propertyName: string) {
        target[propertyName] = value;
    }
}


class Hello {
    @DefaultValue("world") 
	greeting: string;
}