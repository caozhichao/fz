module test {
	export class BezierEdit extends egret.Sprite{
		private index:number = 0;
		private shapeList:BezierShape[];
		private lineShape:egret.Shape;
		private c:egret.Sprite;
		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdd,this);
		}

		private onAdd(evt:egret.TouchEvent):void{
			this.initUI();
		}

		private initUI():void{

			let map = new egret.Bitmap(RES.getRes("1_png"));
			this.addChild(map);

			this.lineShape = new egret.Shape();
			this.addChild(this.lineShape);

			this.c = new egret.Sprite();
			this.c.graphics.beginFill(0x00ff00);
			this.c.graphics.drawCircle(0,0,10);
			this.c.graphics.endFill();

			this.addChild(this.c);

			this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTap,this);

			this.shapeList = [];
			// let shape:BezierShape = new test.BezierShape(0xff0000);

			// this.addChild(shape);
			// this.stage.add

			// this.stage.addEventListener(egret.Ev)
			eg.EventDispatcher.Instance.addEventListener('reset_draw',(evt)=>{
				this.draw();
			},this);

			let button:eui.Button = new eui.Button();
			this.addChild(button);

			button.addEventListener(egret.TouchEvent.TOUCH_END,(evt)=>{
				console.log('button');
				// evt.stopImmediatePropagation();
				// return;
				let arr:any[] = [];
				for(let i:number = 0; i < this.shapeList.length;i++){
					arr[i] = {x:this.shapeList[i].x,y:this.shapeList[i].y};					
				}

				let posArr = [];

				// this.lineShape.graphics.moveTo(arr[0][0],arr[0][1]);
				let p0 = arr[0];
				let p1;
				let p2;
				for (var i:number = 1; i<arr.length - 2; ++i) {

					var xc:number = (arr[i].x + arr[i+1].x)/2;

					var yc:number = (arr[i].y + arr[i+1].y)/2;
					p1 = arr[i];
					p2 = {x:xc,y:yc};
					// this.lineShape.graphics.curveTo(arr[i][0],arr[i][1],xc,yc);
					// posArr.concat(this.test(p0,p1,p2));
					let tempArr = this.test(p0,p1,p2);
					for(let i = 0; i < tempArr.length;i++){
						posArr.push(tempArr[i]);
					}
					p0 = p2;					
				}
				p1 = arr[i];
				p2 = arr[i+1];
				let tempArr = this.test(p0,p1,p2);
				for(let i = 0; i < tempArr.length;i++){
					posArr.push(tempArr[i]);
				}

				this.play(posArr);
				console.log(posArr);
				// this.lineShape.graphics.curveTo(arr[i][0],arr[i][1],arr[i+1][0],arr[i+1][1]);
				evt.stopImmediatePropagation();
			},this);

		}

		private play(posArr:any[]):void{
			let i = 0;
			this.addEventListener(egret.Event.ENTER_FRAME,(evt)=>{
				if(i < posArr.length){
					this.c.x = posArr[i].x;
					this.c.y = posArr[i].y;
				}
				i++;
			},this)
		}


		private onTap(evt:egret.TouchEvent):void{
			console.log('onTap');

			let shape:BezierShape = new test.BezierShape(0xff0000,this.index);
			shape.x = evt.stageX;
			shape.y = evt.stageY;
			this.addChild(shape);
			this.index++;
			this.shapeList.push(shape);

			// this.shapeList.sort();

			// let arr:number[][] = [];


			// for(let i:number = 0; i < this.shapeList.length;i++){
			// 	arr[i] = [this.shapeList[i].x,this.shapeList[i].y];
			// }
			// if(arr.length > 2){
			// 	this.graphics.clear();
			// 	this.initMap(arr);
			// }
			this.draw();
		}
		private draw():void{
			let arr:number[][] = [];
			for(let i:number = 0; i < this.shapeList.length;i++){
				arr[i] = [this.shapeList[i].x,this.shapeList[i].y];
			}

			if(arr.length > 2){
				this.lineShape.graphics.clear();
				this.initMap(arr);
			}
		}

		private initMap(arr:number[][]) {

			this.lineShape.graphics.lineStyle(2,0xFFFFFF);

			this.lineShape.graphics.moveTo(arr[0][0],arr[0][1]);

			for (var i:number = 1; i<arr.length - 2; ++i) {

				var xc:number = (arr[i][0] + arr[i+1][0])/2;

				var yc:number = (arr[i][1] + arr[i+1][1])/2;

				this.lineShape.graphics.curveTo(arr[i][0],arr[i][1],xc,yc);

			}
			this.lineShape.graphics.curveTo(arr[i][0],arr[i][1],arr[i+1][0],arr[i+1][1]);
	   }

	   private test(P0,P1,P2){			
			// let MapArray = [[50,50],[500,600],[800,200]];			
			// this.initMap(MapArray);
			// this.drawPoints(MapArray);
			// return;
			// let P0={x:50,y:50},P1={x:500,y:600},P2={x:800,y:200};

			let ax = Math.floor(P0.x-2*P1.x+P2.x);
 
			let ay = Math.floor(P0.y-2*P1.y+P2.y);
			
			let bx = Math.floor(2*P1.x-2*P0.x);
			
			let by = Math.floor(2*P1.y-2*P0.y);
			
			
			
			let A = 4*(ax*ax+ay*ay);
			
			let B = 4*(ax*bx+ay*by);
			
			let C = bx*bx+by*by;
			
			
			
			//曲线总长度
			
			let  total_length:number = 0.0;

			//曲线分割的份数
			
			let STEP = 70;
			
			//-------------------------------------------------------------------------------------
			
			//速度函数
			
			/*
			s(t_) = Sqrt[A*t*t+B*t+C]
			*/
			
			function s(t:number):number
			
			{			
				return Math.sqrt(A*t*t+B*t+C);			
			}

			
//-------------------------------------------------------------------------------------
 
//长度函数
 
/*
L(t) = Integrate[s[t], t]
L(t_) = ((2*Sqrt[A]*(2*A*t*Sqrt[C + t*(B + A*t)] + B*(-Sqrt[C] + Sqrt[C + t*(B + A*t)])) + 
			(B^2 - 4*A*C) (Log[B + 2*Sqrt[A]*Sqrt[C]] - Log[B + 2*A*t + 2 Sqrt[A]*Sqrt[C + t*(B + A*t)]]))
				/(8* A^(3/2)));
*/
 
			function L(t:number)
			
			{
			
				let temp1:number = Math.sqrt(C+t*(B+A*t));
			
				let temp2:number = (2*A*t*temp1+B*(temp1-Math.sqrt(C)));
			
				let temp3:number = Math.log(B+2*Math.sqrt(A)*Math.sqrt(C));
			
				let temp4:number = Math.log(B+2*A*t+2*Math.sqrt(A)*temp1);
			
				let temp5:number = 2*Math.sqrt(A)*temp2;
			
				let temp6:number = (B*B-4*A*C)*(temp3-temp4);

				return (temp5+temp6)/(8*Math.pow(A,1.5));			
			}
			
			
			
			function InvertL(t:number, l:number)
			
			{
			
				let t1=t
				let t2 = 0;
			
				
			
				do
			
				{
			
					t2 = t1 - (L(t1)-l)/s(t1);
			
					if(Math.abs(t1-t2)<0.000001) break;
			
					t1=t2;
			
				}while(true);
			
				return t2;
			
			}

			//计算总长度
			
			total_length = L(1);
			let speed = 1;
			STEP = total_length / speed;

			function aa(nIndex:number){

				let t = nIndex/STEP;
 
				//如果按照线形增长,此时对应的曲线长度
 
				let l = t*total_length;
 
				//根据L函数的反函数，求得l对应的t值
 
				t = InvertL(t, l);
 
 
 
				//根据贝塞尔曲线函数，求得取得此时的x,y坐标
 
				let x = (1-t)*(1-t)*P0.x +2*(1-t)*t*P1.x + t*t*P2.x;
 
				let y = (1-t)*(1-t)*P0.y +2*(1-t)*t*P1.y + t*t*P2.y;
				return {x:x,y:y};
			}

			let posArr = [];
			for(let i = 0; i <= STEP; i++){
				let pos = aa(i);
				posArr.push(pos);
			}
			return posArr;
			// let nIndex = 0;
			// let flag = true;
			// let lastX:number = 50;
			// let lastY:number = 50;
			// this.addEventListener(egret.Event.ENTER_FRAME,(evt)=>{
			// 	if(flag){
			// 		if(nIndex > STEP){
			// 			flag = false;
						
			// 		} else {
			// 			let pos = aa(nIndex);
			// 			this.c.x = pos.x;
			// 			this.c.y = pos.y;
			// 			let dis = Math.sqrt( (pos.x - lastX) * (pos.x - lastX) +  (pos.y - lastY) * (pos.y - lastY) );
			// 			lastX = pos.x;
			// 			lastY = pos.y;
			// 			console.log(dis);
			// 		}
			// 		nIndex++;
			// 	}
			// },this);
		}

	}
}