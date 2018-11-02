module p2test {
	export class Test extends egret.Sprite{
		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}

		private onAddToStage(event:egret.Event){

			var factor: number = 50;        
			var sh: number = (egret.MainContext.instance.stage.stageHeight) / factor;
			var sw: number = (egret.MainContext.instance.stage.stageWidth) / factor;
			//创建world
			var world: p2.World = new p2.World();
			world.sleepMode = p2.World.BODY_SLEEPING;
			//创建地面       
			var gshape: p2.Plane = new p2.Plane();
			var gbody: p2.Body = new p2.Body({
					position:[3,-sh/2]
				});
			gbody.addShape(gshape);
			world.addBody(gbody);
			//添加显示对象   
			var ground: egret.DisplayObject = this.createGround();
			gbody.displays = [ground];
			// ground.anchorOffsetX = ground.width / 2;
			// ground.anchorOffsetY = ground.height / 2;
			this.addChild(ground);


			//添加长方形刚体
			var boxShape: p2.Shape = new p2.Box({width:1,height:1});
			var boxBody: p2.Body = new p2.Body({ mass: 1,position: [sw / 2,0],angularVelocity: 3 });
			boxBody.addShape(boxShape);
			world.addBody(boxBody);
			//添加长方形刚体的显示对象   
			var display: egret.DisplayObject = this.createSprite();
			display.width = (<p2.Box>boxShape).width * factor;
			display.height = (<p2.Box>boxShape).height * factor;
			display.anchorOffsetX = display.width / 2
			display.anchorOffsetY = display.height / 2;
			//同步egret对象和p2对象
			boxBody.displays = [display];
			this.addChild(display);

			//添加帧事件侦听
			egret.Ticker.getInstance().register(function(dt) {
				//使世界时间向后运动
				world.step(dt / 1000);
				ground.x = gbody.position[0] * factor;
				ground.y = sh - gbody.position[1] * factor;
				ground.rotation = 360 - gbody.angle * 180 / Math.PI;

				display.x = boxBody.position[0] * factor;
				display.y = sh - boxBody.position[1] * factor;
				display.rotation = 360 - boxBody.angle * 180 / Math.PI;
				if(boxBody.sleepState == p2.Body.SLEEPING) {
					display.alpha = 0.5;
				}else {
					display.alpha = 1;
						}
			},this);       
		}

		private createGround(): egret.Sprite {
			var result: egret.Sprite = new egret.Sprite();
			result.graphics.beginFill(0x2d78f4);
			result.graphics.drawRect(0,0,600,40);
			result.graphics.endFill();
			return result;
		}   


		private createSprite(): egret.Sprite {
			var result: egret.Sprite = new egret.Sprite();
			result.graphics.beginFill(0x37827A);
			result.graphics.drawRect(0,0,80,40);
			result.graphics.endFill();
			return result;
		}
	}
}