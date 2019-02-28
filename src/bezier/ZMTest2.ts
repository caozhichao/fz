module test {
	/**
	 * 祖玛路径测试
	 */
	export class ZMTest2 extends eg.PageBase{
		public _container:eui.Group;
		public pMove:eui.Rect;
		public _btn_test:eui.Button;

		
		private _drawPath:egret.Shape;

		private pos:number[] = [];
		private paths:number[][];

		public constructor() {
			super();
			this.skinName = 'skins.ZMTestSkin';
		}
		public initUI(data:any):void{
			super.initUI(data);

			this._drawPath = new egret.Shape();

			this._container.addChild(this._drawPath);

			let paths:number[][] = [];

			for(let i:number = 0; i <=17;i++){
				paths[i] = [this['p' + i].x,this['p' + i].y];
			}
			this.drawPath(paths);

			this.paths = paths;

			// let arr = this.group(paths);

			// let len = arr.length;
			// let pos:number[] = [];
			// for(let i:number = 0; i < len; i++){
			// 	let a = arr[i][0];
			// 	let b = arr[i][1];
			// 	let c = arr[i][2];
			// 	let temp = eg.BezierUtil.getInstance().getPoints(a,b,c);
			// 	pos = pos.concat(temp);
			// }

			// console.log(pos.length);
			// this.pos = pos;

			this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);

			this._btn_test.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTest,this);
		}

		private onTest(evt:egret.TouchEvent):void{
			let arr = this.group(this.paths);
			let t1 = egret.getTimer();

			let len = arr.length;
			let pos:number[] = [];
			for(let i:number = 0; i < len; i++){
				let a = arr[i][0];
				let b = arr[i][1];
				let c = arr[i][2];
				let temp = eg.BezierUtil.getInstance().getPoints(a,b,c,3);
				pos = pos.concat(temp);
			}

			console.log('耗时:' + (egret.getTimer() - t1 ) + ' len:' + pos.length);
			this.pos = pos;

		}

		private onEnterFrame(evt:egret.Event):void{
			let tx:number = this.pos.shift();
			let ty:number = this.pos.shift();
			let degrees:number = this.pos.shift();
			if(tx) {
				// this.pMove.x = tx;
				this.pMove.x = tx;
			}
			if(ty){
				// this.pMove.y = ty;
				this.pMove.y = ty;
			}
			if(degrees){
				this.pMove.rotation = degrees;
			}
		}



		private drawPath(paths:number[][]):void{
			this._drawPath.graphics.clear();
			this._drawPath.graphics.lineStyle(2,0xFFFFFF);
			this._drawPath.graphics.moveTo(paths[0][0],paths[0][1]);
			let len = paths.length - 2;
			let i:number = 1
			for(i; i < len; i++){				
				let xc:number = (paths[i][0] + paths[i+1][0])/2;
				let yc:number = (paths[i][1] + paths[i+1][1])/2;
				this._drawPath.graphics.curveTo(paths[i][0],paths[i][1],xc,yc);				
			}
			this._drawPath.graphics.curveTo(paths[i][0],paths[i][1],paths[i+1][0],paths[i+1][1]);
		}

		private group(paths:number[][]):any[][]{

			let p0;
			let p1;
			let p2;

			let len = paths.length - 2;
			let i:number = 1;
			let xc:number;
			let yc:number;

			let arr:any[][] = [];

			p0 = {x:paths[0][0],y:paths[0][1]};

			for(i; i < len; i++){
				xc = (paths[i][0] + paths[i+1][0])/2;
				yc = (paths[i][1] + paths[i+1][1])/2;

				p1 = {x:paths[i][0],y:paths[i][1]};

				p2 = {x:xc,y:yc};

				arr.push([p0,p1,p2]);

				p0 = {x:xc,y:yc};

			}

			p1 = {x:paths[i][0],y:paths[i][1]};
			p2 = {x:paths[i+1][0],y:paths[i+1][1]};

			arr.push([p0,p1,p2]);
			
			return arr;
		}

	}
}