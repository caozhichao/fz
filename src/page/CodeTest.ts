module test {
	import Sprite = egret.Sprite;
	export class CodeTest {
		public constructor() {

			this.initUI();
		}

		private initUI():void{
			// let self = this;
			// let t1:number = egret.getTimer();
			// for(let i:number = 0; i < 100000000; i++){
			// 	this.test1(); // 6 5
			// 	// self.test1();
			// }
			// console.log(egret.getTimer() - t1);

			egret.ticker.$startTick((timeStamp: number) => {
				// console.log('timeStamp:' + timeStamp);
				// let a = new egret.Point();
				let spr = new Sprite();
				spr.graphics.beginFill(0xff0000);
				spr.graphics.drawRect(0,0,100,100);
				spr.graphics.endFill();
				spr.x = Math.random() *  eg.Config.STAGE_W;
				spr.y = Math.random() * eg.Config.STAGE_H;
				egret.Tween.get(spr,{loop:true}).to({rotation:360},1000);
				eg.Config.stage.addChild(spr);
				return true;
			},this);

			let count = egret.$hashCount;
			setInterval(()=>{
				let newCount = egret.$hashCount;
				let diff = newCount - count;
				console.log(diff);
				count = newCount;
			},1000);			
		}

		private test1():void{

		}
	}
}