module eg {
	/**
	 * 参考资料
	 * https://blog.csdn.net/chen134225/article/details/79886928
	 */
	// export class Dijkstra {		
	// 	private g:Graph;
	// 	public constructor(g:Graph) {
	// 		this.g = g;
	// 	}

	// 	public find(start:number):void{

	// 		let S:boolean[] = [];
	// 		let U = this.g.vexs;
	// 		let dist:number[] = [Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE];
	// 		let sNode:Node = U.splice(start,1)[0];			
	// 		dist[sNode.id] = 0;
	// 		while(U.length > 0){
	// 			let min:number = Number.MAX_VALUE;
	// 			let temp:number;
	// 			let minId:number;
	// 			for(let i:number = 0; i < U.length;i++){
	// 				let node:Node = U[i];
	// 				temp = dist[sNode.id] + this.g.getWeight(sNode.id,node.id);
	// 				if(temp < dist[node.id]){
	// 					dist[node.id] = temp;						
	// 				}
	// 				if(temp < min){
	// 					min = temp;
	// 					minId = i;
	// 				}
	// 			}
	// 			sNode = U.splice(minId,1)[0];
	// 		}


	// 	}
	// }

	// class Node{
	// 	public id:number;
	// 	public cWeight:number;		
	// }

	// class Weight{
	// 	public start:number;
	// 	public end:number;
	// 	public wValue:number;
	// }

	

	// export class Graph{
	// 	private _vexs:Node[];
	// 	private _matrix:number[][];
	// 	constructor(){
	// 		this._matrix = [];
	// 		this._vexs = [];
	// 		let node:Node;
	// 		for(let i:number = 0;i < 6; i++){
	// 			node = new Node();
	// 			node.id = i;
	// 			this._vexs[i] = node;
	// 		}

	// 		let wValue = [0,1,6,
	// 					0,2,3,
	// 					1,2,2,
	// 					2,3,3,
	// 					1,3,5,
	// 					2,4,4,
	// 					3,4,2,
	// 					4,5,5,
	// 					3,5,3
	// 					]
	// 		let ws = [];
	// 		for(let i:number=0; i < wValue.length;i+=3){
	// 			let w = new Weight();
	// 			w.start = wValue[i];
	// 			w.end = wValue[i+1];
	// 			w.wValue = wValue[i+2];
	// 			ws.push(w);
	// 		}		
	// 		this.setWeight(ws);
	// 	}

	// 	/**
	// 	 * 设置边的权重
	// 	 */
	// 	public setWeight(ws:Weight[]):void{
	// 		let len = this.vexs.length;
	// 		for(let i:number = 0; i < len; i++){
	// 			this._matrix[i] = [];
	// 			for(let j:number=0; j < len;j++){					
	// 				this._matrix[i][j] = Number.MAX_VALUE; 
	// 			}
	// 		}

	// 		let w:Weight;
	// 		for(let i:number=0; i < ws.length;i++){
	// 			w = ws[i];
	// 			this._matrix[w.start][w.end] = w.wValue;
	// 		}
	// 	}

	// 	public get vexs():Node[]{
	// 		return this._vexs;
	// 	}

	// 	public getWeight(start,end):number{
	// 		if(start > end){
	// 			let temp = start;
	// 			start = end;
	// 			end = temp;
	// 		}
	// 		return this._matrix[start][end];
	// 	}
	// }

