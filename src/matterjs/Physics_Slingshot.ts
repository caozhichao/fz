class Physics_Slingshot extends egret.Sprite{
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

		this.engine = Matter.Engine.create(null,null);
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



	}
}