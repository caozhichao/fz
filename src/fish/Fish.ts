module fish {
	export class Fish extends egret.Sprite{
		public constructor() {
			super();
			this.initUI();
		}
		private initUI():void{
			let data = RES.getRes('fish0_json');
			let texture = RES.getRes('fish0_png');
			let fac:egret.MovieClipDataFactory =  new egret.MovieClipDataFactory(data,texture);
			let mcData:egret.MovieClipData = fac.generateMovieClipData('fish0');
			let mc:egret.MovieClip = new egret.MovieClip(mcData);
			this.addChild(mc);
			mc.play(-1);			
			// egret.Tween.get(mc,{loop:true}).to({rotation:360},1000);
		}
	}
}