module test {
	export class ViewStackDemo extends eui.Group {
    private viewStack:eui.ViewStack;
    public constructor() {
        super();
    }
    protected createChildren():void {
      super.createChildren();
        this.viewStack = new eui.ViewStack();
        var btnA:eui.Button = new eui.Button();
        btnA.label = "egret Button A";
        this.viewStack.addChild( btnA );
        var btnB:eui.Button = new eui.Button();
        btnB.label = "egret Button B";
        this.viewStack.addChild( btnB );
        //设置默认选项
        this.viewStack.selectedIndex = 1;
        //timer控制选项切换
        var timer:egret.Timer = new egret.Timer( 500 );
        timer.addEventListener( egret.TimerEvent.TIMER, this.changeIndexByTimer, this );
        timer.start();
        //show
        this.addChild( this.viewStack );
    }
    private changeIndexByTimer( evt:egret.TimerEvent ):void {
        this.viewStack.selectedIndex = this.viewStack.selectedIndex == 0 ? 1 : 0 ;
    }
}
}