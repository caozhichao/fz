module p2test {
	export class Test2 extends egret.Sprite{

		private debugDraw: p2DebugDraw;
    	private world: p2.World;

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage(event:egret.Event) {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
	
			//鼠标点击添加刚体
			this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
	
			this.createWorld();
			this.createGround();
			this.createBodies();
			this.createDebug();
		}
		private createWorld(): void {
			var wrd:p2.World = new p2.World();
			wrd.sleepMode = p2.World.BODY_SLEEPING;
			wrd.gravity = [0,10];
			this.world = wrd;
		}
		private createGround(): void {
			var stageHeight:number = egret.MainContext.instance.stage.stageHeight;
			var groundShape: p2.Plane = new p2.Plane();
			var groundBody: p2.Body = new p2.Body();
			groundBody.position[1] = stageHeight-100;
			groundBody.angle = Math.PI;
			groundBody.addShape(groundShape);
	
			this.world.addBody(groundBody);
		}
		private createBodies(): void {
			var boxShape: p2.Shape = new p2.Box({width:100, height:50});
			var boxBody: p2.Body = new p2.Body({ mass: 0, position: [200, 200] });
			boxBody.addShape(boxShape);
			this.world.addBody(boxBody);

			var display: egret.DisplayObject;			
			display = this.createBox((<p2.Box>boxShape).width * 50,(<p2.Box>boxShape).height * 50);			
			display.width = (<p2.Box>boxShape).width * 50;
			display.height = (<p2.Box>boxShape).height * 50;

			display.anchorOffsetX = display.width / 2;
            display.anchorOffsetY = display.height / 2;

            boxBody.displays = [display];

			this.addChild(display);

	
			// var boxShape: p2.Shape = new p2.Box({width:50, height:50});
			// var boxBody: p2.Body = new p2.Body({ mass: 1, position: [200, 180],angularVelocity:1 });
			// boxBody.addShape(boxShape);
			// this.world.addBody(boxBody);
		}

		/**
		 * 创建一个方形
		 */
		private createBox(width:number,height:number): egret.Shape {
			var shape = new egret.Shape();
			shape.graphics.beginFill(0xfff000);
			shape.graphics.drawRect(0,0,width,height);
			shape.graphics.endFill();
			return shape;
		}

		
		private createDebug(): void {
			// egret.Profiler.getInstance().run();
			//创建调试试图
			this.debugDraw = new p2DebugDraw(this.world);
	
			var sprite: egret.Sprite = new egret.Sprite();
			this.addChild(sprite);
			this.debugDraw.setSprite(sprite);
		}
		private loop(): void {
			this.world.step(60 / 1000);
			this.debugDraw.drawDebug();
			var factor = 50;
			var stageHeight:number = egret.MainContext.instance.stage.stageHeight;
			var l = this.world.bodies.length;
			for(var i:number = 0; i < l; i++){
				var boxBody:p2.Body = this.world.bodies[i];
				if(boxBody.displays){
					var box:egret.DisplayObject = boxBody.displays[0];
					if(box){
						box.x = boxBody.position[0] * factor;
						box.y = stageHeight - boxBody.position[1] * factor;
						box.rotation = 360 - (boxBody.angle + boxBody.shapes[0].angle) * 180 / Math.PI;
					}

				}
			}
		}
		private addOneBox(e: egret.TouchEvent): void {
			var positionX: number = Math.floor(e.stageX);
			var positionY: number = Math.floor(e.stageY);
	
			if (Math.random() > 0.5) {
				//添加方形刚体
				var boxShape: p2.Shape = new p2.Box({width:Math.random() *150 + 50, height:100});
				var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1 });
				boxBody.addShape(boxShape);
				this.world.addBody(boxBody);
			}
			else {
				//添加圆形刚体
				var boxShape: p2.Shape = new p2.Circle(50);
				var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY] });
				boxBody.addShape(boxShape);
				this.world.addBody(boxBody);
			}
		}
	}
}