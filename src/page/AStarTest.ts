class AStarTest {
	public constructor() {
		let aStar:eg.AStar = new eg.AStar();

		let test = [[0,0,0,2,0],     
					[0,0,2,2,2],     
					[0,0,0,0,2],
					[0,0,0,0,2],
					[0,0,0,2,2]]
			let t1:number = egret.getTimer();
		for(let i:number = 0; i < 5; i++){
			aStar.setMaps(test,5,5);
			let arr = aStar.find(0,3,4,3);
			if(arr){
				// console.log(arr.length);
			}
		}
			console.log('time:' + (egret.getTimer() - t1 ));
	}
}