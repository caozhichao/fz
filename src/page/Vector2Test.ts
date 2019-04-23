class Vector2Test  extends egret.Sprite{
	public constructor() {
		super();
		let Vector2 = window['Vector2'];
		/*
		let v1 = new Vector2(1,0);
		console.log(v1);
		let v2 = new Vector2(-1,1);
		console.log(v2);
		// let v3 = v2.add(v1);
		// console.log(v3);

		// let v3 = v2.sub(v1);
		// console.log(v3);

		let d = v2.dot(v1);
		// console.log(dot);
		// console.log(dot * 180 / Math.PI);

		let a = d / (v1.length() * v2.length());

		// console.log(a * 180 / Math.PI);
		console.log(Math.acos(a) * 180 / Math.PI);
		*/

		let spr:egret.Sprite = new egret.Sprite();
		spr.graphics.beginFill(0xff0000);
		spr.graphics.drawCircle(0,0,10);
		spr.graphics.endFill();

		this.addChild(spr);

		let v1,v2,v3;
		let flag = false;
		let speed = 5;
		eg.Config.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(evt:egret.TouchEvent)=>{

			console.log(evt);
			 v1 = new Vector2(spr.x,spr.y);
			 v2 = new Vector2(evt.stageX,evt.stageY);
			 v3 = v2.clone();

			v2.sub(v1);
			// console.log(v2);
			v2.normalize();
			v2.multiplyScalar(speed);
			// console.log(v2);
			// console.log(v2.length());

			// let l = v1.distanceTo(v3);
			// console.log(l);
			flag = true;

		},this);	

		this.addEventListener(egret.Event.ENTER_FRAME,(evt)=>{

			if(flag){
				v1.add(v2);
				if(v1.distanceTo(v3) < speed){
					v1.x = v3.x;
					v1.y = v3.y;
					flag = false;
				}				
				spr.x = v1.x;
				spr.y = v1.y;
			}

		},this);

	}
}