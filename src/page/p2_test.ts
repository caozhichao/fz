module test {

	//p2坐标系参考
	// https://www.cnblogs.com/luoeeyang/p/6841161.html
	export class p2_test extends egret.Sprite{

		//debug模式，使用图形绘制
    	private isDebug: boolean = true;

		public constructor() {
			super();

			

			var factor: number = 50;

			//创建world
			var world: p2.World = new p2.World();
			world.sleepMode = p2.World.BODY_SLEEPING;

			//创建plane
			var planeShape: p2.Plane = new p2.Plane();
			var planeBody: p2.Body = new p2.Body();
			planeBody.addShape(planeShape);
			planeBody.displays = [];
			world.addBody(planeBody);

			//添加一个矩形

			let p2Pos = this.getPhysicsCoord(300,300);

			


			var boxShape: p2.Shape = new p2.Box({width: 2, height: 1});
			var boxBody: p2.Body = new p2.Body({ mass: 1, position: [p2Pos[0], p2Pos[1]], angularVelocity: 1 ,fixedY :false});
			boxBody.addShape(boxShape);

			let display = this.createBox((<p2.Box>boxShape).width * factor,(<p2.Box>boxShape).height * factor);
			display.anchorOffsetX = display.width / 2;
			display.anchorOffsetY = display.height / 2;
			this.addChild(display);

			boxBody.displays = [display];
			world.addBody(boxBody);


			egret.Ticker.getInstance().register(function(dt) {
				if (dt < 10) {
					return;
				}
				if (dt > 1000) {
					return;
				}
				world.step(dt / 1000);

				var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
				var l = world.bodies.length;
				for (var i: number = 0; i < l; i++) {
					var boxBody: p2.Body = world.bodies[i];
					// console.log(boxBody.position);
					var box: egret.DisplayObject = boxBody.displays[0];
					if (box) {
						box.x = boxBody.position[0] * factor;
						box.y = stageHeight - boxBody.position[1] * factor;
						box.rotation = 360 - (boxBody.angle + boxBody.shapes[0].angle) * 180 / Math.PI;
						if (boxBody.sleepState == p2.Body.SLEEPING) {
							box.alpha = 0.5;
						}
						else {
							box.alpha = 1;
						}
					}
				}
			}, this);


			//添加鼠标约束

			let mouseBody = new p2.Body();
			mouseBody.displays = [];
        	world.addBody(mouseBody);
			let mouseConstraint;
			let _stage = eg.Config.stage;
			_stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(evt:egret.TouchEvent)=>{
				let position = this.getPhysicsCoord(evt.stageX,evt.stageY);
				var hitBodies = world.hitTest(position, [boxBody],5);
				// console.log(hitBodies);
				if(hitBodies.length > 0){
					mouseBody.position[0] = position[0];
					mouseBody.position[1] = position[1];


					mouseConstraint = new p2.RevoluteConstraint(mouseBody, boxBody, {
						worldPivot: position,
						collideConnected:false
            		});
            		world.addConstraint(mouseConstraint);

				}
			},this);

			_stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,(evt:egret.TouchEvent)=>{
				let position = this.getPhysicsCoord(evt.stageX,evt.stageY);
				mouseBody.position[0] = position[0];
				mouseBody.position[1] = position[1];
			},this);

			_stage.addEventListener(egret.TouchEvent.TOUCH_END,(evt:egret.TouchEvent)=>{
				if(mouseConstraint){
					world.removeConstraint(mouseConstraint);
          			mouseConstraint = null;
				}
			},this);




			//鼠标点击添加刚体
        // eg.Config.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, addOneBox, this);
        var self = this;

			function addOneBox(e: egret.TouchEvent): void {
				var positionX: number = Math.floor(e.stageX / factor);
				var positionY: number = Math.floor((egret.MainContext.instance.stage.stageHeight - e.stageY) / factor);
				var display: egret.DisplayObject;
				if (Math.random() > 0.5) {
					//添加方形刚体
					//var boxShape: p2.Shape = new p2.Rectangle(2, 1);
					var boxShape: p2.Shape = new p2.Box({width: 2, height: 1});
					var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1 });
					boxBody.addShape(boxShape);
					world.addBody(boxBody);

					if(self.isDebug){
					display = self.createBox((<p2.Box>boxShape).width * factor,(<p2.Box>boxShape).height * factor);
					}else{
						display = self.createBitmapByName("rect");
					}
					display.width = (<p2.Box>boxShape).width * factor;
					display.height = (<p2.Box>boxShape).height * factor;
				}
				else {
					//添加圆形刚体
					//var boxShape: p2.Shape = new p2.Circle(1);
					var boxShape: p2.Shape = new p2.Circle({ radius: 1 });
					var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY] });
					boxBody.addShape(boxShape);
					world.addBody(boxBody);

					if (self.isDebug) {
						display = self.createBall((<p2.Circle>boxShape).radius*factor);
					} else {
						display = self.createBitmapByName("circle");
					}

					display.width = (<p2.Circle>boxShape).radius * 2 * factor;
					display.height = (<p2.Circle>boxShape).radius * 2 * factor;
				}

				display.anchorOffsetX = display.width / 2;
				display.anchorOffsetY = display.height / 2;

				boxBody.displays = [display];
				self.addChild(display);
			}

		}

			/**
		 * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
		 */
		private createBitmapByName(name: string): egret.Bitmap {
			var result: egret.Bitmap = new egret.Bitmap();
			var texture: egret.Texture = RES.getRes(name);
			result.texture = texture;
			return result;
		}
		/**
		 * 创建一个圆形
		 */
		private createBall(r: number): egret.Shape {
			var shape = new egret.Shape();
			shape.graphics.beginFill(0xfff000);
			shape.graphics.drawCircle(r, r, r);
			shape.graphics.endFill();
			return shape;
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

		/**
		 * @param x  stageX
		 * @param y  stageY
		 * egret 坐标转换到p2坐标
		 */
		public getPhysicsCoord(x:number,y:number):number[]{
			var positionX: number = x / 50;  //注意不要做上下取整 会影响鼠标约束点击判断
			var positionY: number = (eg.Config.STAGE_H - y) / 50;
			console.log(x + '|' + y + '-' + positionX + '|' + positionY);
			return [positionX,positionY];

			// x = (x - w / 2) / 50;
            // y = (y - h / 2) / -50;

		}
	}
}