module test {
	/**
	 * https://github.com/qiao/PathFinding.js
	 */
	export class AStartTest2 {
		public constructor() {
			let PF = window['PF'];
			var matrix = [
			[0, 0, 0, 1, 0],
			[1, 0, 0, 0, 1],
			[0, 0, 1, 0, 0],
			];
			// matrix = [
			// 	[0,1,0],
			// 	[0,0,0],
			// 	[0,0,1],
			// 	[1,0,0],
			// 	[0,1,0]
			// ]
			console.log(typeof matrix);
			console.log(typeof matrix !== 'object');
			var grid = new PF.Grid(5,3,matrix);
			let n = grid.getNodeAt(0,0);
			console.log(n);
			var finder = new PF.AStarFinder();
	
			var path = finder.findPath(1, 2, 4, 2, grid);
			console.log(path);
		}
	}
}