/**
 * 数字三消算法
 * 规则: 上下左右 连续3个相同的数字则可以消除
 *
 */
namespace sx{
	export class Number_sx extends egret.Sprite{
		private _mapVo:MapVo;
		public constructor() {
			super();
			this.init();
		}
		public init():void{
			this._mapVo = new MapVo();		
			this._mapVo.find(0,0);	
		}
	}

	class MapVo{
		public static ROW:number = 5;
		public static COL:number = 5;
		private _data:Node[][];

		//当前需要查找的节点
		private _searchNode:Node;
		private _openList:Node[];
		private _priorityOpenList:Node[];
		private _closeList:Node[];
		public constructor(){		
			this.initMap();
		}

		public initMap():void{
			this._openList = [];
			this._closeList = [];			
			this._data = [];
			let test = [[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]];
			test = [[4,2,5,2,1],     
					[2,1,2,2,2],     
					[3,1,1,3,3],
					[2,2,1,3,1],
					[3,2,1,5,4]]
			for(let i:number = 0; i < MapVo.ROW; i++){
				let row:Node[] = [];
				// console.log('\n');
				let values:string = '';
				for(let j:number = 0; j < MapVo.COL;j++){
					let value:number = 1 + Math.floor(Math.random() * 5);
					// value = test[i][j];
					row[j] = new Node(i,j,value);
					// row[j] = new Node(i,j,test[i][j]);
					// console.log(value + ',');
					values += value + ',';
				}
				this._data[i] = row;
				console.log(values);
			}
		}
		public find(row:number=0,col:number=0):void{
			this._priorityOpenList = [];
			//当前查找的起始点
			let sNode:Node = this.getNode(row,col);
			// this._openList.push(sNode);
			this._priorityOpenList.push(sNode);
			let node:Node;
			
			
			//找到的所有连续Node
			let allList:Node[][] = [];
			//当前的连续Node;
			let findList:Node[] = [];
			let t1:number = egret.getTimer();
			let type:number;
			// while(node = (this._priorityOpenList.shift() || this._openList.shift())){
			while([type,node] = this.getOpenNode()){
				if(node == null){
					break;
				}
				// console.log(node);
				// if(sNode.value != node.value){
				if(type == 1){
					if(findList.length >= 3){
						allList.push(findList);
					}
					sNode = node;				
					findList = [];
					// this._openList.length = 0;
				} 				
				findList.push(node);								
				let leftNode:Node = this.leftNode(node.row,node.col);
				let rightNode:Node = this.rightNode(node.row,node.col);
				let topNode:Node = this.topNode(node.row,node.col);
				let bottomNode:Node = this.bottomNode(node.row,node.col);				
				this.add2OpenList(leftNode,node);				
				this.add2OpenList(rightNode,node);			
				this.add2OpenList(topNode,node);				
				this.add2OpenList(bottomNode,node);
				this._closeList.push(node);				
			}
			//最后一组数据
			if(findList.length >= 3){
				allList.push(findList);
			}
			console.log('time:' + (egret.getTimer() - t1) + '|' + allList.length);
			// console.log(this._closeList.length + '|' + this._openList.length);
		}

		private getOpenNode():[number,Node]{
			// this._priorityOpenList.shift() || this._openList.shift()
			let type:number = 0;
			let node:Node = this._priorityOpenList.shift();
			if(node == null){
				type = 1;
				node = this._openList.shift();
			}
			return [type,node];
		}

		public add2OpenList(node:Node,sNode:Node):void{
			// if(node && this._priorityOpenList.indexOf(node) == -1 && this._openList.indexOf(node) == -1 && this._closeList.indexOf(node) == -1){
			// 	if(node.value == sNode.value){
			// 		this._priorityOpenList.push(node);
			// 	} else {
			// 		this._openList.push(node);
			// 	}
			// }
			
			if(node && this._closeList.indexOf(node) == -1){
				if(node.value == sNode.value && this._priorityOpenList.indexOf(node) == -1){
					this._priorityOpenList.push(node);
					let index = this._openList.indexOf(node);
					if(index != -1){
						this._openList.splice(index,1);
					}
				} else if(this._openList.indexOf(node) == -1){
					this._openList.push(node);
				}
			}

		}

		public leftNode(row:number,col:number):Node{			
			return this.getNode(row,col-1);
		}

		public rightNode(row:number,col:number):Node{
			return this.getNode(row,col+1);
		}

		public topNode(row:number,col:number):Node{
			return this.getNode(row-1,col);
		}

		public bottomNode(row:number,col:number):Node{
			return this.getNode(row+1,col);
		}

		public getNode(row:number,col:number):Node{
			// console.log('row:' + row + ' col:' + col);
			if(row < 0 || row >= MapVo.ROW || col < 0 || col >= MapVo.COL){
				return null;
			}
			return this._data[row][col];
		}

	}
	class Node extends egret.HashObject{
		public row:number;
		public col:number;
		public value:number;
		public constructor(row:number,col:number,value:number=0){
			super();
			this.row = row;
			this.col = col;
			this.value = value;
		}
		public toString():string{
			return '[' + this. row + ']' + '[' + this.col + ']' + '=' + this.value;
		}
	}
}