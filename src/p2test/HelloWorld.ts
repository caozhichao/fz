module p2test {
	export class HelloWorld extends egret.Sprite{
		private debugDraw:p2DebugDraw;
		public constructor() {
			super();
			this.initUI();
		}

		private initUI():void{
			var factor:number = 50
			let world:p2.World = new p2.World();
			world.sleepMode = p2.World.BODY_SLEEPING;

			//创建调试试图
			this.debugDraw = new p2DebugDraw(world);
			var sprite: egret.Sprite = new egret.Sprite();
			this.addChild(sprite);
			this.debugDraw.setSprite(sprite);


			// var planeShape:p2.Plane = new p2.Plane();
			//  var shape = new p2.Circle({radius: 50});
			// var planeBody:p2.Body = new p2.Body();
			// // planeBody.addShape(planeShape);
			// planeBody.addShape(shape);
			// planeBody.displays = [];
			// world.addBody(planeBody);

			// var positionX: number = Math.floor(300 / factor);
            // var positionY: number = Math.floor((egret.MainContext.instance.stage.stageHeight - 300) / factor);

			// var positionX: number = 300;
            // var positionY: number = 300;
			// var boxShape: p2.Shape = new p2.Box({width: 2, height: 1});
			// var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1 });
			// boxBody.addShape(boxShape);
			// world.addBody(boxBody);

			var positionX: number = Math.floor(300 / factor);
            var positionY: number = Math.floor((egret.MainContext.instance.stage.stageHeight - 300) / factor);

			var boxShape: p2.Shape = new p2.Box({width: 2, height: 1});
			var boxBody: p2.Body = new p2.Body({ mass: 0, position: [positionX, positionY], angularVelocity: 1 });
			boxBody.addShape(boxShape);
			world.addBody(boxBody);

			var display: egret.DisplayObject;
			// if(self.isDebug){
				display = this.createBox((<p2.Box>boxShape).width * factor,(<p2.Box>boxShape).height * factor);
			// }else{
			// 	display = self.createBitmapByName("rect");
			// }
			display.width = (<p2.Box>boxShape).width * factor;
			display.height = (<p2.Box>boxShape).height * factor;

			display.anchorOffsetX = display.width / 2;
            display.anchorOffsetY = display.height / 2;

            boxBody.displays = [display];

			this.addChild(display);



			egret.Ticker.getInstance().register((dt)=>{

				world.step(dt / 1000);
				this.debugDraw.drawDebug();

				var stageHeight:number = egret.MainContext.instance.stage.stageHeight;
				var l = world.bodies.length;
				for(var i:number = 0; i < l; i++){
					var boxBody:p2.Body = world.bodies[i];
					var box:egret.DisplayObject = boxBody.displays[0];
					if(box){
						box.x = boxBody.position[0] * factor;
						box.y = stageHeight - boxBody.position[1] * factor;
						box.rotation = 360 - (boxBody.angle + boxBody.shapes[0].angle) * 180 / Math.PI;
					}
				}


			},this);


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
	}
}