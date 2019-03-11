module test {
	export class TweenTest extends egret.Sprite{
		private t1:number;
		private count:number;
		private v1:number = 0;
		private v2:number = 100;
		public constructor() {
			super();
			// (1-t) * this.p0.x + t * this.p1.x

			/*
			let obj = {angle:0};
			let tween = egret.Tween.get(obj,{loop:false,onChange:()=>{
				console.log(obj.angle);
			},onChangeObj:this})
			tween.to({angle:100},100)
			.call(()=>{				
				console.log('end call');
			},this);			
			*/
			this.t1 = egret.getTimer();
			this.count = 0;

			this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		}

		private onEnterFrame(evt:egret.Event):void{
			let t2:number = egret.getTimer();
			let passTime:number = t2 - this.t1;
			this.t1 = t2;
			this.count += passTime;
			// console.log('passTime:' + passTime);

			if(this.count > 1000){
				this.count = 1000;
			}

			let t = this.count / 1000;

			// let v = (1-t) * this.v1 + t * this.v2;
			let v = eg.bezier0(t,[this.v1],[this.v2]);
			console.log('count:' + this.count + ' t:' + t + '|' + v);
		}
	}
}