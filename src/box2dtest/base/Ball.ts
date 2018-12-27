class Ball extends egret.Sprite{
	public radius:number;
	private color:number;
	public constructor(radius:number = 40,color:number=0xff0000) {
		super();		
		this.radius = radius;
		this.color = color;
		this.init();
	}

	public init():void{
		this.graphics.beginFill(this.color);
		this.graphics.drawCircle(0,0,this.radius);
		this.graphics.endFill();
	}
}