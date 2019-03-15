module eg {
	/**
	 * 参考资料
	 * https://blog.csdn.net/chen134225/article/details/79886928
	 */
	export class Dijkstra {		
		private g:Graph;
		public constructor(g:Graph) {
			this.g = g;
		}

		public find(start:number):void{

			let S:boolean[] = [];
			let U = this.g.vexs;
			let dist:number[] = [Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE];
			let sNode:Node = U.splice(start,1)[0];			
			dist[sNode.id] = 0;
			while(U.length > 0){
				let min:number = Number.MAX_VALUE;
				let temp:number;
				let minId:number;
				for(let i:number = 0; i < U.length;i++){
					let node:Node = U[i];
					temp = dist[sNode.id] + this.g.getWeight(sNode.id,node.id);
					if(temp < dist[node.id]){
						dist[node.id] = temp;						
					}
					if(temp < min){
						min = temp;
						minId = i;
					}
				}
				sNode = U.splice(minId,1)[0];
			}


		}
	}

	class Node{
		public id:number;
		public cWeight:number;		
	}

	class Weight{
		public start:number;
		public end:number;
		public wValue:number;
	}

	

	export class Graph{
		private _vexs:Node[];
		private _matrix:number[][];
		constructor(){
			this._matrix = [];
			this._vexs = [];
			let node:Node;
			for(let i:number = 0;i < 6; i++){
				node = new Node();
				node.id = i;
				this._vexs[i] = node;
			}

			let wValue = [0,1,6,
						0,2,3,
						1,2,2,
						2,3,3,
						1,3,5,
						2,4,4,
						3,4,2,
						4,5,5,
						3,5,3
						]
			let ws = [];
			for(let i:number=0; i < wValue.length;i+=3){
				let w = new Weight();
				w.start = wValue[i];
				w.end = wValue[i+1];
				w.wValue = wValue[i+2];
				ws.push(w);
			}		
			this.setWeight(ws);
		}

		/**
		 * 设置边的权重
		 */
		public setWeight(ws:Weight[]):void{
			let len = this.vexs.length;
			for(let i:number = 0; i < len; i++){
				this._matrix[i] = [];
				for(let j:number=0; j < len;j++){					
					this._matrix[i][j] = Number.MAX_VALUE; 
				}
			}

			let w:Weight;
			for(let i:number=0; i < ws.length;i++){
				w = ws[i];
				this._matrix[w.start][w.end] = w.wValue;
			}
		}

		public get vexs():Node[]{
			return this._vexs;
		}

		public getWeight(start,end):number{
			if(start > end){
				let temp = start;
				start = end;
				end = temp;
			}
			return this._matrix[start][end];
		}
	}

}

/**
 * (0,1,2)
 * 
 * 
 * 
 */