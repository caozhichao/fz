
/**
 * 参考
 * https://aotu.io/notes/2017/04/17/Matter-js/?o2src=juejin&o2layout=compat
 * https://github.com/guawoo/matterDemo_egret
 */
class Matter_HelloWorld extends egret.Sprite{
    private mouseConstraint: any;
    private engine:any;
	public constructor() {
		super();
        this.init();
	}
	private init():void{


        var list = document.querySelectorAll(".egret-player");
        var container = list[0];
        let player = container['egret-player'];
        let canvas = player.canvas;

                // var length_2 = list.length;
                // for (var i = 0; i < length_2; i++) {
                //     var container = list[i];
                //     var player = new web.WebPlayer(container, options);
                //     container["egret-player"] = player;
                // }

		 //创建engine
        let engine = Matter.Engine.create(null, null);
        this.engine = engine;
        //创建runner
        let runner = Matter.Runner.create(null);
        //设置runner以固定帧率计算
        runner.isFixed = true; 

        //创建render，使用egret的渲染方法替代matter自己的pixi渲染方法
        let render = EgretRender.create({
            // element: document.body,
            element:canvas, //必须用cavnas 否则  会影响鼠标
            engine: engine,
            options: {
                width: eg.Config.STAGE_W,
                height: eg.Config.STAGE_H,
                container: this,
                wireframes: true
            }
        });
        // Matter.RenderPixi

        Matter.Runner.run(runner, engine);
        EgretRender.run(render);


        //添加墙壁
        Matter.World.add(engine.world, [
            Matter.Bodies.rectangle(400, 25, 800, 50, { isStatic: true, friction: 0 }),
            Matter.Bodies.rectangle(400, 600, 800, 50, { isStatic: true, friction: 0 }),
            Matter.Bodies.rectangle(650, 300, 50, 600, { isStatic: true, friction: 0 }),
            Matter.Bodies.rectangle(25, 300, 50, 600, { isStatic: true, friction: 0 })
        ]);

        // //添加一个盒子
        // Matter.World.add(engine.world, 
        //     Matter.Bodies.rectangle(100,100, 50, 50, {angle: Math.PI/6})
        // );

        // var rect = Matter.Bodies.rectangle(200, 100, 50, 50,null)// 矩形
        // circle = Bodies.circle(300, 100, 25), // 圆
        // polygon = Bodies.polygon(450, 100, 5, 25), // 多边形
        // trapezoid = Bodies.trapezoid(590, 100, 50, 50, 3); // 梯形
        // // 将刚体添加到世界中
        // World.add(engine.world, [rect, circle, polygon, trapezoid]);
        // Matter.World.add(engine.world,rect);

        


        this.mouseConstraint = Matter.MouseConstraint.create(this.engine, { element: canvas,visible:false});
        Matter.World.add(this.engine.world, this.mouseConstraint);
        render.mouse = this.mouseConstraint.mouse;
		
        var wScale = document.body.clientWidth / eg.Config.STAGE_W;
		var hScale = document.body.clientHeight / eg.Config.STAGE_H

        // eg.log(egret.sys.DisplayList.$canvasScaleX + '|' + egret.sys.DisplayList.$canvasScaleY);
        // let matrix:string = canvas.style.transform;
        // let s = matrix.indexOf('(');
        // let e = matrix.indexOf(')');
        // let ss = matrix.substring(s+1,e);
        // let arr = ss.split(',');
        // wScale = parseFloat(arr[0]);
        // hScale = parseFloat(arr[3]);

        // Matter.Mouse.setScale(this.mouseConstraint.mouse, {x: 1 / (wScale), y: 1 / (hScale)});
        Matter.Mouse.setScale(this.mouseConstraint.mouse, {x: 1 / (wScale), y: 1 / (hScale)});


        // eg.Config.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);


        //矩形
        let rect = Matter.Bodies.rectangle(400,100,50,50,{isStatic:true});
        let ball = Matter.Bodies.circle(400, 400, 50,null,null);
        let cc = Matter.Constraint.create({bodyA:rect,
                                        pointA:{x:0,y:0},
                                        bodyB:ball,
                                        pointB:{x:0,y:-50},
                                        stiffness:0.01
                                    })
        // Matter.World.add(engine.world,[rect,ball,cc]);

        // var cradle: any = Matter.Composites.newtonsCradle(280, 100, 5, 30, 200);
		// 	Matter.World.add(this.engine.world, cradle);
		// 	Matter.Body.translate(cradle.bodies[0],
        //     {
        //         x: -180,
        //         y: -100
        //     });

        var group: any = Matter.Body.nextGroup(true);
			var particleOptions: any = { friction: 0.00001, collisionFilter: { group: group }, render: { visible: false } };

			var cloth: any = Matter.Composites.softBody(100, 100, 20, 12, 5, 5, false, 8, particleOptions,null);

			for (var i: number = 0; i < 20; i++) {
				cloth.bodies[i].isStatic = true;
			}
            Matter.World.add(this.engine.world,cloth);

	}

    private onTap(event:egret.TouchEvent):void{
        //获得点击坐标
        let x = event.stageX;
        let y = event.stageY;

        // //创建一个带图片的盒子
        // let box = Matter.Bodies.rectangle(x, y, 52, 52, {
        //     render: {
        //         sprite: {
        //             texture: 'rect_png', xOffset: 52 / 2, yOffset: 52 / 2
        //         }
        //     }
        // });
        // Matter.World.add(this.engine.world, box);

          //创建一个多边形
                // let arrow = Matter.Vertices.fromPath('40 0 40 20 100 20 100 80 40 80 40 100 0 50', null);
                let arrow = Matter.Vertices.fromPath('0,0,100,0,100,100,0,50', null);
                let arrowBody = Matter.Bodies.fromVertices(x, y, [arrow], null, true, null, null);
   
                Matter.World.add(this.engine.world, arrowBody);
    }
}