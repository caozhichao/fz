
egret.log('---------------------');
egret.log(eg);
egret.log('------------------------');
class Main extends eg.EgMain {   

    protected initBefore(){
		super.initBefore();
        // egret.log(window);
        //微信h5调试环境中 window['__global'] != window
        //导致挂载到__global中的skins 无法正常获取到 无法正常通过 getDefinitionByName 获取
        // egret.log(window['__global'] == window);
        // if(window['__global'] != window){ 
        //     window['__global'] = window;
        //     // egret.log(window['__global']);
        // }           
        // eg.Config.versionUrl = 'http://hf.rongyi.com/o2o/v4/cf/cf_legao/version.json';
        eg.Config.versionUrl = 'version.json';
        eg.Config.resConfigs = [{url:'resource/default.res.json',resourceRoot:'resource/'},{url:'http://hf.rongyi.com/o2o/v4/cf/cf_legao/resource/outpack.res.json',resourceRoot:'http://hf.rongyi.com/o2o/v4/cf/cf_legao/resource/'}];
    }

    

     protected async createGameScene(){
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
        
    }
}
