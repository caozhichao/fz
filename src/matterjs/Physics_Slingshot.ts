
/**
 * https://www.jianshu.com/p/00abe24db9bd
 * http://web.jobbole.com/91103/
 * https://blog.csdn.net/chenqiong1991/article/details/82686577 碰撞
 */
class Physics_Slingshot extends egret.Sprite{
	private engine:any;
	public constructor() {
		super();
		this.init();
	}

	private init():void{


        this.addChild(new egret.Bitmap(RES.getRes('background_png')));

		var list = document.querySelectorAll(".egret-player");
        var container = list[0];
        let player = container['egret-player'];
        let canvas = player.canvas;

		this.engine = Matter.Engine.create(null,null);

        // this.engine.world.gravity.y = 0;

		let runner = Matter.Runner.create(null);
		//设置runner以固定帧率计算
        runner.isFixed = true; 

		 //创建render，使用egret的渲染方法替代matter自己的pixi渲染方法
        let render = EgretRender.create({
            // element: document.body,
            element:canvas, //必须用cavnas 否则  会影响鼠标
            engine: this.engine,
            options: {
                width: eg.Config.STAGE_W,
                height: eg.Config.STAGE_H,
                container: this,
                wireframes: true
            }
        });

        Matter.Runner.run(runner, this.engine);
        EgretRender.run(render);


        // 设置某个标记的物体才能被鼠标操纵
        let categoryBall = 0x0001; // 分类

        let mouseConstraint = Matter.MouseConstraint.create(this.engine, { element: canvas,visible:true/*,collisionFilter:{mask:categoryBall}*/});
        Matter.World.add(this.engine.world, mouseConstraint);
        render.mouse = mouseConstraint.mouse;
		
        var wScale = document.body.clientWidth / eg.Config.STAGE_W;
		var hScale = document.body.clientHeight / eg.Config.STAGE_H;

        // Matter.Mouse.setScale(this.mouseConstraint.mouse, {x: 1 / (wScale), y: 1 / (hScale)});
        Matter.Mouse.setScale(mouseConstraint.mouse, {x: 1 / (wScale), y: 1 / (hScale)});


        let ground:any = Matter.Bodies.rectangle(395, 600, 815, 50, {isStatic: true, render: {visible: true}});
        let rockOptions:any = {density: 0.004,restitution:0.8, render: {sprite: {texture: 'rock_png', xOffset: 23.5, yOffset: 23.5}}/*,collisionFilter:{category:categoryBall}*/};
        let rock:any = Matter.Bodies.polygon(170, 450, 8, 20, rockOptions);
        let anchor:any = {x: 170, y: 450}; 
        let elastic:any = Matter.Constraint.create({pointA: anchor, bodyB: rock, stiffness: 0.05, render: {lineWidth: 5, strokeStyle: 0xdfa417}});

        // var pyramid:any = Matter.Composites.pyramid(500, 300, 9, 10, 0, 0, function(x, y, column):any
        // {
        //     var texture:any = column % 2 === 0 ? 'block_png' : 'block-2_png';
        //     return Matter.Bodies.rectangle(x, y, 25, 40, {render: {sprite: {texture: texture, xOffset: 20.5, yOffset: 28}}});
        // });


        var ground2:any = Matter.Bodies.rectangle(610, 250, 200, 20, {isStatic: true, render: {fillStyle: '#edc51e', strokeStyle: '#b5a91c'}});



        // var group: any = Matter.Body.nextGroup(true);
		// var particleOptions: any = { friction: 0.00001, collisionFilter: { group: group }, render: { visible: false } };

		// var cloth: any = Matter.Composites.softBody(100, 50, 20, 12, 5, 5, false, 8, particleOptions,null);

        // for (var i: number = 0; i < 20; i++) {
		// 		cloth.bodies[i].isStatic = true;
        // }

         // 堆叠刚体
        // var stack = Matter.Composites.stack(200, 46, 6, 3, 0, 0, function(x, y) {
        //      return Matter.Bodies.polygon(x, y, Math.round(Matter.Common.random(1, 8)), Matter.Common.random(20, 40),null);           
        // });

        // let polygonBody = Matter.Bodies.polygon(100, 100,6,40,null);           

        /*
        let category = Matter.Body.nextCategory();

        // 堆叠桥梁
        var group = Matter.Body.nextGroup(true);
        var bridge = Matter.Composites.stack(150, 300, 9, 1, 10, 10, function(x, y) {
            return Matter.Bodies.rectangle(x, y, 50, 20, {
                collisionFilter: { // 过滤碰撞
                    group: group 
                },
                isStatic:false
            });
        });

        // 创建链约束
        Matter.Composites.chain(bridge, 0.5, 0, -0.5, 0, { stiffness: 0.9 });

        let bridgeConstraintA = Matter.Constraint.create({ // 创建约束
                pointA: { // A点
                    x: 140,
                    y: 300
                },
                bodyB: bridge.bodies[0], // 约束刚体
                pointB: { // B点
                    x: -25,
                    y: 0
                }
            });

        let bridgeConstraintB =  Matter.Constraint.create({
                pointA: { // A点
                    x: 690,
                    y: 300
                },
                bodyB: bridge.bodies[8], // 约束刚体
                pointB: { // B点
                    x: 25,
                    y: 0
                }
            })
        */

        let circleA = Matter.Bodies.circle(100,100,20,{render:{fillStyle:0x00ff00,lineWidth:10},collisionFilter:{category:0x0002,mask:0x0004|0x0001}},null);
        let circleB = Matter.Bodies.circle(300,100,20,{render:{fillStyle:0xff0000,lineWidth:5},collisionFilter:{category:0x0004,mask:0x0002|0x0001}},null);

        Matter.World.add(this.engine.world,[mouseConstraint,ground,rock,elastic,ground2,circleA,circleB/*pyramid,cloth,bridge,bridgeConstraintA,bridgeConstraintB*/]);


        Matter.Events.on(this.engine, 'afterUpdate', function():any
        {
            // console.log('mouseConstraint.mouse.button:' + mouseConstraint.mouse.button + 'x:' + rock.position.x + 'y:' + rock.position.y);
            if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430))
            {       

                // elastic.bodyB.collisionFilter.category = 1;

                rock = Matter.Bodies.polygon(170, 450, 7, 20, rockOptions);
                Matter.World.add(this.engine.world, rock);
                elastic.bodyB = rock;
            }
        }.bind(this));

	}
}