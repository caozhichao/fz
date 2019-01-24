
/**
 * Main入口
 */
class Main extends eg.EgMain {   

    protected initBefore(){
		super.initBefore();        
        // eg.log(window['skins']);
        // egret.log(window);
        //微信h5调试环境中 window['__global'] != window
        //导致挂载到__global中的skins 无法正常获取到 无法正常通过 getDefinitionByName 获取
        // egret.log(window['__global'] == window);
        // if(window['__global'] != window){ 
        //     window['__global'] = window;
        //     // egret.log(window['__global']);
        // }           
        //版本号url设置
        // eg.Config.versionUrl = 'http://hf.rongyi.com/o2o/v4/cf/cf_legao/version2.json';
        eg.Config.versionUrl = 'version.json';    
        //设置资源加载配置
        // eg.Config.resConfigs = [{url:'resource/default.res.json',resourceRoot:'resource/'},{url:'http://hf.rongyi.com/o2o/v4/cf/cf_legao/resource/outpack.res.json',resourceRoot:'http://hf.rongyi.com/o2o/v4/cf/cf_legao/resource/'}];
    }

    // protected loadResAfter():void{
    //     super.loadResAfter();
    //     //设置新的LoadingUI
    //     eg.Loading.Instance.loadingUI = new test.PageLoadingUI();        
    // }

    private preload(){
        return new Promise((resolve,reject)=>{
            eg.QueueLoader.Instance.loadGroup('preload',0,this,()=>{
                resolve();
            })
        })
    }

    public async initComplete(){
        super.initComplete();
        await this.preload();
        this.createGameScene();
    }

    

     protected async createGameScene(){

        // if(DEBUG){
        //     //微信调试工具h5模式 exml 加载模式下
        //     window['skins'] = window['__global']['skins'];
        // }
        window['eg'] = eg;
        window['fz'] = fz; //wx 需要主动挂载到window对象上
        eg.log("createGameScene");    
        // eg.UIManager.Instance.showUI('fz.StructTest');     
        // eg.UIManager.Instance.showUI(new test.PageTips()); 
        // eg.UIManager.Instance.showUI('test.PageTips'); 
        // eg.UIManager.Instance.showUI('fz.CutEffect');
        // eg.log('---------------------------------------------------');
        // eg.log(window['__global']);
        // egret.getDefinitionByName('skins.ButtonSkin');

        // let result = await eg.post('http://wx.dev2.rongyi.com/api/wechat/user/get',{mall:'54f403eae4b002000cf63762',openId:'oaBwkwAd0kREhmXQcZX0DMqsS-xA',timeStamp:Date.now(),sign:'sign'});

        // new test.CodeTest();
        // this.stage.addChild(new VideoTest());
        // this.stage.addChild(new EventTest());
        // eg.UIManager.Instance.showUI(new RunwayTest());
        // this.stage.addChild(new p2test.Test2());
        // eg.UIManager.Instance.showUI('fz.ZM');
        // this.stage.addChild(new test.HtmlElementTest());
        // this.stage.addChild(new test.RayCastingTest());
        // this.stage.addChild(new test.OutPackConfigTest());
        // eg.UIManager.Instance.showUI(new test.OutPackConfigTest());

        // eg.UIManager.Instance.showUI(new test.PopupBaseUITest());
        // this.stage.addChild(new test.MatrixTest());
        // new test.WSTest();
        // this.stage.orientation = egret.OrientationMode.LANDSCAPE;
        // eg.UIManager.Instance.showUI(new test.OrientationModeTest());
        // eg.Config.stage.addEventListener(egret.Event.RESIZE,this.onResize2,this);        

        // new PromiseTest();

        /*
       this.facade = game.ApplicationFacade.getInstance();
       game.MVCConfig.initCommands.push(game.GameInitCommand);
       this.facade.startup(this);
       */

    //    console.log(this.facade);
    //    this.addChild(new test.WXOpenDataTest());
        // new test.Test();

        // new test.HrefTest();
        // this.addChild(new Matter_HelloWorld());
        // this.addChild(new Velocity1());
        // this.addChild(new MouseEventTest());
        // this.addChild(new Easing1());
        // this.addChild(new EaseToMouse());
        // this.addChild(new Spring1());
        // this.addChild(new Rotate3());
        // this.addChild(new Physics_Slingshot());
        // this.addChild(new ScrollNumberTest());
        // eg.UIManager.Instance.showUI(new game.SheetTestView());
        // this.addChild(new CircleLeftTime());
        this.addChild(new sx.Number_sx());
    }

    private facade:game.ApplicationFacade;

    private onResize2(evt:egret.Event):void{
        eg.log(eg.Config.stage.stageWidth + '|' + eg.Config.stage.stageHeight);
    }
}
