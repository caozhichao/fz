/**
 * 数字三消算法
 * 规则: 上下左右 连续3个相同的数字则可以消除
 *
 */
namespace sx{
	export class Number_sx2 extends egret.Sprite{
		private _mapVo:MapVo;
		private _items:Item[][];
		private _nodeMoveList:NodeMoveContoller[];
		private _endNode:Node;
		private _state:number = 0;
		private _fillMovePosList:number[][];
		private _beginNode:Item;		

		//消除过程的4个状态
		//等待
		public static WATTING:number = 0;
		//合并
		public static MERGE:number = 1;
		//合并特效
		public static MERGE_EFFECT:number = 2;
		//掉落
		public static DROP:number = 3;

		private _touchFlag:boolean = false;
		public constructor() {
			super();
			this.init();
		}
		public init():void{
			this._mapVo = new MapVo();		
			// this._mapVo.find(0,0);	
			this._items = [];
			let itemList:Item[];
			let item:Item;
			for(let i:number = 0;i < MapVo.ROW; i++){
				itemList = [];
				for(let j:number = 0;j < MapVo.COL; j++){
					item = new Item(this._mapVo.getNode(i,j));
					item.x = j * Item.WIDTH;
					item.y = i * Item.HEIGHT;
					this.addChild(item);
					itemList[j] = item;
				}
				this._items[i] = itemList;
			}					
			this._nodeMoveList = [];
			this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);			
			// this.find(0,0);
			// eg.Config.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt)=>{
				// this._state = 0;
				// this.find(0,0);			
				// let eff:Effect1 = new Effect1();
				// eff.x = 100;
				// eff.y = 200;
				// this.addChild(eff);
				// let sRow:number = 2;
				// let sCol:number = 2;
				// eff.x = sCol * Item.WIDTH;
				// eff.y = sRow * Item.HEIGHT;
				
				// let tRow:number = 0;
				// let tCol:number = 0;

				// let tx:number = tCol * Item.WIDTH;
				// let ty:number = tRow * Item.HEIGHT;

				// let radius:number = Math.atan2(ty - eff.y , tx - eff.x);
				// let agree:number = radius * 180 / Math.PI;
				// eff.rotation = agree + 90;
			// },this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
			// this.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
			eg.EventDispatcher.Instance.addEventListener(Item.ROTATION_EFFECT_PLAY_COMPLETE,this.onRotationEffectPlayComplete,this);
		}

		private onRotationEffectPlayComplete(evt:egret.Event):void{
			//合并特效播放后，处理列的掉落
			this.changeState();
			let movePosList:number[][] = this._mapVo.fill();
			this._fillMovePosList = movePosList;
			this.fillNodeMove(movePosList);
		}

		private onEnd(evt:egret.TouchEvent):void{
			let item:Item = evt.target as Item;
			if(item && this._beginNode){
				
				let a:Node = this._beginNode.data;
				let b:Node = item.data;
				if(a != b){
					let aValue:number = a.value;
					let bValue:number = b.value;
					//交换数据
					this._mapVo.swap(a,b);
					this._mapVo.toString();

					let aItem:Item = this._beginNode;
					let bItem:Item = item;
					aItem.visible = false;
					bItem.visible = false;
					aItem.setData(a);
					bItem.setData(b);

					let aMoveItem:Item = new Item(new Node(a.row,a.col,aValue));
					let bMoveItem:Item = new Item(new Node(b.row,b.col,bValue));
					aMoveItem.x = a.col * Item.WIDTH;
					aMoveItem.y = a.row * Item.HEIGHT;

					bMoveItem.x = b.col * item.width;
					bMoveItem.y = b.row * item.height;

					this.addChild(aMoveItem);
					this.addChild(bMoveItem);

					egret.Tween.get(aMoveItem).to({x:bMoveItem.x,y:bMoveItem.y},200);

					egret.Tween.get(bMoveItem).to({x:aMoveItem.x,y:aMoveItem.y},200);
					setTimeout(()=> {
						this.removeChild(aMoveItem);
						this.removeChild(bMoveItem);	

						aItem.visible = true;
						bItem.visible = true;								
						this.find(b.row,b.col,true);			
					}, 230);
				}
			}
		}