	export class Dijkstra{
		private u:Node[];
		private wMatrix:number[][];
		//不可达权重值
		public static M = 100000000;
		// constructor(vetexs:string[],w,vetexNum){
		constructor(vetexs:any[],w){
			this.u = [];

			let vetexNum = vetexs.length;

			// /*
			let index:number = 0;
			// for(let i = 0; i < vetexs.length;i+=3){
			for(let i = 0; i < vetexs.length;i++){
				// this.u.push(new Node(index,parseInt(vetexs[i])));
				// index++;

				this.u.push(new Node(i,i));
			}
			// */


			//边(连接点)的权重
			this.wMatrix = [];
			// this.wMatrix[0] = 
			//ab(12)af(16)ag(14)
			//bc(10) bf(7) 
			//cd(3) ce(5) cf(6)
			//de(4)
			//ef(2) eg(8)
			//fg(9)
			//abcdefg;
			let M = Dijkstra.M;
			// let w = [
			// 	//  a, b,c,d,e,f, g
			// 		0,12,M,M,M,16,14,
			// 		M,0,10,M,M,7,M,
			// 		M,M,0,3,5,6,M,
			// 		M,M,M,0,4,M,M,
			// 		M,M,M,M,0,2,8,
			// 		M,M,M,M,M,0,9,
			// 	]
			// vetexNum += 1;
			for(let i:number = 0;i < vetexNum;i++){
				this.wMatrix[i] = [];
				for(let j:number=0; j < vetexNum;j++){					
					// this.wMatrix[i][j] = w[i*vetexNum+j] || Dijkstra.M;
					// this.wMatrix[i][j] = parseInt(this.wMatrix[i][j].toString());
					if(w[i]){
						this.wMatrix[i][j] = w[i][j] || Dijkstra.M;
					} else {
						this.wMatrix[i][j] = Dijkstra.M;
					}
				}
			}
			console.log(this.wMatrix);

		}

		public find(id:number,findId:number):number[]{
			let t1:number = egret.getTimer();
			let s:Node[] = [];
			let u:Node[] = this.u;

			let sNode:Node= this.getNode(id);
			sNode.weight = 0;
			// s.push(sNode);
			s[sNode.id] = sNode;
			sNode.s = 1;

			let len = u.length;
			let node:Node;

			// while(u.length > 0){

			for(let n = 1; n < u.length;n++){
				let i = 0;
				// len = u.length;
				let w ;
				let minW = Dijkstra.M;
				let minId;
				//边的权重
				let edgeW:number;
				for(i; i < len;i++){
					node = u[i];	
					if(node.s == 0){
						edgeW = this.getWeight(sNode.wId,node.wId);
						if(edgeW != Dijkstra.M){
							w = sNode.weight + edgeW;
							if(w < node.weight) {//找到比之前小的节点路径 替换父节点
								node.weight = w;
								node.pNode = sNode; 
							}
						} 
						w = node.weight;					
						if(w < minW){
							minW = w;
							minId = node.id;
						}
						// console.log(sNode.id + '->' + node.id + ' w:' + w);						
						// console.log(sNode.wId + '->' + node.wId + ' w:' + w);						
					}				
				}
				sNode = this.getNode(minId);					
				// s[sNode.id] = sNode;	
				sNode.s = 1;							
			}
			// }
			console.log('time:' + (egret.getTimer() - t1) );
			// return this.u;

			// let n = this.u[findId];
			let n;
			this.u.forEach(element => {
				if(element.wId == findId){
					n = element;
				}
			});

			let paths = [];
			while(n){
				paths.push(n.wId);
				n = n.pNode;
			}
			return paths.reverse();
		}

		private getWeight(start,end):number{
			if(start < end){
				return this.wMatrix[start][end];
			}
			return this.wMatrix[end][start];
		}
		
		private getNode(id:number):Node{
			// let node:Node;
			// let i = 0;
			// for(i; i < this.u.length;i++){
			// 	node = this.u[i];
			// 	if(node.id == id){
			// 		break;
			// 	}
			// }
			// this.u.splice(i,1);
			// return node;		
			return this.u[id];
		}
	}

	/**
	 * 节点类
	 */
	export class Node{
		//节点id
		public id:number;
		public wId:number;
		//几点名称
		public name:string;
		/**父节点 */
		private _pNode:Node;
		//当前的权重
		private _weight:number;

		//是否在s集合中(用于优化不从u集合中删除只标记这个状态)
		public s:number;
		constructor(id:number,wId:number){
			this.id = id;
			this.wId = wId;
			this._weight = Dijkstra.M;
			this.s = 0;
		}

		public get pNode():Node{
			return this._pNode;
		}

		public set pNode(node:Node){
			this._pNode = node;
		}
		
		public get weight():number{
			return this._weight;
		}
		public set weight(value:number){
			this._weight = value;
		}
		
	}
}

/**
 * (0,1,2)
 * 
 * 
 * 
 */