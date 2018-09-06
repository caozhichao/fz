
egret.log('---------------------');
egret.log(eg);
egret.log('------------------------');
class Main extends eg.EgMain {   

    protected initBefore():void{
		super.initBefore();
        egret.log(window);
        //微信h5调试环境中 window['__global'] != window
        //导致挂载到__global中的skins 无法正常获取到 无法正常通过 getDefinitionByName 获取
        // egret.log(window['__global'] == window);
        if(window['__global'] != window){ 
            window['__global'] = window;
            // egret.log(window['__global']);
        }
    }

     protected async createGameScene(){
        window['fz'] = fz; //wx 需要主动挂载到window对象上
        eg.log("createGameScene");    
        // eg.UIManager.Instance.showUI('fz.StructTest');     
        // eg.UIManager.Instance.showUI(new test.PageTips()); 
        // eg.UIManager.Instance.showUI('test.PageTips'); 
        eg.UIManager.Instance.showUI('test.ParabolaTest');
        // eg.log('---------------------------------------------------');
        // eg.log(window['__global']);
        egret.getDefinitionByName('skins.ButtonSkin');
    }
}