		private onMove(evt:egret.TouchEvent):void{		
			let item:Item = evt.target as Item;
			if(item && this._beginNode && item != this._beginNode){
				eg.log('move');
				let a:Node = this._beginNode.data;
				let b:Node = item.data;
				if(a != b){
					this._touchFlag = true;
					let aValue:number = a.value;
					let bValue:number = b.value;
					//交换数据
					this._mapVo.swap(a,b);
					this._mapVo.toString();

					let aItem:Item = this._beginNode;
					let bItem:Item = item;
					aItem.visible = false;
					bItem.visible = false;
					aItem.setData(a);
					bItem.setData(b);

					let aMoveItem:Item = new Item(new Node(a.row,a.col,aValue));
					let bMoveItem:Item = new Item(new Node(b.row,b.col,bValue));
					aMoveItem.x = a.col * Item.WIDTH;
					aMoveItem.y = a.row * Item.HEIGHT;

					bMoveItem.x = b.col * item.width;
					bMoveItem.y = b.row * item.height;

					this.addChild(aMoveItem);
					this.addChild(bMoveItem);

					egret.Tween.get(aMoveItem).to({x:bMoveItem.x,y:bMoveItem.y},200);

					egret.Tween.get(bMoveItem).to({x:aMoveItem.x,y:aMoveItem.y},200);					
					setTimeout(()=> {
						this.removeChild(aMoveItem);
						this.removeChild(bMoveItem);	

						aItem.visible = true;
						bItem.visible = true;								
						this.find(b.row,b.col,true);			
					}, 230);
				}
				this._beginNode = null;
			}
		}

		private onBegin(evt:egret.TouchEvent):void{
			// if(this._state == Number_sx2.WATTING){
				if(!this._touchFlag){					
					this._beginNode = evt.target as Item;			
				}
			// }
		}

		private onEnterFrame(evt:egret.Event):void{
			let allMoveComplete:number = 0;
			this._nodeMoveList.forEach(element => {
				element.move(0);
				if(element.moveComplete){
					allMoveComplete++;
					if(this._state == Number_sx2.DROP){
						let item:Item = this._items[element.endRow][element.endCol];
						item.visible = true;						
					}
				}
			});

			if(allMoveComplete != 0 && allMoveComplete == this._nodeMoveList.length){
				eg.log('state:' + this._state);
				this._nodeMoveList.length = 0;	
				if(this._state == Number_sx2.MERGE){
					//更新合并的Node
					let item:Item = this.getNodeItem(this._endNode.row,this._endNode.col);
					item.rotationEffect();
					item.setData(this._endNode);
					this.changeState();
					// let movePosList:number[][] = this._mapVo.fill();
					// this._fillMovePosList = movePosList;
					// this.fillNodeMove(movePosList);
				} else if(this._state == Number_sx2.DROP){										
					this._state = Number_sx2.WATTING;
					//掉落后自动消
					this.find(2,2);//0 0
				}			
			}
		}

		private changeState():void{
			// if(this._state == 0){
			// 	this._state = 1;
			// } else if(this._st)
			this._state++;
		}

		/**
		 * @param flag 是否是指定的终点
		 */
		private find(row:number,col:number,flag:boolean=false):void{
			let allList:Node[] = this._mapVo.find(row,col);	
			// for(let i:number = 0; i < allList.length;i++){
			// 	let list:Node[] = allList[i];
			// 	for(let j:number = 0;j<list.length;j++){
			// 		let node:Node = list[j];
			// 		item = this._items[node.row][node.col];
			// 		item.alpha = 0.5;
			// 	}
			// }
			//移动测试
			let nodeList:Node[] = allList;
			if(!allList ||  nodeList.length == 0){		
				this._touchFlag = false;		
				return;
			}
			// this._state = 1;
			this.changeState();

			//构建AStar地图数据
			let mapData = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];			
			let has:boolean = false;
			nodeList.forEach(element => {
				mapData[element.row][element.col] = element.value;
				if(flag){
					if(element.row == row && element.col == col){
						has = true;
						//验证终点是否存在
					}
				}
			});			

