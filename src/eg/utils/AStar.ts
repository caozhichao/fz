module eg {
	/**
	 * AStar
	 * 二维数组 ->一维数组 
	 * 待查询列表 -> 二叉堆优化	
	 * @author caozhichao
	 * 创建时间：2013-8-22 下午3:48:18
	 * 
	 */
	export class AStar
	{
		//横或竖向移动一格的路径评分
		private static COST_STRAIGHT : number = 10;
		//斜向移动一格的路径评分
		private static COST_DIAGONAL : number = 14;
		//开放列表
		private  _openList:Array<boolean>;
		
		//添加到开放列表的节点
		private  _openNodes:Array<Node>;
		private  _openNodeIndex:number;
		//关闭列表
		private  _closeList:Array<boolean>;
		//待查询列表的长度
		private  _openListLen:number;
		//待查询列表  二叉堆优化 
		private  _openListheap:Heap<Node>;
		//地图列数
		private  _mapW:number;
		//地图行数
		private  _mapH:number;
		//地图节点 all
		public  nodeList:Array<Node>;
		
		public constructor()
		{			
			function compare(a:Node,b:Node):number
			{
				return b.f - a.f;
			}
			this._openListheap = new Heap<Node>(compare);
		}
		public  setMaps(mapData:number[][],mapW:number,mapH:number):void
		{
			this._mapW = mapW;
			this._mapH = mapH;
			this.nodeList = new Array<Node>();
			var node:Node;
			var index:number = 0;
			for (var i:number = 0; i < this._mapW; i++) 
			{
				for (var j:number = 0; j < this._mapH; j++) 
				{
					node = new Node();
					node.x = i;
					node.y = j;
					node.walkable = mapData[i][j]==0?false:true;
					this.nodeList[index] = node;
					index++;
				}
			}
		}
		
		/**
		 * 获取节点 
		 * @param x
		 * @param y
		 * @return 
		 * 
		 */		
		public getNode(x:number,y:number):Node
		{
			if(!(x < 0 || x == this._mapW || y < 0 || y == this._mapH))
			{
				// return this.nodeList[x * this._mapH + y];
				return this.nodeList[x * this._mapW + y];
			}
			return null;
		}
		
		/**
		 * 寻路 
		 * @param startX
		 * @param startY
		 * @param endX
		 * @param endY
		 * @return 
		 * 
		 */		
		public find(startX:number,startY:number,endX:number,endY:number):Array<number[]>
		{
			this.reset();
			this._openListheap.reset();
			this._openList = [];
			this._closeList = [];
			this._openNodes = new Array<Node>();
			this._openNodeIndex = 0;
			this._openListLen = 0;
			var node:Node = this.getNode(startX,startY);
			this.add2OpenList(node);
			//当前查询的节点
			var curNode:Node;
			var curX:number;
			var curY:number;
			//8个方向的点
			var point8:Array<Node>;
			var n:Node;
			var g:number;
			var f:number;
			var tx:number;
			var ty:number;
			var nodeIndex:number;
			//当待查询列数据长度  > 0
//			var t:Number = getTimer();
			while(this._openListLen > 0)
			{
				//选取一个f值最小的节点
				this._openListLen--;
				curNode = this._openListheap.dequeue();
				//打印log 查看 优先选取f值最小的
//				log(_openListheap.heap,curNode);
				curX = curNode.x;
				curY = curNode.y;
				//加入关闭列表
				this._closeList[curX * this._mapW + curY] = true;
				
				//如果终点被放入关闭列表寻路结束，返回路径
				if (curX == endX && curY == endY)
				{
//					trace(getTimer() - t);
					return this.getPath(curNode);
				}
				//查找当前节点的8个方向的节点
				point8 = this.get8Point(curX,curY);
				
				// for each (n in point8) 
				point8.forEach(n => {
					tx = endX - n.x;
					ty = endY - n.y;
					nodeIndex = n.x * this._mapW + n.y;
					//计算F和G值      g从起始点的总花费      
					g = curNode.g + ((n.x == curX || n.y == curY) ? AStar.COST_STRAIGHT : AStar.COST_DIAGONAL);
					f = g + ((tx >= 0 ? tx : tx * -1) + (ty >= 0 ? ty : ty * -1)) * AStar.COST_STRAIGHT;
					
					if(!this._closeList[nodeIndex])
					{
						if(this._openList[nodeIndex])
						{
							if(g < n.g)
							{
								n.g = g;
								n.f = f;
								n.pNode = curNode;
								//修改f之后，更新二叉堆
								this._openListheap.modify(n,n);
							}
						} else 
						{
							n.g = g;
							n.f = f;
							n.pNode = curNode;
							this.add2OpenList(n);
						}
					}	
				});
				
			}
			return null;
		}
		
		// private  log(arr:Array,curNode:Node):void
		// {
		// 	var list:Array = [];
		// 	for each (var node:Node in arr) 
		// 	{
		// 		list.push(node);
		// 	}
		// 	list.sortOn("f",Array.NUMERIC);
		// 	if(list[0])
		// 	{
		// 		trace(curNode.f,list[0].f,curNode.f <= list[0].f);
		// 	}
		// }
		
		public get8Point(x:number,y:number):Array<Node>
		{
			var arr:Array<Node> = [];
			//上
			var upNode:Node = this.checkNode(x-1,y);
			//下
			var downNode:Node = this.checkNode(x+1,y);
			//左
			var leftNode:Node = this.checkNode(x,y-1);
			//右
			var rightNode:Node = this.checkNode(x,y+1);
			
			upNode && arr.push(upNode);
			downNode && arr.push(downNode);
			leftNode && arr.push(leftNode);
			rightNode && arr.push(rightNode);
			
			// if(rightNode || upNode)
			// {
			// 	//右上
			// 	var rightUpNode:Node;
			// 	rightUpNode = this.checkNode(x+1,y-1);
			// 	rightUpNode && arr.push(rightUpNode);
			// } 
			// if(downNode || rightNode)
			// {
			// 	//右下
			// 	var rightDownNode:Node;
			// 	rightDownNode = this.checkNode(x+1,y+1);
			// 	rightDownNode && arr.push(rightDownNode);
			// } 
			// if(upNode || leftNode )
			// {
			// 	//左上
			// 	var leftUpNode:Node;
			// 	leftUpNode = this.checkNode(x-1,y-1);
			// 	leftUpNode&& arr.push(leftUpNode);
			// }
			// if(downNode || leftNode)
			// {
			// 	//左下
			// 	var leftDownNode:Node;
			// 	leftDownNode = this.checkNode(x-1,y+1);
			// 	leftDownNode&& arr.push(leftDownNode);
			// }
			return arr;
		}
		
		/**
		 * 检查节点 
		 * @param x
		 * @param y
		 * @return 
		 * 
		 */		
		private checkNode(x:number,y:number):Node
		{
			var node:Node = this.getNode(x,y);
			if(node && node.walkable)
			{
				return node;
			}
			return null;
		}
		/**
		 * 添加到开放列表中 
		 * @param node
		 * 
		 */		
		public add2OpenList(node:Node):void
		{
			//记录加入(过)开放列表中节点
			// this._openList[node.x * this._mapH + node.y] = true;
			this._openList[node.x * this._mapW + node.y] = true;
			
			this._openNodes[this._openNodeIndex] = node;
			this._openNodeIndex++;
			
			//二叉堆
			this._openListheap.enqueue(node);
			this._openListLen++;
		}
		/**
		 * 获取路径 
		 * @param node
		 * @return 
		 * 
		 */		
		public getPath(node:Node):Array<number[]>
		{
			var path:Array<number[]> = [];
			var index:number = 0;
			while(node.pNode != null)
			{
				path[index] = [node.x,node.y];
				node = node.pNode;
				index++;
			}
			return path.reverse();
		}
		
		/**
		 * 重置查询过的数据节点 
		 * 
		 */		
		public reset():void
		{
			var node:Node;
			var len:number;
			var index:number = 0;
			while(index < this._openNodeIndex)
			{
				node = this._openNodes[index];
				node.g = 0;
				node.f = 0;
				node.pNode = null;
				index++;
			}
		}
	}

	

	/**
	 * 地图数据排列
	 * -------------------->
	 * 00 10 20 
	 * 01 11 21 
	 * 02 12 22
	 * 
	 *  
	 * @author caozhichao
	 * 
	 */
	class Node 
	{
		public  x:number;
		public  y:number;
		public  f:number;
		public  g:number;
		public  walkable:boolean = true;
		public  pNode:Node;
	}
}

