class RunwayTest extends eg.PageBase{
	private _container:egret.DisplayObjectContainer;
	private p:egret.Shape;
	private a0:number = 0;
	public constructor() {
		super();
	}

	public initComplete(data:any):void{
		super.initComplete(data);
		
		let p:egret.Shape = new egret.Shape();
		p.graphics.beginFill(0x00ff00);
		p.graphics.drawCircle(0,0,10);
		p.graphics.endFill();

		this.p = p;

		let shape:egret.Shape = new egret.Shape();
		shape.graphics.lineStyle(1,0xFF0000);
		shape.graphics.drawCircle(0,0,100);
		shape.graphics.endFill();

		//this.addChild(shape);

		this._container = new egret.DisplayObjectContainer();
		this._container.addChild(shape);

		this._container.addChild(p);

		this._container.x = 150;
		this._container.y = 150;
		this.addChild(this._container);



		this.addEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);
	}

	private onFrame(evt:egret.Event):void{

		this.p.x = 100 * Math.cos(this.a0 / 180 * Math.PI);
		this.p.y = 100 * Math.sin(this.a0 / 180 * Math.PI);

		this.a0 += 5;
	}
}