			let aStar:eg.AStar = new eg.AStar();
			aStar.setMaps(mapData,5,5);

			let endNode:Node;
			if(flag && has){
				endNode = this._mapVo.getNode(row,col);
			} else {
				endNode = this.getMoveEndNode(nodeList);
			}
			let endRow:number = endNode.row;
			let endCol:number = endNode.col;
			this._endNode = endNode;

			nodeList.forEach(element => {
				let row:number = element.row;
				let col:number = element.col;
				// let row:number = 0;
				// let col:number = 0;

				if(row != endRow || col != endCol){
					let paths:Array<number[]> = aStar.find(row,col,endRow,endCol);
					// console.log(paths.length);
					// let posArr:number[][] = [];
					// for(let i:number = 0; i < paths.length;i++){
					// 	let path:number[] = paths[i];
					// 	posArr[i] = [path[1] * Item.WIDTH,path[0] * Item.HEIGHT];
					// }
					// let item:Item = this._items[row][col];
					// item.visible = false;
					// let moveItem:Item = new Item(item.data);
					// moveItem.x = col * Item.WIDTH;
					// moveItem.y = row * Item.HEIGHT;
					// this.addChild(moveItem);
					// let nodeMoveContoller:NodeMoveContoller = new NodeMoveContoller(moveItem);
					// nodeMoveContoller.paths = posArr;
					// this._nodeMoveList.push(nodeMoveContoller);		
					this.nodeMove(element,paths);
					this._mapVo.updateNodeValue(element);							
				} 
			});
			this._mapVo.updateNodeValue(endNode,endNode.value+1);
		}

		private fillNodeMove(movePosList:number[][]):void{
			movePosList.forEach(element => {				
				let node:Node;
				node = this._mapVo.getNode(element[2],element[3]);
				let item:Item = this._items[node.row][node.col];
				item.visible = false;
				item.setData(node);
				let newNode:Node = new Node(element[0],element[1],node.value);
				this.nodeMove(newNode,[[element[2],element[3]]]);
			});
		}

		/**
		 * Node 移动 
		 * @param row 
		 * @param col 
		 * @param paths 移动格的格子路径
		 */
		private nodeMove(node:Node,paths:number[][]):void{
			if(node.row >=0){
				let item:Item = this._items[node.row][node.col];				
				item.visible = false;				
			}

			// let posArr:number[][] = [];
			// for(let i:number = 0; i < paths.length;i++){
			// 	let path:number[] = paths[i];
			// 	posArr[i] = [path[1] * Item.WIDTH,path[0] * Item.HEIGHT];
			// }

			// let node:Node = this._mapVo.getNode(row,col);
			let moveItem:Item = new Item(node);
			moveItem.x = node.col * Item.WIDTH;
			moveItem.y = node.row * Item.HEIGHT;
			this.addChild(moveItem);
			let nodeMoveContoller:NodeMoveContoller = new NodeMoveContoller(moveItem);
			nodeMoveContoller.paths = paths;
			//加入移动列表			
			this._nodeMoveList.push(nodeMoveContoller);		
		}


		private getNodeItem(row:number,col:number):Item{
			return this._items[row][col];
		}

		/**
		 * 获取移动到的目标Node
		 */
		private getMoveEndNode(nodeList:Node[]):Node{
			//找row * col 最大的值为移动目标点
			let node:Node;
			nodeList.forEach(element => {
				if(node == null){
					node = element;
				} else {

					if(element.row * MapVo.COL + element.col > node.row * MapVo.COL + node.col){
						node = element;
					}
				}
			});
			return node;
		}
	}

	class NodeMoveContoller{
		private _node:Item;
		private _paths:number[][];
		private _speed:number = 12;
		private _curPos:number[];
		private _moveX:number;
		private _moveY:number;
		private _moveCount:number;

		//row col
		private _curX:number;
		private _curY:number;
		private _nextX:number;
		private _nextY:number;

		private _isMoveComplete:boolean = false;
		public constructor(node:Item){
			this._node = node;
			// this._curX = this._node.x;
			// this._curY = this._node.y;
			this._curX = this._node.data.row;
			this._curY = this._node.data.col;
		}

		public set paths(value:number[][]){
			this._paths = value;
			// this._curPos = this._paths[0];
			this.toNextPos();
		}
		
		public move(passTime:number):void{
			// console.log(this._moveCount);
			if(this._moveCount > 0){
				this._node.x += this._moveX;
				this._node.y += this._moveY;
				// this._moveCount--;
				// console.log('1');
			} else if(this._moveCount == 0){
				// console.log('2');
				this._curX = this._nextX;
				this._curY = this._nextY;
				this._node.x = this._curY * Item.WIDTH;
				this._node.y = this._curX * Item.HEIGHT;
				this.toNextPos();
			}
			this._moveCount--;
		}

		private toNextPos():void{
			let pos:number[] = this._paths.shift();
			if(pos){
				this._nextX = pos[0];
				this._nextY = pos[1];
				this.moveTo(pos);
			} else {
				eg.log('移动结束');
				this._isMoveComplete = true;
				this._node.parent.removeChild(this._node);
			}
		}

		private moveTo(pos:number[]):void{
			let dis:number = Item.WIDTH;
			// dis = Math.sqrt( (pos[1] - this._curY) * (pos[1] - this._curY) + (pos[0] - this._curX) * (pos[0] - this._curX) );
			let curX:number = this._curY * Item.WIDTH;
			let curY:number = this._curX * Item.HEIGHT;
			let tX:number = pos[1] * Item.WIDTH;
			let tY:number = pos[0] * Item.HEIGHT;
			dis = Math.sqrt( (tY - curY) * (tY - curY) + (tX - curX) * (tX - curX));		
			this._moveCount = (dis / this._speed) | 0;
			eg.log('dis: ' + dis + '_moveCount: ' + this._moveCount);
			let radian:number = Math.atan2(tY - curY,tX - curX);
			this._moveX = Math.cos(radian) * this._speed;
			this._moveY = Math.sin(radian) * this._speed;
		}

		

		public get moveComplete():boolean{
			return this._isMoveComplete;
		}

		public get endRow():number{
			return this._nextX;
		}
		
		public get endCol():number{
			return this._nextY;
		}
	}


	class MapVo{
		public static ROW:number = 5;
		public static COL:number = 5;
		private _data:Node[][];

		//当前需要查找的节点
		// private _searchNode:Node;
		//待查列表
		private _openList:Node[];		
		//待查列表（和当前对象值相同）优先审查
		private _priorityOpenList:Node[];
		//已查关闭列表
		private _closeList:Node[];
		public constructor(){		
			this.initMap();
		}

		public initMap():void{
			// this._openList = [];
			// this._closeList = [];			
			this._data = [];
			let test = [[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]];
			test = [[4,2,5,2,1],     
					[2,1,2,2,2],     
					[3,1,1,3,3],
					[2,2,1,3,1],
					[3,2,1,5,4]]
			test = [[3,3,3,2,3],     
					[2,2,2,2,4],     
					[4,1,2,4,4],     
					[1,2,2,4,3],     
					[4,3,5,3,4]]
			test = [[3,2,3,4,3],
					[3,5,2,1,4],
					[4,3,3,4,4],
					[1,1,3,4,3],
					[4,3,5,3,4]];
			test = [[2,3,1,4,3],
					[1,5,5,1,3],
					[4,6,3,1,2],
					[1,1,2,5,4],
					[4,3,5,3,4]];
			test = [[3,5,4,4,2],
					[2,3,6,1,6],
					[6,2,7,4,2],
					[3,6,3,3,1],
					[5,3,4,6,1]]
			

			for(let i:number = 0; i < MapVo.ROW; i++){
				let row:Node[] = [];
				// console.log('\n');
				let values:string = '';
				for(let j:number = 0; j < MapVo.COL;j++){
					let value:number = 1 + Math.floor(Math.random() * 5);
					value = test[i][j];
					row[j] = new Node(i,j,value);
					// row[j] = new Node(i,j,test[i][j]);
					// console.log(value + ',');
					values += value + ',';
				}
				this._data[i] = row;
				eg.log(values);
			}
		}

		/**
		 * 查找连续的节点
		 * 从行列坐标开始查找
		 * 思路
		 * 1.获取当前节点的上下左右4个节点，加入到审查列表中
		 * 相同节点加入到优先审查列表中priorityOpenList (注：相同值节点的值相同value)
		 * 2.把审查的节点保存到临时数组中，如果，当前审查节点和上一个不同(注：不同指当前Node不在优先审查列表中)，保存当前的临时数组，
		 * 开始审查下一个节点sNode,直到审查类别元素为空审查结束
		 * 		  
		 * @param row  行坐标  搜索点的行列坐标
		 * @param col  列坐标
		 * @return 返回当前查找到的所有连续列表
		 */
		public find(row:number=0,col:number=0):Node[]{
			this._openList = [];
			this._closeList = [];		
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
						break;
					}
					sNode = node;				
					findList = [];
					// this._openList.length = 0;					
					// break;
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
			if(allList.length == 0 && findList.length >= 3){
				allList.push(findList);
			}
			eg.log('time:' + (egret.getTimer() - t1) + '|' + allList.length);			
			return allList[0];
		}

		/**
		 * 从审查列表中获取一个审查元素
		 */
		private getOpenNode():[number,Node]{
			//type 0 优先审查列表 1 其他审查列表			
			let type:number = 0;
			let node:Node = this._priorityOpenList.shift();
			if(node == null){
				type = 1;
				node = this._openList.shift();
			}
			return [type,node];
		}

		/**
		 * 加入审查列表
		 * @param node 
		 */
		public add2OpenList(node:Node,sNode:Node):void{						
			if(node && this._closeList.indexOf(node) == -1){
				//如果值相同，优先加入优先列表中，如果在_openList存在，则删除
				if(node.value == sNode.value){
					if(this._priorityOpenList.indexOf(node) == -1){
						this._priorityOpenList.push(node);
						let index = this._openList.indexOf(node);
						if(index != -1){
							this._openList.splice(index,1);
						}
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

		/**
		 * 更新Node的值
		 */
		public updateNodeValue(node:Node,value:number=0):void{
			// list.forEach(element => {
			// 	element.value = value;
			// });
			node.value = value;
		}

		/**
		 * 补充Node
		 * 补充规则
		 * 1.同列往下移动，不足，产生新的，填充
		 */
		public fill():number[][]{
			let list:Node[] = [];
			let len:number;
			let node:Node;
			let fillNum:number = 0;
			//所有需要移动的Node
			let movePosList:number[][] = [];
			for(let i:number = 0;i < MapVo.COL;i++){
				list = this.getNodesByCol(i);
				len = list.length;
				fillNum = 0;
				//调整row col
				// list.forEach(element => {
				// 	element.row = MapVo.ROW - len;
				// });
				for(let j:number = MapVo.ROW - 1; j >= 0; j--){
					node = list[j];
					if(node.value != 0){
						let oldRow:number = node.row;
						let newRow:number = node.row + fillNum;				
						if(oldRow != newRow){//原有的发生移动						
							node.row = newRow;
							this._data[node.row][node.col] = node;
							movePosList.push([oldRow,node.col,newRow,node.col]);						
						}
					} else {
						fillNum++;
					}					
				} 
				//从上面补充 fillNum 个
				for(let j:number = fillNum; j > 0;j--){
					let value:number = 1 + Math.floor(Math.random() * 5);
					node = new Node(j-1,i,value);
					this._data[node.row][node.col] = node;
					movePosList.push([j-fillNum-1,node.col,node.row,node.col]);						
				}

				//创建一个新的Node value
				// node.value = value;
			}
			this.toString();
			return movePosList;
		}

		/**
		 * 获取一列的数据
		 */
		private getNodesByCol(col:number):Node[]{
			let list:Node[] = [];
			let node:Node;
 			for(let i:number = 0; i < MapVo.ROW;i++){
				node = this._data[i][col];
				list[i] = node;				
			}
			return list;
		}
		
		/**
		 * 交换数据
		 */
		public swap(a:Node,b:Node):void{
			let aValue:number = a.value;
			let bValue:number = b.value;
			this._data[a.row][a.col].value = bValue;
			this._data[b.row][b.col].value = aValue;			
		}

		public toString():void{
			let values:string = '';
			for(let i:number = 0; i < MapVo.ROW; i++){								
				for(let j:number = 0; j < MapVo.COL;j++){
					let node:Node = this._data[i][j];
					values += node.value + ',';
				}
				values += '\n';				
			}
			eg.log(values);
			// return values;
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

	class Item extends egret.Sprite{
		private _bg:egret.Shape;
		private _tf:eui.Label;
		private _data:Node;
		public static WIDTH:number = 128;
		public static HEIGHT:number = 128;
		public static COLORS:number[] = [0xff0000,
											0xeb4310,
											0xf6941d,
											0xfbb417,
											0xffff00,
											0xcdd541,
											0x99cc33,
											0x3f9337,
											0x219167,
											0x239676,
											0x24998d,
											0x1f9baa,
											0x0080ff,
											0x3366cc,
											0x333399,
											0x003366,
											0x800080,
											0xa1488e,
											0xc71585,
											0xbd2158];
        public static ROTATION_EFFECT_PLAY_COMPLETE:string = 'ROTATION_EFFECT_PLAY_COMPLETE';											
		public constructor(data:Node){
			super();
			this._data = data;
			this.initUI();
		}		

		public initUI():void{
			this._bg = new egret.Shape();
			this._tf = new eui.Label();
			this._tf.width = Item.WIDTH;
			this._tf.height = Item.HEIGHT;
			this._tf.size = 50;
			this._tf.bold = true;
			this._tf.textAlign = egret.HorizontalAlign.CENTER;
			this._tf.verticalAlign = egret.VerticalAlign.MIDDLE;
			this.addChild(this._bg);
			this.addChild(this._tf);

			this.setData(this._data);

			this.anchorOffsetX = Item.WIDTH / 2;
			this.anchorOffsetY = Item.HEIGHT / 2;
			// this._tf.touchEnabled = false;
			this.touchEnabled = true;
			this.touchChildren = false;
		}
		public setData(data:Node):void{
			this._data = data;
			this._bg.graphics.clear();
			this._bg.graphics.beginFill(Item.COLORS[this._data.value-1]);
			this._bg.graphics.drawRoundRect(2,2,Item.WIDTH-4,Item.HEIGHT-4,30,30);
			this._bg.graphics.endFill();
			this._tf.text = this._data.value + '';
		}

		public rotationEffect():void{			
			egret.Tween.get(this).to({rotation:360},500).call(()=>{
				eg.EventDispatcher.Instance.dispatchEventWith(Item.ROTATION_EFFECT_PLAY_COMPLETE);
			},this);
		}	

		public get data():Node{
			return this._data;
		}	
	}

	class Effect1 extends egret.Sprite{
		private _icon1:egret.Bitmap;
		private _icon2:egret.Bitmap;
		constructor(){
			super();
			this.initUI();
		}

		public initUI():void{
			this._icon1 = new egret.Bitmap(RES.getRes('img_game_c9_png'));
			this._icon2 = new egret.Bitmap(RES.getRes('img_game_d0_png'));
			this.addChild(this._icon1);
			this.addChild(this._icon2);
			this._icon1.x = -50;
			this._icon1.y = -181;
			this._icon2.x = -56;
			this._icon2.y = -264;
		}
	}
}