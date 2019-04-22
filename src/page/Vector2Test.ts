class Vector2Test {
	public constructor() {
		let Vector2 = window['Vector2'];
		let v1 = new Vector2(1,0);
		console.log(v1);
		let v2 = new Vector2(-1,1);
		console.log(v2);
		// let v3 = v2.add(v1);
		// console.log(v3);

		// let v3 = v2.sub(v1);
		// console.log(v3);

		let d = v2.dot(v1);
		// console.log(dot);
		// console.log(dot * 180 / Math.PI);

		let a = d / (v1.length() * v2.length());

		// console.log(a * 180 / Math.PI);
		console.log(Math.acos(a) * 180 / Math.PI);

		

	}
}